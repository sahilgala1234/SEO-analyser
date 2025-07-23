import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
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

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-6 w-6 text-green-600" />;
    if (score >= 60) return <AlertTriangle className="h-6 w-6 text-yellow-600" />;
    return <XCircle className="h-6 w-6 text-red-600" />;
  };

  const getScoreStatus = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Work";
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
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            {getScoreIcon(seoData.score)}
          </div>
          <div className={`text-4xl font-bold ${getScoreColor(seoData.score)} mb-2`}>
            {seoData.score}/100
          </div>
          <div className="text-lg text-gray-700 font-medium mb-1">
            {getScoreStatus(seoData.score)}
          </div>
          <div className="text-sm text-gray-600">
            Overall SEO Health Score
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-green-100">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">{successCount}</div>
            <div className="text-xs text-gray-600 font-medium">Optimized</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-blue-100">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600">{totalTags}</div>
            <div className="text-xs text-gray-600 font-medium">Tags Found</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-yellow-100">
            <div className="flex items-center justify-center mb-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-yellow-600">{warningCount}</div>
            <div className="text-xs text-gray-600 font-medium">Warnings</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-red-100">
            <div className="flex items-center justify-center mb-2">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-red-600">{errorCount}</div>
            <div className="text-xs text-gray-600 font-medium">Missing</div>
          </div>
        </div>
        
        {/* Enhanced Progress Bar */}
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">SEO Score Progress</span>
            <span className={`text-sm font-bold ${getScoreColor(seoData.score)}`}>
              {seoData.score}%
            </span>
          </div>
          <Progress value={seoData.score} className="h-3" />
        </div>
      </CardContent>
    </Card>
  );
}
