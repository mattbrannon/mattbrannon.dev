import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { bundleMDX } from 'mdx-bundler';

// POSTS_PATH is useful when you want to get the path to a specific file
export const POSTS_PATH = path.join(process.cwd(), 'articles');

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const allFilePaths = fs
  .readdirSync(POSTS_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path));

const onlyPublishedArticles = (filename) => {
  const fullPath = path.resolve(POSTS_PATH, filename);
  const source = fs.readFileSync(fullPath);
  const { data } = matter(source);
  return data.status === 'published';
};

export const publishedArticles = allFilePaths.filter(onlyPublishedArticles);

const articlesDirectory = path.join(process.cwd(), 'articles');

const getArticleMetadata = (fileNames) => {
  return fileNames.map((fileName) => {
    const id = fileName.replace(/\.mdx?$/, '');
    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    return { id, ...matterResult.data };
  });
};

const sortByDate = (data) => {
  return data
    .map((obj) => {
      const timestamp = new Date(obj.date);
      return { ...obj, timestamp };
    })
    .sort((a, b) => b.timestamp - a.timestamp)
    .map((obj) => {
      delete obj.timestamp;
      return obj;
    });
};

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(articlesDirectory);
  const data = getArticleMetadata(fileNames);
  const sortedData = sortByDate(data);

  return sortedData;
}

export async function getArticleData(slug) {
  const fullPath = path.join(articlesDirectory, `${slug}.mdx`);
  const source = fs.readFileSync(fullPath, 'utf8');
  const { code, frontmatter } = await bundleMDX({ source });

  return {
    slug,
    frontmatter,
    code,
  };
}
