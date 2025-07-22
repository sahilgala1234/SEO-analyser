import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, XCircle, CheckCircle, Info, Lightbulb } from "lucide-react";
import type { SeoData } from "@/types/seo";

interface RecommendationsProps {
  recommendations: SeoData['recommendations'];
}

export default function Recommendations({ recommendations }: RecommendationsProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const getColorClasses = (type: string) => {
    switch (type) {
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getDescriptionColorClasses = (type: string) => {
    switch (type) {
      case 'error':
        return 'text-red-700';
      case 'warning':
        return 'text-yellow-700';
      case 'success':
        return 'text-green-700';
      case 'info':
        return 'text-blue-700';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Lightbulb className="text-yellow-500 mr-2 h-5 w-5" />
          Recommendations
        </h3>
        
        <div className="space-y-3">
          {recommendations.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
              <p className="text-lg font-medium text-green-600">Perfect SEO!</p>
              <p className="text-sm">No recommendations needed.</p>
            </div>
          ) : (
            recommendations.map((rec, index) => (
              <div
                key={index}
                className={`flex items-start space-x-3 p-3 border rounded-lg ${getColorClasses(rec.type)}`}
              >
                <div className="mt-0.5">
                  {getIcon(rec.type)}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{rec.title}</div>
                  <div className={`text-sm ${getDescriptionColorClasses(rec.type)}`}>
                    {rec.description}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
