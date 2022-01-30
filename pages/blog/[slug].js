import BlogHeader from '@components/BlogHeader';
import Head from '@components/Head';
// import SideNote from '@components/SideNote';
import Button, { InvertedButton } from '@components/Button';
// import GradientText from '@components/GradientText';

import { H1, H2, H3, GradientHeading } from '@components/Headings';

import Layout from '@components/Layout';
import { publishedArticles, POSTS_PATH } from '@utils/mdxUtils.js';
import fs from 'fs';
import path from 'path';
import styled from 'styled-components';

// import Checkbox from '@components/Checkbox';
// import { getMDXComponent } from 'mdx-bundler/client';
// import { useMemo } from 'react';
// import { bundleMDX } from 'mdx-bundler';
import SyntaxHighlighter from '@components/SyntaxHighlighter';
import remarkGfm from 'remark-gfm';
import dynamic from 'next/dynamic';
import matter from 'gray-matter';

import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';

const UnorderedList = styled.ul``;

const ListItem = styled.li`
  list-style-type: revert;
`;

const components = {
  blockquote: dynamic(() => import('@components/SideNote').then((res) => res.Blockquote)),
  Button,
  InvertedButton,
  h1: GradientHeading,
  pre: SyntaxHighlighter,
  p: dynamic(() => import('@components/Text')),
  ColorText: dynamic(() => import('@components/Text').then((res) => res.ColorText)),
  Video: dynamic(() => import('@components/VideoPlayer').then((res) => res.FlatVideo)),
  ul: UnorderedList,
  li: ListItem,

  MiniGame: dynamic(() => import('@components/Minigame')),
  checkbox: dynamic(() => import('@components/Minigame').then((res) => res.Checkbox)),
  strong: dynamic(() => import('@components/FancyText').then((res) => res.StrongText)),
  Spacer: dynamic(() => import('@components/Spacer')),
  h2: H2,
  h3: H3,
};

export default function PostPage({ source, frontMatter }) {
  const { title, description } = frontMatter;
  return (
    <PageLayout>
      <Head title={title} description={description} />
      <BlogHeader>{frontMatter}</BlogHeader>
      <MDXRemote {...source} components={components} />
    </PageLayout>
  );
}

const PageLayout = styled(Layout)`
  display: grid;
  grid-template-columns: auto min(var(--max-width), 100%) auto;
  min-width: 0;
`;

export const getStaticProps = async ({ params }) => {
  const filename = fs
    .readdirSync(POSTS_PATH)
    .filter((file) => file.slice(0, file.lastIndexOf('.')) === params.slug)
    .join('');

  const postFilePath = path.join(POSTS_PATH, filename);
  const source = fs.readFileSync(postFilePath, 'utf8');

  const { content, data } = matter(source);
  const mdxSource = await serialize(content, {
    scope: data,
    mdxOptions: {
      remarkPlugins: [ remarkGfm ],
    },
  });
  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };

  // const mdxSource = await serialize(source);
  // return { props: { source: mdxSource } };

  // const { code, frontmatter } = await bundleMDX({ source });
};

export const getStaticPaths = async () => {
  // Remove file extensions for page paths
  // Map the path into the static paths object required by Next.js
  const paths = publishedArticles
    .map((path) => path.replace(/\.mdx$/, ''))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

// const MaxWidthWrapper = styled.div`
//   max-width: 100ch;
//   width: 100%;
//   margin: 0 auto;
//   padding: 0 16px;
// `;

// const [ maxWidth, setMaxWidth ] = useCssVariable('--max-width');

// useEffect(() => {
//   setMaxWidth('130ch');
// }, []);

// useEffect(() => {
//   async function copyText(selectedText) {
//     try {
//       await navigator.clipboard.writeText(selectedText);
//       // console.log('text copied clipboard');
//     } catch (err) {
//       // console.error('Failed to copy: ', err);
//     }
//   }

//   setTimeout(() => {
//     Prism.plugins.toolbar.registerButton('copy', function (env) {
//       const button = document.createElement('button');
//       button.innerHTML = 'Copy snippet';

//       button.addEventListener('click', function () {
//         // Source: http://stackoverflow.com/a/11128179/2757940
//         if (document.body.createTextRange) {
//           // ms
//           const range = document.body.createTextRange();
//           range.moveToElementText(env.element);
//           range.select();
//         }
//         else if (window.getSelection) {
//           // moz, opera, webkit
//           const selection = window.getSelection();
//           const range = document.createRange();
//           range.selectNodeContents(env.element);
//           selection.removeAllRanges();
//           selection.addRange(range);
//           copyText(selection.toString())
//             .then(selection.removeAllRanges())
//             .then(() => {
//               button.innerHTML = 'Snippet Copied to clipboard!';
//               button.style.color = 'white';
//               button.style.transition = 'all 0.3s ease';
//             })
//             .then(() =>
//               setTimeout(() => {
//                 button.innerHTML = 'Copy snippet';
//               }, 2000)
//             )
//             .catch(console.log);
//         }
//       });

//       return button;
//     });
//     Prism.highlightAll();
//     // console.log(Prism.plugins);
//   }, 0);
// }, []);
