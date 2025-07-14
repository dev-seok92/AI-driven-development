import { create } from 'zustand'
import { IGalleryImage, IStyleOptions } from '@/types'
import { DateRange } from 'react-day-picker'

interface FilterOptions {
    category: string
    dateRange?: DateRange
    sortBy: string
    visibility: string
}

interface GalleryStore {
    images: IGalleryImage[]
    filters: FilterOptions
    filteredImages: IGalleryImage[]
    addImage: (imageData: {
        imageUrl: string
        prompt: string
        styleOptions: IStyleOptions
        categories?: string[]
        tags?: string[]
        isPublic?: boolean
    }) => void
    updateImage: (imageId: string, updates: Partial<IGalleryImage>) => void
    deleteImage: (imageId: string) => void
    resetImages: () => void
    setFilter: (filter: Partial<FilterOptions>) => void
    resetFilters: () => void
}

const defaultFilters: FilterOptions = {
    category: 'all',
    dateRange: undefined,
    sortBy: 'latest',
    visibility: 'all'
}

export const useGalleryStore = create<GalleryStore>((set, get) => ({
    images: [], // 목업 데이터 제거, 빈 배열로 시작
    filters: defaultFilters,
    filteredImages: [], // 목업 데이터 제거, 빈 배열로 시작

    addImage: (imageData) => {
        const newImage: IGalleryImage = {
            id: Date.now().toString(),
            userId: 'current-user', // 실제로는 인증된 사용자 ID를 사용
            imageUrl: imageData.imageUrl,
            prompt: imageData.prompt,
            styleOptions: imageData.styleOptions,
            categories: imageData.categories || ['일반'],
            tags: imageData.tags || [],
            isPublic: imageData.isPublic || false,
            order: Date.now(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }

        set(state => {
            const updatedImages = [newImage, ...state.images]
            return {
                images: updatedImages,
                filteredImages: applyFilters(updatedImages, state.filters)
            }
        })
    },

    updateImage: (imageId, updates) => {
        set(state => {
            const updatedImages = state.images.map(img => 
                img.id === imageId 
                    ? { ...img, ...updates, updatedAt: new Date().toISOString() }
                    : img
            )
            return {
                images: updatedImages,
                filteredImages: applyFilters(updatedImages, state.filters)
            }
        })
    },

    deleteImage: (imageId: string) =>
        set(state => {
            const updatedImages = state.images.filter(img => img.id !== imageId)
            return {
                images: updatedImages,
                filteredImages: applyFilters(updatedImages, state.filters)
            }
        }),

    resetImages: () =>
        set(state => ({
            images: [], // 목업 데이터 제거, 빈 배열로 리셋
            filteredImages: applyFilters([], state.filters)
        })),

    setFilter: (filter: Partial<FilterOptions>) =>
        set(state => {
            const newFilters = { ...state.filters, ...filter }
            return {
                filters: newFilters,
                filteredImages: applyFilters(state.images, newFilters)
            }
        }),

    resetFilters: () =>
        set(state => ({
            filters: defaultFilters,
            filteredImages: applyFilters(state.images, defaultFilters)
        }))
}))

function applyFilters(
    images: IGalleryImage[],
    filters: FilterOptions
): IGalleryImage[] {
    let filtered = [...images]

    // 카테고리 필터
    if (filters.category !== 'all') {
        filtered = filtered.filter(img =>
            img.categories.includes(filters.category)
        )
    }

    // 날짜 범위 필터
    if (filters.dateRange?.from) {
        filtered = filtered.filter(img => {
            const imgDate = new Date(img.createdAt)
            const from = filters.dateRange?.from as Date
            const to = filters.dateRange?.to || from
            return imgDate >= from && imgDate <= to
        })
    }

    // 공개 설정 필터
    if (filters.visibility !== 'all') {
        filtered = filtered.filter(img =>
            filters.visibility === 'public' ? img.isPublic : !img.isPublic
        )
    }

    // 정렬
    filtered.sort((a, b) => {
        switch (filters.sortBy) {
            case 'oldest':
                return (
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime()
                )
            case 'name':
                return a.prompt.localeCompare(b.prompt)
            case 'latest':
            default:
                return (
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
        }
    })

    return filtered
}
