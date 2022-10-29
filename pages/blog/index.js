import styled from 'styled-components';
import Head from '@components/Head';
import { PageTitle } from '@components/PageTitle';
import { layout } from '@components/Layout';
import { spacer } from '@components/Spacer';
import { VideoPlayer } from '@components/VideoPlayer';
import { breakpoints } from '@constants/breakpoints';
import { POSTS_PATH, publishedArticles } from '@utils/mdxUtils.js';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { card } from '@components/Card';
import { useMediaQuery } from '@hooks/useMediaQuery';

export default function Index({ posts }) {
  const isMobile = useMediaQuery({ maxWidth: breakpoints.tablet });
  return (
    <layout.blog>
      <Head
        title="Another Developer Blog"
        description="Thoughts, opinions, criticisms, rantings, ravings, musings on all things great and small"
      />

      <PageTitle>Another Developer Blog</PageTitle>

      <VideoPlayer
        width={540}
        rounded
        center={isMobile}
        sources={['/videos/demos/mitm.webm', '/videos/demos/mitm.mp4']}
      />
      <spacer.block size={32} />

      <BlogList tabIndex={-1}>
        {posts.map((post) => {
          const href = `/blog/${post.filePath.replace(/\.mdx?$/, '')}`;
          return <card.blog key={href} href={href} post={post} />;
        })}
      </BlogList>
      <spacer.block size={32} />
    </layout.blog>
  );
}

const BlogList = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const BB = styled.ul`
  /* display: grid; */
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0;

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
