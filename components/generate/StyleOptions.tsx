import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { IStyleOptions, IStyleOptionsProps, ART_STYLES, COLOR_TONES } from '@/types'

export function StyleOptions({ options, onChange }: IStyleOptionsProps) {
    const handleChange = (key: keyof IStyleOptions, value: string) => {
        onChange({ ...options, [key]: value as IStyleOptions[keyof IStyleOptions] })
    }

    const artStyleOptions = [
        { value: '디지털아트', label: '디지털아트', description: '고해상도, 세밀한 디지털 아트' },
        { value: '수채화', label: '수채화', description: '부드러운 붓터치의 수채화' },
        { value: '유화', label: '유화', description: '텍스처가 있는 유화 스타일' },
        { value: '펜화', label: '펜화', description: '세밀한 선화와 펜 드로잉' },
        { value: '연필화', label: '연필화', description: '음영이 있는 연필 스케치' }
    ]

    const colorToneOptions = [
        { value: '밝은', label: '밝은', description: '밝고 생동감 있는 색조' },
        { value: '어두운', label: '어두운', description: '어둡고 무디한 색조' },
        { value: '파스텔', label: '파스텔', description: '부드러운 파스텔 색조' },
        { value: '흑백', label: '흑백', description: '모노크롬 흑백' },
        { value: '컬러풀', label: '컬러풀', description: '다채롭고 선명한 색상' }
    ]

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium">스타일 옵션</h3>

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
                                    <div className="flex flex-col">
                                        <span className="font-medium">{style.label}</span>
                                        <span className="text-xs text-muted-foreground">
                                            {style.description}
                                        </span>
                                    </div>
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
                                    <div className="flex flex-col">
                                        <span className="font-medium">{tone.label}</span>
                                        <span className="text-xs text-muted-foreground">
                                            {tone.description}
                                        </span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* 선택된 스타일 미리보기 */}
            <div className="p-3 bg-muted rounded-lg">
                <h4 className="text-sm font-medium mb-2">선택된 스타일</h4>
                <div className="text-sm text-muted-foreground">
                    <span className="font-medium">예술 스타일:</span> {options.artStyle} • 
                    <span className="font-medium"> 색조:</span> {options.colorTone}
                </div>
            </div>
        </div>
    )
}
