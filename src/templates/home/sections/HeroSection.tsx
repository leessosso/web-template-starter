import { Trans, useTranslation } from 'react-i18next'

export function HeroSection() {
  const { t } = useTranslation()

  return (
    <section className="container-section grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div className="space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1 text-sm text-brand-200">
          {t('hero.badge')}
        </div>
        <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
          <Trans t={t} i18nKey="hero.headline" components={{ span: <span className="text-brand-400" /> }} />
        </h1>
        <p className="text-lg text-slate-400">{t('hero.description')}</p>
        <div className="flex flex-wrap gap-4">
          <a href="#templates" className="btn-primary">
            {t('hero.primaryCta')}
          </a>
          <a href="#workflow" className="btn-secondary">
            {t('hero.secondaryCta')}
          </a>
        </div>
        <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { label: t('hero.stats.templates'), value: t('hero.statValues.templates') },
            { label: t('hero.stats.leadTime'), value: t('hero.statValues.leadTime') },
            { label: t('hero.stats.satisfaction'), value: t('hero.statValues.satisfaction') },
            { label: t('hero.stats.revisions'), value: t('hero.statValues.revisions') },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl bg-white/5 p-4 text-center">
              <dt className="text-sm text-slate-400">{item.label}</dt>
              <dd className="mt-2 text-2xl font-semibold text-white">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="surface-muted p-8">
        <div className="card-surface h-full space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-200">Template Preview</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Agency Landing</h2>
          </div>
          <div className="space-y-4">
            <div className="h-3 w-24 rounded-full bg-brand-400/60" />
            <div className="h-3 w-40 rounded-full bg-white/20" />
            <div className="h-48 rounded-2xl bg-gradient-to-br from-brand-500/20 via-white/10 to-transparent" />
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="aspect-square rounded-xl bg-white/10" />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
            <div>
              <p className="text-sm text-slate-400">커스터마이징 포함</p>
              <p className="text-lg font-semibold text-white">₩450,000부터</p>
            </div>
            <button className="btn-primary">견적 요청</button>
          </div>
        </div>
      </div>
    </section>
  )
}

