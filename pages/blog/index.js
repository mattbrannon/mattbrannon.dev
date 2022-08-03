import { Link } from '@components/Links';
import Head from '@components/Head';
import { CardHeading } from '@components/Headings';
import PageTitle from '@components/PageTitle';
import { Spacer } from '@components/Spacer';
import Text from '@components/Text';
import { BlogVideo } from '@components/VideoPlayer';
import { breakpoints } from '@constants/index';
import { POSTS_PATH, publishedArticles } from '@utils/mdxUtils.js';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import styled from 'styled-components';

export default function Index({ posts }) {
  return (
    <div>
      <Head
        title="Another Developer Blog"
        description="Thoughts, opinions, criticisms, rantings, ravings, musings on all things great and small"
      />

      <PageTitle>Another Developer Blog</PageTitle>

      <BlogVideo
        rounded
        center
        size={360}
        sources={[ '/videos/demos/mitm.webm', '/videos/demos/mitm.mp4' ]}
      />
      <Spacer size={32} />

      <BlogList id="main-content" tabIndex={-1}>
        {posts.map((post) => {
          const href = `/blog/${post.filePath.replace(/\.mdx?$/, '')}`;
          return (
            <Card key={post.filePath}>
              <CardHeading>
                <Link href={href}>{post.data.title}</Link>
              </CardHeading>
              <Text>{post.data.description}</Text>
            </Card>
          );
        })}
      </BlogList>
      <Spacer axis="vertical" size={32} />
    </div>
  );
}

const Card = styled.div`
  border: 1px solid black;
  border-radius: 6px;
  background: #222;
  grid-column: 2;
  width: 100%;
  padding: 0 16px;
  background: var(--basic-card-background);
`;

const BlogList = styled.div`
  display: grid;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (min-width: ${breakpoints.mobile}px) {
    margin-top: 32px;
  }

  @media (max-width: 500px) {
    margin-bottom: 32px;
    gap: 0px;
  }

  @media (max-width: 795px) {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin: 32px auto 0 auto;
    max-width: 555px;
  }

  @media (max-width: ${breakpoints.mobile}px) {
    margin-top: 16px;
  }

  @media (max-width: ${breakpoints.tablet}px) {
  }
`;

export function getStaticProps() {
  const posts = publishedArticles.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
    const { content, data } = matter(source);
    return {
      content,
      data,
      filePath,
    };
  });

  return { props: { posts } };
}
