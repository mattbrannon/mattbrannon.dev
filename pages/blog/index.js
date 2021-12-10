import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { postFilePaths, POSTS_PATH } from '@utils/mdxUtils';
import Spacer from '@components/Spacer';
import styled from 'styled-components/macro';
import DocumentHead from '@components/Head';
import VideoPlayer from '@components/VideoPlayer';
import PageTitle from '@components/PageTitle';
import { TopRow } from '@components/Layout';
import BlogCard from '@components/Blog/Card';
import { useFontSize } from '@hooks/useFontSize';

export default function Index({ posts }) {
  const fontSize = useFontSize(14, 20, 360, 1920);
  // console.log(fontSize);
  return (
    <>
      <DocumentHead
        title="Another Developer Blog"
        desc="Thoughts, opinions, criticisms, rantings, ravings, musings on all things great and small"
      />

      <Main>
        <TopRow>
          <PageTitle>Another Developer Blog</PageTitle>
        </TopRow>

        <VideoPlayer
          rounded
          left
          size={360}
          sources={[ '/videos/demos/mitm.mp4', '/videos/demos/mitm.webm' ]}
        />
        <Introduction fontSize={fontSize}>
          Sometimes I learn things. And sometimes the things that I learn are kinda interesting.
        </Introduction>

        <BlogList>
          {posts.map((post) => {
            const as = `/blog/${post.filePath.replace(/\.mdx?$/, '')}`;
            return (
              <BlogCard as={as} post={post} key={post.filePath}>
                {post.data.des}
              </BlogCard>
            );
          })}
        </BlogList>
        <Spacer axis="vertical" size={32} />
      </Main>
    </>
  );
}

const Main = styled.main`
  isolation: isolate;
`;

const BlogList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(500px, 100%), 1fr));
  gap: 32px;

  @media (max-width: 500px) {
    margin-bottom: 32px;
    gap: 0px;
  }
`;

export function getStaticProps() {
  const posts = postFilePaths.map((filePath) => {
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

const Introduction = styled.p`
  margin: 64px 0;
  font-size: ${(p) => p.fontSize};
`;
