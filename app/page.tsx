'use client'

import { PromptInput } from '@/components/PromptInput'
import { CommunityFeedCard } from '@/components/CommunityFeedCard'
import { mockPosts } from '@/utils/mockData'
import { Button } from '@/components/ui/button'
import { SignUpButton, useUser } from '@clerk/nextjs'
import { Users, Palette, Zap } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
    const { isSignedIn, isLoaded } = useUser()

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            <main className="container mx-auto px-4 py-8 space-y-16">
                {/* 히어로 섹션 */}
                <section className="text-center pt-8 pb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        AI로 상상을 현실로 만들어보세요
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                        프롬프트를 입력하여 다양한 스타일의 이미지를 생성하고, 
                        갤러리에서 관리하며, 커뮤니티와 공유하세요.
                    </p>
                    <PromptInput />
                </section>

                {/* 기능 소개 섹션 */}
                <section className="py-12">
                    <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">
                        주요 기능
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Zap className="h-8 w-8 text-blue-600" />
                            </div>
                            <h4 className="text-xl font-semibold mb-2">빠른 생성</h4>
                            <p className="text-gray-600">
                                최첨단 AI 기술로 몇 초 만에 고품질 이미지를 생성합니다.
                            </p>
                        </div>
                        <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Palette className="h-8 w-8 text-purple-600" />
                            </div>
                            <h4 className="text-xl font-semibold mb-2">다양한 스타일</h4>
                            <p className="text-gray-600">
                                디지털아트, 수채화, 유화 등 다양한 예술 스타일을 지원합니다.
                            </p>
                        </div>
                        <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="h-8 w-8 text-green-600" />
                            </div>
                            <h4 className="text-xl font-semibold mb-2">커뮤니티</h4>
                            <p className="text-gray-600">
                                다른 사용자들과 작품을 공유하고 영감을 받아보세요.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 커뮤니티 피드 섹션 */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-3xl font-bold text-gray-900">
                            커뮤니티 피드
                        </h3>
                        {isLoaded && (
                            <>
                                {isSignedIn ? (
                                    <Button 
                                        variant="outline" 
                                        asChild
                                        className="gap-2"
                                    >
                                        <Link href="/community">
                                            <Users className="h-4 w-4" />
                                            전체 보기
                                        </Link>
                                    </Button>
                                ) : (
                                    <SignUpButton 
                                        mode="modal"
                                        forceRedirectUrl="/community"
                                    >
                                        <Button 
                                            variant="outline" 
                                            className="gap-2"
                                        >
                                            <Users className="h-4 w-4" />
                                            전체 보기
                                        </Button>
                                    </SignUpButton>
                                )}
                            </>
                        )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {mockPosts.map(post => (
                            <CommunityFeedCard key={post.postId} post={post} />
                        ))}
                    </div>
                </section>
            </main>

            {/* 푸터 */}
            <footer className="bg-gray-900 text-white py-8 mt-16">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <p className="text-gray-400">
                            © 2024 AI 이미지 생성기. 모든 권리 보유.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
