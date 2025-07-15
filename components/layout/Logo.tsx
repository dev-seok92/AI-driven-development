'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ILogoProps {
    className?: string;
}

export default function Logo({ className }: ILogoProps) {
    return (
        <Link 
            href="/"
            className={cn(
                "text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-2 py-1",
                className
            )}
            aria-label="AI 이미지 생성기 홈으로 이동"
        >
            AI 이미지 생성기
        </Link>
    )
} 