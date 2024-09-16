"use client";

import { useState, useEffect } from "react";
import { CircularProgress } from "./components/ui/circular-progress";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { GithubIcon, MoonIcon, SunIcon } from "lucide-react";

export default function CircularProgressDemo() {
  const { theme, setTheme } = useTheme();

  const [isClient, setIsClient] = useState(false);
  const [progress, setProgress] = useState(75);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 5
      );
    }, 777);
    return () => clearInterval(timer);
  }, []);

  if (!isClient) return null;

  return (
    <div className="h-screen w-full mx-auto flex items-center flex-col">
      <header className="flex fixed z-50 top-0 justify-between w-full border-[1px] border-border h-16 px-8 md:px-16 items-center">
        <span className="font-semibold">Circular Progress Variants</span>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <MoonIcon size={16} /> : <SunIcon size={16} />}
        </Button>
      </header>

      <div className="container gap-6 h-dvh items-center justify-center flex flex-col relative w-full max-w-4xl p-6 bg-background rounded-lg">
        <div className="grid py-16 rounded-lg grid-cols-2 md:grid-cols-3 gap-8 w-full">
          <div className="flex flex-col items-center">
            <CircularProgress progress={progress} variant="primary" size="sm" />
            <p className="mt-2 text-sm font-medium text-foreground">
              Primary (Small)
            </p>
          </div>
          <div className="flex flex-col items-center">
            <CircularProgress progress={progress} variant="warning" size="md" />
            <p className="mt-2 text-sm font-medium text-foreground">
              Warning (Medium)
            </p>
          </div>
          <div className="flex flex-col items-center">
            <CircularProgress progress={progress} variant="success" size="lg" />
            <p className="mt-2 text-sm font-medium text-foreground">
              Success (Large)
            </p>
          </div>
          <div className="flex flex-col items-center">
            <CircularProgress progress={progress} variant="danger" size="sm" />
            <p className="mt-2 text-sm font-medium text-foreground">
              Danger (Small)
            </p>
          </div>
          <div className="flex flex-col items-center">
            <CircularProgress progress={progress} variant="primary" size="md" />
            <p className="mt-2 text-sm font-medium text-foreground">
              Primary (Medium)
            </p>
          </div>
          <div className="flex flex-col items-center">
            <CircularProgress progress={progress} variant="warning" size="lg" />
            <p className="mt-2 text-sm font-medium text-foreground">
              Warning (Large)
            </p>
          </div>
        </div>
      </div>

      <footer className="absolute gap-4 left-0 right-0 bottom-0 flex justify-center items-center h-32">
        <a
          target="_blank"
          href="https://github.com/diegofrr/circular-progress"
          className="inline-flex gap-2 items-center text-sm hover:underline"
        >
          <GithubIcon size={14} />
          Github
        </a>
        <span className="text-muted-foreground">|</span>
        <span className="text-xs text-muted-foreground">By Diêgo Ferreira</span>
      </footer>
    </div>
  );
}
