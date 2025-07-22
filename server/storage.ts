import { seoAnalysis, type SeoAnalysis, type InsertSeoAnalysis } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<any | undefined>;
  getUserByUsername(username: string): Promise<any | undefined>;
  createUser(user: any): Promise<any>;
  saveSeoAnalysis(analysis: InsertSeoAnalysis): Promise<SeoAnalysis>;
  getSeoAnalysis(url: string): Promise<SeoAnalysis | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, any>;
  private seoAnalyses: Map<string, SeoAnalysis>;
  private currentId: number;
  private currentSeoId: number;

  constructor() {
    this.users = new Map();
    this.seoAnalyses = new Map();
    this.currentId = 1;
    this.currentSeoId = 1;
  }

  async getUser(id: number): Promise<any | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<any | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: any): Promise<any> {
    const id = this.currentId++;
    const user: any = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async saveSeoAnalysis(insertAnalysis: InsertSeoAnalysis): Promise<SeoAnalysis> {
    const id = this.currentSeoId++;
    const analysis: SeoAnalysis = {
      ...insertAnalysis,
      id,
      createdAt: new Date().toISOString(),
    };
    this.seoAnalyses.set(insertAnalysis.url, analysis);
    return analysis;
  }

  async getSeoAnalysis(url: string): Promise<SeoAnalysis | undefined> {
    return this.seoAnalyses.get(url);
  }
}

export const storage = new MemStorage();
