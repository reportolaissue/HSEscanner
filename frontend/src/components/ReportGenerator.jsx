import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Loader2 } from "lucide-react";
import { generateBatchPDF } from "@/utils/pdfGenerator";
import { toast } from "sonner";

export const ReportGenerator = ({ photos, stats }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateBatchPDF = async () => {
    if (photos.length === 0) {
      toast.error("No photos to generate report");
      return;
    }

    setIsGenerating(true);

    try {
      const fileName = generateBatchPDF(photos, stats);
      toast.success("Batch Report Generated", {
        description: `Downloaded: ${fileName}`
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate report", {
        description: error.message
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      data-testid="generate-report-button"
      onClick={handleGenerateBatchPDF}
      disabled={isGenerating || photos.length === 0}
      className="rounded-sm font-bold uppercase tracking-wider text-xs sm:text-sm"
    >
      {isGenerating ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <FileText className="w-4 h-4 mr-2" />
          Export All ({photos.length})
        </>
      )}
    </Button>
  );
};
