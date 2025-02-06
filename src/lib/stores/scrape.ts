import { invoke } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CONSOLES } from "../consoles";

export interface FolderMapping {
  name: string;
  path: string;

  mapping?: (typeof CONSOLES)[0];
}

type ScrapeStoreState = {
  folders: {
    name: string;
    path: string;
    mapping: (typeof CONSOLES)[0] | null;
  }[];
  mappings: FolderMapping[];
};

type ScrapeStoreActions = {
  getFolders: () => void;
  setMappings: (
    newMapping: ScrapeStoreState["folders"][9]["mapping"],
    path: string
  ) => void;
  removeFolder: (path: string) => void;
  startScrapping: () => void;
};

type ScrapeStore = ScrapeStoreState & ScrapeStoreActions;

export const useScrapeStore = create<ScrapeStore>()(
  persist(
    (set, get) => ({
      folders: [],
      mappings: [],
      setMappings: (newMapping, path) => {
        const newMapIndex = get().folders.findIndex((f) => f.path == path);
        let folders = get().folders;
        folders[newMapIndex] = {
          ...folders[newMapIndex],
          mapping: newMapping,
        };
        set({ folders });
      },
      removeFolder: (path: string) => {
        set({
          folders: get().folders.filter((f) => f.path !== path),
        });
      },
      startScrapping: async () => {
        const folders = get().folders;
        await invoke("scrape", {
          folders,
        });
      },
      getFolders: async () => {
        const folderPath = await open({
          multiple: false,
          directory: true,
        });
        const folders = (await invoke("list_folders", {
          path: folderPath,
        })) as unknown as ScrapeStore["folders"];
        set({
          folders: folders.map((folder) => ({
            ...folder,
            mapping:
              CONSOLES.find(
                (console) =>
                  console.folderNames.includes(
                    folder.name.toLocaleLowerCase()
                  ) ||
                  console.folderNames.includes(folder.name.toLocaleUpperCase())
              ) || null,
          })),
        });
      },
    }),
    { name: "scrape-storage", storage: createJSONStorage(() => sessionStorage) }
  )
);
