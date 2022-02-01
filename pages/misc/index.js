import Head from '@components/Head';
import Layout from '@components/Layout';
import PageTitle from '@components/PageTitle';
import Spacer from '@components/Spacer';
import { breakpoints } from '@constants/index';
import { useMediaQuery } from '@hooks/useMediaQuery';
import Text, { ColorText } from '@components/Text';
import Sidenote from '@components/SideNote';

import { Link } from '@components/ExternalLink';
import styled from 'styled-components';
import { H3, H2 } from '@components/Headings';

export default function Index({ posts }) {
  return (
    <Layout>
      <Head title="Oddities and revelations" description="secret shh..." />

      <PageTitle>Revelations & deprecations</PageTitle>

      <Text>
        Kind of a strange title for a page huh? Yeah, I'm not really sure what to call
        this page. Sometimes I build a tool to help me visualize something. And sometimes
        those tools actually turn out pretty neat. That's what this page is. Basically, if
        I were a mad scientist, this would be my secret lab. You're welcome to look around
        and turn some knobs. Just please{' '}
        <ColorText darkorange as="span">
          don't feed Fred after 9:00pm.
        </ColorText>
      </Text>

      <MaxWidthWrapper>
        <Card>
          <Link passHref href="/misc/experiments">
            <H2>Experiments with a cube</H2>
          </Link>
          <Text>
            Working with things in three dimensions can be challenging. This helps me to
            visualize what's happening when working with 3d transforms. And it's also just
            fun to move the cube around.
          </Text>
        </Card>
      </MaxWidthWrapper>
      <MaxWidthWrapper>
        <Card>
          <Link passHref href="/misc/variable-fonts">
            <H2>Fancy Text Generator</H2>
          </Link>
          <Text>
            Variable fonts + gradient backgrounds + layered text shadows = Fancy text
          </Text>
        </Card>
      </MaxWidthWrapper>

      <Spacer axis="vertical" size={32} />
    </Layout>
  );
}
const MaxWidthWrapper = styled.div`
  max-width: var(--max-width);
  width: 100%;
  height: 100%;
  margin: 0 auto 16px auto;

  display: flex;

  align-items: center;
  padding: 0 16px;

  &:nth-of-type(1) {
    margin: 0 auto;
  }
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

// Variable fonts are great. They allow you to do things you simply cannot do
// with regular fonts. But it can be difficult to remember all the properties of
// a specific font as well as the range of values each property accepts. This
// playground helps me visualize and make tweaks to variable font styles.
