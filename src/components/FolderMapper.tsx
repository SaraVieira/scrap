import { CONSOLES } from "@/lib/consoles";
import { useScrapeStore } from "@/lib/stores/scrape";
import { AutoComplete } from "./ui/autocomplete";
import { XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function FolderMapper({ nextStep }: { nextStep: () => void }) {
  const { setMappings, folders, removeFolder } = useScrapeStore();

  const handleMappingChange = (path: string, newMapping: string) =>
    setMappings(CONSOLES.find((c) => c.name === newMapping)!, path);

  return (
    <div className="w-full max-w-2xl mx-auto p-8">
      <ul className="space-y-4">
        {folders.map(({ name, path, mapping }) => (
          <li key={path} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {mapping?.icon && <img src={mapping.icon} className="w-12" />}

              <span className="font-medium">{name}</span>
            </div>
            <div className="flex gap-4">
              <AutoComplete
                options={CONSOLES.map((c) => ({
                  label: c.name,
                  value: c.name,
                }))}
                emptyMessage="No results."
                placeholder="Select a console"
                onValueChange={(value) =>
                  handleMappingChange(path, value.value)
                }
                value={
                  mapping
                    ? {
                        label: mapping.name,
                        value: mapping.name,
                      }
                    : undefined
                }
              />
              <Tooltip>
                <TooltipTrigger>
                  <Button variant={"ghost"} onClick={() => removeFolder(path)}>
                    <XIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Remove folder</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </li>
        ))}
      </ul>

      <Button className="w-full mt-8" onClick={nextStep}>
        Continue
      </Button>
    </div>
  );
}
