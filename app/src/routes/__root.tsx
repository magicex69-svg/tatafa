import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import appCss from "../styles.css?url";
import appMetaJson from "../app-meta.json";
import { scrollScrubTheme } from "../scroll-scrub-scenes";
import { reportHiggsfieldError } from "../lib/higgsfield-error-reporting";

declare const __HF_DESIGN_INSPECTOR__: boolean;
const B = import.meta.env.BASE_URL;
const meta = appMetaJson as {
  og_title?: string | null;
  og_description?: string | null;
  og_image_url?: string | null;
  favicon_url?: string | null;
  og_video_url?: string | null;
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => {
    const title = meta.og_title || "TATAFA | Private Island Masterplan";
    const description = meta.og_description || "Интерактивный генеральный план острова Татафа, Королевство Тонга.";
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title },
        { name: "description", content: description },
        { name: "theme-color", content: scrollScrubTheme.background },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        ...(meta.og_image_url ? [{ property: "og:image", content: meta.og_image_url }, { name: "twitter:image", content: meta.og_image_url }] : []),
        ...(meta.og_video_url ? [{ property: "og:video", content: meta.og_video_url }] : []),
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "preload", href: B + "assets/tatafa/master.webp", as: "image" },
        { rel: "manifest", href: B + "site.webmanifest" },
        { rel: "icon", href: B + "favicon.ico", sizes: "any" },
        { rel: "icon", href: B + "favicon-16.png", sizes: "16x16", type: "image/png" },
        { rel: "icon", href: B + "favicon-32.png", sizes: "32x32", type: "image/png" },
        { rel: "apple-touch-icon", href: B + "apple-touch-icon.png" },
      ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: () => <main className="message-screen"><h1>Раздел не найден</h1><a href={B}>Вернуться к острову</a></main>,
  errorComponent: ({ reset }: { reset: () => void }) => <main className="message-screen"><h1>Не удалось открыть страницу</h1><button onClick={reset}>Повторить</button></main>,
});

function RootShell({ children }: { children: ReactNode }) {
  return <html lang="ru" data-theme="tatafa-dark"><head><HeadContent /></head><body className="tatafa-body">{children}<Scripts /></body></html>;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useEffect(() => {
    if (!__HF_DESIGN_INSPECTOR__) return;
    void import("../module/design-inspector/runtime")
      .then(({ installHiggsfieldDesignInspector }) => installHiggsfieldDesignInspector())
      .catch((error) => reportHiggsfieldError(error instanceof Error ? error : new Error("Design inspector unavailable"), { boundary: "design_inspector_import" }));
  }, []);
  return <QueryClientProvider client={queryClient}><Outlet /></QueryClientProvider>;
}
