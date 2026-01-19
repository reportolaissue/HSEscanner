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
    
    // Reset input
    e.target.value = '';
  }, [onFilesSelected]);

  const progressEntries = Object.entries(uploadProgress);
  const hasProgress = progressEntries.length > 0;

  return (
    <div className="space-y-4">
      <div
        data-testid="upload-dropzone"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-sm p-12 text-center
          transition-colors cursor-pointer
          ${isDragging 
            ? 'border-primary bg-primary/5' 
            : 'border-muted-foreground/25 hover:border-muted-foreground/50 hover:bg-muted/30'
          }
          ${isAnalyzing ? 'pointer-events-none opacity-60' : ''}
        `}
      >
        {/* HUD Corners */}
        <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-safety-cyan/40" />
        <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-safety-cyan/40" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-safety-cyan/40" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-safety-cyan/40" />

        <div className="flex flex-col items-center gap-4">
          {isAnalyzing ? (
            <div className="p-4 bg-primary/10 rounded-full">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
          ) : (
            <div className="p-4 bg-muted rounded-full">
              <ImagePlus className="w-10 h-10 text-muted-foreground" />
            </div>
          )}
          
          <div>
            <h3 className="text-lg font-heading font-semibold uppercase tracking-wide">
              {isAnalyzing ? 'Analyzing Photos...' : 'Upload Inspection Photos'}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
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
                className="rounded-sm font-bold uppercase tracking-wider"
                asChild
              >
                <span>
                  <Upload className="w-4 h-4 mr-2" />
                  Select Photos
                </span>
              </Button>
            </label>
          )}

          <p className="text-xs font-mono text-muted-foreground">
            Supported formats: JPG, PNG, WEBP
          </p>
        </div>
      </div>

      {/* Upload Progress */}
      {hasProgress && (
        <div className="space-y-2 bg-card border border-border rounded-sm p-4">
          <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
            Processing Queue
          </p>
          {progressEntries.map(([fileName, { status, progress }]) => (
            <div key={fileName} className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm truncate font-mono">{fileName}</p>
                  <span className="text-xs text-muted-foreground capitalize">
                    {status === 'complete' && <CheckCircle2 className="w-4 h-4 text-emerald-500 inline" />}
                    {status === 'error' && <XCircle className="w-4 h-4 text-red-500 inline" />}
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
