'use client'

import { cn } from '@/lib/utils'
import Logo from './Logo'
import Navigation from './Navigation'
import MobileMenu from './MobileMenu'

interface IHeaderProps {
    className?: string;
}

export default function Header({ className }: IHeaderProps) {
    return (
        <header 
            className={cn(
                "bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50",
                className
            )}
        >
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* 로고 섹션 */}
                    <div className="flex items-center">
                        <Logo />
                    </div>

                    {/* 데스크톱 네비게이션 */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Navigation />
                    </div>

                    {/* 모바일 메뉴 */}
                    <MobileMenu />
                </div>
            </div>
        </header>
    )
} 