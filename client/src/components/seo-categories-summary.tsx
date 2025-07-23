import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle, XCircle, FileText, Share2, Search, Eye } from "lucide-react";
import type { SeoData } from "@/types/seo";

interface SeoCategoriesSummaryProps {
  seoData: SeoData;
}

export default function SeoCategoriesSummary({ seoData }: SeoCategoriesSummaryProps) {
  // Calculate category scores
  const getBasicSeoScore = () => {
    let score = 0;
    let maxScore = 40;
    
    // Title scoring
    if (seoData.title) {
      const length = seoData.title.length;
      if (length >= 50 && length <= 60) score += 20;
      else if (length >= 30) score += 15;
      else if (length > 0) score += 10;
    }
    
    // Meta description scoring
    if (seoData.metaDescription) {
      const length = seoData.metaDescription.length;
      if (length >= 150 && length <= 160) score += 20;
      else if (length >= 120) score += 15;
      else if (length > 0) score += 10;
    }
    
    return Math.round((score / maxScore) * 100);
  };

  const getSocialSeoScore = () => {
    let score = 0;
    const ogTags = ['title', 'description', 'image', 'url'];
    const twitterTags = ['card', 'title', 'description', 'image'];
    
    // Open Graph scoring
    const ogPresent = ogTags.filter(tag => seoData.openGraph?.[tag as keyof typeof seoData.openGraph]);
    score += (ogPresent.length / ogTags.length) * 50;
    
    // Twitter Card scoring
    const twitterPresent = twitterTags.filter(tag => seoData.twitterCard?.[tag as keyof typeof seoData.twitterCard]);
    score += (twitterPresent.length / twitterTags.length) * 50;
    
    return Math.round(score);
  };

  const getVisibilityScore = () => {
    // Based on how well the site will appear in search and social
    const hasTitle = !!seoData.title;
    const hasDescription = !!seoData.metaDescription;
    const hasOgImage = !!seoData.openGraph?.image;
    const hasTwitterImage = !!seoData.twitterCard?.image;
    
    let score = 0;
    if (hasTitle) score += 25;
    if (hasDescription) score += 25;
    if (hasOgImage || hasTwitterImage) score += 30;
    if (hasOgImage && hasTwitterImage) score += 20;
    
    return Math.min(score, 100);
  };

  const basicScore = getBasicSeoScore();
  const socialScore = getSocialSeoScore();
  const visibilityScore = getVisibilityScore();

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-green-50 border-green-200";
    if (score >= 60) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-5 w-5 text-green-600" />;
    if (score >= 60) return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
    return <XCircle className="h-5 w-5 text-red-600" />;
  };

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-6">
      {/* Basic SEO Category */}
      <Card className={`border-2 ${getScoreBgColor(basicScore)}`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Basic SEO</h3>
                <p className="text-sm text-gray-600">Title & Description</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {getScoreIcon(basicScore)}
              <span className={`text-lg font-bold ${getScoreColor(basicScore)}`}>
                {basicScore}%
              </span>
            </div>
          </div>
          
          <Progress value={basicScore} className="mb-3" />
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Title Tag</span>
              <span className={seoData.title ? "text-green-600" : "text-red-600"}>
                {seoData.title ? `${seoData.title.length} chars` : "Missing"}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Meta Description</span>
              <span className={seoData.metaDescription ? "text-green-600" : "text-red-600"}>
                {seoData.metaDescription ? `${seoData.metaDescription.length} chars` : "Missing"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social SEO Category */}
      <Card className={`border-2 ${getScoreBgColor(socialScore)}`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Share2 className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Social Media</h3>
                <p className="text-sm text-gray-600">OG & Twitter Cards</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {getScoreIcon(socialScore)}
              <span className={`text-lg font-bold ${getScoreColor(socialScore)}`}>
                {socialScore}%
              </span>
            </div>
          </div>
          
          <Progress value={socialScore} className="mb-3" />
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Open Graph</span>
              <span className="text-blue-600">
                {Object.keys(seoData.openGraph || {}).filter(k => seoData.openGraph?.[k as keyof typeof seoData.openGraph]).length}/4 tags
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Twitter Cards</span>
              <span className="text-blue-600">
                {Object.keys(seoData.twitterCard || {}).filter(k => seoData.twitterCard?.[k as keyof typeof seoData.twitterCard]).length}/4 tags
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visibility Score Category */}
      <Card className={`border-2 ${getScoreBgColor(visibilityScore)}`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Eye className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Visibility</h3>
                <p className="text-sm text-gray-600">Search & Social Presence</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {getScoreIcon(visibilityScore)}
              <span className={`text-lg font-bold ${getScoreColor(visibilityScore)}`}>
                {visibilityScore}%
              </span>
            </div>
          </div>
          
          <Progress value={visibilityScore} className="mb-3" />
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Search Appearance</span>
              <span className={seoData.title && seoData.metaDescription ? "text-green-600" : "text-yellow-600"}>
                {seoData.title && seoData.metaDescription ? "Good" : "Needs work"}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Social Images</span>
              <span className={seoData.openGraph?.image || seoData.twitterCard?.image ? "text-green-600" : "text-red-600"}>
                {seoData.openGraph?.image || seoData.twitterCard?.image ? "Present" : "Missing"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}