"use client";

import { useState, useRef, useEffect } from "react";
import { Check, Copy, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Prism from "prismjs";

// Import Prism core styles
import "prismjs/themes/prism.css";
// Import additional languages
import "prismjs/components/prism-c";
import "prismjs/components/prism-python";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModelCode } from "@/constants/demo";

interface CodeViewerProps {
  code: ModelCode;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
}

const languages = [
  { name: "Python", value: "python" },
  { name: "C++", value: "c" },
];

export function CodeViewer({
  code,
  language = "python",
  showLineNumbers = true,
  className,
}: CodeViewerProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(
    languages.find((lang) => lang.value === language) || languages[0]
  );
  const currentCode =
    selectedLanguage.value == "python" ? code.python : code.cpp;
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  // Apply syntax highlighting when component mounts or when code/language changes
  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, selectedLanguage]);

  const handleCopy = async () => {
    if (preRef.current) {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const lines = currentCode.split("\n");

  return (
    <div
      className={cn(
        "pb-2 mt-4 rounded-lg border  text-card-foreground shadow-sm",
        className
      )}
    >
      <div className="flex items-start justify-between border-b  px-4 py-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1 px-2 font-mono text-xs"
            >
              {selectedLanguage.name}
              <ChevronDown className="h-3.5 w-3.5 opacity-70" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.value}
                onClick={() => setSelectedLanguage(lang)}
                className="font-mono text-xs hover:bg-zinc-200/60 focus:!bg-zinc-200/60"
              >
                {lang.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={handleCopy}
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4 opacity-70" />
          )}
        </Button>
      </div>
      <ScrollArea className="relative overflow-auto max-h-[600px] !bg-white">
        <div className="flex">
          {/* {showLineNumbers && (
            <div className="select-none border-r bg-muted/30 px-3 py-4 font-mono text-xs text-muted-foreground">
              {lines.map((_, i) => (
                <div key={i} className="text-right">
                  {i + 1}
                </div>
              ))}
            </div>
          )} */}
          <pre
            ref={preRef}
            className={cn(
              "flex-1 overflow-x-auto  font-mono text-xs !bg-white",
              showLineNumbers ? "pl-2" : "pl-4"
            )}
          >
            <code
              ref={codeRef}
              className={`language-${selectedLanguage.value}`}
            >
              {currentCode}
            </code>
          </pre>
        </div>
      </ScrollArea>
    </div>
  );
}
