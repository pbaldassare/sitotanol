'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { ArrowRight, CircleCheck, CircleAlert } from 'lucide-react';
import { sendContact, type ContactState } from '@/app/actions/contact';
import type { Dict } from '@/content/it';

type Field = 'name' | 'email' | 'company' | 'message';

export default function ContactForm({ f, lang, privacyHref, software }: { f: Dict['contactPage']['form']; lang: string; privacyHref: string; software?: string }) {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, { status: 'idle' });

  if (state.status === 'ok')
    return <p className="form-done" role="status"><CircleCheck aria-hidden size={22} /> {f.success}</p>;

  const err = (k: keyof NonNullable<ContactState['errors']>) => state.errors?.[k] && f[state.errors[k]!];
  const input = (k: Field, type = 'text', auto?: string) => (
    <div className="field">
      <label htmlFor={k}>{f[k]}{k !== 'company' && <span aria-hidden> *</span>}</label>
      {k === 'message' ? (
        <textarea id={k} name={k} rows={5} defaultValue={state.values?.[k]} required aria-invalid={!!err(k)} aria-describedby={err(k) ? `${k}-err` : undefined} />
      ) : (
        <input id={k} name={k} type={type} defaultValue={state.values?.[k]} autoComplete={auto} required={k !== 'company'} aria-invalid={k !== 'company' && !!err(k)} aria-describedby={k !== 'company' && err(k) ? `${k}-err` : undefined} />
      )}
      {k !== 'company' && err(k) && <p id={`${k}-err`} className="field-err">{err(k)}</p>}
    </div>
  );

  return (
    <form key={JSON.stringify(state.values ?? {})} action={action} className="form" noValidate>
      <input type="hidden" name="lang" value={lang} />
      {software && <input type="hidden" name="software" value={software} />}
      <div className="hp" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="field-row">
        {input('name', 'text', 'name')}
        {input('email', 'email', 'email')}
      </div>
      {input('company', 'text', 'organization')}
      {input('message')}
      <div className="field">
        <label className="consent">
          <input type="checkbox" name="consent" defaultChecked={state.values?.consent === 'on'} aria-invalid={!!err('consent')} aria-describedby={err('consent') ? 'consent-err' : undefined} />
          <span>{f.consent} <Link href={privacyHref} className="inline-link">{f.privacy}</Link></span>
        </label>
        {err('consent') && <p id="consent-err" className="field-err">{err('consent')}</p>}
      </div>
      {state.failure && <p className="form-fail" role="alert"><CircleAlert aria-hidden size={18} /> {f[state.failure]}</p>}
      <button type="submit" className="btn btn-ink" disabled={pending}>
        {pending ? f.sending : f.submit} {!pending && <ArrowRight aria-hidden size={18} />}
      </button>
    </form>
  );
}
