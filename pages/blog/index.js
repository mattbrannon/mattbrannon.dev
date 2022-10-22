import styled from 'styled-components';
import { InternalLink } from '@components/Links';
import Head from '@components/Head';
import { CardHeading } from '@components/Headings';
import { PageTitle } from '@components/PageTitle';
import { Main } from '@components/Layout';
import { spacer } from '@components/Spacer';
import Text from '@components/Text/Text';
import { VideoPlayer } from '@components/VideoPlayer';
import { breakpoints } from '@constants/index';
import { POSTS_PATH, publishedArticles } from '@utils/mdxUtils.js';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import Link from 'next/link';
import { Card } from '@components/Card';
import { useMediaQuery } from '@hooks/useMediaQuery';

export default function Index({ posts }) {
  const isMobile = useMediaQuery({ maxWidth: breakpoints.tablet });
  return (
    <Main id="main-content">
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
          return <Card.Blog key={href} href={href} post={post} />;
        })}
      </BlogList>
      <spacer.block size={32} />
    </Main>
  );
}

// const Card = styled.li`
//   border: 1px solid black;
//   border-radius: 6px;
//   background: #222;
//   grid-column: 2;
//   width: 100%;
//   padding: 0 16px;
//   background: var(--basic-card-background);
//   font-variation-settings: 'wght' 700;
//   list-style: none;
// `;

const BlogList = styled.ul`
  display: grid;
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

// export default function BlogPage({ posts }) {
//   return (
//     <Main id="main-content">
//       <Head
//         title="Another Developer Blog"
//         description="Thoughts, opinions, criticisms, rantings, ravings, musings on all things great and small"
//       />
//       <PageTitle>Another Developer Blog</PageTitle>
//       <List>
//         <Video />
//         {posts.map((post, i) => {
//           const href = `/blog/${post.filePath.replace(/\.mdx?$/, '')}`;
//           return (
//             <Card key={post.filePath} href={href}>
//               <div>
//                 <H2>{post.data.title}</H2>
//                 <Description>{post.data.description}</Description>
//               </div>
//             </Card>
//           );
//         })}
//       </List>
//     </Main>
//   );
// }

// const List = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(min(400px, 100%), 1fr));
//   grid-auto-flow: dense;
//   gap: 32px;
//   margin: 0 auto;
// `;

// const Video = () => {
//   return (
//     <>
//       <video
//         style={{
//           height: 'auto',
//           width: '100%',
//           borderRadius: '4px',
//           maxWidth: '540px',
//           // margin: '0 auto',
//           justifySelf: 'stretch',
//         }}
//         autoPlay
//         loop
//         muted
//         playsInline
//       >
//         <source src="/videos/demos/mitm.mp4" type="video/mp4" />
//       </video>
//       {/* <div></div> */}
//     </>
//   );
// };

// const Wrapper = styled.div`
//   /* padding: 16px; */
// `;

// const Card = styled(Wrapper)`
//   background: #191919;
//   padding: 16px;
//   border-radius: 4px;
//   /* max-width: 540px; */
//   width: 100%;
//   /* margin: 0 auto; */
// `;

// const Main = styled.main`
//   max-width: var(--max-page-width);
//   min-height: 100vh;
//   width: 100%;
//   margin: 0 auto;
//   /* padding: 32px; */
// `;

// const H2 = styled.h2`
//   margin: 0;
//   color: var(--h2);
// `;

// const Description = styled.p`
//   font-family: OpenSans;
//   font-variation-settings: 'wdth' 75, 'wght' 500;
//   font-size: var(--size20);
// `;
