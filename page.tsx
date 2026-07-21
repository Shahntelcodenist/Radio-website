import { HeartIcon, EyeIcon, SparklesIcon, TrophyIcon, MapPinIcon } from '@heroicons/react/24/outline';
import FrequencyDivider from '@/components/FrequencyDivider';

const VALUES = [
  { title: 'Community First', desc: 'Every editorial decision starts with what our listeners need to hear.' },
  { title: 'Truth in Reporting', desc: 'We verify before we broadcast, even when the story is urgent.' },
  { title: 'Cultural Stewardship', desc: 'We protect and celebrate the languages, music and stories of our region.' },
  { title: 'Accessible to All', desc: 'On air, online, in three languages — reachable however you listen.' }
];

const MILESTONES = [
  { year: '2014', text: 'Togotane Radio signs on for the first time from a single-room studio in Kehancha.' },
  { year: '2017', text: 'Coverage extended to reach all of Kuria East and Kuria West sub-counties.' },
  { year: '2020', text: 'Launched a 24-hour live stream, reaching listeners across the diaspora.' },
  { year: '2023', text: 'Named Regional Community Broadcaster of the Year.' },
  { year: '2026', text: 'Multilingual programming expands to include daily Kuria-language bulletins.' }
];

export default function AboutPage() {
  return (
    <div>
      <section className="bg-navy-900 text-white py-20 px-5 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-signal mb-4">Our Story</p>
          <h1 className="font-display font-bold text-4xl md:text-5xl leading-tight text-balance">
            Twelve years of telling this region&rsquo;s story, in its own voice
          </h1>
          <p className="mt-6 text-navy-100 leading-relaxed max-w-2xl mx-auto">
            Togotane Radio began as a single microphone and a promise: that everyone across Kuria and the
            surrounding counties deserves news, music and conversation that sounds like home.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-5 md:px-8 py-16 grid md:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-navy-100 p-7">
          <EyeIcon className="h-6 w-6 text-signal mb-4" />
          <h2 className="font-display font-bold text-xl text-navy-700 mb-2">Our Mission</h2>
          <p className="text-navy-500 text-sm leading-relaxed">
            To provide a trusted and indispensable source of information, music, and entertainment. The station is dedicated to strengthening the civic and cultural life of the communities it serves, often collaborating with advocacy groups to promote community-led solutions, education, and human rights.
          </p>
        </div>
        <div className="rounded-2xl border border-navy-100 p-7">
          <SparklesIcon className="h-6 w-6 text-signal mb-4" />
          <h2 className="font-display font-bold text-xl text-navy-700 mb-2">Our Vision</h2>
          <p className="text-navy-500 text-sm leading-relaxed">
            To be the most valued, vital, and vibrant community service that inspires people to view the world from multiple perspectives. The station aims to capitalize on emerging opportunities to continually serve and engage its audience.
          </p>
        </div>
      </section>

      <FrequencyDivider label="Core Values" />

      <section className="max-w-6xl mx-auto px-5 md:px-8 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {VALUES.map((v) => (
          <div key={v.title} className="rounded-xl bg-paper border border-navy-100 p-6">
            <HeartIcon className="h-5 w-5 text-signal mb-3" />
            <h3 className="font-display font-semibold text-navy-700 mb-1.5">{v.title}</h3>
            <p className="text-sm text-navy-500 leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </section>

      <section className="bg-navy-50/60 py-16">
        <div className="max-w-4xl mx-auto px-5 md:px-8">
          <div className="flex items-center gap-2 mb-10">
            <TrophyIcon className="h-5 w-5 text-signal" />
            <h2 className="font-display font-bold text-2xl text-navy-700">Milestones &amp; Achievements</h2>
          </div>
          <ol className="relative border-l border-navy-200 ml-2">
            {MILESTONES.map((m) => (
              <li key={m.year} className="pl-7 pb-8 last:pb-0 relative">
                <span className="absolute -left-[5px] top-1.5 h-[9px] w-[9px] rounded-full bg-signal" />
                <span className="font-mono text-sm text-signal font-semibold">{m.year}</span>
                <p className="text-navy-600 text-sm mt-1 leading-relaxed">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-5 md:px-8 py-16 text-center">
        <MapPinIcon className="h-6 w-6 text-signal mx-auto mb-4" />
        <h2 className="font-display font-bold text-2xl text-navy-700 mb-2">Coverage Area</h2>
        <p className="text-navy-500 text-sm leading-relaxed max-w-xl mx-auto">
          Broadcasting terrestrially across Kuria East, Kuria West, Kehancha, Isibania and Kegonga, with live
          streaming reaching listeners nationwide and across the diaspora.
        </p>
      </section>
    </div>
  );
}
