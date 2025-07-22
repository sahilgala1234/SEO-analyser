import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { SeoData } from "@/types/seo";

interface SeoOverviewProps {
  seoData: SeoData;
}

export default function SeoOverview({ seoData }: SeoOverviewProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-green-50";
    if (score >= 60) return "bg-yellow-50";
    return "bg-red-50";
  };

  const recommendations = seoData.recommendations;
  const errorCount = recommendations.filter(r => r.type === 'error').length;
  const warningCount = recommendations.filter(r => r.type === 'warning').length;
  const successCount = recommendations.filter(r => r.type === 'success').length;
  const totalTags = (seoData.title ? 1 : 0) +
                   (seoData.metaDescription ? 1 : 0) +
                   Object.keys(seoData.openGraph || {}).filter(k => seoData.openGraph?.[k as keyof typeof seoData.openGraph]).length +
                   Object.keys(seoData.twitterCard || {}).filter(k => seoData.twitterCard?.[k as keyof typeof seoData.twitterCard]).length;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">SEO Health Overview</h3>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className={`text-sm font-medium ${getScoreColor(seoData.score)}`}>
              {seoData.score}/100
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{totalTags}</div>
            <div className="text-xs text-gray-600">Tags Found</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{warningCount}</div>
            <div className="text-xs text-gray-600">Warnings</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{errorCount}</div>
            <div className="text-xs text-gray-600">Missing</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{successCount}</div>
            <div className="text-xs text-gray-600">Optimized</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <Progress value={seoData.score} className="w-full" />
      </CardContent>
    </Card>
  );
}
