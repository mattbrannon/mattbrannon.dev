import fs from 'fs';
import matter from 'gray-matter';
import Link from 'next/link';
import path from 'path';
import { postFilePaths, POSTS_PATH } from '../../utils/mdxUtils';
import Spacer from '../../components/Spacer';
import styled from 'styled-components/macro';
import { MaxWidthWrapper } from '../../components/MaxWidth';
import DocumentHead from '../../components/Head';
import VideoPlayer from '../../components/VideoPlayer';

export default function Index({ posts }) {
  return (
    <>
      <DocumentHead
        title="Another Developer Blog"
        desc="Thoughts, opinions, criticisms, rantings, ravings, musings on all things great and small"
      />

      <Main>
        <MaxWidthWrapper>
          <FluidHeading>
            <SnarkyText>another </SnarkyText>
            developer blog
          </FluidHeading>

          <VideoPlayer sources={[ '/videos/mitm.mp4', '/videos/mitm.webm' ]} />

          <Spacer axis="vertical" size={32} />
          <BlogList>
            {posts.map((post) => {
              return (
                <BlogListCard key={post.filePath}>
                  <BlogTitle filePath={post.filePath}>{post.data.title}</BlogTitle>
                  <BlogDescription>{post.data.description}</BlogDescription>
                </BlogListCard>
              );
            })}
          </BlogList>
          <Spacer axis="vertical" size={32} />
        </MaxWidthWrapper>
      </Main>
    </>
  );
}

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

const Main = styled.main`
  grid-area: main;
`;

const FluidHeading = styled.h2`
  /* font-size: clamp(1rem, 2.5vw + 0.6rem, 2.5rem); */
  /* font-size: clamp(1rem, 2.2vw + 0.4rem, 2rem); */
  /* font-size: clamp(1.25rem, 3.5vw, 2rem); */
  /* @media (min-width: 320px) {
    font-size: 1.25rem;
  }

  @media (min-width: 480px) {
    font-size: 1.5rem;
  } */

  font-size: clamp(1.25rem, 1.3vw + 1rem, 2.5rem);
`;

const BlogList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  list-style-type: none;
  padding: 0;
  flex: 1;

  @media (max-width: 500px) {
    margin-bottom: 32px;
    gap: 0px;
  }
`;

const BlogListCard = styled.li`
  flex: 1 30ch;
  padding: 32px;
  margin: 8px 0;
  border-radius: 8px;
  box-shadow: 2px 1px 7px 1px hsla(220deg, 0%, 25%, 0.4),
    -3px 4px 12px 1px hsla(220deg, 0%, 34%, 0.8);

  background: white;

  @media (prefers-color-scheme: dark) {
    background: #222;
    box-shadow: 0 0 0 2px hsla(220deg, 0%, 88%, 0.4);
    /* -2px 4px 5px 1px hsla(220deg, 0%, 76%, 0.8); */
  }

  @media (max-width: 500px) {
    margin-bottom: 32px;
  }
`;

const TitleWrapper = styled.div`
  display: 'flex';
  justify-content: 'space-between';
  align-items: 'baseline';
  background: 'red';
`;

export const SnarkyText = styled.span`
  display: inline;
  font-family: 'Coming Soon';
  color: deeppink;

  @media (prefers-color-scheme: dark) {
    color: deepskyblue;
  }
`;

const BlogTitle = ({ filePath, children }) => {
  return (
    <TitleWrapper>
      <Link
        as={`/blog/${filePath.replace(/\.mdx?$/, '')}`}
        href={'/blog/[slug]'}
        tabindex="0"
      >
        <a>{children}</a>
      </Link>
    </TitleWrapper>
  );
};

const BlogDescription = ({ children }) => {
  return (
    <div>
      <p>{children}</p>
    </div>
  );
};
