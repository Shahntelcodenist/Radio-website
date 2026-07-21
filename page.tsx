'use client';

import { useState, FormEvent } from 'react';
import { CheckCircleIcon, PhoneIcon } from '@heroicons/react/24/solid';
import { SERVICE_OPTIONS, ADVERT_TYPES, ADVERT_FORMATS, ServiceOption } from '@/lib/data/content';
import { STATION } from '@/lib/config';

const DURATIONS = ['1 week', '2 weeks', '1 month', '3 months', 'Custom'];

interface Booking {
  company: string;
  contact: string;
  email: string;
  phone: string;
  service: string;
  advertType?: string;
  format?: string;
  startDate: string;
  endDate: string;
  duration: string;
  notes: string;
  fileName?: string;
  reference: string;
}

export default function AdvertisePage() {
  const [service, setService] = useState<ServiceOption | ''>('');
  const [booking, setBooking] = useState<Booking | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    const form = new FormData(e.currentTarget);
    const file = form.get('media') as File | null;

    const payload = {
      company: String(form.get('company') || ''),
      contact: String(form.get('contact') || ''),
      email: String(form.get('email') || ''),
      phone: String(form.get('phone') || ''),
      service: String(form.get('service') || ''),
      advertType: form.get('advertType') ? String(form.get('advertType')) : undefined,
      format: form.get('format') ? String(form.get('format')) : undefined,
      startDate: String(form.get('startDate') || ''),
      endDate: String(form.get('endDate') || ''),
      duration: String(form.get('duration') || ''),
      notes: String(form.get('notes') || ''),
      fileName: file && file.size > 0 ? file.name : undefined
    };

    setSubmitting(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong submitting your booking.');
      }

      setBooking({ ...payload, reference: data.booking.reference });
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Could not reach the booking system. Please call the manager directly instead.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (booking) {
    return (
      <div className="max-w-2xl mx-auto px-5 md:px-8 py-20 text-center">
        <CheckCircleIcon className="h-14 w-14 text-signal mx-auto mb-5" />
        <h1 className="font-display font-bold text-3xl text-navy-700">Booking Received</h1>
        <p className="text-navy-500 mt-2 text-sm">
          Reference <span className="font-mono text-signal">{booking.reference}</span> — our sales team will confirm
          availability and follow up shortly.
        </p>
        <div className="mt-8 text-left rounded-2xl border border-navy-100 p-6 space-y-2.5 text-sm">
          <Row label="Company" value={booking.company} />
          <Row label="Contact" value={`${booking.contact} · ${booking.email} · ${booking.phone}`} />
          <Row label="Service" value={booking.service} />
          {booking.advertType && <Row label="Advert type" value={booking.advertType} />}
          {booking.format && <Row label="Format" value={booking.format} />}
          <Row label="Campaign dates" value={`${booking.startDate} → ${booking.endDate}`} />
          <Row label="Duration" value={booking.duration} />
          {booking.fileName && <Row label="Media file" value={booking.fileName} />}
          {booking.notes && <Row label="Notes" value={booking.notes} />}
        </div>
        <button
          onClick={() => {
            setBooking(null);
            setService('');
          }}
          className="mt-8 text-sm font-semibold text-signal hover:underline underline-offset-4"
        >
          Book another service
        </button>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-navy-900 text-white py-16 px-5 md:px-8 text-center">
        <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-signal mb-4">Reach Our Listeners</p>
        <h1 className="font-display font-bold text-4xl md:text-5xl">Book a Service</h1>
        <p className="mt-4 text-navy-100 max-w-xl mx-auto text-sm">
          Advertisements, talkshow features, or live streaming coverage — pick what you need below.
        </p>
      </section>

      {/* Manager contact — pricing is discussed by phone before a request is submitted */}
      <div className="max-w-3xl mx-auto px-5 md:px-8 pt-12">
        <div className="flex items-center gap-4 rounded-2xl border border-signal/30 bg-signal-50 p-5">
          <PhoneIcon className="h-6 w-6 text-signal shrink-0" />
          <div>
            <p className="text-sm font-semibold text-navy-700">
              For pricing, call our manager: <span className="text-signal">{STATION.managerPhone}</span>
            </p>
            <p className="text-xs text-navy-500 mt-0.5">
              Once you&rsquo;ve agreed on pricing and availability by phone, submit the request below to confirm it.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-5 md:px-8 py-12 space-y-8">
        <fieldset className="space-y-5">
          <legend className="font-display font-bold text-lg text-navy-700 mb-1">Company Details</legend>
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Company name" name="company" required />
            <Field label="Contact person" name="contact" required />
            <Field label="Email address" name="email" type="email" required />
            <Field label="Phone number" name="phone" required />
          </div>
        </fieldset>

        <fieldset className="space-y-5">
          <legend className="font-display font-bold text-lg text-navy-700 mb-1">Service</legend>

          <div>
            <label htmlFor="service" className="text-sm font-medium text-navy-700 block mb-1.5">
              Choose a service
            </label>
            <select
              id="service"
              name="service"
              required
              value={service}
              onChange={(e) => setService(e.target.value as ServiceOption)}
              className="w-full rounded-lg border border-navy-200 px-3.5 py-2.5 text-sm outline-none focus-visible:ring-2 ring-signal bg-white"
            >
              <option value="" disabled>
                Select a service
              </option>
              {SERVICE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {service === 'Advertisements' && (
            <div className="grid sm:grid-cols-2 gap-5">
              <Select label="Advert type" name="advertType" options={[...ADVERT_TYPES]} required />
              <Select label="How it's portrayed" name="format" options={[...ADVERT_FORMATS]} required />
            </div>
          )}
        </fieldset>

        <fieldset className="space-y-5">
          <legend className="font-display font-bold text-lg text-navy-700 mb-1">Campaign Details</legend>
          <div className="grid sm:grid-cols-2 gap-5">
            <Select label="Duration" name="duration" options={DURATIONS} required />
            <Field label="Start date" name="startDate" type="date" required />
            <Field label="End date" name="endDate" type="date" required />
            <div>
              <label htmlFor="media" className="text-sm font-medium text-navy-700 block mb-1.5">
                Upload media
              </label>
              <input
                id="media"
                name="media"
                type="file"
                accept="audio/*,image/*,video/*"
                className="w-full text-sm text-navy-500 file:mr-4 file:rounded-full file:border-0 file:bg-navy-700 file:text-white file:px-4 file:py-2 file:text-xs file:font-semibold"
              />
            </div>
          </div>
          <div>
            <label htmlFor="notes" className="text-sm font-medium text-navy-700 block mb-1.5">
              Additional notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              className="w-full rounded-lg border border-navy-200 px-3.5 py-2.5 text-sm outline-none focus-visible:ring-2 ring-signal"
            />
          </div>
        </fieldset>

        {errorMsg && <p className="text-sm text-signal">{errorMsg}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-signal text-white px-8 py-3.5 text-sm font-semibold hover:bg-signal-600 transition-colors disabled:opacity-60"
        >
          {submitting ? 'Submitting…' : 'Submit Booking Request'}
        </button>
      </form>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-navy-50 pb-2.5 last:border-none">
      <span className="text-navy-400">{label}</span>
      <span className="text-navy-700 font-medium text-right">{value}</span>
    </div>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-navy-700 block mb-1.5">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-navy-200 px-3.5 py-2.5 text-sm outline-none focus-visible:ring-2 ring-signal"
      />
    </div>
  );
}

function Select({
  label,
  name,
  options,
  required
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-navy-700 block mb-1.5">
        {label}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        defaultValue=""
        className="w-full rounded-lg border border-navy-200 px-3.5 py-2.5 text-sm outline-none focus-visible:ring-2 ring-signal bg-white"
      >
        <option value="" disabled>
          Select {label.toLowerCase()}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}