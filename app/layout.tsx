import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
    display: 'swap'
})
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
    display: 'swap'
})

export const metadata: Metadata = {
    title: {
        default: 'AI 이미지 생성기',
        template: '%s | AI 이미지 생성기'
    },
    description: 'AI 기술을 활용한 이미지 생성 서비스. 프롬프트를 입력하여 다양한 스타일의 이미지를 생성하고 갤러리에서 관리하세요.',
    keywords: ['AI', '이미지 생성', '프롬프트', '갤러리', '디지털아트'],
    authors: [{ name: 'AI 이미지 생성기' }],
    creator: 'AI 이미지 생성기',
    publisher: 'AI 이미지 생성기',
    openGraph: {
        title: 'AI 이미지 생성기',
        description: 'AI 기술을 활용한 이미지 생성 서비스',
        type: 'website',
        locale: 'ko_KR',
        siteName: 'AI 이미지 생성기'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AI 이미지 생성기',
        description: 'AI 기술을 활용한 이미지 생성 서비스'
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1
        }
    },
    verification: {
        // Google Search Console 등의 검증 코드가 있다면 추가
    }
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="ko">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background font-sans`}
            >
                <div className="relative flex min-h-screen flex-col">
                    <main className="flex-1">{children}</main>
                </div>
                <Toaster />
            </body>
        </html>
    )
}
