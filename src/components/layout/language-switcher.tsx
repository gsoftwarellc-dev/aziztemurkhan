import { useTranslation } from 'react-i18next'
import { Check, Globe } from 'lucide-react'
import { DropdownMenu } from 'radix-ui'
import { supportedLanguages } from '@/i18n'
import { cn } from '@/lib/utils'

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation()
  const active = i18n.resolvedLanguage ?? 'id'
  const current = supportedLanguages.find((entry) => entry.code === active)

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        aria-label={t('nav.language')}
        className="inline-flex h-9 items-center gap-1.5 rounded-full px-2.5 text-sm font-medium text-ink transition-colors hover:bg-mono-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        <Globe className="size-4" />
        <span className="tabular-nums">{current?.short ?? 'ID'}</span>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="z-50 min-w-48 rounded-xl border border-mono-200 bg-surface p-1 shadow-[var(--shadow-hover)] data-[state=open]:animate-[fade-in_140ms_ease]"
        >
          {supportedLanguages.map((language) => (
            <DropdownMenu.Item
              key={language.code}
              onSelect={() => void i18n.changeLanguage(language.code)}
              className={cn(
                'flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm text-ink outline-none transition-colors',
                'data-[highlighted]:bg-mono-100',
              )}
            >
              {language.label}
              {language.code === active && <Check className="size-4" />}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
