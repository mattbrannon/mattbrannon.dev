import fs from 'fs';
import path from 'path';

// POSTS_PATH is useful when you want to get the path to a specific file
export const POSTS_PATH = path.join(process.cwd(), 'articles');

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const postFilePaths = fs
  .readdirSync(POSTS_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path));

// const APPS_PATH = path.join(process.cwd(), '/pages/apps');

// export const appsFilePaths = fs.readdirSync(APPS_PATH).filter((filepath) => {
//   return /\.js?$/.test(filepath) && filepath !== 'index.js';
// });

// console.log(appsFilePaths);
