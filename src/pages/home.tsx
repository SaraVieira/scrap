import FolderMapper from "@/components/FolderMapper";
import { Button } from "@/components/ui/button";
import ProgressIndicator from "@/components/ui/progress-indicator";
import { useScrapeStore } from "@/lib/stores/scrape";
import { useEffect, useState } from "react";

export const Home = () => {
  const { getFolders, folders } = useScrapeStore();
  const [step, setStep] = useState(1);

  const move = async () => {
    getFolders();
    setStep(2);
  };

  useEffect(() => {
    if (folders.length) setStep(2);
  }, []);
  return (
    <>
      <div className="mb-12">
        <ProgressIndicator currentStep={step} onChangeStep={setStep} />
      </div>

      {step === 1 ? (
        <Button onClick={move}>Select your rom folder</Button>
      ) : null}
      {step === 2 && <FolderMapper nextStep={console.log} />}
    </>
  );
};
