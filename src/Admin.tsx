import { useState, useEffect } from "react";
import axios from "axios";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Trash2, Plus } from "lucide-react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Tool {
  toolId: number;
  toolName: string;
  toolUrl: string;
  toolImgUrl: string;
}

export default function Admin() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [newTool, setNewTool] = useState({ toolName: "", toolUrl: "" });
  const [file, setFile] = useState<File | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const apiUrl: string = import.meta.env.VITE_API_URL;

  const fetchTools = () => {
    axios
      .get(apiUrl)
      .then((response) => setTools(response.data))
      .catch((error) => console.error("Error fetching tools:", error));
  };

  useEffect(() => {
    fetchTools();
  }, []);

  const handleDelete = (toolId: number) => {
    axios
      .delete(`${apiUrl}${toolId}`)
      .then(() => fetchTools())
      .catch((error) => console.error("Error deleting tool:", error));
  };

  const handleAddTool = async () => {
    if (!file) return alert("Please select a file");

    try {
      // Step 1: Get Pre-Signed URL
      const { data } = await axios.get(`${apiUrl}s3/generate-put-url?fileName=${file.name}`);
      const presignedUrl = data.presignedUrl;

      // Step 2: Upload File to S3
      await axios.put(presignedUrl, file, {
        headers: { "Content-Type": file.type },
      });

      // Step 3: Save Tool Data
      const toolData = {
        toolName: newTool.toolName,
        toolUrl: newTool.toolUrl, // Entered manually
        toolImgUrl: presignedUrl.split("?")[0], // Extracted clean URL
      };

      await axios.post(apiUrl, toolData);
      fetchTools();
      setIsDrawerOpen(false);
    } catch (error) {
      console.error("Error adding tool:", error);
    }
  };

  return (
    <div className="h-full dark:bg-black bg-white dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2]">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <div className="min-h-svh flex flex-col items-center">
        <p className="text-center text-black dark:text-white text-5xl font-semibold py-6">
          Admin Hub
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-6 pb-6 max-w-6xl">
          {tools.map((tool) => (
            <GridItem key={tool.toolId} tool={tool} onDelete={handleDelete} />
          ))}

          {/* Add New Tool */}
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <li className="list-none relative cursor-pointer">
                <div className="relative h-full rounded-2xl border p-4 shadow-md bg-white dark:bg-neutral-900 flex flex-col justify-center items-center">
                  <GlowingEffect blur={0} borderWidth={3} spread={80} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
                  <Plus size={40} className="text-stone-600 dark:text-white" />
                  <p className="mt-2 text-lg font-semibold text-stone-900 dark:text-white">Add New</p>
                </div>
              </li>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Add New Tool</DrawerTitle>
                <DrawerDescription>Provide details and upload an image.</DrawerDescription>
              </DrawerHeader>
              <div className="p-4 space-y-4">
                <Input
                  placeholder="Tool Name"
                  value={newTool.toolName}
                  onChange={(e) => setNewTool({ ...newTool, toolName: e.target.value })}
                />
                <Input
                  placeholder="Tool URL"
                  value={newTool.toolUrl}
                  onChange={(e) => setNewTool({ ...newTool, toolUrl: e.target.value })}
                />
                <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              </div>
              <DrawerFooter>
                <Button onClick={handleAddTool}>Add Tool</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </ul>
      </div>
    </div>
  );
}

interface ToolProps {
  tool: Tool;
  onDelete: (toolId: number) => void;
}

const GridItem = ({ tool, onDelete }: ToolProps) => {
  return (
    <li className="list-none relative">
      <div className="relative h-full rounded-2xl border p-4 shadow-md bg-white dark:bg-neutral-900 flex flex-col">
        <GlowingEffect blur={0} borderWidth={3} spread={80} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
        <div>
          <div className="relative flex flex-row items-center gap-4 p-2 md:p-6">
            <div className="h-16 w-16 flex items-center justify-center rounded-lg p-2 overflow-hidden">
              <img src={tool.toolImgUrl} alt={tool.toolName} className="w-full h-full object-cover rounded-lg" />
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-semibold text-stone-900 dark:text-white">{tool.toolName}</h3>
              <a href={tool.toolUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-stone-600 dark:text-blue-400 underline block truncate max-w-[200px]">
                {tool.toolUrl}
              </a>
            </div>
          </div>
        </div>

        <div className="ml-auto">
          <button className="p-2" aria-label="Delete Tool" onClick={() => onDelete(tool.toolId)}>
            <Trash2 size={20} color="#FF4040" />
          </button>
        </div>
      </div>
    </li>
  );
};
