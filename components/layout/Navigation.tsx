'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUser, SignUpButton } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Palette, Images } from 'lucide-react'

interface INavItem {
    id: string;
    label: string;
    href: string;
}

interface INavigationProps {
    className?: string;
    onItemClick?: () => void;
}

const navItems: INavItem[] = [
    {
        id: 'generate',
        label: '생성하기',
        href: '/generate'
    },
    {
        id: 'gallery',
        label: '갤러리',
        href: '/gallery'
    }
]

export default function Navigation({ className, onItemClick }: INavigationProps) {
    const pathname = usePathname()
    const { isSignedIn, isLoaded } = useUser()

    // 로딩 중일 때는 기본 버튼만 표시
    if (!isLoaded) {
        return (
            <nav 
                className={cn("flex items-center gap-4", className)}
                aria-label="메인 네비게이션"
            >
                {navItems.map((item) => {
                    const IconComponent = item.id === 'generate' ? Palette : Images
                    
                    return (
                        <Button 
                            key={item.id}
                            variant="ghost" 
                            size="sm" 
                            disabled
                            className="gap-2 transition-colors duration-200 text-gray-700"
                        >
                            <IconComponent className="h-4 w-4" />
                            {item.label}
                        </Button>
                    )
                })}
            </nav>
        )
    }

    return (
        <nav 
            className={cn("flex items-center gap-4", className)}
            aria-label="메인 네비게이션"
        >
            {navItems.map((item) => {
                const isActive = pathname === item.href
                const IconComponent = item.id === 'generate' ? Palette : Images
                
                // 로그인된 사용자는 일반 링크
                if (isSignedIn) {
                    return (
                        <Link
                            key={item.id}
                            href={item.href}
                            onClick={onItemClick}
                        >
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                className={cn(
                                    "gap-2 transition-colors duration-200",
                                    isActive 
                                        ? "text-blue-600 bg-blue-50" 
                                        : "text-gray-700 hover:text-blue-600"
                                )}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                <IconComponent className="h-4 w-4" />
                                {item.label}
                            </Button>
                        </Link>
                    )
                }
                
                // 비로그인 사용자는 회원가입 모달
                return (
                    <SignUpButton 
                        key={item.id}
                        mode="modal"
                        forceRedirectUrl={item.href}
                    >
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            className="gap-2 transition-colors duration-200 text-gray-700 hover:text-blue-600"
                            onClick={onItemClick}
                        >
                            <IconComponent className="h-4 w-4" />
                            {item.label}
                        </Button>
                    </SignUpButton>
                )
            })}
        </nav>
    )
} 