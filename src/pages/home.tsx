import { Button } from "@/components/ui/button";
import { useScrapeStore } from "@/lib/stores/scrape";

export const Home = () => {
  const { getFolders, folders, folderNames } = useScrapeStore();
  return (
    <>
      <Button onClick={getFolders}>Open me</Button>
      {JSON.stringify(folders, null, 2)}
      {JSON.stringify(folderNames, null, 2)}
    </>
  );
};
