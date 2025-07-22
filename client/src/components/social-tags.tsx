import { Card, CardContent } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import type { SeoData } from "@/types/seo";

interface SocialTagsProps {
  seoData: SeoData;
}

export default function SocialTags({ seoData }: SocialTagsProps) {
  const openGraphTags = [
    { key: 'title', label: 'og:title' },
    { key: 'description', label: 'og:description' },
    { key: 'image', label: 'og:image' },
    { key: 'url', label: 'og:url' },
    { key: 'type', label: 'og:type' },
    { key: 'siteName', label: 'og:site_name' },
    { key: 'locale', label: 'og:locale' },
    { key: 'fbAppId', label: 'fb:app_id' },
  ];

  const twitterTags = [
    { key: 'card', label: 'twitter:card' },
    { key: 'title', label: 'twitter:title' },
    { key: 'description', label: 'twitter:description' },
    { key: 'image', label: 'twitter:image' },
    { key: 'site', label: 'twitter:site' },
    { key: 'creator', label: 'twitter:creator' },
  ];

  const TagRow = ({ tag, value, icon }: { tag: string; value: boolean; icon: React.ReactNode }) => (
    <div className={`flex items-center justify-between p-3 rounded ${value ? 'bg-gray-50' : 'bg-red-50'}`}>
      <span className="text-sm font-medium">{tag}</span>
      {value ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <X className="h-4 w-4 text-red-500" />
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Open Graph Tags */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="text-blue-600 mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Open Graph (Facebook)
          </h3>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-3">
              {openGraphTags.slice(0, 4).map(tag => (
                <TagRow
                  key={tag.key}
                  tag={tag.label}
                  value={!!(seoData.openGraph?.[tag.key as keyof typeof seoData.openGraph])}
                  icon={null}
                />
              ))}
            </div>
            <div className="space-y-3">
              {openGraphTags.slice(4).map(tag => (
                <TagRow
                  key={tag.key}
                  tag={tag.label}
                  value={!!(seoData.openGraph?.[tag.key as keyof typeof seoData.openGraph])}
                  icon={null}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Twitter Card Tags */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="text-blue-400 mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
            Twitter Cards
          </h3>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-3">
              {twitterTags.slice(0, 3).map(tag => (
                <TagRow
                  key={tag.key}
                  tag={tag.label}
                  value={!!(seoData.twitterCard?.[tag.key as keyof typeof seoData.twitterCard])}
                  icon={null}
                />
              ))}
            </div>
            <div className="space-y-3">
              {twitterTags.slice(3).map(tag => (
                <TagRow
                  key={tag.key}
                  tag={tag.label}
                  value={!!(seoData.twitterCard?.[tag.key as keyof typeof seoData.twitterCard])}
                  icon={null}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
