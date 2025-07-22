import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tags } from "lucide-react";
import type { SeoData } from "@/types/seo";

interface BasicSeoTagsProps {
  seoData: SeoData;
}

export default function BasicSeoTags({ seoData }: BasicSeoTagsProps) {
  const getTitleStatus = () => {
    if (!seoData.title) return { status: "MISSING", color: "bg-red-500", progress: 0 };
    const length = seoData.title.length;
    if (length >= 50 && length <= 60) return { status: "GOOD", color: "bg-green-500", progress: 100 };
    if (length < 50) return { status: "SHORT", color: "bg-yellow-500", progress: (length / 50) * 100 };
    return { status: "LONG", color: "bg-yellow-500", progress: Math.min((60 / length) * 100, 100) };
  };

  const getDescriptionStatus = () => {
    if (!seoData.metaDescription) return { status: "MISSING", color: "bg-red-500", progress: 0 };
    const length = seoData.metaDescription.length;
    if (length >= 150 && length <= 160) return { status: "GOOD", color: "bg-green-500", progress: 100 };
    if (length < 150) return { status: "SHORT", color: "bg-yellow-500", progress: (length / 150) * 100 };
    return { status: "WARNING", color: "bg-yellow-500", progress: Math.min((160 / length) * 100, 100) };
  };

  const titleStatus = getTitleStatus();
  const descriptionStatus = getDescriptionStatus();

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Tags className="text-blue-600 mr-2 h-5 w-5" />
          Basic SEO Tags
        </h3>
        
        <div className="space-y-4">
          {/* Title Tag */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900">Title Tag</span>
              <div className="flex items-center space-x-2">
                <Badge className={`text-white ${titleStatus.color}`}>
                  {titleStatus.status}
                </Badge>
                <span className="text-xs text-gray-500">
                  {seoData.title?.length || 0}/60
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-700 bg-gray-50 rounded p-3 font-mono min-h-[2.5rem] flex items-center">
              {seoData.title || "No title tag found"}
            </div>
            <div className="mt-2">
              <Progress value={titleStatus.progress} className="w-full" />
            </div>
          </div>

          {/* Meta Description */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900">Meta Description</span>
              <div className="flex items-center space-x-2">
                <Badge className={`text-white ${descriptionStatus.color}`}>
                  {descriptionStatus.status}
                </Badge>
                <span className="text-xs text-gray-500">
                  {seoData.metaDescription?.length || 0}/160
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-700 bg-gray-50 rounded p-3 font-mono min-h-[2.5rem] flex items-center">
              {seoData.metaDescription || "No meta description found"}
            </div>
            <div className="mt-2">
              <Progress value={descriptionStatus.progress} className="w-full" />
            </div>
          </div>

          {/* Meta Keywords */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900">Meta Keywords</span>
              <div className="flex items-center space-x-2">
                <Badge className="text-white bg-gray-400">
                  DEPRECATED
                </Badge>
              </div>
            </div>
            <div className="text-sm text-gray-500 bg-gray-50 rounded p-3 min-h-[2.5rem] flex items-center">
              {seoData.metaKeywords || "Meta keywords are no longer used by search engines"}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
