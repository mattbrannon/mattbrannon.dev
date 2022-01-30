import fs from 'fs';
import path from 'path';

// POSTS_PATH is useful when you want to get the path to a specific file
export const IMAGES_PATH = path.join(process.cwd(), '/public/images');

export const pathToAppImages = (appName) =>
  fs
    .readdirSync(IMAGES_PATH)
    .filter((folderName) => {
      return folderName === appName;
    })
    .map((name) => `${IMAGES_PATH}/${name}`)
    .join('');

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const allFilePaths = fs
  .readdirSync(IMAGES_PATH)
  .filter((filePath) => /(\.png$|\.avif$|\.webp$)/.test(filePath));

export const imageFilePaths = allFilePaths.filter((filename) => {
  const fullPath = path.resolve(IMAGES_PATH, filename);
  const source = fs.readFileSync(fullPath);
  // console.log(source);
  return source;
});

export const getImageConfig = (appName) => {
  const imageFolder = pathToAppImages(appName);
  const files = fs
    .readdirSync(imageFolder)
    .map((filename) => {
      const hasValue = filename.match(/-\d+/g) !== null;
      const size = hasValue
        ? filename
            .match(/-\d+/g)
            .filter((value) => value)
            .map((n) => Math.abs(n))
            .join('')
        : null;
      const type = filename.slice(filename.lastIndexOf('.') + 1);
      const name = filename.slice(0, filename.lastIndexOf('-'));
      return { name, size, type };
    })
    .filter((obj) => obj.size !== null)
    .reduce((acc, obj) => {
      const key = obj.name;
      if (!(key in acc)) {
        acc[key] = { sizes: [], types: [], name: obj.name, folder: `/images/${appName}` };
      }
      const sizes = acc[key].sizes;
      const types = acc[key].types;

      if (!sizes.includes(obj.size)) {
        sizes.push(obj.size);
      }
      if (!types.includes(obj.type)) {
        types.push(obj.type);
      }

      return acc;
    }, {});

  return files;
};
