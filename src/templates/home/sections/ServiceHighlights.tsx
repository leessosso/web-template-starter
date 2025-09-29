import { useTranslation } from 'react-i18next'

export function ServiceHighlights() {
  const { t } = useTranslation()

  const highlights = [
    {
      title: t('highlights.responsive.title'),
      description: t('highlights.responsive.description'),
      points: t('highlights.responsive.points', { returnObjects: true }) as string[],
    },
    {
      title: t('highlights.branding.title'),
      description: t('highlights.branding.description'),
      points: t('highlights.branding.points', { returnObjects: true }) as string[],
    },
    {
      title: t('highlights.templates.title'),
      description: t('highlights.templates.description'),
      points: t('highlights.templates.points', { returnObjects: true }) as string[],
    },
  ]

  return (
    <section id="templates" className="space-y-10">
      <div className="container-section flex flex-col gap-4">
        <h2 className="text-3xl font-semibold text-foreground">{t('highlights.title')}</h2>
        <p className="max-w-2xl text-base text-muted-foreground">{t('highlights.subtitle')}</p>
      </div>
      <div className="container-section grid gap-6 lg:grid-cols-3">
        {highlights.map((item) => (
          <article key={item.title} className="card-surface space-y-5">
            <div>
              <h3 className="text-xl font-semibold text-card-foreground">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {item.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

