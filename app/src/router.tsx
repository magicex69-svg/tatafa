import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// The static build is path-agnostic: it is served from wherever index.html sits
// (for example /tatafa/ on GitHub Pages). The folder is read from the address at runtime
// and hidden from the router, so routes always see "/".
const prefix = typeof window !== "undefined" ? window.location.pathname.replace(/\/[^/]*$/, "") : "";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    rewrite: prefix
      ? {
          input: ({ url }) => {
            if (url.pathname.startsWith(prefix)) url.pathname = url.pathname.slice(prefix.length) || "/";
            return url;
          },
          output: ({ url }) => {
            if (!url.pathname.startsWith(prefix + "/")) url.pathname = prefix + url.pathname;
            return url;
          },
        }
      : undefined,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
