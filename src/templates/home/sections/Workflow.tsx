import { useTranslation } from 'react-i18next'

export function Workflow() {
  const { t } = useTranslation()

  const steps = t('workflow.steps', { returnObjects: true }) as Array<{
    title: string
    description: string
    duration: string
  }>

  return (
    <section id="workflow" className="container-section space-y-12">
      <div className="max-w-2xl space-y-4">
        <h2 className="text-3xl font-semibold text-white">{t('workflow.title')}</h2>
        <p className="text-base text-slate-400">{t('workflow.description')}</p>
      </div>
      <ol className="grid gap-6 lg:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.title} className="card-surface space-y-4 border-brand-500/20">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 text-lg font-semibold text-white">
              {index + 1}
            </span>
            <h3 className="text-xl font-semibold text-white">{step.title}</h3>
            <p className="text-sm text-slate-400">{step.description}</p>
            <div className="rounded-full border border-brand-400/30 bg-brand-500/10 px-4 py-2 text-xs uppercase tracking-widest text-brand-200">
              리드타임 {step.duration}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

