import { relations } from 'drizzle-orm';
import {
  pgTable,
  text,
  timestamp,
  uuid,
  boolean,
  primaryKey,
} from 'drizzle-orm/pg-core';

// Images 테이블 (AI로 생성된 이미지)
export const images = pgTable('images', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id').notNull(), // Clerk userId (text type)
  prompt: text('prompt').notNull(),
  filePath: text('file_path').notNull(), // 이미지 파일 경로
  style: text('style'),
  tags: text('tags').array(), // PostgreSQL text[] type for tags
  isPublic: boolean('is_public').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Posts 테이블 (커뮤니티 게시물)
export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id').notNull(), // Clerk userId
  imageId: uuid('image_id').references(() => images.id, { onDelete: 'cascade' }).notNull(),
  title: text('title').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Comments 테이블
export const comments = pgTable('comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  postId: uuid('post_id').references(() => posts.id, { onDelete: 'cascade' }).notNull(),
  userId: text('user_id').notNull(), // Clerk userId
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Likes 테이블
export const likes = pgTable('likes', {
  userId: text('user_id').notNull(), // Clerk userId
  postId: uuid('post_id').references(() => posts.id, { onDelete: 'cascade' }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.userId, table.postId] }),
  };
});

// Scraps 테이블 (이미지 스크랩)
export const scraps = pgTable('scraps', {
  userId: text('user_id').notNull(), // Clerk userId
  imageId: uuid('image_id').references(() => images.id, { onDelete: 'cascade' }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.userId, table.imageId] }),
  };
});

// Relations
export const imagesRelations = relations(images, ({ many }) => ({
  posts: many(posts),
  scraps: many(scraps),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  image: one(images, {
    fields: [posts.imageId],
    references: [images.id],
  }),
  comments: many(comments),
  likes: many(likes),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
}));
