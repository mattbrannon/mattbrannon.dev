import { Anchor } from '@components/Anchor';
import DocumentHead from '@components/Head';
import { H4 } from '@components/Headings';
import Picture from '@components/Image';
import { TopRow } from '@components/Layout';
import PageTitle from '@components/PageTitle';
import Section from '@components/Section';
import { getImageConfig } from '@utils/images';
import Link from 'next/link';
import styled from 'styled-components/macro';

export default function AppsPage({ montyHall, elbowRoom, letsMakeGifs }) {
  return (
    <Article id="apps">
      <DocumentHead title="Apps" desc="Apps built by Matt Brannon" />
      <TopRow>
        <PageTitle>Apps I've Built</PageTitle>
      </TopRow>

      <Paragraph>
        The modern web is all about components and for good reason. Component driven development
        allows developers to focus on building smaller individual pieces of an app and then
        gradually combine those pieces together. Kind of like building a complex model of the
        Millenium Falcon out of Lego blocks. And when it comes to building a component based app
        from the ground up, I can think of no other framework more suited to the task than{' '}
        <strong>React. </strong> All the applications listed on this page were built with React on
        the frontend.
      </Paragraph>

      <AppList>
        <Section>
          <HeadingWrapper>
            <Heading>
              <Link passHref href="/apps/lets-make-a-gif">
                <A>Let's Make a Gif</A>
              </Link>
            </Heading>
            <Small>A photo / video editing application. Built with React, Nodejs and FFMPEG</Small>
          </HeadingWrapper>

          <AppImage sources={letsMakeGifs.main} href="/apps/lets-make-a-gif"></AppImage>
        </Section>

        <Section>
          <HeadingWrapper>
            <Heading>
              <Link passHref href="/apps/elbowroom">
                <A>Elbow Room</A>
              </Link>
            </Heading>
            <Small>A fullstack realtime chat application</Small>
          </HeadingWrapper>
          <AppImage sources={elbowRoom.main} href="/apps/elbowroom" />
        </Section>

        <Section>
          <HeadingWrapper>
            <Heading>
              <Link passHref href="/apps/monty-hall">
                <A>Monty Hall Experience</A>
              </Link>
            </Heading>
            <Small>A game inspired by the Monty Hall Problem</Small>
          </HeadingWrapper>
          <AppImage sources={montyHall.main} href="/apps/monty-hall" />
        </Section>
      </AppList>
    </Article>
  );
}

const A = styled(Anchor)`
  &:visited {
    color: currentColor;
  }
`;

const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Small = styled.small`
  font-size: clamp(var(--size10), 2.5vw, var(--size16));
  font-variation-settings: 'wdth' 75, 'wght' 333;
`;

const Heading = styled(H4)`
  margin-bottom: -4px;
`;

const Article = styled.article`
  padding: 0px 0 48px 0;
`;

const Paragraph = styled.p`
  font-size: clamp(var(--size16), 0.2vw + 1rem, var(--size20));
`;

const AppList = styled.div`
  margin-top: -32px;
  grid-column: 1 / -1;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(480px, 100%), 1fr));
  gap: 32px;
`;

const ImageLinkWrapper = styled.div`
  --shadow: -0.1em 0.4em 0.8em hsl(210, 12%, 46%);
  transform: translateY(32px) scale(1.09);
  overflow: hidden;

  &:hover {
    --shadow: 0em 0.6em 1.2em hsl(210, 10%, 50%);
    ${'' /* transform: translateY(48px) scale(1.14); */}
    cursor: pointer;
    transition: all 160ms ease-in 40ms;
  }

  @media (prefers-color-scheme: dark) {
    --shadow: 0px 1em 1em hsl(210, 6%, 4%);
    &:hover {
      --shadow: 0em 0.6em 1.2em hsl(210, 10%, 10%);
    }
  }

  transition: all 400ms ease-in-out 100ms;
`;

function AppImage({ ...props }) {
  console.log(props);
  const appName = props.href.slice(6);
  return (
    <ImageLinkWrapper>
      <Link passHref {...props}>
        <Anchor>
          <Picture
            href={props.href}
            sources={props.sources}
            src={`/images/${appName}/main.png`}
            width={1440 / 2}
            height={900 / 2}
            alt={`Go to the ${appName.replace(/-/g, ' ')} discussion page`}
          />
        </Anchor>
      </Link>
    </ImageLinkWrapper>
  );
}

export async function getStaticProps() {
  const montyHall = await getImageConfig('monty-hall');
  const elbowRoom = await getImageConfig('elbowroom');
  const letsMakeGifs = await getImageConfig('lets-make-a-gif');
  return {
    props: {
      montyHall,
      elbowRoom,
      letsMakeGifs,
    },
  };
}
