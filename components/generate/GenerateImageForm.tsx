'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { StyleOptions } from './StyleOptions'
import { GenerateOptions } from './GenerateOptions'
import { ImageGeneration } from './ImageGeneration'
import { GeneratedImageActions } from './GeneratedImageActions'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { IStyleOptions, IGenerateOptions, IGenerateResponse, DEFAULT_GENERATE_OPTIONS } from '@/types'
import { useToast } from '@/hooks/use-toast'
import { validatePrompt, getErrorMessage } from '@/lib/utils'

const DEFAULT_STYLE_OPTIONS: IStyleOptions = {
    generationMode: 'general' as const,
    artStyle: '디지털아트',
    colorTone: '밝은'
}

export function GenerateImageForm() {
    const { toast } = useToast()
    const searchParams = useSearchParams()
    const [prompt, setPrompt] = useState('')
    const [error, setError] = useState('')
    const [styleOptions, setStyleOptions] = useState<IStyleOptions>(
        DEFAULT_STYLE_OPTIONS
    )
    const [generateOptions, setGenerateOptions] = useState<IGenerateOptions>(
        DEFAULT_GENERATE_OPTIONS
    )
    const [generatedImageUrl, setGeneratedImageUrl] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)

    useEffect(() => {
        // URL 쿼리 파라미터에서 프롬프트 확인
        const urlPrompt = searchParams.get('prompt')
        if (urlPrompt) {
            setPrompt(decodeURIComponent(urlPrompt))
            return
        }
        
        // 로컬 스토리지에서 저장된 프롬프트 확인
        const pendingPrompt = localStorage.getItem('pendingPrompt')
        if (pendingPrompt) {
            setPrompt(pendingPrompt)
            // 사용한 프롬프트는 삭제
            localStorage.removeItem('pendingPrompt')
        }
    }, [searchParams])

    const handlePromptChange = (value: string) => {
        setPrompt(value)
        const validation = validatePrompt(value)
        setError(validation.isValid ? '' : validation.message || '')
    }

    const handleGenerate = async () => {
        const validation = validatePrompt(prompt)
        if (!validation.isValid) {
            setError(validation.message || '')
            return
        }

        try {
            setIsGenerating(true)
            setError('')

            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: prompt.trim(),
                    styleOptions,
                    generateOptions
                })
            })

            const data: IGenerateResponse = await response.json()

            if (!data.success) {
                throw new Error(data.error?.message || '이미지 생성에 실패했습니다')
            }

            if (!data.imageUrl) {
                throw new Error('생성된 이미지 URL이 없습니다')
            }

            setGeneratedImageUrl(data.imageUrl)
            toast({
                title: '이미지 생성 완료',
                description: '이미지가 성공적으로 생성되었습니다.'
            })
        } catch (err) {
            const errorMessage = getErrorMessage(err)
            setError(errorMessage)
            toast({
                variant: 'destructive',
                title: '오류 발생',
                description: errorMessage
            })
        } finally {
            setIsGenerating(false)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault()
            handleGenerate()
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium mb-2">
                    프롬프트 입력
                    <span className="text-muted-foreground ml-1">
                        (Ctrl/Cmd + Enter로 생성)
                    </span>
                </label>
                <Textarea
                    value={prompt}
                    onChange={e => handlePromptChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="생성하고 싶은 이미지를 자세히 설명해주세요..."
                    className="min-h-[100px] resize-none"
                    disabled={isGenerating}
                />
                <div className="flex justify-between items-center mt-1">
                    <span className={`text-xs ${
                        prompt.length > 450 ? 'text-red-500' : 'text-muted-foreground'
                    }`}>
                        {prompt.length}/500
                    </span>
                </div>
                {error && (
                    <Alert variant="destructive" className="mt-2">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
            </div>

            <StyleOptions 
                options={styleOptions} 
                onChange={setStyleOptions} 
            />

            <GenerateOptions
                options={generateOptions}
                onChange={setGenerateOptions}
            />

            <ImageGeneration
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
                generatedImageUrl={generatedImageUrl}
            />

            {generatedImageUrl && (
                <GeneratedImageActions
                    imageUrl={generatedImageUrl}
                    prompt={prompt}
                    styleOptions={styleOptions}
                    generateOptions={generateOptions}
                />
            )}
        </div>
    )
}
