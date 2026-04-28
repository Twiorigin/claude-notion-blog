// 블로그 관련 공유 타입 정의

// Notion 블로그 글 목록 아이템
export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  publishedAt: string;
  coverImageUrl: string | null;
  status: 'draft' | 'published';
};

// Notion 블록 타입 (본문 렌더링용)
export type NotionBlockType =
  | 'paragraph'
  | 'heading_1'
  | 'heading_2'
  | 'heading_3'
  | 'bulleted_list_item'
  | 'numbered_list_item'
  | 'code'
  | 'image'
  | 'quote'
  | 'divider'
  | 'callout'
  | 'toggle'
  | 'to_do'
  | 'unsupported';

// Notion 리치 텍스트 단위
export type RichTextItem = {
  text: string;
  href: string | null;
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  code: boolean;
  color: string;
};

// 파싱된 Notion 블록
export type NotionBlock = {
  id: string;
  type: NotionBlockType;
  richText: RichTextItem[];
  // 코드 블록 전용
  language?: string;
  // 이미지 블록 전용
  imageUrl?: string;
  imageCaption?: string;
  // 하위 블록 (toggle 등)
  children?: NotionBlock[];
};

// 글 상세 페이지 데이터
export type BlogPostDetail = BlogPost & {
  blocks: NotionBlock[];
};

// 목차 아이템
export type TocItem = {
  id: string;
  text: string;
  level: 1 | 2 | 3;
};

// 카테고리 정보
export type Category = {
  name: string;
  count: number;
  slug: string;
};

// 페이지네이션 메타데이터
export type PaginationMeta = {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  perPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

// 블로그 글 목록 응답
export type BlogPostListResponse = {
  posts: BlogPost[];
  pagination: PaginationMeta;
  nextCursor: string | null;
};

// 네비게이션 아이템 (헤더 메뉴용)
export type NavItem = {
  title: string;
  href: string;
  description?: string;
  external?: boolean;
};

// 다크/라이트/시스템 테마
export type Theme = 'light' | 'dark' | 'system';
