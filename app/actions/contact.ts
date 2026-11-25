'use server';

export type ContactState = { status: 'idle' | 'ok' | 'error'; errors?: Partial<Record<'name' | 'email' | 'message' | 'consent', 'required' | 'invalidEmail' | 'consentRequired'>>; failure?: 'notConfigured' | 'failed'; values?: Record<string, string> };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clip = (v: FormDataEntryValue | null, n: number) => String(v ?? '').trim().slice(0, n);

export async function sendContact(_: ContactState, form: FormData): Promise<ContactState> {
  // Honeypot: bots fill the hidden field; pretend success and drop the message.
  if (clip(form.get('website'), 200)) return { status: 'ok' };

  const data = {
    name: clip(form.get('name'), 120),
    email: clip(form.get('email'), 200),
    company: clip(form.get('company'), 160),
    message: clip(form.get('message'), 4000),
    lang: clip(form.get('lang'), 2),
    software: clip(form.get('software'), 40),
  };
  const errors: ContactState['errors'] = {};
  if (!data.name) errors.name = 'required';
  if (!data.email) errors.email = 'required';
  else if (!EMAIL.test(data.email)) errors.email = 'invalidEmail';
  if (!data.message) errors.message = 'required';
  if (form.get('consent') !== 'on') errors.consent = 'consentRequired';
  // React resets the form after an action; send the input back so nothing typed is lost on error.
  const values = { name: data.name, email: data.email, company: data.company, message: data.message, consent: form.get('consent') === 'on' ? 'on' : '' };
  if (Object.keys(errors).length) return { status: 'error', errors, values };

  // shortcut: delivery goes to a generic webhook (EU-hosted provider still to choose); auto-reply in the visitor's language needs that provider.
  const hook = process.env.CONTACT_WEBHOOK_URL;
  if (!hook) return { status: 'error', failure: 'notConfigured', values };
  try {
    const res = await fetch(hook, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(data) });
    return res.ok ? { status: 'ok' } : { status: 'error', failure: 'failed', values };
  } catch {
    return { status: 'error', failure: 'failed', values };
  }
}
