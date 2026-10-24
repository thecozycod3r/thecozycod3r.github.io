import ProjectLayout from '@/components/projects/ProjectLayout';
import { ProjectSection, StatCard, FeatureCard, TechBadge, BulletList, Screenshot } from '@/components/projects/ProjectSection';

const COLOR = '#0F8A5C';
const BG = 'rgba(15,138,92,0.07)';
const LIVE = 'https://table-night-games.vercel.app';

export const metadata = {
  title: 'Table Night — Dhruv Shricharan',
};

export default function TableNightPage() {
  return (
    <ProjectLayout
      title="Table Night"
      subtitle="Fourteen multiplayer card and party games for a room full of friends. Everyone plays on their own phone, no accounts, no app store, free. Open a table, share the code, deal."
      period="2026"
      company="Personal"
      color={COLOR}
      accentBg={BG}
      live={{ url: LIVE, label: 'Play Table Night, free' }}
      repos={[{ url: 'https://github.com/thecozycod3r/wizard-online', label: 'thecozycod3r/wizard-online' }]}
      tags={[
        { label: 'Multiplayer', color: COLOR, bg: BG },
        { label: 'Realtime', color: '#2343F5', bg: 'rgba(35,67,245,0.07)' },
        { label: 'Game Design', color: '#A86A00', bg: 'rgba(168,106,0,0.07)' },
      ]}
    >
      <ProjectSection label="The Problem" title="Game night, minus the box.">
        <p className="text-base leading-relaxed" style={{ color: 'var(--muted)', maxWidth: 680 }}>
          It started with Wizard, a card game my friends play, and a paper scorebook nobody wanted to keep. Then the box was not always there and people joined late. I wanted a table that lives on everyone&apos;s phones and survives all of that.
        </p>
      </ProjectSection>

      <ProjectSection label="The Games" title="Fourteen tables, one shared engine.">
        <Screenshot
          src="/screenshots/table-night-hub.jpg"
          alt="Table Night hub with a poster for each game"
          caption="The hub. Each poster opens a lobby; the room code is all a friend needs to join."
          width={1600}
          height={1000}
        />
        <p className="text-base leading-relaxed mt-8 mb-6" style={{ color: 'var(--muted)', maxWidth: 680 }}>
          Wizard, Splendor, Seven Marvels, Avalon, Incan Gold, UNO Flip, UNO No Mercy, 6 Nimmt!, Skull King, Coup, Spyfall, Codenames, Kings Cup and Ride the Bus. Each has its own rules engine, its own art and a Rules button on every screen; the lobby, seats, rejoin, timers and podium are shared.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FeatureCard icon="📱" title="Your Phone Is Your Hand" desc="Private cards on your screen, the shared table on everyone's. Works on any phone browser, sideways or upright." color={COLOR} bg={BG} />
          <FeatureCard icon="🔁" title="No Host to Lose" desc="One phone runs the table and broadcasts state. If it goes quiet for seven seconds, the next seat takes over; when it comes back it steps aside." color="#2343F5" bg="rgba(35,67,245,0.07)" />
          <FeatureCard icon="🙋" title="Rejoin From Anywhere" desc="Seats are remembered on the device. A new phone can claim its seat with &lsquo;Which player are you?&rsquo; and carry on mid-round." color="#A86A00" bg="rgba(168,106,0,0.07)" />
          <FeatureCard icon="🎨" title="Original Art" desc="Every game has its own illustrated cards and posters, generated and art-directed per game rather than copied from the boxes." color="#D2361F" bg="rgba(210,54,31,0.07)" />
        </div>
      </ProjectSection>

      <ProjectSection label="Judgement Calls" title="Tested like it matters.">
        <BulletList color={COLOR} items={[
          'Every engine is simulated over thousands of bot games before it ships, to catch deadlocks and rule edge cases.',
          'Real-device testing: headless runs at four and six players, host-failover tests, slow-network and phone-sleep tests, and a pass on a real iPhone.',
          'No backend of my own. A realtime channel per table carries the state, so there is nothing to keep running and nothing to pay for.',
        ]} />
      </ProjectSection>

      <ProjectSection label="Tech Stack" title="Static site, realtime channels.">
        <div className="flex flex-wrap gap-2 mb-6">
          <TechBadge name="Vanilla JS" color={COLOR} />
          <TechBadge name="Supabase Realtime" color="#2343F5" />
          <TechBadge name="Vercel" />
          <TechBadge name="Playwright tests" color="#A86A00" />
          <TechBadge name="AI-generated art" color="#D2361F" />
        </div>
      </ProjectSection>

      <ProjectSection label="Outcomes" title="What actually changed.">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard value="14" label="Games" sub="Card, strategy and party" color={COLOR} />
          <StatCard value="2–12" label="Players" sub="Depending on the game" color="#2343F5" />
          <StatCard value="7s" label="Host failover" sub="Table keeps going" color="#A86A00" />
          <StatCard value="Free" label="To play" sub="No sign-up" color="#D2361F" />
        </div>
      </ProjectSection>
    </ProjectLayout>
  );
}
