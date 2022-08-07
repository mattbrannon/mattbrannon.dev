import { InternalLink } from '@components/Links';
import Head from '@components/Head';
import { CardHeading } from '@components/Headings';
import PageTitle from '@components/PageTitle';
import { Spacer } from '@components/Spacer';
import Text from '@components/Text/Text';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import SideNote from '@components/SideNote';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { breakpoints } from '@constants/breakpoints';

export default function Index() {
  const [isSafari, setIsSafari] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: breakpoints.mobile });

  useEffect(() => {
    const isSafariBrowser = () => {
      return navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome');
    };
    if (isSafariBrowser()) {
      setIsSafari(true);
    }
  }, []);

  return (
    <>
      <Head title="Oddities and revelations" description="secret shh..." />

      <PageTitle>Oddities and revelations</PageTitle>

      <Text>
        I don't know how to describe this page. It's just things I'm working on. Some are useful,
        others are not. While you're here, check out the Fancy Text Generator and let me know what
        you think.
      </Text>
      <Text>
        The most recent addition is the Fractals page. It's not really "finished" yet but it doesn't
        need to be. It's just something fun to play around with.
      </Text>
      <Text>
        Also, just so you're aware, my little cube friend likes to hang around these parts. If you
        see him, please remember,{' '}
        <strong>
          <>don't feed the cube after midnight.</>
        </strong>
      </Text>

      {/* <Text>
        On this page you'll find various tools that I created and used when building my site. Some
        of these tools are visual aids I use to help plot the course of an animation. And some you
        can use to generate cool things in your own projects.
      </Text>

      <Text>On this page you'll find all kinds of weirdness.</Text>

      <Text>
        On this page you'll find various tools I created and used when building my site. Sometimes I
        build a tool to help me visualize something. Other times I build a tool to generate some
        markup and wind up using quite frequently. Basically, if I were a mad scientist, this would
        be my secret lab. You're welcome to look around and turn some knobs. Just please{' '}
        <strong>
          <em>don't feed the cube after midnight</em>
        </strong>
      </Text> */}
      {isSafari ? (
        <SideNote>
          It seems like you're using Safari. The tools on this page don't do so great with Safari.
          They still work, but you might experience some performance issues and other odd little
          bugs. If the controls feel sluggish or things just seems a little off, I'd recommend using
          Chrome instead.
        </SideNote>
      ) : null}

      {isMobile ? (
        <SideNote>
          The tools listed on this page are not setup for use with mobile devices.
        </SideNote>
      ) : null}

      <List>
        <Card>
          <CardHeading>
            <InternalLink href="/misc/fancy-text-generator">Fancy Text Generator</InternalLink>
          </CardHeading>
          <Text>Variable fonts + gradient backgrounds + layered text shadows = Fancy text</Text>
        </Card>

        <Card>
          <CardHeading>
            <InternalLink href="/misc/geometry">Pushing squares through circles</InternalLink>
          </CardHeading>
          <Text>Without geometry life is pointless...</Text>
        </Card>

        <Card>
          <CardHeading>
            <InternalLink href="/misc/fractals">Fractals</InternalLink>
          </CardHeading>
          <Text>
            Still a work in progress but feel free to play around with what I've got so far.
          </Text>
        </Card>
      </List>
      <Spacer axis="vertical" size={32} />
    </>
  );
}

const List = styled.ul`
  list-style: none;
  display: grid;
  gap: 18px;
  padding: 0;
`;

const Card = styled.div`
  border: 1px solid black;
  border-radius: 6px;
  background: #222;
  width: 100%;
  padding: 0 16px;
  background: var(--basic-card-background);
`;
