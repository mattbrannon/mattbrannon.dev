import styled from 'styled-components/macro';
import Image from 'next/image';
import Link from 'next/link';
import Section from '../../components/Section';
import Spacer from '../../components/Spacer';
import { MaxWidthWrapper } from '../../components/MaxWidth';
import DocumentHead from '../../components/Head';
import { Anchor } from '../../components/Anchor';

export default function AppsPage() {
  return (
    <>
      <DocumentHead title="Apps" desc="A list of apps built by Matt Brannon" />
      <main>
        <MaxWidthWrapper>
          <Heading>Apps</Heading>

          <p>
            I like building things. Occasionally, the things I build aren't completely
            terrible. This is my victory wall.
          </p>

          <Spacer axix="vertical" size={64} />
          <AppGroup>
            <Section>
              <HeadingLink href="/apps/lets-make-a-gif">Lets-Make-A-Gif.com</HeadingLink>
              <figure>
                <Caption>
                  A photo / video editing application built with React and Nodejs
                </Caption>
                <ImageLinkWrapper>
                  <Link passHref href="/apps/lets-make-a-gif">
                    <a>
                      <Image
                        href="/apps/lets-make-a-gif"
                        src="/images/lets-make-a-gif/lets-make-a-gif-desktop3.png"
                        width={1440 / 2}
                        height={900 / 2}
                        alt="App discussion page"
                      />
                    </a>
                  </Link>
                </ImageLinkWrapper>
              </figure>
            </Section>

            <Section>
              <HeadingLink href="/apps/elbowroom">ElbowRoom</HeadingLink>
              <figure>
                <Caption>
                  A fullstack realtime chat application built with React, Nodejs and
                  Firebase
                </Caption>
                <ImageLinkWrapper>
                  <Link passHref href="/apps/elbowroom">
                    <a>
                      <Image
                        href="/apps/elbowroom"
                        src="/images/elbowroom/desktop1.png"
                        width={1440 / 2}
                        height={900 / 2}
                        alt="link to the elbowroom discussion page"
                      />
                    </a>
                  </Link>
                </ImageLinkWrapper>
              </figure>
            </Section>

            <Section>
              <HeadingLink href="/apps/monty-hall">
                The Monty Hall Experiement
              </HeadingLink>
              <figure>
                <Caption>
                  A game for validating the Monty Hall Problem built with React and Nodejs
                </Caption>
                <ImageLinkWrapper>
                  <Link passHref href="/apps/monty-hall">
                    <a>
                      <Image
                        href="/apps/monty-hall"
                        src="/images/monty-hall/choice.png"
                        width={1440 / 2}
                        height={900 / 2}
                        alt="App discussion page"
                      />
                    </a>
                  </Link>
                </ImageLinkWrapper>
              </figure>
            </Section>
          </AppGroup>

          <Section>
            <Spacer axix="vertical" size={32} />
          </Section>
        </MaxWidthWrapper>
      </main>
    </>
  );
}

const Heading = styled.h1`
  display: initial;
  margin-bottom: 32px;
`;

const AppHeading = styled.h3`
  /* margin-top: 64px; */
  padding-left: 32px;
`;

const HeadingLink = ({ href, children }) => {
  return (
    <AppHeading>
      <Link passHref href={href}>
        <Anchor href={href}>{children}</Anchor>
      </Link>
    </AppHeading>
  );
};

const AppGroup = styled.div`
  margin-top: -32px;
  grid-column: 1 / -1;
  width: 100%;
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fill, minmax(min(480px, 100%), 1fr));
`;

const Caption = styled.figcaption`
  font-size: 1rem;
  font-family: 'Roboto Flex';
  font-variation-settings: 'wdth' 66, 'wght' 333;
  padding-left: 32px;
`;

const ImageLinkWrapper = styled.div`
  width: fit-content;
  &:hover {
    cursor: pointer;
    transform: scale(1.03);
  }
  &:not(:hover) {
    transform: scale(1);
  }
  transition: transform 0.2s ease-in-out;
`;
