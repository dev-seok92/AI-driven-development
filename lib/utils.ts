import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 날짜 포맷팅 유틸리티
export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function formatRelativeTime(date: string | Date): string {
  const now = new Date()
  const target = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - target.getTime()) / 1000)
  
  if (diffInSeconds < 60) return '방금 전'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}시간 전`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}일 전`
  
  return formatDate(date)
}

// 텍스트 처리 유틸리티
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export function sanitizeFileName(filename: string): string {
  return filename.replace(/[^a-zA-Z0-9가-힣]/g, '_')
}

// 보안 관련 유틸리티
export function sanitizeInput(input: string): string {
  // HTML 태그 제거
  const htmlRegex = /<[^>]*>/g
  // 스크립트 태그 제거
  const scriptRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi
  // 이벤트 핸들러 제거
  const eventRegex = /on\w+\s*=\s*["\'][^"\']*["\']?/gi
  
  return input
    .replace(scriptRegex, '')
    .replace(htmlRegex, '')
    .replace(eventRegex, '')
    .trim()
}

export function containsInappropriateContent(text: string): boolean {
  const inappropriateWords = [
    '폭력', '혐오', '차별', '성적', '불법', '사기', '해킹', '바이러스',
    '테러', '마약', '도박', '음란', '선정적', '살인', '자살', '해로운'
  ]
  
  const lowerText = text.toLowerCase()
  return inappropriateWords.some(word => lowerText.includes(word))
}

export function isValidUrl(url: string): boolean {
  try {
    const urlObj = new URL(url)
    return urlObj.protocol === 'https:' || urlObj.protocol === 'http:'
  } catch {
    return false
  }
}

// 카테고리 감지 유틸리티
export function detectCategories(prompt: string): string[] {
  const categoryKeywords = {
    '판타지': ['마법', '용', '요정', '판타지', '마법사', '엘프', '마법의', '환상'],
    'SF': ['우주', '로봇', '미래', '사이버', '우주선', '외계', '사이버펑크', '메카'],
    '자연': ['나무', '바다', '산', '숲', '자연', '강', '꽃', '풍경'],
    '동물': ['고양이', '개', '새', '동물', '곰', '사자', '토끼', '말'],
    '인물': ['사람', '여자', '남자', '아이', '인물', '초상', '얼굴'],
    '건축': ['건물', '집', '성', '교회', '건축', '도시', '탑', '궁전'],
    '추상': ['추상', '패턴', '기하학', '색채', '형태', '구조']
  }

  const detectedCategories = Object.entries(categoryKeywords)
    .filter(([_, keywords]) => 
      keywords.some(keyword => prompt.toLowerCase().includes(keyword))
    )
    .map(([category]) => category)

  return detectedCategories.length > 0 ? detectedCategories : ['일반']
}

// 태그 추출 유틸리티
export function extractTags(text: string, maxTags: number = 5): string[] {
  const commonWords = ['이미지', '사진', '그림', '생성', '만들기', '해주세요', '입니다', '있는', '같은', '하는']
  
  return text
    .split(/[\s,.]/)
    .filter(word => word.length > 2)
    .filter(word => !commonWords.includes(word))
    .slice(0, maxTags)
}

// 이미지 다운로드 유틸리티
export async function downloadImage(imageUrl: string, filename: string): Promise<void> {
  try {
    if (!isValidUrl(imageUrl)) {
      throw new Error('유효하지 않은 이미지 URL입니다.')
    }
    
    const response = await fetch(imageUrl)
    if (!response.ok) {
      throw new Error('이미지 다운로드 실패')
    }
    
    const blob = await response.blob()
    const blobUrl = window.URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = blobUrl
    link.download = filename
    
    document.body.appendChild(link)
    link.click()
    
    document.body.removeChild(link)
    window.URL.revokeObjectURL(blobUrl)
  } catch (error) {
    console.error('Download error:', error)
    throw error
  }
}

// 향상된 유효성 검사 유틸리티
export function validatePrompt(prompt: string): { isValid: boolean; message?: string } {
  if (!prompt || typeof prompt !== 'string') {
    return { isValid: false, message: '프롬프트가 누락되었습니다.' }
  }
  
  const sanitized = sanitizeInput(prompt)
  const trimmed = sanitized.trim()
  
  if (trimmed.length < 1) {
    return { isValid: false, message: '프롬프트를 입력해주세요.' }
  }
  
  if (trimmed.length > 500) {
    return { isValid: false, message: '프롬프트는 500자 이내로 입력해주세요.' }
  }
  
  if (containsInappropriateContent(trimmed)) {
    return { isValid: false, message: '부적절한 내용이 포함되어 있습니다.' }
  }
  
  return { isValid: true }
}

// 레이트 리미팅 유틸리티
export function createRateLimiter(maxRequests: number, windowMs: number) {
  const requests = new Map<string, number[]>()
  
  return function checkRateLimit(identifier: string): boolean {
    const now = Date.now()
    const userRequests = requests.get(identifier) || []
    
    // 윈도우 시간 밖의 요청들 제거
    const validRequests = userRequests.filter(time => now - time < windowMs)
    
    if (validRequests.length >= maxRequests) {
      return false
    }
    
    validRequests.push(now)
    requests.set(identifier, validRequests)
    
    return true
  }
}

// 에러 메시지 변환 유틸리티
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === 'string') {
    return error
  }
  return '알 수 없는 오류가 발생했습니다.'
}

// 디바운스 유틸리티
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}
