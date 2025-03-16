import { useState, useEffect } from "react";
import axios from "axios";
import { GlowingEffect } from "@/components/ui/glowing-effect";

interface Tool {
  toolId: number;
  toolName: string;
  toolUrl: string;
  toolImgUrl: string;
}

export default function App() {
  const [tools, setTools] = useState<Tool[]>([]); // Define state with type Tool[]
  const apiUrl: string = import.meta.env.VITE_API_URL
  useEffect(() => {
    axios
      .get(apiUrl) // Fetch from env variable
      .then((response) => setTools(response.data))
      .catch((error) => console.error("Error fetching tools:", error));
  }, []);

  return (
    <div className="h-full dark:bg-black bg-white dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2]">
      {/* Radial gradient for background effect */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      {/* Content Section */}
      <div className="min-h-svh flex flex-col items-center">
        <p className="text-center text-black dark:text-white text-5xl font-semibold py-6">
          AI Hub
        </p>

        {/* Grid Layout with 3 Columns */}
        <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-6 pb-6 max-w-6xl">
          {tools.map((tool) => (
            <GridItem key={tool.toolId} tool={tool} />
          ))}
        </ul>
      </div>
    </div>
  );
}

interface ToolProps {
  tool: Tool; // Using the defined Tool interface
}

const GridItem = ({ tool }: ToolProps) => {
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
        <div className="relative flex flex-row items-center gap-4 p-2 md:p-6">
          {/* Tool Image on the left */}
          <div className="h-16 w-16 flex items-center justify-center rounded-lg p-2 overflow-hidden">
            <img
              src={tool.toolImgUrl}
              alt={tool.toolName}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Tool Name and URL on the right */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-stone-900 dark:text-white">
              {tool.toolName}
            </h3>
            <a
              href={tool.toolUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-stone-600 dark:text-blue-400 underline block truncate max-w-[200px]"
            >
              {tool.toolUrl}
            </a>
          </div>
        </div>
      </div>
    </li>
  );
};
