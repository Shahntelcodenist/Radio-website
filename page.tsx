'use client';

import { useState } from 'react';
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';
import { STATION } from '@/lib/config';

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div>
      <section className="bg-navy-900 text-white py-16 px-5 md:px-8 text-center">
        <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-signal mb-4">Get In Touch</p>
        <h1 className="font-display font-bold text-4xl md:text-5xl">Contact Us</h1>
      </section>

      <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 grid lg:grid-cols-[1fr_1.2fr] gap-12">
        <div className="space-y-6">
          {[
            { icon: PhoneIcon, label: 'Phone', value: STATION.phone },
            { icon: ChatBubbleOvalLeftEllipsisIcon, label: 'WhatsApp', value: STATION.whatsapp },
            { icon: EnvelopeIcon, label: 'Email', value: STATION.email },
            { icon: MapPinIcon, label: 'Studio Address', value: STATION.address }
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-4 rounded-xl border border-navy-100 p-5">
              <item.icon className="h-5 w-5 text-signal shrink-0 mt-0.5" />
              <div>
                <p className="text-xs uppercase tracking-wider text-navy-400">{item.label}</p>
                <p className="text-navy-700 font-medium mt-0.5">{item.value}</p>
              </div>
            </div>
          ))}

          {/* Placeholder for embedded map — drop in an iframe src once you have
              a Google Maps embed link for the studio location. */}
          <div className="rounded-xl border border-dashed border-navy-200 h-48 flex items-center justify-center text-navy-400 text-sm">
            Google Maps embed placeholder
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="rounded-2xl border border-navy-100 p-7 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Full name" id="name" required />
            <Field label="Email address" id="email" type="email" required />
          </div>
          <Field label="Subject" id="subject" />
          <div>
            <label htmlFor="message" className="text-sm font-medium text-navy-700 block mb-1.5">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              className="w-full rounded-lg border border-navy-200 px-3.5 py-2.5 text-sm outline-none focus-visible:ring-2 ring-signal"
            />
          </div>
          <button
            type="submit"
            className="rounded-full bg-signal text-white px-6 py-3 text-sm font-semibold hover:bg-signal-600 transition-colors"
          >
            Send Message
          </button>
          {sent && (
            <p role="status" className="text-sm text-signal">
              Thanks — your message has been noted. Our team will reply shortly.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  id,
  type = 'text',
  required
}: {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-navy-700 block mb-1.5">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        className="w-full rounded-lg border border-navy-200 px-3.5 py-2.5 text-sm outline-none focus-visible:ring-2 ring-signal"
      />
    </div>
  );
}
