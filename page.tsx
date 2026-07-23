const FAQS = [
  { q: 'How do I listen to Togotane Radio online?', a: 'Tap "Listen Live" in the top navigation or on the homepage — the stream starts instantly in your browser.' },
  { q: 'How do I book an advert?', a: 'Visit the Advertise page, choose your advert type and campaign dates, and submit your details for a confirmation.' },
  { q: 'Can I request a song or send a dedication?', a: 'Yes — use the contact form or call the studio line during any live show.' },
  { q: 'Do you broadcast in Kiswahili and Kuria?', a: 'Yes. Use the language selector in the navigation to switch the site, and tune in for dedicated bulletins in each language.' }
];

export default function FaqsPage() {
  return (
    <div className="max-w-2xl mx-auto px-5 md:px-8 py-20">
      <h1 className="font-display font-bold text-3xl text-navy-700 mb-8">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {FAQS.map((item) => (
          <div key={item.q} className="border-b border-navy-100 pb-6">
            <h2 className="font-display font-semibold text-navy-700">{item.q}</h2>
            <p className="text-sm text-navy-500 mt-1.5 leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
