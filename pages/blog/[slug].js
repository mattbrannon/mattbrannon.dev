import BlogHeader from '@components/BlogHeader';
import { button } from '@components/Button';
import Head from '@components/Head';
import { headings } from '@components/Headings';
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
// import { useEffect } from 'react';
import { text } from '@components/Text';
import { link } from '@components/Links';
import { spacer } from '@components/Spacer';

import { MaxWidthWrapper } from '@components/MaxWidthWrapper';
// import { Em } from '@components/Text';

import { creature } from '@components/Creature';

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
  Button: button.pink,
  button: button.teal,
  pre: BlogHighlighter,
  // ColorText: dynamic(() => import('@components/Text/P').then((res) => res.ColorText)),
  Video: dynamic(() => import('@components/VideoPlayer').then((res) => res.VideoPlayer)),
  // ul: UnorderedList,
  // li: ListItem,
  Gap: dynamic(() => import('@components/Spacer').then((res) => res.Gap)),
  List: dynamic(() => import('@components/List')),
  spacer,
  h2: headings.h2Link,
  h3: headings.h3Link,
  h4: headings.h4Link,
  h5: headings.h5Link,
  InternalLink: link.internal,
  creature,

  p: text.paragraph,
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

  console.log(params, filename);

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
  const paths = publishedArticles.map((path) => path.replace(/\.mdx?$/, '')).map((slug) => ({ params: { slug } }));

  console.log(paths);

  return {
    paths,
    fallback: false,
  };
};

const FlexWrapper = styled(MaxWidthWrapper)`
  display: flex;
  flex: 1;
`;
