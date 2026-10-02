import { createFileRoute, redirect } from "@tanstack/react-router";

// The inherited app route is not part of this independent website.
export const Route = createFileRoute("/app")({
  beforeLoad: () => { throw redirect({ to: "/" }); },
  component: () => null,
});
