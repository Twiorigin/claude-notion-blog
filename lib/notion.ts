// Notion API 클라이언트 및 데이터 조회 함수
// @notionhq/client 최신 버전: databases.query → dataSources.query (data_source_id 사용)
import { Client } from '@notionhq/client';
import type {
  PageObjectResponse,
  BlockObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints';
import type {
  BlogPost,
  BlogPostDetail,
  BlogPostListResponse,
  NotionBlock,
  NotionBlockType,
  RichTextItem,
} from './types';
import { NOTION_STATUS, PAGINATION } from './constants';

// Notion 클라이언트 싱글톤
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// 데이터 소스 ID (환경 변수에서 로드)
const DATA_SOURCE_ID = process.env.NOTION_DATABASE_ID ?? '';

// ──────────────────────────────────────────────
// 내부 유틸 함수
// ──────────────────────────────────────────────

// Notion 리치 텍스트 배열을 파싱하여 RichTextItem 배열로 변환
function parseRichText(richTextArray: RichTextItemResponse[]): RichTextItem[] {
  return richTextArray.map((item) => ({
    text: item.plain_text,
    href: item.href,
    bold: item.annotations.bold,
    italic: item.annotations.italic,
    strikethrough: item.annotations.strikethrough,
    code: item.annotations.code,
    color: item.annotations.color,
  }));
}

// 리치 텍스트 배열에서 순수 텍스트만 추출
function extractPlainText(richTextArray: RichTextItemResponse[]): string {
  return richTextArray.map((item) => item.plain_text).join('');
}

// Notion 페이지 속성에서 BlogPost 객체 생성
function parsePageToBlogPost(page: PageObjectResponse): BlogPost {
  const props = page.properties;

  // 제목 추출
  const titleProp = props['Title'] ?? props['title'] ?? props['이름'];
  const title =
    titleProp?.type === 'title' ? extractPlainText(titleProp.title) : '제목 없음';

  // 설명 추출
  const descriptionProp = props['Description'] ?? props['설명'];
  const description =
    descriptionProp?.type === 'rich_text'
      ? extractPlainText(descriptionProp.rich_text)
      : '';

  // 카테고리 추출
  const categoryProp = props['Category'] ?? props['카테고리'];
  const category =
    categoryProp?.type === 'select' ? (categoryProp.select?.name ?? '미분류') : '미분류';

  // 태그 추출
  const tagsProp = props['Tags'] ?? props['태그'];
  const tags =
    tagsProp?.type === 'multi_select'
      ? tagsProp.multi_select.map((tag) => tag.name)
      : [];

  // 발행일 추출
  const publishedAtProp = props['Published'] ?? props['발행일'];
  const publishedAt =
    publishedAtProp?.type === 'date' ? (publishedAtProp.date?.start ?? '') : '';

  // 상태 추출
  const statusProp = props['Status'] ?? props['상태'];
  const statusValue =
    statusProp?.type === 'select' ? (statusProp.select?.name ?? '') : '';
  const status: BlogPost['status'] =
    statusValue === NOTION_STATUS.published ? 'published' : 'draft';

  // 커버 이미지 URL 추출 (Files & media 타입)
  const coverImageProp = props['Cover Image'] ?? props['썸네일'];
  let coverImageUrl: string | null = null;
  if (coverImageProp?.type === 'files' && coverImageProp.files.length > 0) {
    const file = coverImageProp.files[0];
    if (file.type === 'external') {
      coverImageUrl = file.external.url;
    } else if (file.type === 'file') {
      coverImageUrl = file.file.url;
    }
  }

  // 슬러그: Notion 페이지 ID를 슬러그로 활용 (하이픈 제거)
  const slug = page.id.replace(/-/g, '');

  return {
    id: page.id,
    slug,
    title,
    description,
    category,
    tags,
    publishedAt,
    coverImageUrl,
    status,
  };
}

// ──────────────────────────────────────────────
// 공개 API 함수
// ──────────────────────────────────────────────

// 발행된 블로그 글 목록 조회
export async function getBlogPosts(
  page = 1,
  cursor?: string,
): Promise<BlogPostListResponse> {
  // databases.query는 제거됨 → dataSources.query 사용 (data_source_id 파라미터)
  const response = await notion.dataSources.query({
    data_source_id: DATA_SOURCE_ID,
    filter: {
      property: 'Status',
      select: {
        equals: NOTION_STATUS.published,
      },
    } as Parameters<typeof notion.dataSources.query>[0]['filter'],
    sorts: [
      {
        property: 'Published',
        direction: 'descending',
      },
    ],
    page_size: PAGINATION.perPage,
    start_cursor: cursor,
  });

  const posts = response.results
    .filter((result): result is PageObjectResponse => result.object === 'page')
    .map(parsePageToBlogPost);

  const totalPages = Math.ceil(posts.length / PAGINATION.perPage) || 1;

  return {
    posts,
    pagination: {
      currentPage: page,
      totalPages,
      totalCount: posts.length,
      perPage: PAGINATION.perPage,
      hasNextPage: response.has_more,
      hasPrevPage: page > 1,
    },
    nextCursor: response.next_cursor,
  };
}

// 카테고리별 블로그 글 목록 조회
export async function getBlogPostsByCategory(
  category: string,
): Promise<BlogPost[]> {
  const response = await notion.dataSources.query({
    data_source_id: DATA_SOURCE_ID,
    filter: {
      and: [
        {
          property: 'Status',
          select: { equals: NOTION_STATUS.published },
        },
        {
          property: 'Category',
          select: { equals: category },
        },
      ],
    } as Parameters<typeof notion.dataSources.query>[0]['filter'],
    sorts: [
      {
        property: 'Published',
        direction: 'descending',
      },
    ],
  });

  return response.results
    .filter((result): result is PageObjectResponse => result.object === 'page')
    .map(parsePageToBlogPost);
}

// 슬러그(페이지 ID)로 글 상세 조회
export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPostDetail | null> {
  // 슬러그를 Notion 페이지 ID 형식(UUID)으로 변환
  const pageId = slug.replace(
    /^([0-9a-f]{8})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{12})$/,
    '$1-$2-$3-$4-$5',
  );

  try {
    const page = await notion.pages.retrieve({ page_id: pageId });
    if (page.object !== 'page') return null;

    const blogPost = parsePageToBlogPost(page as PageObjectResponse);
    const blocks = await getPageBlocks(pageId);

    return { ...blogPost, blocks };
  } catch {
    // 존재하지 않는 페이지 → null 반환
    return null;
  }
}

// 페이지 블록 재귀 조회
export async function getPageBlocks(pageId: string): Promise<NotionBlock[]> {
  const response = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 100,
  });

  const blocks: NotionBlock[] = [];

  for (const block of response.results) {
    if (block.object !== 'block') continue;
    const blockObj = block as BlockObjectResponse;
    const parsed = parseBlock(blockObj);
    if (!parsed) continue;

    // 하위 블록이 있는 경우 재귀 조회 (toggle 등)
    if (blockObj.has_children) {
      parsed.children = await getPageBlocks(blockObj.id);
    }

    blocks.push(parsed);
  }

  return blocks;
}

// 단일 블록 파싱
function parseBlock(block: BlockObjectResponse): NotionBlock | null {
  const base = {
    id: block.id,
    richText: [] as RichTextItem[],
  };

  switch (block.type) {
    case 'paragraph':
      return {
        ...base,
        type: 'paragraph' as NotionBlockType,
        richText: parseRichText(block.paragraph.rich_text),
      };

    case 'heading_1':
      return {
        ...base,
        type: 'heading_1' as NotionBlockType,
        richText: parseRichText(block.heading_1.rich_text),
      };

    case 'heading_2':
      return {
        ...base,
        type: 'heading_2' as NotionBlockType,
        richText: parseRichText(block.heading_2.rich_text),
      };

    case 'heading_3':
      return {
        ...base,
        type: 'heading_3' as NotionBlockType,
        richText: parseRichText(block.heading_3.rich_text),
      };

    case 'bulleted_list_item':
      return {
        ...base,
        type: 'bulleted_list_item' as NotionBlockType,
        richText: parseRichText(block.bulleted_list_item.rich_text),
      };

    case 'numbered_list_item':
      return {
        ...base,
        type: 'numbered_list_item' as NotionBlockType,
        richText: parseRichText(block.numbered_list_item.rich_text),
      };

    case 'code':
      return {
        ...base,
        type: 'code' as NotionBlockType,
        richText: parseRichText(block.code.rich_text),
        language: block.code.language,
      };

    case 'image': {
      const imageUrl =
        block.image.type === 'external'
          ? block.image.external.url
          : block.image.file.url;
      const captionRichText = block.image.caption ?? [];
      return {
        ...base,
        type: 'image' as NotionBlockType,
        imageUrl,
        imageCaption: extractPlainText(captionRichText),
      };
    }

    case 'quote':
      return {
        ...base,
        type: 'quote' as NotionBlockType,
        richText: parseRichText(block.quote.rich_text),
      };

    case 'divider':
      return {
        ...base,
        type: 'divider' as NotionBlockType,
      };

    case 'callout':
      return {
        ...base,
        type: 'callout' as NotionBlockType,
        richText: parseRichText(block.callout.rich_text),
      };

    case 'toggle':
      return {
        ...base,
        type: 'toggle' as NotionBlockType,
        richText: parseRichText(block.toggle.rich_text),
      };

    case 'to_do':
      return {
        ...base,
        type: 'to_do' as NotionBlockType,
        richText: parseRichText(block.to_do.rich_text),
      };

    default:
      return {
        ...base,
        type: 'unsupported' as NotionBlockType,
      };
  }
}

// 발행된 글의 모든 슬러그 조회 (정적 경로 생성용)
export async function getAllBlogSlugs(): Promise<string[]> {
  const response = await notion.dataSources.query({
    data_source_id: DATA_SOURCE_ID,
    filter: {
      property: 'Status',
      select: { equals: NOTION_STATUS.published },
    } as Parameters<typeof notion.dataSources.query>[0]['filter'],
    page_size: 100,
  });

  return response.results
    .filter((result): result is PageObjectResponse => result.object === 'page')
    .map((page) => page.id.replace(/-/g, ''));
}
