import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flag, AlertTriangle, Shield, Eye } from "lucide-react";

const getRiskBadgeClass = (riskLevel) => {
  switch (riskLevel) {
    case 'High':
      return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800';
    case 'Medium':
      return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800';
    case 'Low':
      return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const PhotoCard = ({ photo, onSelect, onToggleFlag }) => {
  const { analysisResults, previewUrl, fileName, flaggedForFollowUp } = photo;
  const { riskLevel, safetyScore, violations } = analysisResults;
  
  const topViolations = violations.slice(0, 2);
  const hasMoreViolations = violations.length > 2;

  return (
    <Card 
      data-testid={`photo-card-${photo.photoId}`}
      className="group overflow-hidden rounded-sm border border-border bg-card hover:border-primary/50 transition-colors photo-card-hover"
    >
      {/* Image Container */}
      <div className="relative aspect-video bg-muted overflow-hidden">
        <img 
          src={previewUrl} 
          alt={fileName}
          className="w-full h-full object-cover"
        />
        
        {/* HUD Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-safety-cyan/60" />
          <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-safety-cyan/60" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-safety-cyan/60" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-safety-cyan/60" />
        </div>
        
        {/* Risk Badge */}
        <Badge 
          className={`absolute top-3 right-3 rounded-none px-2 py-0.5 text-xs font-bold uppercase tracking-widest border ${getRiskBadgeClass(riskLevel)} ${riskLevel === 'High' ? 'risk-badge-high' : ''}`}
        >
          {riskLevel}
        </Badge>

        {/* Flag Button */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-3 left-3 h-8 w-8 ${flaggedForFollowUp ? 'text-amber-500' : 'text-white/70 hover:text-white'}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFlag(photo.photoId);
          }}
          data-testid={`flag-button-${photo.photoId}`}
        >
          <Flag className="w-4 h-4" fill={flaggedForFollowUp ? 'currentColor' : 'none'} />
        </Button>

        {/* Hover Overlay */}
        <div 
          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
          onClick={() => onSelect(photo)}
        >
          <Button variant="secondary" size="sm" className="rounded-sm uppercase tracking-wider font-bold">
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
        </div>
      </div>

      {/* Card Content */}
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-mono truncate flex-1" title={fileName}>
            {fileName}
          </p>
          <div className="flex items-center gap-1 ml-2">
            <Shield className="w-4 h-4 text-muted-foreground" />
            <span className={`text-sm font-bold font-mono ${
              safetyScore >= 70 ? 'text-emerald-500' : 
              safetyScore >= 40 ? 'text-amber-500' : 'text-red-500'
            }`}>
              {safetyScore}%
            </span>
          </div>
        </div>

        {/* Violations Summary */}
        {violations.length > 0 ? (
          <div className="space-y-1.5">
            {topViolations.map((violation, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs">
                <AlertTriangle className={`w-3 h-3 flex-shrink-0 ${
                  violation.confidence >= 80 ? 'text-red-500' : 'text-amber-500'
                }`} />
                <span className="truncate text-muted-foreground">{violation.type}</span>
                <span className="font-mono text-muted-foreground/70 ml-auto">
                  {violation.confidence}%
                </span>
              </div>
            ))}
            {hasMoreViolations && (
              <p className="text-xs text-muted-foreground font-mono">
                +{violations.length - 2} more violations
              </p>
            )}
          </div>
        ) : (
          <p className="text-xs text-emerald-500 font-mono">No violations detected</p>
        )}
      </CardContent>
    </Card>
  );
};

export const AnalysisGallery = ({ photos, onSelectPhoto, onToggleFlag }) => {
  return (
    <div 
      data-testid="analysis-gallery"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 stagger-in"
    >
      {photos.map((photo) => (
        <PhotoCard
          key={photo.photoId}
          photo={photo}
          onSelect={onSelectPhoto}
          onToggleFlag={onToggleFlag}
        />
      ))}
    </div>
  );
};
