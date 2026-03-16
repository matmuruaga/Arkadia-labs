// src/data/blogPostsData.ts

export interface BlogPost {
  slug: string;
  translationKey: string;
  publishDate: string;
  author: string;
  authorRole: string;
  category: string;
  categoryKey: string;
  readTime: number;
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'ai-automation-roi',
    translationKey: 'blog.posts.aiAutomationRoi',
    publishDate: '2026-03-10',
    author: 'Arkadia Labs',
    authorRole: 'Team',
    category: 'ROI & Strategy',
    categoryKey: 'roiStrategy',
    readTime: 6,
    featured: true,
  },
  {
    slug: 'ai-gtm-strategy',
    translationKey: 'blog.posts.aiGtmStrategy',
    publishDate: '2026-03-06',
    author: 'Arkadia Labs',
    authorRole: 'Team',
    category: 'GTM Strategy',
    categoryKey: 'gtmStrategy',
    readTime: 5,
    featured: true,
  },
  {
    slug: 'sales-efficiency-ai',
    translationKey: 'blog.posts.salesEfficiencyAi',
    publishDate: '2026-03-02',
    author: 'Arkadia Labs',
    authorRole: 'Team',
    category: 'Sales Efficiency',
    categoryKey: 'salesEfficiency',
    readTime: 5,
    featured: true,
  },
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find((p) => p.slug === slug);
