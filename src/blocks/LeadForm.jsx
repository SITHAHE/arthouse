import { useState } from 'react'
import Field from '../ui/Field.jsx'
import Button from '../ui/Button.jsx'
import { site } from '../data.js'

// =========================================================================
// LeadForm — заявка на пробное занятие.
//
// Сайт статический, бэкенда нет, поэтому форма собирает текст заявки и
// открывает диалог с сообществом ВК (`contacts.inbox`), а текст кладёт в
// буфер обмена — остаётся вставить и отправить. Телеграм у студии именно
// КАНАЛ, в него писать нельзя, поэтому заявка идёт не туда.
//
// Если понадобится приём заявок без участия человека — заводи serverless
// (Vercel/Netlify function) и меняй submit на fetch к нему. Токен бота
// НИКОГДА не кладём во фронтенд.
// =========================================================================
export default function LeadForm({ title = 'Оставить заявку', note }) {
  const [form, setForm] = useState({ name: '', phone: '', comment: '' })
  const [sent, setSent] = useState(null)   // { msg, copied }
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    const msg =
      `Заявка с сайта ${site.brandFull}\n` +
      `Имя: ${form.name}\n` +
      `Телефон: ${form.phone}` +
      (form.comment ? `\nКомментарий: ${form.comment}` : '')

    let copied = false
    try {
      await navigator.clipboard.writeText(msg)
      copied = true
    } catch { copied = false }

    window.open(site.contacts.inbox, '_blank', 'noopener')
    setSent({ msg, copied })
  }

  if (sent) {
    return (
      <div className="space-y-4">
        <p className="font-display text-lg font-bold uppercase tracking-[-.01em]">
          Открыли диалог со студией
        </p>
        <p className="text-[15px] leading-relaxed text-muted">
          {sent.copied
            ? 'Текст заявки уже скопирован: вставьте его в сообщение и отправьте. Ответим и подберём группу и время.'
            : 'Скопируйте текст заявки и отправьте его в сообщении:'}
        </p>
        <pre className="whitespace-pre-wrap border border-line bg-bg/60 p-4 text-[13px] leading-relaxed text-fg/90">
          {sent.msg}
        </pre>
        <p className="text-[15px] text-muted">
          Или просто позвоните:{' '}
          <a href={site.contacts.phoneHref} className="nums font-semibold text-accent">
            {site.contacts.phone}
          </a>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {title && (
        <p className="font-display text-lg font-bold uppercase tracking-[-.01em]">{title}</p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="lf-name" label="Как вас зовут" required value={form.name} onChange={set('name')} placeholder="Например, Ольга" />
        <Field id="lf-phone" label="Телефон" type="tel" required value={form.phone} onChange={set('phone')} placeholder="+7 ___ ___-__-__" />
      </div>
      <Field
        id="lf-comment"
        label="Возраст ребёнка и удобный зал"
        multiline
        value={form.comment}
        onChange={set('comment')}
        placeholder="Например: 7 лет, удобнее «Меркурий»"
      />
      <Button type="submit" size="lg" className="w-full uppercase tracking-[.06em] sm:w-auto">
        Записаться на пробное
      </Button>
      {note && <p className="text-xs text-muted">{note}</p>}
    </form>
  )
}
