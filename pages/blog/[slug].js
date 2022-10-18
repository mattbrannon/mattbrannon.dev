import BlogHeader from '@components/BlogHeader';
import { NormalButton, InvertedButton, PinkButton } from '@components/Button';
import Head from '@components/Head';
import { H2Link, H3Link, H4Link, H5Link } from '@components/Headings';
import { TableOfContents } from '@components/TableOfContents';

import { BlogHighlighter } from '@components/SyntaxHighlighter';
import { getArrayOfHeadings, POSTS_PATH, publishedArticles } from '@utils/mdxUtils.js';
import fs from 'fs';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import dynamic from 'next/dynamic';
import path from 'path';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';
import { Main } from '@components/Layout';
import { useEffect } from 'react';
import { text } from '@components/Text';

import { MaxWidthWrapper } from '@components/MaxWidthWrapper';
// import { Em } from '@components/Text';

const UnorderedList = styled.ul`
  margin: revert;
  padding: revert;
`;

const ListItem = styled.li`
  list-style-type: revert;
  margin: 1.125rem 0;
`;

const P = styled.p`
  color: var(--color-text);
  font-family: Inter; //OpenSans;
  font-variation-settings: 'wdth' 75, 'wght' 555;
  color: var(--color-text);
`;

const Em = styled.em`
  color: red;
`;

const Strong = styled.strong`
  color: red;
`;

const components = {
  Button: InvertedButton,
  button: NormalButton,
  InvertedButton,
  pre: BlogHighlighter,
  ColorText: dynamic(() => import('@components/Text/Text').then((res) => res.ColorText)),
  Video: dynamic(() => import('@components/VideoPlayer').then((res) => res.VideoPlayer)),
  // ul: UnorderedList,
  // li: ListItem,
  Gap: dynamic(() => import('@components/Spacer').then((res) => res.Gap)),
  List: dynamic(() => import('@components/List')),
  MiniGame: dynamic(() => import('@components/Minigame')),
  checkbox: dynamic(() => import('@components/Minigame').then((res) => res.Checkbox)),
  // strong: dynamic(() => import('@components/Text').then((res) => res.StrongText)),
  Spacer: dynamic(() => import('@components/Spacer').then((res) => res.Spacer)),
  h2: H2Link,
  h3: H3Link,
  h4: H4Link,
  h5: H5Link,
  InternalLink: dynamic(() => import('@components/Links').then((res) => res.Link)),
  // em: text.em,
  // strong: text.strong,
  // strong: Strong,
};

export default function PostPage({ source, frontMatter, headings }) {
  const { title, description, toc } = frontMatter;

  return (
    <Main id="main-content">
      <Head title={title} description={description} />

      {toc ? (
        <FlexWrapper>
          <div style={{ marginRight: '128px' }}>
            <TableOfContents headings={headings} />
          </div>

          <div style={{ flex: 1 }}>
            <BlogHeader>{frontMatter}</BlogHeader>
            <MDXRemote {...source} components={components} />
          </div>
        </FlexWrapper>
      ) : (
        <>
          <BlogHeader>{frontMatter}</BlogHeader>
          <MDXRemote {...source} components={components} />
        </>
      )}
    </Main>
  );
}

export const getStaticProps = async ({ params }) => {
  const filename = fs
    .readdirSync(POSTS_PATH)
    .filter((file) => file.slice(0, file.lastIndexOf('.')) === params.slug)
    .join('');

  const postFilePath = path.join(POSTS_PATH, filename);
  const source = fs.readFileSync(postFilePath, 'utf8');
  const headings = getArrayOfHeadings(source);

  const { content, data } = matter(source);
  const mdxSource = await serialize(content, {
    scope: data,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  });
  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      headings,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = publishedArticles.map((path) => path.replace(/\.mdx$/, '')).map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

const FlexWrapper = styled(MaxWidthWrapper)`
  display: flex;
  flex: 1;
`;
