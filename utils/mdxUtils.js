import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const POSTS_PATH = path.join(process.cwd(), 'articles');

export const VIEWS_PATH = path.join(process.cwd(), 'views');

export const parseFolderName = (folder) => {
  return folder
    .replace(/[A-Z]/g, (v) => ' ' + v.toLowerCase())
    .trim()
    .replace(/\s/g, '-');
};

export const allFilePaths = fs.readdirSync(POSTS_PATH).filter((path) => /\.(mdx|md)$/.test(path));

const onlyPublishedArticles = (filename) => {
  const fullPath = path.resolve(POSTS_PATH, filename);
  const source = fs.readFileSync(fullPath);
  const { data } = matter(source);
  return data.published === true;
};

export const publishedArticles = allFilePaths.filter(onlyPublishedArticles);

const articlesDirectory = path.join(process.cwd(), 'articles');

const getArticleMetadata = (fileNames) => {
  return fileNames.map((fileName) => {
    const id = fileName.replace(/\.(mdx|md)$/, '');
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

const makeCodeBlockTest = () => {
  let isCodeBlock = false;
  return (line) => {
    isCodeBlock =
      line.startsWith('```') && !isCodeBlock ? true : line.startsWith('```') && isCodeBlock ? false : isCodeBlock;

    return { line, isCodeBlock };
  };
};

const removeCodeBlocks = ({ line, isCodeBlock }) => !isCodeBlock && line.startsWith('#');

export const getArrayOfHeadings = (source) => {
  const isCodeBlock = makeCodeBlockTest();
  const headings = source
    .split('\n')
    .map(isCodeBlock)
    .filter(removeCodeBlocks)
    .map(({ line }) => line);

  return headings;
};
