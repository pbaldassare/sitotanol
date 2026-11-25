'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { ArrowRight, CircleAlert, CircleCheck } from 'lucide-react';
import type { Dict } from '@/content/it';

type Field = 'name' | 'email' | 'company' | 'message';
type ErrKey = 'required' | 'invalidEmail' | 'consentRequired';
type Errors = Partial<Record<Field | 'consent', ErrKey>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// shortcut: static site, so the form posts JSON straight from the browser to an EU-hosted form service set at build time.
// Its URL is public; spam protection is the honeypot plus whatever the service offers. Auto-reply in the visitor's language comes from that service.
const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

export default function ContactForm({ f, lang, privacyHref }: { f: Dict['contactPage']['form']; lang: string; privacyHref: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok'>('idle');
  const [failure, setFailure] = useState<'notConfigured' | 'failed' | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const get = (k: string, n: number) => String(form.get(k) ?? '').trim().slice(0, n);
    setFailure(null);
    // Honeypot: bots fill the hidden field; pretend success and drop the message.
    if (get('website', 200)) return setStatus('ok');

    const data = {
      name: get('name', 120),
      email: get('email', 200),
      company: get('company', 160),
      message: get('message', 4000),
      lang,
      software: new URLSearchParams(location.search).get('software')?.slice(0, 40) ?? '',
    };
    const next: Errors = {};
    if (!data.name) next.name = 'required';
    if (!data.email) next.email = 'required';
    else if (!EMAIL.test(data.email)) next.email = 'invalidEmail';
    if (!data.message) next.message = 'required';
    if (form.get('consent') !== 'on') next.consent = 'consentRequired';
    setErrors(next);
    if (Object.keys(next).length) return;
    if (!ENDPOINT) return setFailure('notConfigured');

    setStatus('sending');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('ok');
    } catch {
      setStatus('idle');
      setFailure('failed');
    }
  }

  if (status === 'ok')
    return <p className="form-done" role="status"><CircleCheck aria-hidden size={22} /> {f.success}</p>;

  const err = (k: keyof Errors) => errors[k] && f[errors[k]!];
  const input = (k: Field, type = 'text', auto?: string) => {
    const required = k !== 'company';
    const props = {
      id: k,
      name: k,
      required,
      'aria-invalid': required && !!err(k),
      'aria-describedby': required && err(k) ? `${k}-err` : undefined,
    };
    return (
      <div className="field">
        <label htmlFor={k}>{f[k]}{required && <span aria-hidden> *</span>}</label>
        {k === 'message' ? <textarea {...props} rows={5} /> : <input {...props} type={type} autoComplete={auto} />}
        {required && err(k) && <p id={`${k}-err`} className="field-err">{err(k)}</p>}
      </div>
    );
  };

  return (
    <form onSubmit={onSubmit} className="form" noValidate>
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
          <input type="checkbox" name="consent" aria-invalid={!!err('consent')} aria-describedby={err('consent') ? 'consent-err' : undefined} />
          <span>{f.consent} <Link href={privacyHref} className="inline-link">{f.privacy}</Link></span>
        </label>
        {err('consent') && <p id="consent-err" className="field-err">{err('consent')}</p>}
      </div>
      {failure && <p className="form-fail" role="alert"><CircleAlert aria-hidden size={18} /> {f[failure]}</p>}
      <button type="submit" className="btn btn-ink" disabled={status === 'sending'}>
        {status === 'sending' ? f.sending : f.submit} {status !== 'sending' && <ArrowRight aria-hidden size={18} />}
      </button>
    </form>
  );
}
