"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { formSchemaSettings } from "@/lib/schemas";
import {
  useSettingsStore,
  FRONTEND_OPTIONS,
  SCRAPPERS,
} from "@/lib/stores/settings";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

export function SettingsForm() {
  const { setSettings, screenscrapper, scrappers, defaultFrontend } =
    useSettingsStore();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchemaSettings>>({
    resolver: zodResolver(formSchemaSettings),
    defaultValues: {
      "screenscraper-password": screenscrapper?.password,
      "screenscraper-username": screenscrapper?.username,
      "default-frontend": defaultFrontend || "emulation-station",
      scrappers,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchemaSettings>) {
    setSettings({
      screenscrapper: {
        username: values["screenscraper-username"],
        password: values["screenscraper-password"],
      },
      defaultFrontend: values["default-frontend"],
      scrappers: values.scrappers,
    });
    toast({
      description: "Settings saved",
    });
  }

  return (
    <div>
      <Form {...form}>
        <form
          className="flex flex-col w-full mx-auto gap-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="default-frontend"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Default Frontend</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {FRONTEND_OPTIONS.map(({ label, value }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="scrappers"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Scrappers to use</FormLabel>
                </div>
                {SCRAPPERS.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="scrappers"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          <h2 className="text-lg font-bold mt-8">Screenscraper Settings</h2>
          <FormField
            control={form.control}
            name="screenscraper-username"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your username"
                    type={"text"}
                    value={field.value}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val);
                    }}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="screenscraper-password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your password"
                    type={"password"}
                    value={field.value}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val);
                    }}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end items-center w-full pt-3">
            <Button className="rounded-lg" size="sm">
              {false ? "Submitting..." : "Save"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export const Settings = () => {
  return (
    <>
      <SettingsForm />
    </>
  );
};
