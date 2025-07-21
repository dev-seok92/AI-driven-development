'use client'

import { cn } from '@/lib/utils'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
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

                    {/* 데스크톱 네비게이션 및 인증 */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Navigation />
                        
                        {/* 인증 섹션 */}
                        <div className="flex items-center gap-3">
                            <SignedOut>
                                <SignInButton mode="modal">
                                    <Button variant="ghost" size="sm">
                                        로그인
                                    </Button>
                                </SignInButton>
                                <SignUpButton mode="modal">
                                    <Button size="sm">
                                        회원가입
                                    </Button>
                                </SignUpButton>
                            </SignedOut>
                            <SignedIn>
                                <UserButton 
                                    appearance={{
                                        elements: {
                                            avatarBox: "w-8 h-8"
                                        }
                                    }}
                                />
                            </SignedIn>
                        </div>
                    </div>

                    {/* 모바일 메뉴 */}
                    <MobileMenu />
                </div>
            </div>
        </header>
    )
} 