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
    generationMode: 'general' | 'logo'
    artStyle: '디지털아트' | '수채화' | '유화' | '펜화' | '연필화'
    colorTone: '밝은' | '어두운' | '파스텔' | '흑백' | '컬러풀'
    logoStyle?: '미니멀' | '모던' | '클래식' | '빈티지' | '기업형' | '창조적' | '대담한' | '우아한'
    logoColorTone?: '단색' | '그라데이션' | '네온' | '메탈릭' | '투명배경'
}

// 새로운 생성 설정 옵션 인터페이스
export interface IGenerateOptions {
    seed?: number
    go_fast?: boolean
    megapixels?: '1' | '0.25'
    num_outputs?: number
    aspect_ratio?: '1:1' | '16:9' | '21:9' | '3:2' | '2:3' | '4:5' | '5:4' | '3:4' | '4:3' | '9:16' | '9:21'
    output_format?: 'webp' | 'jpg' | 'png'
    output_quality?: number
    num_inference_steps?: number
    disable_safety_checker?: boolean
}

// API 요청/응답 인터페이스 통합
export interface IGenerateRequest {
    prompt: string
    styleOptions: IStyleOptions
    generateOptions?: IGenerateOptions
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

export interface IGenerateOptionsProps {
    options: IGenerateOptions
    onChange: (options: IGenerateOptions) => void
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
    generateOptions: IGenerateOptions
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

export const LOGO_STYLES = [
    '미니멀',
    '모던',
    '클래식',
    '빈티지',
    '기업형',
    '창조적',
    '대담한',
    '우아한'
] as const

export const LOGO_COLOR_TONES = [
    '단색',
    '그라데이션',
    '네온',
    '메탈릭',
    '투명배경'
] as const

export const GENERATION_MODES = [
    'general',
    'logo'
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

export const ASPECT_RATIOS = [
    '1:1',
    '16:9',
    '21:9',
    '3:2',
    '2:3',
    '4:5',
    '5:4',
    '3:4',
    '4:3',
    '9:16',
    '9:21'
] as const

export const OUTPUT_FORMATS = [
    'webp',
    'jpg',
    'png'
] as const

export const MEGAPIXELS = [
    '1',
    '0.25'
] as const

// 기본 생성 옵션
export const DEFAULT_GENERATE_OPTIONS: IGenerateOptions = {
    go_fast: true,
    megapixels: '1',
    num_outputs: 1,
    aspect_ratio: '1:1',
    output_format: 'webp',
    output_quality: 90,
    num_inference_steps: 4,
    disable_safety_checker: false
}

export type ArtStyle = typeof ART_STYLES[number]
export type ColorTone = typeof COLOR_TONES[number]
export type LogoStyle = typeof LOGO_STYLES[number]
export type LogoColorTone = typeof LOGO_COLOR_TONES[number]
export type GenerationMode = typeof GENERATION_MODES[number]
export type Category = typeof CATEGORIES[number]
export type AspectRatio = typeof ASPECT_RATIOS[number]
export type OutputFormat = typeof OUTPUT_FORMATS[number]
export type MegaPixels = typeof MEGAPIXELS[number]
