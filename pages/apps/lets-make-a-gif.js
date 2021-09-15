import styled from 'styled-components/macro';
import { MaxWidthWrapper } from '../../components/MaxWidth';
import Spacer from '../../components/Spacer';
import VideoPlayer from '../../components/VideoPlayer';
import SideNote from '../../components/SideNote';
import DocumentHead from '../../components/Head';
import PageButtons from '../../components/PageButtons';
import { ExternalLink } from '../../components/ExternalLink';
import { PageHeading } from '../../components/PageHeading';
import { Discussion } from '../../components/Discussion';

export default function LetsMakeAGifPage() {
  return (
    <>
      <DocumentHead title="Let's Make a Gif" desc="Let's Make a Gif discussion page" />

      <main>
        <MaxWidthWrapper>
          <PageHeading title="Lets Make a Gif">
            An online photo &amp; video editor built with React and Nodejs
          </PageHeading>

          <VideoPlayer sources={[ '/videos/jif1.mp4', '/videos/jif1.webm' ]} />

          <Discussion title="Motivation">
            I've always enjoyed making videos. When I was a kid, my friends and I would
            spend hours making these short little 10 minute horror movies. The video
            camera we used also had a stop motion feature that would film 1 frame every x
            number of seconds. We'd make videos of toys walking around the room or of
            bites being taken out of a sandwich. One of my buddies took a box of bee bee
            pellets, poured the entire box out on the carpet and started drawing faces out
            of the huge pile of bee bees. If that carpet is still there, more than likely
            there's at least a few pellets down in it somewhere. I believe those days did
            much to foster the creative side of my personality. I built this app with the
            hope that maybe it could, in some small way, foster a similar creativity in
            someone else.
          </Discussion>

          <p>
            Feel like getting weird? Give it a try and let me know what you think.{' '}
            <ExternalLink href="https://lets-make-a-gif.com">
              Visit the live site
            </ExternalLink>
          </p>

          <Discussion title="Frontend: React">
            One of the challenges on the front end was coming up with a design that worked
            well for both desktop and mobile users alike without sacrificing
            functionality. This app features several adjustable video filters. Each filter
            is applied in the order in which it was activated. Toggling the{' '}
            <Code>glitch</Code> filter followed by the <Code>mirror</Code> filter will
            produce very different results if <Code>mirror</Code> is used before{' '}
            <Code>glitch</Code>. This provides the user incredible flexibility but it also
            presents a unique challenge in terms of api design.
          </Discussion>

          <SideNote>
            This is actually a pretty big topic and one that is worth exploring in depth.
            I'll be releasing a new blog post soon that goes into much greater detail.
          </SideNote>
        </MaxWidthWrapper>

        <ImageRow>
          <Img
            src="/images/lets-make-a-gif/combined.png"
            alt="desktop view of the application"
            height="450"
          />
        </ImageRow>

        <MaxWidthWrapper>
          <Discussion title="Backend: NodeJs">
            A lot of the heavy lifting happens in the Nodejs backend. Video and image
            processing can be very resource intensive so it's important to look for and
            recognize opportunities to increase effeciency and reduce the amount of memory
            consumption. This becomes absolutely crucial when deploying to a production
            environment. One of the things I started doing is resizing any files with
            dimensions greater than 480 x 270. Once the file is resized, the originl file
            is deleted. All edits then use the newly created, much smaller file.
          </Discussion>

          <Discussion title="Secret sauce: Ffmpeg">
            This app harnesses the power of a program called ffmpeg. Ffmpeg is an
            extremely powerful command line utilty for working with all kinds of media
            files. From simple edits like cropping or trimming a video to complex
            operations like blending multiple images together or adding a semi transparent
            water mark, ffmpeg does it all. It's truly an amazing piece of software and
            without it, this app wouldn't exist. To learn more about ffmpeg visit{' '}
            <ExternalLink href="https://ffmpeg.org">ffmpeg.org</ExternalLink>
          </Discussion>

          <Spacer axis="vertical" size={64} />

          <PageButtons prev="/apps/monty-hall" next="/apps/elbowroom" />
        </MaxWidthWrapper>
        <Spacer axis="vertical" size={64} />
      </main>
    </>
  );
}

const ImageRow = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 16px;
  margin: 0 auto;
`;

const Img = styled.img`
  /* object-fit: contain; */
  height: 100%;
  width: fit-content;
  /* max-height: 400px; */
  --shadow: clamp(0.25rem, 0.9vw + 0.1rem, 1rem);
  filter: drop-shadow(0 0 var(--shadow) hsla(0deg, 0%, 0%, 0.4));
`;

const Code = styled.code`
  background: lightgrey;
  font-size: 0.9rem;
  font-family: 'Fira Code', Courier, 'Courier New', monospace;

  /* padding: 2px; */

  @media (prefers-color-scheme: dark) {
    background: #111;
    color: white;
  }
`;
