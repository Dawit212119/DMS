"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  LogIn,
  LayoutDashboard,
  FolderKanban,
  Folder,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Container from "./container";
import authApi, {
  useGetMeQuery,
  useLogoutUserMutation,
} from "@/state/features/authApi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export default function Header() {
  const { data: user, error } = useGetMeQuery();
  console.log("Here is the user", user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const router = useRouter();
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();

      dispatch(authApi.util.resetApiState()); // Clears all cached queries/mutations
      router.push("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#f9f7f0] py-2 sm:py-3 md:py-4">
      <Container>
        <div className="flex h-12 sm:h-14 items-center justify-between">
          {/* Logo */}
          <Link href={"/"}>
            <div className="flex items-center gap-3 px-4 py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#0ea5e9] to-[#10b981] shadow-[0_0_15px_rgba(14,165,233,0.5)]">
                <Folder className="h-6 w-6 text-white" />
              </div>
              <div className="font-bold text-black text-lg tracking-tight">
                E<span className="text-[#10b981]">File</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation (visible on sm and above) */}
          <nav className="hidden sm:block flex-1 mx-4">
            <ul className="flex items-center justify-center space-x-4 md:space-x-6 xl:space-x-8">
              <li>
                <Link
                  href="/projects"
                  className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <FolderKanban className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Projects
                </Link>
              </li>
            </ul>
          </nav>

          {/* Sign In Button (visible on sm and above) */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <User />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => router.push("/myprojects")}>
                  My Projects
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:block">
              <Button asChild variant="outline" size="sm">
                <Link href="/sign-in" className="flex items-center gap-1.5">
                  <LogIn className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm">Sign In</span>
                </Link>
              </Button>
            </div>
          )}

          {/* Hamburger Menu Button (only visible below sm) */}
          <div className="sm:hidden">
            <button
              onClick={toggleMenu}
              aria-label="Toggle Menu"
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-primary/10 active:bg-primary/20 focus:outline-none"
            >
              <div className="relative h-5 w-6">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-0.5 w-6 rounded-full bg-gray-800 transition-all duration-300",
                    isMenuOpen ? "top-2 rotate-45" : ""
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-2 h-0.5 w-6 rounded-full bg-gray-800 transition-all duration-300",
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-4 h-0.5 w-6 rounded-full bg-gray-800 transition-all duration-300",
                    isMenuOpen ? "top-2 -rotate-45" : ""
                  )}
                />
              </div>
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu Overlay (only for screens below sm) */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 sm:hidden",
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Navigation Slide-in Menu from Top-Right (only for screens below sm) */}
      <div
        className={cn(
          "fixed top-0 right-0 z-50 h-screen w-4/5 max-w-xs bg-[#f9f7f0] shadow-xl transition-all duration-300 ease-in-out sm:hidden",
          isMenuOpen
            ? "translate-x-0 translate-y-0 opacity-100"
            : "translate-x-full -translate-y-full opacity-0"
        )}
      >
        {/* Menu Header with Close Button */}
        <div className="flex h-14 items-center justify-between border-b border-gray-200 px-4">
          <span className="text-sm font-medium">Menu</span>
          <button
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close Menu"
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-primary/10 active:bg-primary/20"
          >
            <div className="relative h-3 w-3">
              <span className="absolute left-0 top-1/2 h-0.5 w-3 -translate-y-1/2 rotate-45 rounded-full bg-gray-800" />
              <span className="absolute left-0 top-1/2 h-0.5 w-3 -translate-y-1/2 -rotate-45 rounded-full bg-gray-800" />
            </div>
          </button>
        </div>

        {/* Menu Content */}
        <div className="h-[calc(100%-3.5rem)] overflow-y-auto">
          <nav className="flex flex-col p-4">
            <ul className="flex flex-col space-y-4">
              <li>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 rounded-lg p-3 text-base font-medium text-gray-800 hover:bg-primary/10 active:bg-primary/20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/project"
                  className="flex items-center gap-3 rounded-lg p-3 text-base font-medium text-gray-800 hover:bg-primary/10 active:bg-primary/20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FolderKanban className="h-5 w-5" />
                  Projects
                </Link>
              </li>
            </ul>
            <div className="mt-6 border-t border-gray-200 pt-6">
              <Button
                asChild
                variant="default"
                size="default"
                className="w-full"
              >
                <Link
                  href="/sign-in"
                  className="flex items-center justify-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn className="h-5 w-5" />
                  Sign In
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
