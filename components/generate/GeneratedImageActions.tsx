import { Button } from '@/components/ui/button'
import { Download, Save, Share2 } from 'lucide-react'
import { IGeneratedImageActionsProps } from '@/types'
import { useToast } from '@/hooks/use-toast'
import { useGalleryStore } from '@/store/gallery'
import { useState } from 'react'
import { 
    detectCategories, 
    extractTags, 
    downloadImage, 
    sanitizeFileName, 
    getErrorMessage 
} from '@/lib/utils'

export function GeneratedImageActions({
    imageUrl,
    prompt,
    styleOptions
}: IGeneratedImageActionsProps) {
    const { toast } = useToast()
    const { addImage } = useGalleryStore()
    const [isSaving, setIsSaving] = useState(false)
    const [isDownloading, setIsDownloading] = useState(false)

    const handleSave = async () => {
        if (isSaving) return
        
        setIsSaving(true)
        try {
            const categories = detectCategories(prompt)
            const tags = extractTags(prompt)

            addImage({
                imageUrl,
                prompt,
                styleOptions,
                categories,
                tags,
                isPublic: false // 기본적으로 비공개
            })

            toast({
                title: '저장 완료',
                description: '이미지가 갤러리에 저장되었습니다.'
            })
        } catch (error) {
            toast({
                variant: 'destructive',
                title: '저장 실패',
                description: getErrorMessage(error)
            })
        } finally {
            setIsSaving(false)
        }
    }

    const handleShare = () => {
        // 추후 커뮤니티 공유 기능 구현
        toast({
            title: '준비 중',
            description: '커뮤니티 공유 기능은 준비 중입니다.'
        })
    }

    const handleDownload = async () => {
        if (isDownloading) return
        
        setIsDownloading(true)
        try {
            const timestamp = new Date().getTime()
            const safePrompt = sanitizeFileName(prompt).slice(0, 20)
            const filename = `${safePrompt}_${timestamp}.webp`
            
            await downloadImage(imageUrl, filename)

            toast({
                title: '다운로드 완료',
                description: '이미지가 다운로드되었습니다.'
            })
        } catch (error) {
            toast({
                variant: 'destructive',
                title: '다운로드 실패',
                description: getErrorMessage(error)
            })
        } finally {
            setIsDownloading(false)
        }
    }

    return (
        <div className="flex flex-wrap gap-2">
            <Button 
                onClick={handleSave} 
                variant="outline"
                disabled={isSaving}
            >
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? '저장 중...' : '갤러리에 저장하기'}
            </Button>
            <Button onClick={handleShare} variant="outline">
                <Share2 className="mr-2 h-4 w-4" />
                공유하기
            </Button>
            <Button 
                onClick={handleDownload} 
                variant="outline"
                disabled={isDownloading}
            >
                <Download className="mr-2 h-4 w-4" />
                {isDownloading ? '다운로드 중...' : '다운로드'}
            </Button>
        </div>
    )
}
