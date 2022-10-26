import Head from '@components/Head';
import { layout, ToolsList } from '@components/Layout';
import { PageTitle } from '@components/PageTitle';
import { spacer } from '@components/Spacer';
import { text } from '@components/Text';
import { useState, useEffect } from 'react';
import { SideNote } from '@components/SideNote';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { breakpoints } from '@constants/breakpoints';
import { Card } from '@components/Card';
// import Link from 'next/link';
import { link } from '@components/Links';

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
    <layout.page id="main-content">
      <Head title="Tools and toys" description="A collection of useful and pointless things" />

      <PageTitle>Tools and Toys</PageTitle>
      <text.paragraph>
        This is a collection of fun stuff. Some of it is actually useful. Some is just fun to play with. I'm quite happy
        with the <link.internal href="/misc/fancy-text-generator">Fancy Text Generator.</link.internal> It's what I used
        to create most of the headings on this site.
      </text.paragraph>

      <text.paragraph>Ok so one thing is useful...</text.paragraph>

      {isSafari ? (
        <SideNote>
          It seems like you're using Safari. The tools on this page don't do so great with Safari. They still work, but
          you might experience some performance issues and other odd little bugs. If the controls feel sluggish or
          things just seems a little off, I'd recommend using Chrome instead.
        </SideNote>
      ) : null}

      {isMobile ? <SideNote>The tools listed on this page are not setup for use with mobile devices.</SideNote> : null}

      <ToolsList>
        <Card.Tools href="/misc/fancy-text-generator" title="Fancy Text Generator">
          This is free online tool you can use to generate awesome looking text for your website. Use it to create nice
          subtle effects or bold creative ones. Gradients, layered text shadows, variable fonts and more. Completely
          customizable and easy to use.
        </Card.Tools>
        <Card.Tools href="/misc/experiments-with-a-cube" title="Experiments with a Cube">
          This is the beginnings of what I hope will become sort of character creator type of thing. Did you see my
          little cube friend on the main page? He was born here.
        </Card.Tools>
        <Card.Tools href="/misc/fractals" title="Fractals">
          Fractals are really interesting and often complex recursive geometric patterns. Here you can play around with
          various <code>canvas</code> properties to alter the look of a fractal.
        </Card.Tools>
      </ToolsList>
      <spacer.block axis="vertical" size={32} />
    </layout.page>
  );
}

// const List = styled.ul`
//   list-style: none;
//   display: grid;
//   gap: 18px;
//   padding: 0;
// `;

// const CardWrapper = styled.div`
//   border: 1px solid black;
//   border-radius: 6px;
//   padding: 0 16px 16px 16px;
//   background: var(--basic-card-background);
//   /* display: flex;
//   flex-direction: column;
//   justify-content: space-between; */
//   min-height: 160px;
// `;

// const Small = styled.small`
//   color: var(--color-text);
// `;

// const Card = ({ title, href, children }) => {
//   return (
//     <li>
//       <Link href={href}>
//         <CardWrapper>
//           <CardHeading>{title}</CardHeading>
//           <Small>{children}</Small>
//         </CardWrapper>
//       </Link>
//     </li>
//   );
// };
