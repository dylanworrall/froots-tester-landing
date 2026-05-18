import { posts, type BlogPost } from "./blog-posts";

export const POSTS_PER_PAGE = 9;

export interface BlogPage {
  featured: BlogPost | null;
  list: BlogPost[];
  page: number;
  totalPages: number;
}

export function getTotalPages(): number {
  if (posts.length <= POSTS_PER_PAGE) return 1;
  return 1 + Math.ceil((posts.length - POSTS_PER_PAGE) / POSTS_PER_PAGE);
}

export function getBlogPage(page: number): BlogPage {
  const totalPages = getTotalPages();
  const clamped = Math.min(Math.max(1, page), totalPages);

  if (clamped === 1) {
    const [featured, ...rest] = posts;
    return { featured, list: rest.slice(0, POSTS_PER_PAGE - 1), page: 1, totalPages };
  }

  const offset = POSTS_PER_PAGE + (clamped - 2) * POSTS_PER_PAGE;
  return { featured: null, list: posts.slice(offset, offset + POSTS_PER_PAGE), page: clamped, totalPages };
}
