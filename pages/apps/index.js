import { AppCard } from '@components/AppCard';
import Head from '@components/Head';
import PageTitle from '@components/PageTitle';
import Text from '@components/Text/Text';
import { memo } from 'react';
// import elbowRoomImage from '/public/images/elbowroom/desktop.png';
// import letsMakeAGifImage from '/public/images/lets-make-a-gif/desktop.png';

const makeSourceArray = (...images) => {
  return images.map((image) => {
    const { src, width, height, blurDataURL } = image;
    return { src, width, height, blurDataURL };
  });
};

import elbowRoomAvif from '/public/images/elbowroom/desktop.avif';
import elbowRoomWebp from '/public/images/elbowroom/desktop.webp';
import elbowRoomPng from '/public/images/elbowroom/desktop.png';

import letsMakeAGifAvif from '/public/images/lets-make-a-gif/desktop.avif';
import letsMakeAGifWebp from '/public/images/lets-make-a-gif/desktop.webp';
import letsMakeAGifPng from '/public/images/lets-make-a-gif/desktop.png';

import montyHallAvif from '/public/images/monty-hall/monty-hall1.avif';
import montyHallWebp from '/public/images/monty-hall/monty-hall1.webp';
import montyHallPng from '/public/images/monty-hall/monty-hall1.png';

const elbowRoomSources = makeSourceArray(elbowRoomAvif, elbowRoomWebp, elbowRoomPng);
const letsMakeAGifSources = makeSourceArray(letsMakeAGifAvif, letsMakeAGifWebp, letsMakeAGifPng);
const montyHallSources = makeSourceArray(montyHallAvif, montyHallWebp, montyHallPng);

const letsMakeAGifConfig = {
  href: '/apps/lets-make-a-gif',
  title: 'Let\'s Make a Gif',
  description: 'Online photo & video editing application',
  sources: letsMakeAGifSources,
  alt: 'desktop view of the app',
  priority: true,
};

const elbowRoomConfig = {
  href: '/apps/elbowroom',
  title: 'Elbow Room',
  description: 'Fullstack realtime chat application',
  sources: elbowRoomSources,
  alt: 'desktop view of the app',
  priority: false,
};

const montyHallConfig = {
  href: '/apps/monty-hall',
  title: 'Monty Hall Experience',
  description: 'A game inspired by the monty hall problem',
  sources: montyHallSources,
  alt: 'desktop view of the app',
  priority: false,
};

const Introduction = () => {
  return (
    <Text>
      Below you'll find a few apps I've buit that I'm particularly proud of (there's a whole slew of
      others that I wish I could forget). All of these apps are live on the web. You'll find links
      to the live sites on the app discussion page. If you'd like to see the code, you'll also find
      a link to the app's github repository. Please feel free to try them out and let me know what
      you think.
    </Text>
  );
};

export default memo(function AppsPage() {
  return (
    <>
      <Head title="Apps" description="Apps built by Matt Brannon" />
      <PageTitle>Apps I've Built</PageTitle>
      <Introduction />
      <AppCard config={letsMakeAGifConfig} />
      <AppCard config={elbowRoomConfig} />
      <AppCard config={montyHallConfig} />
    </>
  );
});
