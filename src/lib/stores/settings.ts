import { create } from "zustand";
import { persist } from "zustand/middleware";

export const SCRAPPERS = [
  {
    id: "screenscraper",
    label: "Screenscraper",
  },
  {
    id: "thegamesdb",
    label: "TheGamesDb",
  },
  {
    id: "arcadedb",
    label: "ArcadeDB",
  },
] as const;

type SettingsStoreState = {
  screenscrapper: {
    username: string | undefined;
    password: string | undefined;
  };
  defaultFrontend: string;
  scrappers: string[];
};

export const FRONTEND_OPTIONS = [
  { value: "emulation-station", label: "Emulation Station" },
  { value: "pegasus", label: "Pegasus" },
  { value: "Custom", label: "Custom" },
];

type SettingsStoreActions = {
  setSettings: (newSettings: Partial<SettingsStoreState>) => void;
};

type SettingsStore = SettingsStoreState & SettingsStoreActions;

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      screenscrapper: {
        username: "",
        password: "",
      },
      defaultFrontend: "",
      scrappers: SCRAPPERS.map((s) => s.id),
      setSettings: (values) => {
        Object.keys(values).map((k) => {
          // @ts-ignore
          if (values[k]) {
            // @ts-ignore
            set({ [k]: values[k] });
          }
        });
      },
    }),
    { name: "settings-storage" }
  )
);
