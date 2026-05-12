"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { ArrowDown, ArrowUp } from "lucide-react";

interface StatItem {
  percentage: string;
  company: string;
  label: string;
  isIncrease: boolean;
}

const stats: StatItem[] = [
  {
    percentage: "70%",
    label: "less time babysitting agents",
    isIncrease: false,
    company: "ANTHROPIC",
  },
  {
    percentage: "12x",
    label: "faster eval iteration",
    isIncrease: true,
    company: "OPENAI",
  },
  {
    percentage: "40%",
    label: "fewer failed runs",
    isIncrease: false,
    company: "MISTRAL",
  },
  {
    percentage: "5 min",
    label: "from harness to first run",
    isIncrease: true,
    company: "META",
  },
];

export default function Testimonial1() {
  return (
    <div className="bg-background w-full grid place-content-center py-24 px-4 md:px-8 lg:px-16 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 text-foreground px-4 py-1 rounded-full text-xs uppercase tracking-wider font-medium">
            Our Community
          </div>
        </div>

        <div className="text-center max-w-screen-xl mx-auto relative text-foreground">
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold leading-tight">
            Trusted by the teams shipping <br className="sm:hidden" />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="inline-block mx-2 align-middle relative">
                    <span className="block relative overflow-hidden sm:w-16 w-12 h-12 origin-center transition-all duration-300 md:hover:w-36 rounded-full border-2 border-white bg-white flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/froots-mark.svg"
                        alt="Froots"
                        className="w-3/4 h-3/4 object-contain"
                      />
                    </span>
                  </span>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="max-w-xs bg-white text-black p-4 rounded-lg shadow-lg border-none z-50"
                >
                  <p className="mb-2 text-sm">
                    &quot;Froots gave us one timeline across every harness we
                    were testing. Replays alone paid for itself in week one.&quot;
                  </p>
                  <p className="font-medium text-sm">Jordan, ML Eng</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            agents to production, with
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="inline-block mx-2 align-middle">
                    <span className="block relative overflow-hidden sm:w-16 w-14 h-14 origin-center transition-all duration-300 lg:hover:w-36 md:hover:w-24 rounded-full border-2 border-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80"
                        alt="Employee"
                        className="object-cover w-full h-full"
                      />
                    </span>
                  </span>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="max-w-xs bg-white text-black p-4 rounded-lg shadow-lg border-none z-50"
                >
                  <p className="mb-2 text-sm">
                    &quot;We point three different agents at the same task and
                    diff the runs. That&apos;s our entire eval loop now.&quot;
                  </p>
                  <p className="font-medium text-sm">Sam, Founder</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            full visibility into every run
          </h1>
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-foreground/70 leading-tight">
            and the controls to steer them
          </h1>
        </div>

        <div className="sm:flex grid grid-cols-2 gap-8 bg-white/5 mt-12 w-full mx-auto px-8 py-6 border rounded-md border-white/10">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="flex-1 flex gap-4 pl-10 relative"
            >
              {index !== 0 && (
                <div className="w-0.5 h-9 border border-dashed border-white/15 absolute left-0" />
              )}
              <div className="w-full h-full group">
                <div className="w-[85%] h-10 mx-auto flex items-center justify-center font-mono font-bold text-foreground/50 tracking-widest text-sm translate-y-0 group-hover:-translate-y-12 opacity-100 group-hover:opacity-0 transition-all duration-300 ease-out">
                  {stat.company}
                </div>
                <div className="absolute left-0 top-8 opacity-0 flex flex-col items-center justify-center w-full group-hover:-top-3.5 group-hover:opacity-100 transition-all duration-300 ease-out">
                  <div className="flex items-center justify-center gap-2 relative">
                    {stat.isIncrease ? (
                      <ArrowUp className="md:w-6 md:h-6 w-4 h-4 text-green-400" />
                    ) : (
                      <ArrowDown className="md:w-6 md:h-6 w-4 h-4 text-foreground" />
                    )}
                    <span className="md:text-4xl text-2xl font-semibold text-foreground">
                      {stat.percentage}
                    </span>
                  </div>
                  <p className="text-foreground/80 md:text-sm text-xs text-center capitalize">
                    {stat.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
