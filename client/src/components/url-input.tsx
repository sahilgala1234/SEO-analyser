import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Search, Loader2 } from "lucide-react";

interface UrlInputProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

export default function UrlInput({ onAnalyze, isLoading }: UrlInputProps) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      const fullUrl = `https://${url.trim()}`;
      onAnalyze(fullUrl);
    }
  };

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Website URL Analysis</h2>
          <p className="text-gray-600 text-sm">Enter a website URL to analyze its SEO tags and meta information</p>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-mono text-sm pointer-events-none">
                https://
              </div>
              <Input
                type="text"
                placeholder="example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="pl-20 pr-10 font-mono text-sm"
                disabled={isLoading}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Globe className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
          <Button 
            type="submit" 
            disabled={!url.trim() || isLoading}
            className="px-6 py-3 flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
            <span>Analyze SEO</span>
          </Button>
        </form>
        
        {/* Loading State */}
        {isLoading && (
          <div className="mt-4">
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Fetching and analyzing website...</span>
            </div>
            <div className="mt-2 bg-gray-200 rounded-full h-1">
              <div className="bg-primary h-1 rounded-full w-1/3 animate-pulse"></div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
