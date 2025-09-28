import { Trans, useTranslation } from 'react-i18next'
import { ThemeSelector, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Button } from '../../../components/ui'

export function HeroSection() {
  const { t } = useTranslation()

  return (
    <section className="container-section grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div className="space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-sm text-primary">
          {t('hero.badge')}
        </div>
        <h1 className="text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
          <Trans t={t} i18nKey="hero.headline" components={{ span: <span className="text-primary" /> }} />
        </h1>
        <p className="text-lg text-muted-foreground">{t('hero.description')}</p>
        <div className="flex flex-wrap gap-4">
          <a href="#templates" className="btn-primary">
            {t('hero.primaryCta')}
          </a>
          <a href="#workflow" className="btn-secondary">
            {t('hero.secondaryCta')}
          </a>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Shadcn/ui 테스트</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Shadcn/ui Dialog 테스트</DialogTitle>
                <DialogDescription>
                  Shadcn/ui 컴포넌트들이 정상적으로 작동하고 있어요! 🎉
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { label: t('hero.stats.templates'), value: t('hero.statValues.templates') },
            { label: t('hero.stats.leadTime'), value: t('hero.statValues.leadTime') },
            { label: t('hero.stats.satisfaction'), value: t('hero.statValues.satisfaction') },
            { label: t('hero.stats.revisions'), value: t('hero.statValues.revisions') },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl bg-muted/50 p-4 text-center">
              <dt className="text-sm text-muted-foreground">{item.label}</dt>
              <dd className="mt-2 text-2xl font-semibold text-foreground">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="surface-muted p-8">
        <div className="card-surface h-full space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Template Preview</p>
            <h2 className="mt-2 text-2xl font-semibold text-foreground">Agency Landing</h2>
          </div>
          <div className="space-y-4">
            <div className="h-3 w-24 rounded-full bg-primary/60" />
            <div className="h-3 w-40 rounded-full bg-muted/50" />
            <div className="h-48 rounded-2xl bg-gradient-to-br from-primary/20 via-muted/30 to-transparent" />
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="aspect-square rounded-xl bg-muted/30" />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-border bg-muted/30 p-4">
            <div>
              <p className="text-sm text-muted-foreground">커스터마이징 포함</p>
              <p className="text-lg font-semibold text-foreground">₩450,000부터</p>
            </div>
            <button className="btn-primary">견적 요청</button>
          </div>
          {/* Theme Selector Demo */}
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-3">🎨 실시간 테마 변경</p>
            <ThemeSelector />
          </div>
        </div>
      </div>
    </section>
  )
}

