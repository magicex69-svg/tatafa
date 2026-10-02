import type { ScrollScrubScene, ScrollScrubTheme } from "@/components/scroll-scrub/scroll-scrub";

export const scrollScrubTheme: ScrollScrubTheme = {
  accent: "#78b5ad",
  background: "#071b23",
  ink: "#e5ece8",
  muted: "#c2d3d2",
};

export const scrollScrubScenes: ScrollScrubScene[] = [
  {
    id: "aerial-journey",
    label: "Остров",
    title: "Один остров. Целый мир.",
    body: "От природной территории к архитектурной концепции. План расположения открывается ниже.",
    clip: "/assets/world/scene-01.mp4",
    poster: "/assets/world/scene-01-poster.png",
    mobileClip: "/assets/world/scene-01-mobile.mp4",
    mobilePoster: "/assets/world/scene-01-mobile-poster.png",
    align: "left",
    scroll: 2.6,
    linger: 0.12,
  },
];
