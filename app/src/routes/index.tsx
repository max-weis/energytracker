import { createFileRoute } from "@tanstack/react-router";
import { Navigation } from "~/components/Navigation";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <h3>Welcome Home!!!</h3>
    </div>
  );
}
