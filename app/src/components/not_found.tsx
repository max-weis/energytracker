import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";

export function NotFound({ children }: { children?: any }) {
  return (
    <div className="flex flex-col justify-center min-h-[50dvh] px-4 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
        404
      </h1>
      <h2 className="text-2xl font-semibold">Page not found</h2>

      <p className="text-muted-foreground">
        {children || <p>The page you are looking for does not exist.</p>}
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button asChild>
          <Link to="/">Back to Home</Link>
        </Button>
        <Button variant="outline" onClick={() => window.history.back()}>
          Go Back
        </Button>
      </div>
    </div>
  );
}
