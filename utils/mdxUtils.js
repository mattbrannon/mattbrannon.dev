import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// POSTS_PATH is useful when you want to get the path to a specific file
export const POSTS_PATH = path.join(process.cwd(), 'articles');

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const allFilePaths = fs
  .readdirSync(POSTS_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path));

export const postFilePaths = allFilePaths.filter((filename) => {
  const fullPath = path.resolve(POSTS_PATH, filename);
  const source = fs.readFileSync(fullPath);
  const { data } = matter(source);

  return data.status !== 'unpublished';
});
