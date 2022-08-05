import fs from 'fs';
import path from 'path';

const PATH_TO_IMAGES = path.resolve(process.cwd(), 'public', 'images');

// const images = [
//   {
//     file: 'photo1',
//     types: ['avif', 'webp', 'png'],
//     sizes: [240, 360, 480, 540, 720, 960, 1080, 1440],
//     location: 'path/to/file',
//   },
//   {
//     file: 'photo2',
//     types: ['avif', 'webp', 'png'],
//     sizes: [240, 360, 480, 540, 720, 960, 1080, 1440],
//     location: 'path/to/file',
//   },
//   {
//     file: 'photo3',
//     types: ['avif', 'webp', 'png'],
//     sizes: [240, 360, 480, 540, 720, 960, 1080, 1440],
//     location: 'path/to/file',
//   },
// ]

// images.map(({ file, types, sizes, location }, i) => {
//   const sources = types.map((type, j) => {
//     return sizes
//       .map((size, k) => {
//         return { type: `image/${type}`, path: `${location}/${file}@${size}.${type} ${size}w` }
//       })
//       .reduce((acc, value, i) => {
//         acc.type = value.type
//         acc.srcset = i === 0 ? [].concat(value.path) : acc.srcset.concat(value.path)
//         // console.log(value.type, value.path, file);
//         return acc
//       }, {})
//   })
//   return sources
// })

const getFullPaths = (dir) => {
  return fs.readdirSync(dir).map((filename) => path.resolve(dir, filename));
};

const isDirectory = (pathname) => {
  try {
    return fs.lstatSync(pathname).isDirectory();
  }
  catch {
    return false;
  }
};

const getFileTypes = (pathname) => {
  return [...new Set(pathname.map((filename) => path.parse(filename).ext))];
};

// const getFileNames = (pathname) => {
//   return [...new Set(pathname.map((filename) => path.parse(filename).name))];
// };

export const filterByName = (appName) => {
  const dirs = getFullPaths(PATH_TO_IMAGES)
    .filter((dir) => isDirectory(dir))
    .map((fullpath) => {
      const files = getFullPaths(fullpath);
      // const filenames = getFileNames(files);
      const types = getFileTypes(files);
      const name = path.parse(fullpath).name;
      const base = [...new Set(files.map((file) => file.slice(0, file.lastIndexOf('.'))))];

      types.map((type) => {
        const thing = base.map((file) => file + type).filter((filepath) => files.includes(filepath));
        console.log(type, thing);
      });

      return { name, files, types, base };
    })
    .find(({ name }) => name === appName);

  return dirs;
};

// const images = filterByName('monty-hall');
// console.log(images);

// const things = images.types.map((fileExt) => {
//   const group = images.files.filter((file) => {
//     return path.parse(file).ext === fileExt;
//   });
//   return { [fileExt.slice(1)]: group.flat(Infinity) };
// });

// const [{ avif }, { png }] = things;
// console.log(images);

// console.log(Object.keys(avif));

// const things = filterByName('monty-hall').files.reduce((acc, filepath, i) => {
//   const name = path.parse(filepath).name;
//   const obj = acc.find((o) => (o.file = name)) ?? { file: name };

//   return acc;
// }, []);

// console.log(things);

// const obj = filterByName('monty-hall');
// console.log(obj);
// const config = obj.files.reduce((acc, filepath) => {
//   const { ext, name, dir, base, root } = path.parse(filepath);
//   console.log(ext, name, dir, base, root);
//   acc.file = name;
//   acc.types = Array.isArray(acc.types)
//     ? acc.types.concat(base.slice(base.indexOf('.')))
//     : [].concat(base.slice(base.indexOf('.')));

//   // acc.types = [
//   //   ...new Set(Array.isArray(acc.types) ? acc.types.concat(ext.slice(1)) : [].concat(ext.slice(1))),
//   // ];
//   return acc;
// }, {});
