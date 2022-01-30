import Head from '@components/Head';
import Layout from '@components/Layout';
import PageTitle from '@components/PageTitle';
import styled from 'styled-components';
import elbowRoomImage from '/public/images/elbowroom/desktop.png';
import letsMakeAGifImage from '/public/images/lets-make-a-gif/desktop.png';
import montyHallImage from '/public/images/monty-hall/monty-hall1.png';
import AppCard from '@components/AppCard';
import Text from '@components/Text';

const letsMakeAGifConfig = {
  href: '/apps/lets-make-a-gif',
  title: "Let's Make a Gif",
  description: 'Online photo & video editing application',
  src: letsMakeAGifImage,
  alt: 'desktop view of the app',
};

const elbowRoomConfig = {
  href: '/apps/elbowroom',
  title: 'Elbow Room',
  description: 'Fullstack realtime chat application',
  src: elbowRoomImage,
  alt: 'desktop view of the app',
};

const montyHallConfig = {
  href: '/apps/monty-hall',
  title: 'Monty Hall Experience',
  description: 'A game inspired by the monty hall problem',
  src: montyHallImage,
  alt: 'desktop view of the app',
};

const Introduction = () => {
  return (
    <Text>
      Below you'll find a few apps I've buit that I'm particularly proud of (there's a
      whole slew of others that I wish I could forget). All of these app are live on the
      web. You'll find links to the live sites on the app discussion page. If you'd like
      to see the code, you'll also find a link to the app's github repository. Please feel
      free to try them out and let me know what you think.
    </Text>
  );
};

export default function AppsPage() {
  return (
    <PageLayout>
      <Head title="Apps" description="Apps built by Matt Brannon" />
      <PageTitle>Apps I've Built</PageTitle>
      <Introduction />
      <AppCard config={letsMakeAGifConfig} />
      <AppCard config={elbowRoomConfig} />
      <AppCard config={montyHallConfig} />
    </PageLayout>
  );
}

const PageLayout = styled(Layout)`
  height: max-content;
`;

// const Paragraph = styled.p`
//   font-size: clamp(var(--size16), 0.2vw + 1rem, var(--size20));
// `;

// <Text>
//   The modern web is all about components and for good reason. Component driven
//   development allows developers to focus on building smaller individual pieces of an
//   app and then gradually combine those pieces together. Kind of like building a
//   complex model of the Millenium Falcon out of Lego blocks. And when it comes to
//   building a component based app from the ground up, I can think of no other framework
//   more suited to the task than <strong>React. </strong> All the applications listed on
//   this page were built with React on the frontend.
// </Text>
