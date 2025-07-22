import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { seoDataSchema } from "@shared/schema";
import axios from "axios";
import * as cheerio from "cheerio";

export async function registerRoutes(app: Express): Promise<Server> {
  // SEO Analysis endpoint
  app.post("/api/seo/analyze", async (req, res) => {
    try {
      const { url } = req.body;
      
      if (!url) {
        return res.status(400).json({ error: "URL is required" });
      }

      // Validate URL format
      try {
        new URL(url);
      } catch {
        return res.status(400).json({ error: "Invalid URL format" });
      }

      // Check if we have cached analysis
      const cached = await storage.getSeoAnalysis(url);
      if (cached) {
        return res.json(cached);
      }

      // Fetch HTML content
      let html: string;
      try {
        const response = await axios.get(url, {
          timeout: 10000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; SEO-Analyzer/1.0)',
          },
        });
        html = response.data;
      } catch (error) {
        return res.status(400).json({ 
          error: "Failed to fetch website content",
          details: error instanceof Error ? error.message : "Unknown error"
        });
      }

      // Parse HTML with Cheerio
      const $ = cheerio.load(html);

      // Extract SEO data
      const seoData = {
        url,
        title: $('title').text().trim() || undefined,
        metaDescription: $('meta[name="description"]').attr('content')?.trim() || undefined,
        metaKeywords: $('meta[name="keywords"]').attr('content')?.trim() || undefined,
        openGraph: {
          title: $('meta[property="og:title"]').attr('content')?.trim() || undefined,
          description: $('meta[property="og:description"]').attr('content')?.trim() || undefined,
          image: $('meta[property="og:image"]').attr('content')?.trim() || undefined,
          url: $('meta[property="og:url"]').attr('content')?.trim() || undefined,
          type: $('meta[property="og:type"]').attr('content')?.trim() || undefined,
          siteName: $('meta[property="og:site_name"]').attr('content')?.trim() || undefined,
          locale: $('meta[property="og:locale"]').attr('content')?.trim() || undefined,
          fbAppId: $('meta[property="fb:app_id"]').attr('content')?.trim() || undefined,
        },
        twitterCard: {
          card: $('meta[name="twitter:card"]').attr('content')?.trim() || undefined,
          title: $('meta[name="twitter:title"]').attr('content')?.trim() || undefined,
          description: $('meta[name="twitter:description"]').attr('content')?.trim() || undefined,
          image: $('meta[name="twitter:image"]').attr('content')?.trim() || undefined,
          site: $('meta[name="twitter:site"]').attr('content')?.trim() || undefined,
          creator: $('meta[name="twitter:creator"]').attr('content')?.trim() || undefined,
        },
        score: 0,
        recommendations: [] as any[],
      };

      // Calculate SEO score and recommendations
      let score = 0;
      const recommendations: any[] = [];

      // Title analysis
      if (seoData.title) {
        if (seoData.title.length >= 50 && seoData.title.length <= 60) {
          score += 15;
          recommendations.push({
            type: 'success',
            title: 'Title Length Optimal',
            description: 'Great job! Title length is perfect for search results'
          });
        } else if (seoData.title.length < 50) {
          score += 10;
          recommendations.push({
            type: 'warning',
            title: 'Title Too Short',
            description: `Consider expanding title by ${50 - seoData.title.length} characters`
          });
        } else {
          score += 5;
          recommendations.push({
            type: 'warning',
            title: 'Title Too Long',
            description: `Reduce title by ${seoData.title.length - 60} characters for optimal display`
          });
        }
      } else {
        recommendations.push({
          type: 'error',
          title: 'Missing Title Tag',
          description: 'Add a descriptive title tag for better search visibility'
        });
      }

      // Meta description analysis
      if (seoData.metaDescription) {
        if (seoData.metaDescription.length >= 150 && seoData.metaDescription.length <= 160) {
          score += 15;
        } else if (seoData.metaDescription.length > 160) {
          score += 10;
          recommendations.push({
            type: 'warning',
            title: 'Meta Description Too Long',
            description: `Reduce meta description by ${seoData.metaDescription.length - 160} characters for optimal display`
          });
        } else {
          score += 10;
          recommendations.push({
            type: 'warning',
            title: 'Meta Description Too Short',
            description: `Consider expanding description by ${150 - seoData.metaDescription.length} characters`
          });
        }
      } else {
        recommendations.push({
          type: 'error',
          title: 'Missing Meta Description',
          description: 'Add a compelling meta description to improve click-through rates'
        });
      }

      // Open Graph analysis
      const ogTags = ['title', 'description', 'image', 'url'];
      const ogPresent = ogTags.filter(tag => seoData.openGraph?.[tag as keyof typeof seoData.openGraph]);
      score += ogPresent.length * 5;

      if (ogPresent.length === ogTags.length) {
        recommendations.push({
          type: 'success',
          title: 'Open Graph Complete',
          description: 'All essential Open Graph tags are present'
        });
      } else {
        const missing = ogTags.filter(tag => !seoData.openGraph?.[tag as keyof typeof seoData.openGraph]);
        recommendations.push({
          type: 'warning',
          title: 'Missing Open Graph Tags',
          description: `Add missing og:${missing.join(', og:')} tags for better social sharing`
        });
      }

      // Twitter Card analysis
      const twitterTags = ['card', 'title', 'description', 'image'];
      const twitterPresent = twitterTags.filter(tag => seoData.twitterCard?.[tag as keyof typeof seoData.twitterCard]);
      score += twitterPresent.length * 5;

      if (!seoData.twitterCard?.site) {
        recommendations.push({
          type: 'error',
          title: 'Missing Twitter Site Tag',
          description: 'Add twitter:site tag for better attribution'
        });
      } else {
        score += 5;
      }

      // Additional recommendations
      if (!seoData.openGraph?.locale) {
        recommendations.push({
          type: 'info',
          title: 'Add Locale Information',
          description: 'Consider adding og:locale for international SEO'
        });
      }

      recommendations.push({
        type: 'info',
        title: 'Add Structured Data',
        description: 'Consider adding JSON-LD structured data for rich snippets'
      });

      seoData.score = Math.min(score, 100);
      seoData.recommendations = recommendations;

      // Validate and save analysis
      const validatedData = seoDataSchema.parse(seoData);
      
      const analysis = await storage.saveSeoAnalysis({
        url: validatedData.url,
        title: validatedData.title,
        metaDescription: validatedData.metaDescription,
        metaKeywords: validatedData.metaKeywords,
        openGraphTags: validatedData.openGraph,
        twitterCardTags: validatedData.twitterCard,
        score: validatedData.score,
        recommendations: validatedData.recommendations,
      });

      res.json(validatedData);
    } catch (error) {
      console.error('SEO Analysis error:', error);
      res.status(500).json({ 
        error: "Internal server error during analysis",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
