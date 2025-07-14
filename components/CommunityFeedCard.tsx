'use client'

import { ICommunityFeedCardProps } from '@/types'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { Heart, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { useState, useCallback, memo } from 'react'
import { formatRelativeTime } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'

// CommentsModal을 동적으로 임포트하여 초기 로딩 성능 향상
const CommentsModal = dynamic(
    () => import('./CommentsModal').then(mod => ({ default: mod.CommentsModal })),
    { ssr: false }
)

export const CommunityFeedCard = memo(function CommunityFeedCard({
    post: initialPost
}: ICommunityFeedCardProps) {
    const [post, setPost] = useState(initialPost)
    const [isCommentsOpen, setIsCommentsOpen] = useState(false)

    const handleLikeClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        
        setPost(prev => ({
            ...prev,
            likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
            isLiked: !prev.isLiked
        }))
    }, [])

    const handleCommentsClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsCommentsOpen(true)
    }, [])

    const handleCloseComments = useCallback(() => {
        setIsCommentsOpen(false)
    }, [])

    return (
        <>
            <article className="group">
                <Link 
                    href={`/post/${post.postId}`}
                    aria-label={`${post.userName}의 생성된 이미지 보기`}
                >
                    <Card className="overflow-hidden transition-all duration-200 hover:scale-[1.02] hover:shadow-lg focus-within:ring-2 focus-within:ring-primary">
                        <div className="relative aspect-square bg-gray-100">
                            <Image
                                src={post.imageURL}
                                alt={`${post.userName}이 생성한 이미지`}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                placeholder="blur"
                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                                priority={false}
                                loading="lazy"
                            />
                        </div>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="font-medium text-sm truncate">
                                        {post.userName}
                                    </span>
                                    {post.createdAt && (
                                        <span className="text-xs text-muted-foreground">
                                            {formatRelativeTime(post.createdAt)}
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-3">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleLikeClick}
                                        className="flex items-center gap-1 p-1 h-auto hover:bg-red-50 transition-colors"
                                        aria-label={post.isLiked ? '좋아요 취소' : '좋아요'}
                                    >
                                        <Heart
                                            size={16}
                                            className={`transition-colors ${
                                                post.isLiked
                                                    ? 'fill-red-500 text-red-500'
                                                    : 'text-gray-600 hover:text-red-500'
                                            }`}
                                        />
                                        <span className="text-sm font-medium">
                                            {post.likes}
                                        </span>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleCommentsClick}
                                        className="flex items-center gap-1 p-1 h-auto hover:bg-blue-50 transition-colors"
                                        aria-label="댓글 보기"
                                    >
                                        <MessageCircle 
                                            size={16} 
                                            className="text-gray-600 hover:text-blue-500 transition-colors"
                                        />
                                        <span className="text-sm font-medium">
                                            {post.comments}
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            </article>
            
            {/* 조건부 렌더링으로 성능 최적화 */}
            {isCommentsOpen && (
                <CommentsModal
                    postId={post.postId}
                    isOpen={isCommentsOpen}
                    onClose={handleCloseComments}
                />
            )}
        </>
    )
})

CommunityFeedCard.displayName = 'CommunityFeedCard'
