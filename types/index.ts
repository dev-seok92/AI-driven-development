export interface IPost {
    postId: string
    imageURL: string
    userName: string
    likes: number
    comments: number
    isLiked?: boolean
    prompt?: string
    createdAt?: string
    userProfile?: string
}

export interface IComment {
    id: string
    postId: string
    userName: string
    content: string
    createdAt: string
    userProfile?: string
}

// 스타일 옵션 인터페이스 통합
export interface IStyleOptions {
    artStyle: '디지털아트' | '수채화' | '유화' | '펜화' | '연필화'
    colorTone: '밝은' | '어두운' | '파스텔' | '흑백' | '컬러풀'
}

// API 요청/응답 인터페이스 통합
export interface IGenerateRequest {
    prompt: string
    styleOptions: IStyleOptions
}

export interface IGenerateResponse {
    success: boolean
    imageUrl?: string
    error?: {
        code: string
        message: string
    }
}

// 갤러리 이미지 인터페이스
export interface IGalleryImage {
    id: string
    userId: string
    imageUrl: string
    prompt: string
    styleOptions: IStyleOptions
    categories: string[]
    tags: string[]
    isPublic: boolean
    order: number
    createdAt: string
    updatedAt: string
}

// 날짜 범위 타입 (react-day-picker)
import { DateRange as DayPickerDateRange } from 'react-day-picker'
export type DateRange = DayPickerDateRange

// 컴포넌트 Props 인터페이스들
export interface ICommentsModalProps {
    postId: string
    isOpen: boolean
    onClose: () => void
}

export interface ICommunityFeedCardProps {
    post: IPost
}

export interface IStyleOptionsProps {
    options: IStyleOptions
    onChange: (options: IStyleOptions) => void
}

export interface IImageGenerationProps {
    onGenerate: () => void
    isGenerating: boolean
    generatedImageUrl: string
}

export interface IGeneratedImageActionsProps {
    imageUrl: string
    prompt: string
    styleOptions: IStyleOptions
}

export interface IGalleryCardProps {
    image: IGalleryImage
    onImageClick: () => void
    onShareClick: () => void
    onDelete: (imageId: string) => void
}

export interface IImageDetailModalProps {
    image: IGalleryImage
    isOpen: boolean
    onClose: () => void
}

export interface IShareModalProps {
    image: IGalleryImage
    isOpen: boolean
    onClose: () => void
}

// 유틸리티 타입들
export type ApiResponse<T> = {
    success: true
    data: T
} | {
    success: false
    error: {
        code: string
        message: string
    }
}

export type LoadingState = 'idle' | 'loading' | 'succeeded' | 'failed'

// 상수 타입들
export const ART_STYLES = [
    '디지털아트',
    '수채화', 
    '유화',
    '펜화',
    '연필화'
] as const

export const COLOR_TONES = [
    '밝은',
    '어두운',
    '파스텔',
    '흑백',
    '컬러풀'
] as const

export const CATEGORIES = [
    '판타지',
    'SF',
    '자연',
    '일상',
    '추상',
    '인물',
    '동물',
    '건축'
] as const

export type ArtStyle = typeof ART_STYLES[number]
export type ColorTone = typeof COLOR_TONES[number]
export type Category = typeof CATEGORIES[number]
