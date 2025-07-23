import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import UrlInput from "./url-input";
import SeoOverview from "./seo-overview";
import SeoCategoriesSummary from "./seo-categories-summary";
import BasicSeoTags from "./basic-seo-tags";

import TabbedPreviews from "./tabbed-previews";
import Recommendations from "./recommendations";
import { Button } from "@/components/ui/button";
import { Download, Search, Settings, HelpCircle } from "lucide-react";
import type { SeoData } from "@/types/seo";

export default function SeoAnalyzer() {
  const [seoData, setSeoData] = useState<SeoData | null>(null);
  const { toast } = useToast();

  const analyzeMutation = useMutation({
    mutationFn: async (url: string) => {
      const response = await apiRequest("POST", "/api/seo/analyze", { url });
      return await response.json();
    },
    onSuccess: (data: SeoData) => {
      setSeoData(data);
      toast({
        title: "Analysis Complete",
        description: "SEO analysis has been completed successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze the website. Please check the URL and try again.",
        variant: "destructive",
      });
    },
  });

  const handleAnalyze = (url: string) => {
    analyzeMutation.mutate(url);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Search className="text-white w-4 h-4" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">SEO Tag Analyzer</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <HelpCircle className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <UrlInput 
          onAnalyze={handleAnalyze} 
          isLoading={analyzeMutation.isPending}
        />

        {seoData && (
          <div className="space-y-8">
            {/* Overall Score Section */}
            <SeoOverview seoData={seoData} />
            
            {/* Category Summaries */}
            <SeoCategoriesSummary seoData={seoData} />
            
            {/* Detailed Analysis Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column: SEO Tags Analysis */}
              <div className="lg:col-span-2 space-y-6">
                <BasicSeoTags seoData={seoData} />
              </div>

              {/* Right Column: Previews & Recommendations */}
              <div className="space-y-6">
                <TabbedPreviews seoData={seoData} />
                <Recommendations recommendations={seoData.recommendations} />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Action Button */}
      {seoData && (
        <div className="fixed bottom-6 right-6">
          <Button
            size="icon"
            className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Download className="h-6 w-6" />
          </Button>
        </div>
      )}
    </div>
  );
}
