import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tags, FileText, MessageSquare, Hash } from "lucide-react";
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
    <Card className="shadow-lg border-2 border-gray-100">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg mr-3">
            <Tags className="text-blue-600 h-5 w-5" />
          </div>
          SEO Tag Details
        </h3>
        
        <div className="space-y-6">
          {/* Title Tag */}
          <div className={`border-2 rounded-xl p-5 transition-all hover:shadow-md ${
            titleStatus.status === 'GOOD' ? 'border-green-200 bg-green-50' :
            titleStatus.status === 'MISSING' ? 'border-red-200 bg-red-50' : 'border-yellow-200 bg-yellow-50'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-gray-900">Title Tag</span>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className={`text-white font-medium px-3 py-1 ${titleStatus.color}`}>
                  {titleStatus.status}
                </Badge>
                <span className="text-sm font-mono text-gray-600 bg-white px-2 py-1 rounded">
                  {seoData.title?.length || 0}/60
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-800 bg-white rounded-lg p-4 font-mono border min-h-[3rem] flex items-center">
              {seoData.title || <span className="text-gray-400 italic">No title tag found</span>}
            </div>
            <div className="mt-3 bg-white rounded-lg p-2">
              <Progress value={titleStatus.progress} className="h-2" />
            </div>
          </div>

          {/* Meta Description */}
          <div className={`border-2 rounded-xl p-5 transition-all hover:shadow-md ${
            descriptionStatus.status === 'GOOD' ? 'border-green-200 bg-green-50' :
            descriptionStatus.status === 'MISSING' ? 'border-red-200 bg-red-50' : 'border-yellow-200 bg-yellow-50'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <MessageSquare className="h-5 w-5 text-purple-600" />
                <span className="font-semibold text-gray-900">Meta Description</span>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className={`text-white font-medium px-3 py-1 ${descriptionStatus.color}`}>
                  {descriptionStatus.status}
                </Badge>
                <span className="text-sm font-mono text-gray-600 bg-white px-2 py-1 rounded">
                  {seoData.metaDescription?.length || 0}/160
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-800 bg-white rounded-lg p-4 font-mono border min-h-[4rem] flex items-center">
              {seoData.metaDescription || <span className="text-gray-400 italic">No meta description found</span>}
            </div>
            <div className="mt-3 bg-white rounded-lg p-2">
              <Progress value={descriptionStatus.progress} className="h-2" />
            </div>
          </div>

          {/* Meta Keywords */}
          <div className="border-2 border-gray-200 bg-gray-50 rounded-xl p-5 opacity-75">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Hash className="h-5 w-5 text-gray-400" />
                <span className="font-semibold text-gray-700">Meta Keywords</span>
              </div>
              <Badge className="text-white bg-gray-500 font-medium px-3 py-1">
                DEPRECATED
              </Badge>
            </div>
            <div className="text-sm text-gray-500 bg-white rounded-lg p-4 border min-h-[3rem] flex items-center">
              <span className="italic">
                {seoData.metaKeywords || "Meta keywords are no longer used by search engines"}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
