import { useCallback, useState } from "react";
import { Upload, ImagePlus, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const UploadZone = ({ onFilesSelected, isAnalyzing, uploadProgress }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files).filter(
      file => file.type.startsWith('image/')
    );
    
    if (files.length > 0) {
      onFilesSelected(files);
    }
  }, [onFilesSelected]);

  const handleFileInput = useCallback((e) => {
    const files = Array.from(e.target.files).filter(
      file => file.type.startsWith('image/')
    );
    
    if (files.length > 0) {
      onFilesSelected(files);
    }
    
    e.target.value = '';
  }, [onFilesSelected]);

  const progressEntries = Object.entries(uploadProgress);
  const hasProgress = progressEntries.length > 0;

  return (
    <div className="space-y-3 sm:space-y-4">
      <div
        data-testid="upload-dropzone"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-sm p-6 sm:p-8 md:p-12 text-center
          transition-colors cursor-pointer
          ${isDragging 
            ? 'border-primary bg-primary/5' 
            : 'border-muted-foreground/25 hover:border-muted-foreground/50 hover:bg-muted/30'
          }
          ${isAnalyzing ? 'pointer-events-none opacity-60' : ''}
        `}
      >
        {/* HUD Corners */}
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 w-4 sm:w-6 h-4 sm:h-6 border-l-2 border-t-2 border-cyan-500/40" />
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-4 sm:w-6 h-4 sm:h-6 border-r-2 border-t-2 border-cyan-500/40" />
        <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 w-4 sm:w-6 h-4 sm:h-6 border-l-2 border-b-2 border-cyan-500/40" />
        <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-4 sm:w-6 h-4 sm:h-6 border-r-2 border-b-2 border-cyan-500/40" />

        <div className="flex flex-col items-center gap-3 sm:gap-4">
          {isAnalyzing ? (
            <div className="p-3 sm:p-4 bg-primary/10 rounded-full">
              <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 text-primary animate-spin" />
            </div>
          ) : (
            <div className="p-3 sm:p-4 bg-muted rounded-full">
              <ImagePlus className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground" />
            </div>
          )}
          
          <div>
            <h3 className="text-base sm:text-lg font-heading font-semibold uppercase tracking-wide">
              {isAnalyzing ? 'Analyzing Photos...' : 'Upload Inspection Photos'}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {isAnalyzing 
                ? 'AI is scanning for safety violations'
                : 'Drag and drop photos here, or click to browse'
              }
            </p>
          </div>

          {!isAnalyzing && (
            <label>
              <input
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileInput}
                className="hidden"
                data-testid="file-input"
              />
              <Button
                data-testid="upload-button"
                className="rounded-sm font-bold uppercase tracking-wider text-xs sm:text-sm"
                size="default"
                asChild
              >
                <span>
                  <Upload className="w-4 h-4 mr-2" />
                  Select Photos
                </span>
              </Button>
            </label>
          )}

          <p className="text-[10px] sm:text-xs font-mono text-muted-foreground">
            Supported: JPG, PNG, WEBP
          </p>
        </div>
      </div>

      {/* Upload Progress */}
      {hasProgress && (
        <div className="space-y-2 bg-card border border-border rounded-sm p-3 sm:p-4">
          <p className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2 sm:mb-3">
            Processing Queue
          </p>
          {progressEntries.map(([fileName, { status, progress }]) => (
            <div key={fileName} className="flex items-center gap-2 sm:gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs sm:text-sm truncate font-mono pr-2">{fileName}</p>
                  <span className="text-[10px] sm:text-xs text-muted-foreground capitalize flex-shrink-0">
                    {status === 'complete' && <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500 inline" />}
                    {status === 'error' && <XCircle className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 inline" />}
                    {status === 'analyzing' && 'Analyzing...'}
                    {status === 'converting' && 'Converting...'}
                    {status === 'uploading' && 'Uploading...'}
                  </span>
                </div>
                <Progress value={progress} className="h-1" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
