import { Link } from '@components/ExternalLink';
import Head from '@components/Head';
import { CardHeading } from '@components/Headings';
import PageTitle from '@components/PageTitle';
import Spacer from '@components/Spacer';
import Text from '@components/Text';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import SideNote from '@components/SideNote';

export default function Index() {
  const [ isSafari, setIsSafari ] = useState(false);

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

      <PageTitle>Revelations & deprecations</PageTitle>

      {/* <Text>
        On this page you'll find various tools that I created and used when
        building my site. Some of these tools are visual aids I use to help plot
        the course of an animation. And some you can use to generate cool things
        in your own projects.
      </Text> */}

      <Text>
        On this page you'll find various tools that I created and used when building my site.
        Sometimes I build a tool to help me visualize something. Other times I build a tool to
        generate some markup and wind up using quite frequently. Basically, if I were a mad
        scientist, this would be my secret lab. You're welcome to look around and turn some knobs.
        Just please{' '}
        <strong>
          <em>don't feed the cube after midnight</em>
        </strong>
      </Text>
      {isSafari ? (
        <SideNote>
          It seems like you're using Safari. The tools on this page don't do so great with Safari.
          They still work, but you might experience some performance issues and other odd little
          bugs. If the controls feel sluggish or things just seems a little off, I'd recommend using
          Chrome instead.
        </SideNote>
      ) : null}

      <List>
        <Card>
          <CardHeading>
            <Link passHref href="/misc/fancy-text-generator">
              Fancy Text Generator
            </Link>
          </CardHeading>
          <Text>Variable fonts + gradient backgrounds + layered text shadows = Fancy text</Text>
        </Card>

        <Card>
          <CardHeading>
            <Link passHref href="/misc/geometry">
              Pushing squares through circles
            </Link>
          </CardHeading>
          <Text>Without geometry life is pointless...</Text>
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
