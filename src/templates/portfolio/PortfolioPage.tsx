import { useTranslation } from 'react-i18next'

export function PortfolioPage() {
  const { t } = useTranslation()

  return (
    <div className="space-y-16">
      <section className="container-section space-y-6">
        <h1 className="text-4xl font-semibold text-foreground">{t('portfolio.title')}</h1>
        <p className="max-w-3xl text-base text-muted-foreground">{t('portfolio.description')}</p>
      </section>
      <section className="container-section grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="card-surface space-y-6">
          <h2 className="text-2xl font-semibold text-card-foreground">{t('portfolio.sections.title')}</h2>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {(t('portfolio.sections.items', { returnObjects: true }) as string[]).map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
        <div className="card-surface space-y-4">
          <h3 className="text-xl font-semibold text-card-foreground">{t('portfolio.recommendations.title')}</h3>
          <p className="text-sm text-muted-foreground">{t('portfolio.recommendations.description')}</p>
        </div>
      </section>
    </div>
  )
}

