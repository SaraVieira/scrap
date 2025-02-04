import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ProgressIndicator = ({
  currentStep = 1,
  onChangeStep,
}: {
  currentStep?: number;
  onChangeStep: (step: number) => void;
}) => {
  const [step, setStep] = useState(currentStep);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleContinue = () => {
    if (step < 3) {
      setStep(step + 1);
      setIsExpanded(false);
    }
  };

  const handleBack = () => {
    if (step == 2) {
      setIsExpanded(true);
    }
    if (step > 1) {
      setStep(step - 1);
    }
  };

  useEffect(() => {
    setStep(currentStep);
    onChangeStep(currentStep);
  }, [currentStep]);

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="flex items-center gap-6 relative">
        {[1, 2, 3].map((dot) => (
          <button onClick={() => setStep(dot)} key={dot}>
            <div
              key={dot}
              className={cn(
                "w-2 h-2 rounded-full relative z-10",
                dot <= step ? "bg-white" : "bg-gray-300"
              )}
            />
          </button>
        ))}

        {/* Green progress overlay */}
        <motion.div
          initial={{ width: "12px", height: "24px", x: 0 }}
          animate={{
            width: step === 1 ? "24px" : step === 2 ? "60px" : "96px",
            x: 0,
          }}
          className="absolute -left-[8px] -top-[8px] -translate-y-1/2 h-3 bg-green-500 rounded-full"
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            mass: 0.8,
            bounce: 0.25,
            duration: 0.6,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressIndicator;
