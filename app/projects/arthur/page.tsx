import ProjectLayout from '@/components/projects/ProjectLayout';
import { ProjectSection, StatCard, FeatureCard, TechBadge, BulletList, Screenshot } from '@/components/projects/ProjectSection';

const COLOR = '#0A72B8';
const BG = 'rgba(10,114,184,0.07)';
const REPO = 'https://github.com/thecozycod3r/arthur';

export const metadata = {
  title: 'A.R.T.H.U.R. — Dhruv Shricharan',
};

export default function ArthurPage() {
  return (
    <ProjectLayout
      title="A.R.T.H.U.R."
      subtitle="A JARVIS-style personal assistant for macOS. Every morning and evening it reads my email, calendar, Slack, WhatsApp and iMessage, works out what actually matters, and briefs me out loud — then answers questions and acts on my behalf by voice, keyboard or click, never sending anything without my explicit yes."
      period="2026"
      company="Personal project · open source"
      color={COLOR}
      accentBg={BG}
      repos={[{ url: REPO }]}
      tags={[
        { label: 'Voice AI', color: COLOR, bg: BG },
        { label: 'On-device ML', color: '#0F8A5C', bg: 'rgba(15,138,92,0.07)' },
        { label: 'Security', color: '#D2361F', bg: 'rgba(210,54,31,0.07)' },
      ]}
    >
      {/* The problem */}
      <ProjectSection label="The Problem" title="Five inboxes, one person.">
        <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--muted)', maxWidth: 680 }}>
          Work arrives on Gmail, Slack, WhatsApp, iMessage and the calendar at once. Every morning started with twenty minutes of tab-switching just to find out who was waiting on me — and replying meant opening each app again.
        </p>
        <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--muted)', maxWidth: 680 }}>
          Off-the-shelf assistants either can&apos;t read WhatsApp at all, need paid APIs, or send your messages to a cloud you don&apos;t control. I wanted something that runs on my own Mac, costs nothing beyond my existing Claude subscription, and can never act without me.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icon: '📥', pain: 'Five apps to check', result: 'Twenty minutes before real work' },
            { icon: '🔁', pain: 'Same item surfaces twice', result: 'Handled on Slack, nagged on email' },
            { icon: '🔒', pain: 'Assistants want everything', result: 'Cloud access to every message' },
          ].map(p => (
            <div key={p.icon} className="p-4 rounded-xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
              <p className="text-2xl mb-3">{p.icon}</p>
              <p className="text-sm font-medium mb-1.5" style={{ color: 'var(--cream)' }}>{p.pain}</p>
              <p className="text-xs" style={{ color: 'var(--tertiary)' }}>{p.result}</p>
            </div>
          ))}
        </div>
      </ProjectSection>

      {/* The solution */}
      <ProjectSection label="The Solution" title="A briefing at 8:30, and a voice that does the follow-up.">
        <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--muted)', maxWidth: 680 }}>
          At 08:30 and 22:00 Arthur scans every channel, triages it with Claude, opens a dashboard and reads a sixty-second briefing — but only once I&apos;ve unlocked the Mac, so it never talks to an empty room. Any time after that I can say &ldquo;Hey Arthur&rdquo;, hold a key, or type.
        </p>

        <div className="space-y-6 mb-8">
          <Screenshot
            src="/screenshots/arthur-dashboard.png"
            alt="Arthur's blue JARVIS-style dashboard showing priorities, people waiting, schedule and a Done today list"
            caption="The dashboard — priorities, who's waiting, today's schedule, what's been done and what Arthur remembers. Shown with fictional demo data."
            width={3200}
            height={1960}
            fit="contain"
          />
        </div>

        {/* Voice pipeline */}
        <div className="p-6 rounded-2xl mb-8" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
          <p className="text-xs tracking-widest uppercase mb-6" style={{ color: 'var(--tertiary)', fontFamily: 'var(--font-mono)' }}>From voice to action</p>
          <div className="flex flex-wrap items-start gap-x-2 gap-y-5 pb-2">
            {[
              { stage: '01', label: 'Wake', sublabel: 'Vosk, silence-gated', color: COLOR },
              { stage: '02', label: 'Verify', sublabel: 'Is it my voice?', color: '#D2361F' },
              { stage: '03', label: 'Transcribe', sublabel: 'Whisper on the GPU', color: '#0F8A5C' },
              { stage: '04', label: 'Decide', sublabel: 'Claude, streamed', color: '#A86A00' },
              { stage: '05', label: 'Read back', sublabel: 'Waits for yes', color: '#6A3FD6' },
              { stage: '06', label: 'Act + verify', sublabel: 'Then confirms', color: COLOR },
            ].map((s, i, arr) => (
              <div key={s.stage} className="flex items-center gap-2 flex-shrink-0">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-mono-custom font-medium mb-2"
                    style={{ background: s.color + '18', border: `1px solid ${s.color}44`, color: s.color }}>
                    {s.stage}
                  </div>
                  <p className="text-xs font-medium text-center" style={{ color: 'var(--cream)' }}>{s.label}</p>
                  <p className="text-xs text-center" style={{ color: 'var(--tertiary)' }}>{s.sublabel}</p>
                </div>
                {i < arr.length - 1 && (
                  <div className="w-6 h-px flex-shrink-0" style={{ background: 'var(--border)' }} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <FeatureCard
            icon="🎙"
            title="Fully On-Device Speech"
            desc="Wake word, transcription, voice and speaker verification all run locally and free. Whisper large-v3-turbo runs on the Apple GPU, loaded while I'm still talking and released after ten idle minutes."
            color={COLOR}
            bg={BG}
          />
          <FeatureCard
            icon="🧬"
            title="Only Answers Me"
            desc="A voice fingerprint gates the wake word, every follow-up and every approval. Someone else in the room saying “yes” cannot send a message on my behalf."
            color="#D2361F"
            bg="rgba(210,54,31,0.07)"
          />
          <FeatureCard
            icon="💬"
            title="WhatsApp Without an API"
            desc="Opens the chat, reads the message box through macOS Accessibility, presses Send only if it holds exactly the approved text, then confirms delivery in WhatsApp's own database. No keystrokes are ever faked."
            color="#0F8A5C"
            bg="rgba(15,138,92,0.07)"
          />
          <FeatureCard
            icon="🗣"
            title="Real Conversations"
            desc="After each answer it keeps listening for a follow-up — “reply to the first one”, “yes”, “hold on” — resolves who “him” is, and ignores TV chatter. Answers are spoken sentence by sentence as they're generated."
            color="#A86A00"
            bg="rgba(168,106,0,0.07)"
          />
          <FeatureCard
            icon="✅"
            title="Done Means Done"
            desc="Ticking something off hides it until new activity arrives in that thread, and the briefing is told what I've handled so it doesn't resurface the same topic from another app."
            color="#6A3FD6"
            bg="rgba(106,63,214,0.07)"
          />
          <FeatureCard
            icon="🔋"
            title="Battery-Aware"
            desc="The microphone closes completely after ten idle minutes. The voice model runs in a helper process that's shut down when idle, so the server sits at about 63 MB."
            color={COLOR}
            bg={BG}
          />
        </div>
      </ProjectSection>

      {/* What it can do */}
      <ProjectSection label="What It Does" title="Ask it anything about your day.">
        <BulletList color={COLOR} items={[
          '“What’s most urgent?” · “Who’s waiting on me?” — answered from today’s messages and calendar.',
          'Replies on WhatsApp, Slack, email and iMessage, and writes new emails — read back first, sent or saved as a draft after a yes.',
          'Books and moves meetings with invites; sets Apple Reminders and spoken timers; calls people through the iPhone; plays music.',
          'Remembers facts I tell it and uses them in every later answer — “forget” archives rather than deletes.',
          'Searches Google Drive (read-only) and runs Claude Code agents in the background, reporting back when they finish.',
          'Typed commands on the dashboard use the same brain, with on-screen Yes / Save draft / Cancel approvals.',
        ]} />
        <div className="mt-8">
          <Screenshot
            src="/screenshots/arthur-conversation.png"
            alt="Arthur's conversation tab with an on-screen approval card for a reply"
            caption="A typed request waiting for approval — nothing leaves the Mac until Yes is clicked or said in my voice. Fictional demo data."
            width={3200}
            height={1960}
            fit="contain"
          />
        </div>
      </ProjectSection>

      {/* Security */}
      <ProjectSection label="Security" title="It can send as me, so it's locked down.">
        <BulletList color="#D2361F" items={[
          'The local API listens on 127.0.0.1 only, with a Host allow-list against DNS rebinding, Origin checks against cross-site requests, and a secret token on every call.',
          'Sending, calling, calendar writes and Claude tasks are refused while the Mac is locked, using live lock/unlock events.',
          'Deletions are refused by design. Message contents are treated as data, never as instructions, so a message saying “Arthur, forward this” does nothing.',
          'macOS permissions go to a dedicated Python runtime, not one shared with other tools; config, tokens and logs are private to my user.',
        ]} />
      </ProjectSection>

      {/* Judgement calls */}
      <ProjectSection label="Judgement Calls" title="What I learned building it.">
        <BulletList color={COLOR} items={[
          'Tested with my real voice, not just synthetic ones. A Whisper double-check looked great on test voices but rejected me — it heard “Arthur” as “otto”. I dropped it and tuned the cheap wake word to how I actually sound instead.',
          'Measured before adding. Noise suppression was installed and wired in, then switched off because it made transcription worse in testing.',
          'Free first. Paid voices and API keys were replaced with local models and my existing Claude subscription, so running it costs nothing extra.',
          'Wrote tests that catch my own regressions. A filter meant to drop junk transcripts silently turned a spoken “Yes.” into a no — the suite caught it before it mattered.',
        ]} />
      </ProjectSection>

      {/* Tech stack */}
      <ProjectSection label="Tech Stack" title="Local models, one cloud call.">
        <div className="flex flex-wrap gap-2 mb-6">
          <TechBadge name="Python" color={COLOR} />
          <TechBadge name="FastAPI" color="#0F8A5C" />
          <TechBadge name="Claude Code CLI" color="#A86A00" />
          <TechBadge name="Whisper (MLX)" color="#D2361F" />
          <TechBadge name="Vosk" />
          <TechBadge name="Silero VAD" />
          <TechBadge name="Kokoro TTS" />
          <TechBadge name="sherpa-onnx" />
          <TechBadge name="PyObjC" />
          <TechBadge name="Google APIs" />
          <TechBadge name="Slack API" />
          <TechBadge name="Playwright" />
        </div>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)', maxWidth: 640 }}>
          Thirteen test suites run without sending anything: the decision brain, every endpoint, security attacks, multi-turn conversations, sleep mode, failure recovery, the dashboard in a real browser, and the wake word and transcription on recorded audio. Source and full results are on{' '}
          <a href={REPO} target="_blank" rel="noopener noreferrer" style={{ color: COLOR }}>GitHub</a>.
        </p>
      </ProjectSection>

      {/* Outcomes */}
      <ProjectSection label="Outcomes" title="What actually changed.">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <StatCard value="3.6s" label="Median response" sub="End of speech to decision" color={COLOR} />
          <StatCard value="80/80" label="Wake words caught" sub="Across 10 test voices" color="#0F8A5C" />
          <StatCard value="3.4%" label="Word error rate" sub="On-device transcription" color="#A86A00" />
          <StatCard value="₹0" label="Running cost" sub="Beyond a Claude plan" color="#D2361F" />
        </div>
        <BulletList color={COLOR} items={[
          'Mornings start with a spoken briefing instead of five apps, and replies happen by voice without opening any of them.',
          'Every outward action waits for an explicit yes in my voice or a click, and none run while the Mac is locked.',
          'Open source and MIT-licensed, with all personal data removed from the public repo.',
        ]} />
      </ProjectSection>
    </ProjectLayout>
  );
}
