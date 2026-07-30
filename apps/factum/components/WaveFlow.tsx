import { MODULES } from '@/lib/site';
import Reveal from './Reveal';

/**
 * The dispatch order, drawn one square per sub-agent.
 *
 * Waves are not five equal steps and saying "five waves" hides that: wave one
 * is more than four times the mass of wave five, because everything downstream
 * is reading what wave one produced. A waffle keeps the area honest — the
 * squares are the same size in every band, so a band's footprint *is* its
 * count — where five same-sized boxes in a row would imply five equal stages.
 */
export default function WaveFlow({
  waves
}: {
  waves: { title: string; body: string }[];
}) {
  return (
    <ol className="waveflow stagger">
      {waves.map((wave, i) => {
        const members = MODULES.filter((m) => m.wave === i + 1);
        const agents = members.reduce((n, m) => n + m.agents, 0);

        return (
          <Reveal as="li" key={wave.title} className="waveflow-band">
            <div className="waveflow-meta">
              <span className="mono waveflow-num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="type-h4 waveflow-title">{wave.title}</h3>
              <p className="type-small waveflow-body">{wave.body}</p>
              <p className="mono waveflow-count">
                {members.length} &middot; {agents}
              </p>
            </div>

            <div className="waveflow-waffle" aria-hidden="true">
              {members.map((m) => (
                <span key={m.slug} className="waveflow-group">
                  {Array.from({ length: m.agents }, (_, k) => (
                    <span key={k} className="waveflow-cell" />
                  ))}
                </span>
              ))}
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}
