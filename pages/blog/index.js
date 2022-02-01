// import BlogCard from '@components/Blog/Card';
import Head from '@components/Head';
import Layout from '@components/Layout';
import PageTitle from '@components/PageTitle';
import Spacer from '@components/Spacer';
import { BlogVideo } from '@components/VideoPlayer';
import { breakpoints } from '@constants/index';
import { useFontSize } from '@hooks/useFontSize';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { publishedArticles, POSTS_PATH } from '@utils/mdxUtils.js';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import styled from 'styled-components';
// import Creature from '@components/Creature';
import Text from '@components/Text';
// import Sidenote from '@components/SideNote';

import { Link } from '@components/ExternalLink';
import { H2 } from '@components/Headings';

export default function Index({ posts }) {
  // const fontSize = useFontSize(14, 20, 360, 1920);
  const shouldCenter = useMediaQuery({ maxWidth: 795 });
  // const placement = shouldCenter ? 'center' : 'left';

  return (
    <Layout>
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

      {/* <IntroWrapper>
        <Text>
          When I learn something, I've found that one of the best ways to make sure I
          truly understand it, is to try and explain it to someone else so it makes sense
          for them. So that's what I try and do here. I mostly write about Javascript and
          CSS but you'll also occasionally find articles on things like deployment and
          getting the most bang for your buck on your remote server. I hope you find the
          content useful.
        </Text>
      </IntroWrapper> */}
      <BlogList>
        {posts.map((post) => {
          const href = `/blog/${post.filePath.replace(/\.mdx?$/, '')}`;
          return (
            <MaxWidthWrapper key={post.filePath}>
              <Card key={post.filePath}>
                <Link passHref href={href}>
                  <H2>{post.data.title}</H2>
                </Link>
                <Text>{post.data.description}</Text>
              </Card>
            </MaxWidthWrapper>
          );
        })}
      </BlogList>
      <Spacer axis="vertical" size={32} />
    </Layout>
  );
}

const MaxWidthWrapper = styled.div`
  max-width: var(--max-width);
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: stretch;
`;

const Card = styled.div`
  border: 1px solid black;
  border-radius: 6px;
  background: #222;
  grid-column: 2;
  width: 100%;
  padding: 0 16px;

  @media (prefers-color-scheme: light) {
    background: hsl(223 30% 88%);
  }
`;

const IntroWrapper = styled.div`
  max-width: calc(var(--max-width) / 1.25);
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 16px;

  align-items: center;
  padding: 0 16px;

  @media (max-width: ${breakpoints.tablet}px) {
    margin: 0 auto;
    max-width: ${breakpoints.mobile}px;
    padding-left: 32px;
  }

  @media (max-width: ${breakpoints.mobile}px) {
    margin: 0 auto;
    max-width: ${breakpoints.mobile}px;
    padding-left: 16px;
  }
`;

const BlogList = styled.div`
  ${'' /* display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
  gap: 32px;
  place-items: center; */}

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
