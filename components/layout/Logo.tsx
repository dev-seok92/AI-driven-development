'use client'

import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ILogoProps {
    className?: string;
}

export default function Logo({ className }: ILogoProps) {
    return (
        <Link 
            href="/"
            className={cn(
                "hover:opacity-80 transition-opacity duration-200",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md",
                className
            )}
            aria-label="AI 이미지 생성기 홈으로 이동"
        >
            <div className="w-20 h-20 flex items-center justify-center">
                <Image
                    src="/logo.webp"
                    alt="AI 이미지 생성기"
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                    priority
                />
            </div>
        </Link>
    )
} 