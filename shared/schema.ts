import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const seoAnalysis = pgTable("seo_analysis", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  title: text("title"),
  metaDescription: text("meta_description"),
  metaKeywords: text("meta_keywords"),
  openGraphTags: jsonb("open_graph_tags"),
  twitterCardTags: jsonb("twitter_card_tags"),
  score: integer("score"),
  recommendations: jsonb("recommendations"),
  createdAt: text("created_at").notNull(),
});

export const insertSeoAnalysisSchema = createInsertSchema(seoAnalysis).omit({
  id: true,
  createdAt: true,
});

export type InsertSeoAnalysis = z.infer<typeof insertSeoAnalysisSchema>;
export type SeoAnalysis = typeof seoAnalysis.$inferSelect;

// Types for SEO data structures
export const seoDataSchema = z.object({
  url: z.string().url(),
  title: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  openGraph: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    url: z.string().optional(),
    type: z.string().optional(),
    siteName: z.string().optional(),
    locale: z.string().optional(),
    fbAppId: z.string().optional(),
  }).optional(),
  twitterCard: z.object({
    card: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    site: z.string().optional(),
    creator: z.string().optional(),
  }).optional(),
  score: z.number().min(0).max(100),
  recommendations: z.array(z.object({
    type: z.enum(['error', 'warning', 'success', 'info']),
    title: z.string(),
    description: z.string(),
  })),
});

export type SeoData = z.infer<typeof seoDataSchema>;
