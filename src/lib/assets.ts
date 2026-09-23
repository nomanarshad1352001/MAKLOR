/* ————— Curated photographic direction (Pexels CDN) ————— */

const px = (id: number, w = 1600, h = 1000) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export const IMG = {
  // Cinematic Swiss lake — hero canvas
  heroLake: px(12241111, 2200, 1300),
  heroVilla: px(13752348, 2000, 1250),
  villaTwilight: px(30781823, 1800, 1100),

  // Interiors — field capture rooms
  living: px(8134760, 1200, 800),
  kitchen: px(8134781, 1200, 800),
  terrace: px(8134752, 1200, 800),
  livingBright: px(7546716, 1200, 800),
  master: px(7005298, 1200, 800),

  // People / practice
  soloAgent: px(6950103, 1400, 950),
  signing: px(7433919, 1400, 950),
  teamLounge: px(8067881, 1400, 950),
  enterprise: px(6950120, 1400, 950),
  meeting: px(4345109, 1400, 950),
  docs: px(7433874, 1400, 950),

  // Switzerland
  zurichAerial: px(28766434, 1800, 1100),
  blueHour: px(6441380, 1800, 1100),
  zurichAlps: px(28838117, 1800, 1100),
  zurichHistoric: px(31087668, 1600, 1000),

  // Editorial / resources
  glassFacade: px(10610731, 1200, 850),
  glassTwilight: px(9253335, 1200, 850),
  villaPoolDusk: px(24805054, 1200, 850),
  infinitySunset: px(31817157, 1200, 850),
  villaMountains: px(27626185, 1200, 850),

  // Detail / closing craft
  signingClose: px(7567600, 1400, 950),
  deskHands: px(5387258, 1400, 950),
};

export const VIDEO = {
  // Drone over Lake Zürich — 4K, 50s loop (SwissHumanity Stories)
  heroLake:
    "https://videos.pexels.com/video-files/7830799/7830799-uhd_3840_2160_30fps.mp4",
  // Cinematic interior showcase (Abdullah 4K)
  interiorShowcase:
    "https://videos.pexels.com/video-files/10959786/10959786-uhd_3840_2160_30fps.mp4",
  // Zürich old town at dusk (Flex Journey)
  zurichDusk:
    "https://videos.pexels.com/video-files/28988890/12538618_3840_2160_60fps.mp4",
};

export const CANTONS = [
  "Genève",
  "Lausanne",
  "Bern",
  "Basel",
  "Zürich",
  "Luzern",
  "St. Gallen",
  "Lugano",
  "Neuchâtel",
  "Fribourg",
  "Sion",
  "Coire",
  "Delémont",
];

export const NAV_I18N: Record<string, Record<string, string>> = {
  EN: {
    platform: "Platform",
    solutions: "Solutions",
    pricing: "Pricing",
    resources: "Resources",
    company: "Company",
    login: "Client Login",
    cta: "Request Enterprise Demo",
    signup: "Sign up",
  },
  DE: {
    platform: "Plattform",
    solutions: "Lösungen",
    pricing: "Preise",
    resources: "Ressourcen",
    company: "Unternehmen",
    login: "Kunden-Login",
    cta: "Enterprise-Demo anfordern",
    signup: "Registrieren",
  },
  FR: {
    platform: "Plateforme",
    solutions: "Solutions",
    pricing: "Tarifs",
    resources: "Ressources",
    company: "Entreprise",
    login: "Connexion client",
    cta: "Demander une démo",
    signup: "S'inscrire",
  },
  IT: {
    platform: "Piattaforma",
    solutions: "Soluzioni",
    pricing: "Prezzi",
    resources: "Risorse",
    company: "Azienda",
    login: "Accesso clienti",
    cta: "Richiedi una demo",
    signup: "Registrati",
  },
};
