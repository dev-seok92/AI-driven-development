import { GenerateImageForm } from '@/components/generate/GenerateImageForm'
import { Card } from '@/components/ui/card'
import { Suspense } from 'react'

function GenerateImageFormSkeleton() {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="h-10 bg-gray-200 rounded"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                </div>
            </div>
            <div className="h-10 bg-gray-200 rounded"></div>
        </div>
    )
}

export default function GeneratePage() {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8">이미지 생성</h1>
            <Card className="p-6">
                <Suspense fallback={<GenerateImageFormSkeleton />}>
                    <GenerateImageForm />
                </Suspense>
            </Card>
        </div>
    )
}
