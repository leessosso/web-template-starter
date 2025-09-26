import { useTranslation } from 'react-i18next'

const footerLinks = [
  {
    titleKey: 'footer.sections.templates',
    links: [
      { labelKey: 'navigation.home', href: '/' },
      { labelKey: 'navigation.service', href: '/service' },
      { labelKey: 'navigation.product', href: '/product' },
      { labelKey: 'navigation.portfolio', href: '/portfolio' },
    ],
  },
  {
    titleKey: 'footer.sections.resources',
    links: [
      { labelKey: 'footer.links.designSystem', href: '#' },
      { labelKey: 'footer.links.docs', href: '#' },
      { labelKey: 'footer.links.library', href: '#' },
    ],
  },
  {
    titleKey: 'footer.sections.company',
    links: [
      { labelKey: 'footer.links.about', href: '#' },
      { labelKey: 'footer.links.blog', href: '#' },
      { labelKey: 'footer.links.careers', href: '#' },
    ],
  },
]

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-white/5 bg-slate-950/90">
      <div className="container-section flex flex-col gap-12 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm space-y-4">
          <h2 className="text-xl font-semibold text-white">WebTemplateStudio</h2>
          <p className="text-sm text-slate-400">
            {t('footer.description')}
          </p>
        </div>
        <div className="grid flex-1 grid-cols-1 gap-8 sm:grid-cols-3">
          {footerLinks.map((section) => (
            <div key={section.titleKey} className="space-y-4">
              <h3 className="text-sm font-semibold tracking-wide text-slate-200">
                {t(section.titleKey)}
              </h3>
              <ul className="space-y-3 text-sm text-slate-400">
                {section.links.map((link) => (
                  <li key={link.labelKey}>
                    <a href={link.href} className="transition hover:text-white">
                      {t(link.labelKey)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-xs text-slate-500">
        {t('footer.copyright', { year: new Date().getFullYear() })}
      </div>
    </footer>
  )
}

