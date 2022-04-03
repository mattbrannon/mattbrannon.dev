import BlogHeader from '@components/BlogHeader';
import Button, { InvertedButton } from '@components/Button';
import Head from '@components/Head';
import { H2Link, H3Link, H4Link, H5Link } from '@components/Headings';

import SyntaxHighlighter from '@components/SyntaxHighlighter';
import { POSTS_PATH, publishedArticles } from '@utils/mdxUtils.js';
import fs from 'fs';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import dynamic from 'next/dynamic';
import path from 'path';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';
// import { Em } from '@components/Text';

const UnorderedList = styled.ul`
  margin: revert;
  padding: revert;
`;

const ListItem = styled.li`
  list-style-type: revert;
  margin: 1.125rem 0;
`;

const components = {
  blockquote: dynamic(() => import('@components/SideNote').then((res) => res.Blockquote)),
  Button,
  InvertedButton,
  pre: SyntaxHighlighter,
  p: dynamic(() => import('@components/Text')),
  ColorText: dynamic(() => import('@components/Text').then((res) => res.ColorText)),
  Video: dynamic(() => import('@components/VideoPlayer').then((res) => res.FlatVideo)),
  ul: UnorderedList,
  li: ListItem,
  Gap: dynamic(() => import('@components/Spacer').then((res) => res.Gap)),
  List: dynamic(() => import('@components/List')),
  MiniGame: dynamic(() => import('@components/Minigame')),
  checkbox: dynamic(() => import('@components/Minigame').then((res) => res.Checkbox)),
  strong: dynamic(() => import('@components/FancyText').then((res) => res.StrongText)),
  Spacer: dynamic(() => import('@components/Spacer')),
  h2: H2Link,
  h3: H3Link,
  h4: H4Link,
  h5: H5Link,
  em: dynamic(() => import('@components/Text').then((res) => res.Em)),
  a: dynamic(() => import('@components/ExternalLink').then((res) => res.ExternalLink)),
  Math: dynamic(() => import('@components/Math')),
  InternalLink: dynamic(() => import('@components/ExternalLink').then((res) => res.Link)),
};

export default function PostPage({ source, frontMatter }) {
  const { title, description } = frontMatter;
  return (
    <>
      <Head title={title} description={description} />
      <BlogHeader>{frontMatter}</BlogHeader>
      <MDXRemote {...source} components={components} />
    </>
  );
}

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
};

export const getStaticPaths = async () => {
  const paths = publishedArticles
    .map((path) => path.replace(/\.mdx$/, ''))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
