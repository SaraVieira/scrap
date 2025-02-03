import * as z from "zod";

export interface ActionResponse<T = any> {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof T]?: string[];
  };
  inputs?: T;
}
export const formSchemaSettings = z.object({
  "default-frontend": z.string().min(1).optional(),
  "screenscraper-username": z.string().optional(),
  "screenscraper-password": z.string().optional(),
  scrappers: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});
