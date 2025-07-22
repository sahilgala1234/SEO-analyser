import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image } from "lucide-react";
import type { SeoData } from "@/types/seo";

interface TabbedPreviewsProps {
  seoData: SeoData;
}

export default function TabbedPreviews({ seoData }: TabbedPreviewsProps) {
  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname.toUpperCase();
    } catch {
      return "EXAMPLE.COM";
    }
  };

  const displayTitle = seoData.openGraph?.title || seoData.title || "No Title";
  const displayDescription = seoData.openGraph?.description || seoData.metaDescription || "No description available";
  const displayUrl = seoData.url;

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview How Your Site Appears</h3>
        
        <Tabs defaultValue="google" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="google" className="flex items-center space-x-2">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Google</span>
            </TabsTrigger>
            <TabsTrigger value="facebook" className="flex items-center space-x-2">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook</span>
            </TabsTrigger>
            <TabsTrigger value="twitter" className="flex items-center space-x-2">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              <span>Twitter</span>
            </TabsTrigger>
          </TabsList>

          {/* Google Search Preview */}
          <TabsContent value="google" className="mt-4">
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="space-y-1">
                <div className="text-xs text-green-700 font-mono">
                  {displayUrl}
                </div>
                <div className="text-lg text-blue-600 hover:underline cursor-pointer font-medium leading-tight">
                  {displayTitle}
                </div>
                <div className="text-sm text-gray-700 leading-relaxed">
                  {displayDescription.substring(0, 155)}
                  {displayDescription.length > 155 ? "..." : ""}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Facebook Preview */}
          <TabsContent value="facebook" className="mt-4">
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {seoData.openGraph?.image ? (
                <img 
                  src={seoData.openGraph.image} 
                  alt="Preview" 
                  className="w-full aspect-video object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <div className={`aspect-video bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center ${seoData.openGraph?.image ? 'hidden' : ''}`}>
                <Image className="text-white text-3xl opacity-75 h-12 w-12" />
              </div>
              <div className="p-4 bg-gray-50">
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  {getDomain(displayUrl)}
                </div>
                <div className="font-semibold text-gray-900 mb-1">
                  {seoData.openGraph?.title || displayTitle}
                </div>
                <div className="text-sm text-gray-600">
                  {(seoData.openGraph?.description || displayDescription).substring(0, 100)}
                  {(seoData.openGraph?.description || displayDescription).length > 100 ? "..." : ""}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Twitter Preview */}
          <TabsContent value="twitter" className="mt-4">
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {seoData.twitterCard?.image ? (
                <img 
                  src={seoData.twitterCard.image} 
                  alt="Preview" 
                  className="w-full aspect-video object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <div className={`aspect-video bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center ${seoData.twitterCard?.image ? 'hidden' : ''}`}>
                <Image className="text-white text-3xl opacity-75 h-12 w-12" />
              </div>
              <div className="p-4">
                <div className="font-semibold text-gray-900 mb-1">
                  {seoData.twitterCard?.title || displayTitle}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {(seoData.twitterCard?.description || displayDescription).substring(0, 100)}
                  {(seoData.twitterCard?.description || displayDescription).length > 100 ? "..." : ""}
                </div>
                <div className="text-xs text-gray-500">
                  🔗 {getDomain(displayUrl).toLowerCase()}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}