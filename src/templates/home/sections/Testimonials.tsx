import { useTranslation } from 'react-i18next'

export function Testimonials() {
  const { t } = useTranslation()

  const testimonials = t('testimonials.items', { returnObjects: true }) as Array<{
    name: string
    role: string
    quote: string
  }>

  return (
    <section className="container-section space-y-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-semibold text-white">{t('testimonials.title')}</h2>
        <p className="max-w-2xl text-base text-slate-400">{t('testimonials.subtitle')}</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {testimonials.map((item) => (
          <blockquote key={item.name} className="card-surface space-y-4">
            <p className="text-sm text-slate-300">“{item.quote}”</p>
            <div className="text-sm">
              <div className="font-semibold text-white">{item.name}</div>
              <div className="text-slate-400">{item.role}</div>
            </div>
          </blockquote>
        ))}
      </div>
    </section>
  )
}

