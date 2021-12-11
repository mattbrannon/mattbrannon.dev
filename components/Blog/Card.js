import { Anchor } from '@components/Anchor';
import Link from 'next/link';
import styled from 'styled-components/macro';

export default function BlogCard({ as, post }) {
  return (
    <BlogListCard key={post.filePath}>
      <Link passHref href={'/blog/[slug]'} as={as} key={post.filePath}>
        <Background>
          {/* <ImageWrapper>
            <Image src="/images/logo/logo.png" alt="logo" height={60} width={60} />
          </ImageWrapper> */}
          <Title>
            <H2>
              <Anchor>{post.data.title}</Anchor>
            </H2>
          </Title>
          <Description>
            <P>{post.data.description}</P>
            <ReadMoreLink>Read more</ReadMoreLink>
          </Description>
        </Background>
      </Link>
    </BlogListCard>
  );
}

const BlogListCard = styled.li`
  --shadow-color: 210deg 5% 5%;
  --opacity: 0.5;
  --card-background: hsl(223 35% 85% / 0.5);
  --card-shadow: 2px 2px 4px hsl(210 5% 38% / 0.1), 3px 3px 6px hsl(210 5% 38% / 0.1),
    4px 4px 8px hsl(210 5% 38% / 0.1), 5px 5px 10px hsl(210 5% 38% / 0.1),
    6px 6px 12px hsl(210 5% 38% / 0.1), 7px 7px 14px hsl(210 5% 38% / 0.1),
    8px 8px 16px hsl(210 5% 38% / 0.1), 9px 9px 18px hsl(210 5% 38% / 0.1);

  border-radius: 12px;
  min-height: 280px;
  flex: 1;

  box-shadow: var(--card-shadow);

  position: relative;
  font-weight: 500;

  @media (prefers-color-scheme: dark) {
    --shadow-color: 210deg 5% 5%;
    --opacity: 0.8;
  }

  @media (max-width: 500px) {
    margin-bottom: 32px;
  }

  &:hover {
    cursor: pointer;
  }
`;

const Background = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: space-between;
  flex: 1 30ch;

  padding: 32px;
  margin: 8px 0;

  border-radius: 8px;

  background: hsl(223 35% 85% / 0.5);
  color: black;
`;

const Title = styled.div`
  background: linear-gradient(to right, hsla(208 66% 44% / 1), hsla(230 65% 45% / 1));
  color: gold;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 70%;
  left: 0;
  z-index: 2;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  border: none;
  text-shadow: 0.055em 0.055em 0.05em black;
`;

const Description = styled.div`
  position: absolute;
  top: 30%;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  padding: 16px 64px 0 64px;
  border: none;

  justify-content: space-evenly;
`;

const P = styled.small`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`;

const ReadMoreLink = styled.div`
  ${'' /* background: white; */}
  width: 100%;
  color: black;
`;

const H2 = styled.h2`
  font-size: var(--size28);
  text-align: right;
  padding-right: 32px;
  padding-top: 21px;
`;
