import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { staff, StaffMember } from '@/lib/data/content';
import Image from 'next/image';


const DEPARTMENTS: StaffMember['department'][] = [
  'Directors',
  'Senior Management',
  'Presenters',
  'Producers',
  'Journalists',
  'Technical Team',
  'Marketing Team',
  'Administrative Staff'
];

export default function TeamPage() {
  return (
    <div>
      <section className="bg-navy-900 text-white py-16 px-5 md:px-8 text-center">
        <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-signal mb-4">The People On Air</p>
        <h1 className="font-display font-bold text-4xl md:text-5xl">Our Team</h1>
        <p className="mt-4 text-navy-100 max-w-xl mx-auto text-sm">
          Editable profiles for every director, presenter, producer and engineer at Togotane Radio.
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 space-y-16">
        {DEPARTMENTS.map((dept) => {
          const members = staff.filter((s) => s.department === dept);
          if (members.length === 0) return null;
          return (
            <section key={dept}>
              <h2 className="font-display font-bold text-2xl text-navy-700 mb-6 pb-3 border-b border-navy-100">
                {dept}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map((person) => (
                  <article key={person.id} className="rounded-2xl border border-navy-100 p-6 hover:shadow-panel transition-shadow">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden mb-4 bg-gray-100 flex-shrink-0">
  <Image 
    src={person.image || '/logo.jpg'} 
    alt={person.name}
    fill
    className="object-cover"
  />
</div>

                    <h3 className="font-display font-bold text-navy-700">{person.name}</h3>
                    <p className="text-xs text-signal font-semibold mt-0.5">{person.position}</p>
                    <p className="text-sm text-navy-500 mt-3 leading-relaxed">{person.bio}</p>
                    {person.programs.length > 0 && (
                      <p className="text-xs text-navy-400 mt-3">
                        Hosts: <span className="text-navy-600">{person.programs.join(', ')}</span>
                      </p>
                    )}
                    <p className="text-xs text-navy-400 mt-1">{person.years} years at Togotane Radio</p>
                    <blockquote className="text-xs italic text-navy-500 mt-3 border-l-2 border-signal pl-3">
                      &ldquo;{person.quote}&rdquo;
                    </blockquote>
                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-navy-50">
                      <a href={`mailto:${person.email}`} className="text-navy-400 hover:text-signal" aria-label={`Email ${person.name}`}>
                        <EnvelopeIcon className="h-4 w-4" />
                      </a>
                      <a href={`tel:${person.phone}`} className="text-navy-400 hover:text-signal" aria-label={`Call ${person.name}`}>
                        <PhoneIcon className="h-4 w-4" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
