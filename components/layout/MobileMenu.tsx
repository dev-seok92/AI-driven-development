'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import Navigation from './Navigation'

interface IMobileMenuProps {
    className?: string;
}

export default function MobileMenu({ className }: IMobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const closeMenu = () => {
        setIsOpen(false)
    }

    // 외부 클릭 시 메뉴 닫기
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement
            if (isOpen && !target.closest('[data-mobile-menu]')) {
                closeMenu()
            }
        }

        if (isOpen) {
            document.addEventListener('click', handleOutsideClick)
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick)
        }
    }, [isOpen])

    // ESC 키로 메뉴 닫기
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                closeMenu()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscKey)
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey)
        }
    }, [isOpen])

    return (
        <div className={cn("md:hidden", className)} data-mobile-menu>
            <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                className="text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
                aria-expanded={isOpen}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>

            {/* 드롭다운 메뉴 */}
            <div
                className={cn(
                    "absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50",
                    "transition-all duration-300 ease-in-out",
                    isOpen
                        ? "opacity-100 transform translate-y-0"
                        : "opacity-0 transform -translate-y-2 pointer-events-none"
                )}
            >
                <div className="px-4 py-4 space-y-4">
                    {/* 네비게이션 메뉴 */}
                    <Navigation
                        className="flex-col gap-2"
                        onItemClick={closeMenu}
                    />
                    
                    {/* 인증 섹션 */}
                    <div className="border-t pt-4">
                        <SignedOut>
                            <div className="flex flex-col gap-2">
                                <SignInButton mode="modal">
                                    <Button variant="ghost" size="sm" className="justify-start w-full">
                                        로그인
                                    </Button>
                                </SignInButton>
                                <SignUpButton mode="modal">
                                    <Button size="sm" className="justify-start w-full">
                                        회원가입
                                    </Button>
                                </SignUpButton>
                            </div>
                        </SignedOut>
                        <SignedIn>
                            <div className="flex items-center gap-3">
                                <UserButton 
                                    appearance={{
                                        elements: {
                                            avatarBox: "w-8 h-8"
                                        }
                                    }}
                                />
                                <span className="text-sm text-gray-600">내 계정</span>
                            </div>
                        </SignedIn>
                    </div>
                </div>
            </div>
        </div>
    )
} 