import { invoke } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { dirname } from "@tauri-apps/api/path";

type ScrapeStoreState = {
  folders: string[];
  folderNames: string[];
};

type ScrapeStoreActions = {
  getFolders: () => void;
};

type ScrapeStore = ScrapeStoreState & ScrapeStoreActions;

export const useScrapeStore = create<ScrapeStore>()(
  persist(
    (set) => ({
      folders: [],
      folderNames: [],
      getFolders: async () => {
        const folderPath = await open({
          multiple: false,
          directory: true,
        });
        const folders = (await invoke("list_folders", {
          path: folderPath,
        })) as unknown as string[];
        set({
          folders,
          folderNames: folders.map((path) => {
            const folderName = path.split(
              path.match(/(.*)[\/\\]/)?.[1] || ""
            )[1];

            if (folderName.endsWith("/"))
              return folderName.substring(0, folderName.length - 1);

            if (folderName.startsWith("/")) return folderName.substring(1);

            return folderName;
          }),
        });
      },
    }),
    { name: "settings-storage" }
  )
);
