import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flag, AlertTriangle, Shield, Eye, CheckCircle } from "lucide-react";

const getRiskBadgeClass = (riskLevel) => {
  switch (riskLevel) {
    case 'High':
      return 'bg-red-500 text-white border-red-600';
    case 'Medium':
      return 'bg-amber-500 text-white border-amber-600';
    case 'Low':
      return 'bg-emerald-500 text-white border-emerald-600';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const PhotoCard = ({ photo, onSelect, onToggleFlag }) => {
  const { analysisResults, previewUrl, fileName, flaggedForFollowUp } = photo;
  const { riskLevel, safetyScore, violations } = analysisResults;
  
  const topViolations = violations.slice(0, 3);
  const hasMoreViolations = violations.length > 3;

  return (
    <Card 
      data-testid={`photo-card-${photo.photoId}`}
      className="group overflow-hidden rounded-sm border border-border bg-card hover:border-primary/50 transition-colors cursor-pointer"
      onClick={() => onSelect(photo)}
    >
      {/* Image Container */}
      <div className="relative aspect-video bg-slate-900 overflow-hidden">
        <img 
          src={previewUrl} 
          alt={fileName}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        
        {/* HUD Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-400/60" />
          <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-cyan-400/60" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-cyan-400/60" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-400/60" />
        </div>
        
        {/* Risk Badge */}
        <Badge 
          className={`absolute top-3 right-3 rounded-none px-2 py-1 text-xs font-bold uppercase tracking-widest ${getRiskBadgeClass(riskLevel)} ${riskLevel === 'High' ? 'animate-pulse' : ''}`}
        >
          {riskLevel} RISK
        </Badge>

        {/* Flag Button */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-3 left-3 h-8 w-8 bg-black/50 backdrop-blur-sm ${flaggedForFollowUp ? 'text-amber-500' : 'text-white/70 hover:text-white'}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFlag(photo.photoId);
          }}
          data-testid={`flag-button-${photo.photoId}`}
        >
          <Flag className="w-4 h-4" fill={flaggedForFollowUp ? 'currentColor' : 'none'} />
        </Button>

        {/* Safety Score Overlay */}
        <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-sm">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className={`text-lg font-mono font-bold ${
              safetyScore >= 70 ? 'text-emerald-400' : 
              safetyScore >= 40 ? 'text-amber-400' : 'text-red-400'
            }`}>
              {safetyScore}%
            </span>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button variant="secondary" size="sm" className="rounded-sm uppercase tracking-wider font-bold">
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
        </div>
      </div>

      {/* Card Content */}
      <CardContent className="p-4 bg-card">
        <p className="text-sm font-mono truncate mb-3 text-foreground" title={fileName}>
          {fileName}
        </p>

        {/* Violations Summary */}
        {violations.length > 0 ? (
          <div className="space-y-2">
            {topViolations.map((violation, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs">
                <AlertTriangle className={`w-3 h-3 flex-shrink-0 ${
                  violation.confidence >= 80 ? 'text-red-500' : 'text-amber-500'
                }`} />
                <span className="truncate flex-1 text-muted-foreground">{violation.type}</span>
                <span className="font-mono text-muted-foreground">
                  {violation.confidence}%
                </span>
              </div>
            ))}
            {hasMoreViolations && (
              <p className="text-xs text-primary font-mono">
                +{violations.length - 3} more violations
              </p>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs text-emerald-500">
            <CheckCircle className="w-3 h-3" />
            <span className="font-mono">No violations detected</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const AnalysisGallery = ({ photos, onSelectPhoto, onToggleFlag }) => {
  if (photos.length === 0) {
    return null;
  }

  return (
    <div 
      data-testid="analysis-gallery"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {photos.map((photo, index) => (
        <div 
          key={photo.photoId} 
          className="animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <PhotoCard
            photo={photo}
            onSelect={onSelectPhoto}
            onToggleFlag={onToggleFlag}
          />
        </div>
      ))}
    </div>
  );
};
