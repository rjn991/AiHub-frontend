import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export default function App() {
  return (
    <div className="h-full dark:bg-black bg-white dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2]">
      {/* Radial gradient for background effect */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      
      {/* Content Section */}
      <div className="min-h-svh flex flex-col items-center">
        <p className="text-center  text-black dark:text-white text-5xl font-semibold py-6">AI Hub</p>

        {/* Grid Layout with 3 Columns */}
        <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-6 max-w-6xl">
          <GridItem
            icon={<Box className="h-10 w-10 text-black dark:text-neutral-400" />}
            title="Do things the right way"
            description="Running out of copy so I'll write anything."
          />

          <GridItem
            icon={<Settings className="h-10 w-10 text-black dark:text-neutral-400" />}
            title="The best AI code editor ever."
            description="Yes, it's true. I'm not even kidding. Ask my mom if you don't believe me."
          />

          <GridItem
            icon={<Lock className="h-10 w-10 text-black dark:text-neutral-400" />}
            title="You should buy Aceternity UI Pro"
            description="It's the best money you'll ever spend."
          />

          <GridItem
            icon={<Sparkles className="h-10 w-10 text-black dark:text-neutral-400" />}
            title="This card is also built by Cursor"
            description="I'm not even kidding. Ask my mom if you don't believe me."
          />

          <GridItem
            icon={<Search className="h-10 w-10 text-black dark:text-neutral-400" />}
            title="Coming soon on Aceternity UI"
            description="I'm writing the code as I record this, no shit."
          />
        </ul>
      </div>
    </div>
  );
}

interface GridItemProps {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ icon, title, description }: GridItemProps) => {
  return (
    <li className="list-none">
      <div className="relative h-full rounded-2xl border p-4 shadow-md bg-white dark:bg-neutral-900 flex">
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        {/* Flexbox for proper layout */}
        <div className="relative flex flex-row items-center gap-4 p-6">
          {/* Icon on the left */}
          <div className="w-12 h-12 flex items-center justify-center rounded-lg border border-gray-600 p-2">
            {icon}
          </div>

          {/* Title and Description on the right */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-black dark:text-white">
              {title}
            </h3>
            <p className="text-sm text-black dark:text-neutral-400">
              {description}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};
