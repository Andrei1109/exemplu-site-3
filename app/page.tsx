import { Fragment } from 'react'
import { AudioToggle } from '@/components/invitation/audio-toggle'
import { Closing } from '@/components/invitation/closing'
import { Details } from '@/components/invitation/details'
import { EnvelopeGate } from '@/components/invitation/envelope-gate'
import { Hero } from '@/components/invitation/hero'
import { Letter } from '@/components/invitation/letter'
import { Seam, type Tone } from '@/components/invitation/ornaments'
import { RSVPSection } from '@/components/invitation/rsvp-section'
import { Story } from '@/components/invitation/story'
import { Timeline } from '@/components/invitation/timeline'
import { invitationConfig as config } from '@/lib/invitation-config'
import { sanitizeGuestName } from '@/lib/invitation-utils'

export default async function InvitationPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const guestName = sanitizeGuestName(params.invitat)
  const isClosed = Date.now() > new Date(config.rsvp.deadline).getTime()
  const { features } = config

  type Section = { key: string; tone: Tone; enabled: boolean; node: React.ReactNode }
  const allSections: Section[] = [
    { key: 'letter', tone: 'burgundy', enabled: true, node: <Letter config={config} guestName={guestName} /> },
    { key: 'story', tone: 'ivory', enabled: features.story, node: <Story config={config} /> },
    { key: 'details', tone: 'burgundy', enabled: true, node: <Details config={config} /> },
    { key: 'timeline', tone: 'ivory', enabled: features.timeline, node: <Timeline config={config} /> },
    {
      key: 'rsvp',
      tone: 'burgundy',
      enabled: features.rsvp,
      node: <RSVPSection config={config} guestName={guestName} isClosed={isClosed} />,
    },
    { key: 'closing', tone: 'ivory', enabled: true, node: <Closing config={config} /> },
  ]
  const sections = allSections.filter((section) => section.enabled)

  return (
    <EnvelopeGate
      enabled={features.opening}
      monogram={config.couple.monogram}
      names={`${config.couple.partnerOne} & ${config.couple.partnerTwo}`}
      guestName={guestName}
    >
      <Hero config={config} />
      <main>
        {sections.map((section, index) => {
          const previous: Tone = index === 0 ? 'ivory' : sections[index - 1].tone
          return (
            <Fragment key={section.key}>
              {previous !== section.tone && <Seam from={previous} to={section.tone} />}
              {section.node}
            </Fragment>
          )
        })}
      </main>
      {features.audio && config.audio.src && <AudioToggle src={config.audio.src} title={config.audio.title} />}
    </EnvelopeGate>
  )
}
