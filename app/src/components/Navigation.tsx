import { Link, useLocation } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { cn } from "~/lib/utils";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const items = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Readings",
    href: "/readings",
  },
  {
    title: "Reports",
    href: "/reports",
  },
  {
    title: "Prices",
    href: "/prices",
  },
];

export function Navigation() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-background text-foreground w-full border-b pl-4">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-lg">EnergyTracker</span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              {items.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      navigationMenuTriggerStyle(),
                      location.pathname === item.href &&
                      "text-primary",
                    )}
                  >
                    <Link to={item.href}>{item.title}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-2 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-bold text-lg">EnergyTracker</span>
            </Link>
            <div className="mt-6 flex flex-col space-y-3">
              {items.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary py-1",
                    location.pathname === item.href
                      ? "text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link to="/" className="mr-6 flex items-center space-x-2 md:hidden">
              <span className="font-bold">EnergyTracker</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
