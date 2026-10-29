/**
 * Single source of truth for one invitation.
 * In Palfi Events this object is expected to be loaded per event (by `event.id` / `event.slug`);
 * every guest-facing value below is editable demo data.
 */

export type ImageAsset = {
  src: string
  alt: string
}

export type Venue = {
  name: string
  /** Leave empty when no verified address exists — nothing will be fabricated. */
  address?: string
  city?: string
  /** Optional explicit maps link. When missing, a Google Maps search link is built from name/address/city. */
  mapsUrl?: string
}

export type EventMoment = {
  id: string
  label: string
  /** ISO 8601 with offset, e.g. 2027-06-12T15:00:00+03:00 */
  startsAt: string
  endsAt?: string
  venue: Venue
}

export type TimelineItem = {
  time: string
  title: string
  note?: string
}

export type InvitationConfig = {
  event: {
    id: string
    slug: string
    timeZone: string
    locale: string
  }
  couple: {
    partnerOne: string
    partnerTwo: string
    monogram: string
  }
  family?: {
    parents: string[]
    godparents?: string
  }
  date: {
    /** Main date of the wedding, ISO 8601 with offset. Countdown targets this moment. */
    mainStartsAt: string
  }
  ceremony: EventMoment
  reception: EventMoment
  timeline: TimelineItem[]
  copy: {
    heroLead: string
    letterGreetingFallback: string
    letterParagraphs: string[]
    storyTitle: string
    storyParagraphs: string[]
    quote: { text: string; source: string }
    closingTitle: string
    closingLine: string
  }
  images: {
    floralCorner?: ImageAsset
    floralGarland?: ImageAsset
    couple?: ImageAsset & { caption?: string }
  }
  rsvp: {
    /** ISO 8601 with offset — the form closes after this moment. */
    deadline: string
    /** Extra guests allowed besides the invited person. */
    maxCompanions: number
    /**
     * Palfi Events RSVP endpoint. When `null`, the form runs in an explicitly labelled demo mode
     * and never claims a response was saved.
     */
    endpoint: string | null
  }
  audio: {
    /** Path or URL to an audio file. When `null`, the audio control is not rendered. */
    src: string | null
    title: string
  }
  features: {
    opening: boolean
    story: boolean
    timeline: boolean
    countdown: boolean
    rsvp: boolean
    family: boolean
    audio: boolean
  }
  theme: {
    colors: {
      burgundy: string
      wine: string
      blush: string
      ivory: string
      gold: string
    }
    fonts: {
      display: string
      body: string
    }
  }
}

export const invitationConfig: InvitationConfig = {
  event: {
    id: 'evt_demo_alexandra_matei_20270612',
    slug: 'alexandra-si-matei',
    timeZone: 'Europe/Bucharest',
    locale: 'ro-RO',
  },
  couple: {
    partnerOne: 'Alexandra',
    partnerTwo: 'Matei',
    monogram: 'A & M',
  },
  family: {
    parents: ['Elena & Mihai Ionescu', 'Carmen & Andrei Dumitrescu'],
    godparents: 'Ioana & Radu Popa',
  },
  date: {
    mainStartsAt: '2027-06-12T15:00:00+03:00',
  },
  ceremony: {
    id: 'ceremony',
    label: 'Cununia religioasă',
    startsAt: '2027-06-12T15:00:00+03:00',
    endsAt: '2027-06-12T16:30:00+03:00',
    venue: {
      name: 'Biserica Sfântul Nicolae',
    },
  },
  reception: {
    id: 'reception',
    label: 'Petrecerea',
    startsAt: '2027-06-12T19:00:00+03:00',
    endsAt: '2027-06-13T04:00:00+03:00',
    venue: {
      name: 'The Garden Estate',
    },
  },
  timeline: [
    { time: '15:00', title: 'Cununia religioasă', note: 'Biserica Sfântul Nicolae' },
    { time: '16:30', title: 'Felicitări și fotografii', note: 'În curtea bisericii' },
    { time: '19:00', title: 'Primirea invitaților', note: 'The Garden Estate' },
    { time: '20:00', title: 'Cina festivă' },
    { time: '22:00', title: 'Primul dans' },
    { time: '00:00', title: 'Tortul miresei' },
  ],
  copy: {
    heroLead: 'Împreună cu familiile lor',
    letterGreetingFallback: 'Dragi prieteni și familie,',
    letterParagraphs: [
      'Sunt clipe pe care le trăim o singură dată și pe care ne dorim să le împărțim cu oamenii care ne sunt cei mai dragi.',
      'Cu emoție și recunoștință, vă invităm să fiți alături de noi în ziua în care ne unim destinele — să ne bucurăm împreună de iubire, de familie și de începutul unui drum nou.',
    ],
    storyTitle: 'Cum a început totul',
    storyParagraphs: [
      'Ne-am cunoscut într-o librărie mică, într-o după-amiază ploioasă de octombrie, întinzând mâna după aceeași carte. Am împărțit-o — și, odată cu ea, prima cafea.',
      'De atunci am strâns scrisori, călătorii și duminici lungi. Acum vrem să scriem împreună capitolul cel mai frumos, iar voi faceți parte din el.',
    ],
    quote: {
      text: 'Dragostea îndelung rabdă, dragostea este binevoitoare… Dragostea nu cade niciodată.',
      source: '1 Corinteni 13',
    },
    closingTitle: 'Vă așteptăm cu drag',
    closingLine: 'Prezența voastră este cel mai frumos dar pe care ni-l puteți face.',
  },
  images: {
    floralCorner: {
      src: '/invitation/florals-corner.png',
      alt: '',
    },
    floralGarland: {
      src: '/invitation/florals-sprig.png',
      alt: '',
    },
    couple: {
      src: '/invitation/couple.png',
      alt: 'Alexandra și Matei într-o grădină, în lumina caldă a apusului, ținând un buchet de trandafiri',
      caption: 'Primul nostru capitol',
    },
  },
  rsvp: {
    deadline: '2027-05-15T23:59:59+03:00',
    maxCompanions: 2,
    endpoint: null,
  },
  audio: {
    src: null,
    title: 'Muzica noastră',
  },
  features: {
    opening: true,
    story: true,
    timeline: true,
    countdown: true,
    rsvp: true,
    family: true,
    audio: true,
  },
  theme: {
    colors: {
      burgundy: '#672D3E',
      wine: '#833F50',
      blush: '#D9B7B5',
      ivory: '#F6F0E7',
      gold: '#BDAA86',
    },
    fonts: {
      display: 'var(--font-cormorant)',
      body: 'var(--font-jost)',
    },
  },
}
