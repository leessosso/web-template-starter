import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Alert } from '@/components/ui/Alert'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/Input'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { ThemeSelector } from '@/components/ui/ThemeSelector'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export function ComponentsPage() {
  const { t } = useTranslation()
  const [sliderValue, setSliderValue] = useState([50])
  const [switchChecked, setSwitchChecked] = useState(false)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('components.title', 'UI 컴포넌트 라이브러리')}</h1>
        <p className="text-muted-foreground">
          {t('components.description', '프로젝트에서 사용되는 공통 UI 컴포넌트들을 확인하고 테스트할 수 있습니다.')}
        </p>
      </div>

      <Tabs defaultValue="buttons" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="buttons">{t('components.tabs.buttons', '버튼')}</TabsTrigger>
          <TabsTrigger value="forms">{t('components.tabs.forms', '폼')}</TabsTrigger>
          <TabsTrigger value="data-display">{t('components.tabs.dataDisplay', '데이터 표시')}</TabsTrigger>
          <TabsTrigger value="feedback">{t('components.tabs.feedback', '피드백')}</TabsTrigger>
        </TabsList>

        <TabsContent value="buttons" className="space-y-8">
          <Card>
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-2">{t('components.buttons.title', '버튼 컴포넌트')}</h3>
              <p className="text-muted-foreground">
                {t('components.buttons.description', '다양한 스타일의 버튼 컴포넌트들입니다.')}
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button variant="default">{t('components.buttons.default', '기본 버튼')}</Button>
                <Button variant="secondary">{t('components.buttons.secondary', '보조 버튼')}</Button>
                <Button variant="outline">{t('components.buttons.outline', '외곽선 버튼')}</Button>
                <Button variant="ghost">{t('components.buttons.ghost', '고스트 버튼')}</Button>
                <Button variant="destructive">{t('components.buttons.destructive', '삭제 버튼')}</Button>
                <Button disabled>{t('components.buttons.disabled', '비활성화')}</Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button size="sm">{t('components.buttons.small', '작은 버튼')}</Button>
                <Button size="default">{t('components.buttons.defaultSize', '기본 크기')}</Button>
                <Button size="lg">{t('components.buttons.large', '큰 버튼')}</Button>
              </div>
            </div>
          </Card>

          <Card>
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-2">{t('components.badges.title', '뱃지 컴포넌트')}</h3>
              <p className="text-muted-foreground">
                {t('components.badges.description', '상태나 카테고리를 표시하는 뱃지입니다.')}
              </p>
            </div>
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge>{t('components.badges.default', '기본')}</Badge>
                <Badge variant="secondary">{t('components.badges.secondary', '보조')}</Badge>
                <Badge variant="destructive">{t('components.badges.destructive', '주의')}</Badge>
                <Badge variant="outline">{t('components.badges.outline', '외곽선')}</Badge>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="forms" className="space-y-8">
          <Card>
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-2">{t('components.forms.title', '폼 컴포넌트')}</h3>
              <p className="text-muted-foreground">
                {t('components.forms.description', '사용자 입력을 위한 폼 컴포넌트들입니다.')}
              </p>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('components.forms.input', '입력 필드')}</label>
                  <Input placeholder={t('components.forms.inputPlaceholder', '텍스트를 입력하세요')} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('components.forms.textarea', '텍스트 영역')}</label>
                  <Textarea placeholder={t('components.forms.textareaPlaceholder', '긴 텍스트를 입력하세요')} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('components.forms.select', '선택')}</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={t('components.forms.selectPlaceholder', '선택하세요')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">{t('components.forms.option1', '옵션 1')}</SelectItem>
                      <SelectItem value="option2">{t('components.forms.option2', '옵션 2')}</SelectItem>
                      <SelectItem value="option3">{t('components.forms.option3', '옵션 3')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('components.forms.checkbox', '체크박스')}</label>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="checkbox1" />
                    <label htmlFor="checkbox1" className="text-sm">{t('components.forms.checkboxLabel', '동의합니다')}</label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('components.forms.switch', '스위치')}</label>
                  <div className="flex items-center space-x-2">
                    <Switch checked={switchChecked} onCheckedChange={setSwitchChecked} />
                    <label className="text-sm">{switchChecked ? t('components.forms.on', '켜짐') : t('components.forms.off', '꺼짐')}</label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t('components.forms.slider', '슬라이더')}</label>
                <Slider value={sliderValue} onValueChange={setSliderValue} max={100} step={1} className="w-full" />
                <p className="text-sm text-muted-foreground">{t('components.forms.sliderValue', '값')}: {sliderValue[0]}</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="data-display" className="space-y-8">
          <Card>
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-2">{t('components.dataDisplay.title', '데이터 표시 컴포넌트')}</h3>
              <p className="text-muted-foreground">
                {t('components.dataDisplay.description', '데이터를 표시하기 위한 컴포넌트들입니다.')}
              </p>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium mb-4">{t('components.dataDisplay.avatar', '아바타')}</h4>
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-4">{t('components.dataDisplay.progress', '진행률')}</h4>
                  <div className="space-y-2">
                    <Progress value={75} className="w-full" />
                    <p className="text-sm text-muted-foreground">75%</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-4">{t('components.dataDisplay.table', '테이블')}</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('components.dataDisplay.name', '이름')}</TableHead>
                      <TableHead>{t('components.dataDisplay.email', '이메일')}</TableHead>
                      <TableHead>{t('components.dataDisplay.role', '역할')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>김철수</TableCell>
                      <TableCell>chulsoo@example.com</TableCell>
                      <TableCell>개발자</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>이영희</TableCell>
                      <TableCell>younghee@example.com</TableCell>
                      <TableCell>디자이너</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-4">{t('components.dataDisplay.accordion', '아코디언')}</h4>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>{t('components.dataDisplay.accordionItem1', '첫 번째 항목')}</AccordionTrigger>
                    <AccordionContent>
                      {t('components.dataDisplay.accordionContent1', '이것은 첫 번째 아코디언 항목의 내용입니다.')}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>{t('components.dataDisplay.accordionItem2', '두 번째 항목')}</AccordionTrigger>
                    <AccordionContent>
                      {t('components.dataDisplay.accordionContent2', '이것은 두 번째 아코디언 항목의 내용입니다.')}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-4">{t('components.dataDisplay.tabs', '탭')}</h4>
                <Tabs defaultValue="tab1" className="w-full">
                  <TabsList>
                    <TabsTrigger value="tab1">{t('components.dataDisplay.tab1', '탭 1')}</TabsTrigger>
                    <TabsTrigger value="tab2">{t('components.dataDisplay.tab2', '탭 2')}</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tab1">
                    <p>{t('components.dataDisplay.tab1Content', '첫 번째 탭의 내용입니다.')}</p>
                  </TabsContent>
                  <TabsContent value="tab2">
                    <p>{t('components.dataDisplay.tab2Content', '두 번째 탭의 내용입니다.')}</p>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-8">
          <Card>
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-2">{t('components.feedback.title', '피드백 컴포넌트')}</h3>
              <p className="text-muted-foreground">
                {t('components.feedback.description', '사용자에게 피드백을 제공하는 컴포넌트들입니다.')}
              </p>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-4">{t('components.feedback.alert', '알림')}</h4>
                <div className="space-y-4">
                  <Alert
                    title={t('components.feedback.alertTitle', '알림 제목')}
                    type="info"
                  >
                    {t('components.feedback.alertDescription', '이것은 기본 알림 메시지입니다.')}
                  </Alert>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-4">{t('components.feedback.skeleton', '스켈레톤')}</h4>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-4">{t('components.feedback.dialog', '다이얼로그')}</h4>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>{t('components.feedback.openDialog', '다이얼로그 열기')}</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t('components.feedback.dialogTitle', '다이얼로그 제목')}</DialogTitle>
                      <DialogDescription>
                        {t('components.feedback.dialogDescription', '다이얼로그의 설명입니다.')}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p>{t('components.feedback.dialogContent', '다이얼로그 내용입니다.')}</p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-4">{t('components.feedback.tooltip', '툴팁')}</h4>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">{t('components.feedback.tooltipTrigger', '호버해보세요')}</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t('components.feedback.tooltipContent', '이것은 툴팁입니다!')}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-4">{t('components.feedback.themeSelector', '테마 선택기')}</h4>
                <ThemeSelector />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
