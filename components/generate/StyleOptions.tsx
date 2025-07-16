import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { 
    IStyleOptions, 
    IStyleOptionsProps, 
    ART_STYLES, 
    COLOR_TONES, 
    LOGO_STYLES, 
    LOGO_COLOR_TONES 
} from '@/types'

export function StyleOptions({ options, onChange }: IStyleOptionsProps) {
    const handleChange = (key: keyof IStyleOptions, value: string) => {
        onChange({ ...options, [key]: value as IStyleOptions[keyof IStyleOptions] })
    }

    const handleModeChange = (mode: 'general' | 'logo') => {
        const newOptions = { ...options, generationMode: mode }
        
        // 로고 모드로 전환 시 기본값 설정
        if (mode === 'logo') {
            newOptions.logoStyle = newOptions.logoStyle || '미니멀'
            newOptions.logoColorTone = newOptions.logoColorTone || '단색'
        }
        
        onChange(newOptions)
    }

    const artStyleOptions = [
        { value: '디지털아트', label: '디지털아트' },
        { value: '수채화', label: '수채화' },
        { value: '유화', label: '유화' },
        { value: '펜화', label: '펜화' },
        { value: '연필화', label: '연필화' }
    ]

    const colorToneOptions = [
        { value: '밝은', label: '밝은' },
        { value: '어두운', label: '어두운' },
        { value: '파스텔', label: '파스텔' },
        { value: '흑백', label: '흑백' },
        { value: '컬러풀', label: '컬러풀' }
    ]

    const logoStyleOptions = [
        { value: '미니멀', label: '미니멀' },
        { value: '모던', label: '모던' },
        { value: '클래식', label: '클래식' },
        { value: '빈티지', label: '빈티지' },
        { value: '기업형', label: '기업형' },
        { value: '창조적', label: '창조적' },
        { value: '대담한', label: '대담한' },
        { value: '우아한', label: '우아한' }
    ]

    const logoColorToneOptions = [
        { value: '단색', label: '단색' },
        { value: '그라데이션', label: '그라데이션' },
        { value: '네온', label: '네온' },
        { value: '메탈릭', label: '메탈릭' },
        { value: '투명배경', label: '투명배경' }
    ]

    return (
        <div className="space-y-4">
            <div className="flex flex-col space-y-2">
                <h3 className="text-lg font-medium">스타일 옵션</h3>
                
                {/* 생성 모드 토글 */}
                <div className="flex space-x-2">
                    <Button
                        variant={options.generationMode === 'general' ? 'default' : 'outline'}
                        onClick={() => handleModeChange('general')}
                        className="flex-1"
                    >
                        일반 이미지
                    </Button>
                    <Button
                        variant={options.generationMode === 'logo' ? 'default' : 'outline'}
                        onClick={() => handleModeChange('logo')}
                        className="flex-1"
                    >
                        로고 생성
                    </Button>
                </div>
            </div>

            {options.generationMode === 'general' ? (
                /* 일반 이미지 생성 옵션 */
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">예술 스타일</label>
                        <Select
                            value={options.artStyle}
                            onValueChange={value => handleChange('artStyle', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="예술 스타일을 선택하세요" />
                            </SelectTrigger>
                            <SelectContent>
                                {artStyleOptions.map(style => (
                                    <SelectItem key={style.value} value={style.value}>
                                        {style.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">색조</label>
                        <Select
                            value={options.colorTone}
                            onValueChange={value => handleChange('colorTone', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="색조를 선택하세요" />
                            </SelectTrigger>
                            <SelectContent>
                                {colorToneOptions.map(tone => (
                                    <SelectItem key={tone.value} value={tone.value}>
                                        {tone.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            ) : (
                /* 로고 생성 옵션 */
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">로고 스타일</label>
                        <Select
                            value={options.logoStyle || '미니멀'}
                            onValueChange={value => handleChange('logoStyle', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="로고 스타일을 선택하세요" />
                            </SelectTrigger>
                            <SelectContent>
                                {logoStyleOptions.map(style => (
                                    <SelectItem key={style.value} value={style.value}>
                                        {style.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">로고 색조</label>
                        <Select
                            value={options.logoColorTone || '단색'}
                            onValueChange={value => handleChange('logoColorTone', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="로고 색조를 선택하세요" />
                            </SelectTrigger>
                            <SelectContent>
                                {logoColorToneOptions.map(tone => (
                                    <SelectItem key={tone.value} value={tone.value}>
                                        {tone.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            )}

            {/* 선택된 스타일 미리보기 */}
            <div className="p-3 bg-muted rounded-lg">
                <h4 className="text-sm font-medium mb-2">선택된 스타일</h4>
                <div className="text-sm text-muted-foreground">
                    {options.generationMode === 'general' ? (
                        <>
                            <span className="font-medium">예술 스타일:</span> {options.artStyle} • 
                            <span className="font-medium"> 색조:</span> {options.colorTone}
                        </>
                    ) : (
                        <>
                            <span className="font-medium">로고 스타일:</span> {options.logoStyle} • 
                            <span className="font-medium"> 색조:</span> {options.logoColorTone}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
