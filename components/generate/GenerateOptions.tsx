'use client'

import { IGenerateOptionsProps, ASPECT_RATIOS, OUTPUT_FORMATS, MEGAPIXELS } from '@/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'

export function GenerateOptions({ options, onChange }: IGenerateOptionsProps) {
    const handleOptionChange = (key: keyof typeof options, value: any) => {
        onChange({
            ...options,
            [key]: value
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>생성 설정</CardTitle>
                <CardDescription>
                    이미지 생성을 위한 세부 옵션을 설정하세요
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* 종횡비 */}
                <div className="space-y-2">
                    <label htmlFor="aspect-ratio" className="text-sm font-medium">종횡비</label>
                    <Select
                        value={options.aspect_ratio}
                        onValueChange={(value) => handleOptionChange('aspect_ratio', value)}
                    >
                        <SelectTrigger id="aspect-ratio">
                            <SelectValue placeholder="종횡비를 선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                            {ASPECT_RATIOS.map((ratio) => (
                                <SelectItem key={ratio} value={ratio}>
                                    {ratio}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* 메가픽셀 */}
                <div className="space-y-2">
                    <label htmlFor="megapixels" className="text-sm font-medium">해상도</label>
                    <Select
                        value={options.megapixels}
                        onValueChange={(value) => handleOptionChange('megapixels', value)}
                    >
                        <SelectTrigger id="megapixels">
                            <SelectValue placeholder="해상도를 선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                            {MEGAPIXELS.map((pixel) => (
                                <SelectItem key={pixel} value={pixel}>
                                    {pixel === '1' ? '1MP (고화질)' : '0.25MP (빠른 생성)'}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* 출력 형식 */}
                <div className="space-y-2">
                    <label htmlFor="output-format" className="text-sm font-medium">출력 형식</label>
                    <Select
                        value={options.output_format}
                        onValueChange={(value) => handleOptionChange('output_format', value)}
                    >
                        <SelectTrigger id="output-format">
                            <SelectValue placeholder="출력 형식을 선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                            {OUTPUT_FORMATS.map((format) => (
                                <SelectItem key={format} value={format}>
                                    {format.toUpperCase()}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* 출력 수량 */}
                <div className="space-y-2">
                    <label htmlFor="num-outputs" className="text-sm font-medium">출력 수량: {options.num_outputs}</label>
                    <Slider
                        id="num-outputs"
                        min={1}
                        max={4}
                        step={1}
                        value={[options.num_outputs || 1]}
                        onValueChange={(value) => handleOptionChange('num_outputs', value[0])}
                        className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>1개</span>
                        <span>4개</span>
                    </div>
                </div>

                {/* 품질 설정 */}
                <div className="space-y-2">
                    <label htmlFor="output-quality" className="text-sm font-medium">품질: {options.output_quality}%</label>
                    <Slider
                        id="output-quality"
                        min={0}
                        max={100}
                        step={10}
                        value={[options.output_quality || 80]}
                        onValueChange={(value) => handleOptionChange('output_quality', value[0])}
                        className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>낮음</span>
                        <span>높음</span>
                    </div>
                </div>

                {/* 추론 단계 */}
                <div className="space-y-2">
                    <label htmlFor="inference-steps" className="text-sm font-medium">추론 단계: {options.num_inference_steps}</label>
                    <Slider
                        id="inference-steps"
                        min={1}
                        max={4}
                        step={1}
                        value={[options.num_inference_steps || 4]}
                        onValueChange={(value) => handleOptionChange('num_inference_steps', value[0])}
                        className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>빠름</span>
                        <span>고품질</span>
                    </div>
                </div>

                {/* 시드 값 */}
                <div className="space-y-2">
                    <label htmlFor="seed" className="text-sm font-medium">시드 값 (재현 가능한 생성)</label>
                    <Input
                        id="seed"
                        type="number"
                        placeholder="시드 값을 입력하세요 (선택사항)"
                        value={options.seed || ''}
                        onChange={(e) => handleOptionChange('seed', e.target.value ? parseInt(e.target.value) : undefined)}
                    />
                </div>

                {/* 고급 옵션 */}
                <div className="space-y-4">
                    <h4 className="text-sm font-medium">고급 옵션</h4>
                    
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="go-fast"
                            checked={options.go_fast}
                            onCheckedChange={(checked) => handleOptionChange('go_fast', checked)}
                        />
                        <label htmlFor="go-fast" className="text-sm font-medium">빠른 생성 모드</label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="disable-safety"
                            checked={options.disable_safety_checker}
                            onCheckedChange={(checked) => handleOptionChange('disable_safety_checker', checked)}
                        />
                        <label htmlFor="disable-safety" className="text-sm font-medium">안전 검사 비활성화</label>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
} 