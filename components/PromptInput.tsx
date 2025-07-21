'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SignUpButton, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export function PromptInput() {
    const [prompt, setPrompt] = useState('')
    const [error, setError] = useState('')
    const { isSignedIn, isLoaded } = useUser()
    const router = useRouter()

    const handleSignedInSubmit = () => {
        if (!prompt.trim()) {
            setError('프롬프트를 입력해 주세요')
            return
        }

        // 로그인된 사용자는 직접 생성 페이지로 이동
        const generateUrl = `/generate?prompt=${encodeURIComponent(prompt.trim())}`
        router.push(generateUrl)
    }

    const handleSignUpClick = () => {
        if (!prompt.trim()) {
            setError('프롬프트를 입력해 주세요')
            return
        }

        // 프롬프트를 로컬 스토리지에 저장
        localStorage.setItem('pendingPrompt', prompt.trim())
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-4">
            <Input
                placeholder="이미지 생성을 위한 프롬프트를 입력하세요..."
                value={prompt}
                onChange={e => {
                    setPrompt(e.target.value)
                    setError('')
                }}
                className="h-12"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            
            {!isLoaded ? (
                <Button
                    disabled
                    className="w-full"
                >
                    이미지 생성하기
                </Button>
            ) : isSignedIn ? (
                <Button
                    onClick={handleSignedInSubmit}
                    disabled={!prompt.trim()}
                    className="w-full"
                >
                    이미지 생성하기
                </Button>
            ) : (
                <SignUpButton 
                    mode="modal"
                    forceRedirectUrl="/generate"
                >
                    <Button
                        onClick={handleSignUpClick}
                        disabled={!prompt.trim()}
                        className="w-full"
                    >
                        이미지 생성하기
                    </Button>
                </SignUpButton>
            )}
        </div>
    )
}
