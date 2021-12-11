import AppTitle from '@components/AppTitle';
import { ExternalLink } from '@components/ExternalLink';
import DocumentHead from '@components/Head';
import Picture from '@components/Image';
import { BottomRow, FullBleed } from '@components/Layout';
import PageButtons from '@components/PageButtons';
import SectionHeading from '@components/SectionHeading';
import { getImageConfig } from '@utils/images';
import styled from 'styled-components/macro';

export default function LetsMakeAGifpage({ config }) {
  const links = {
    liveSite: 'https://lets-make-a-gif.com/',
    github: 'https://github.com/mattbrannon/lets-make-a-gif',
  };

  const sources = [ '/videos/demos/lets-make-a-gif.mp4' ];

  return (
    <>
      <DocumentHead title="Let's Make a Gif" desc="Let's Make a Gif discussion page" />

      <AppTitle title="Lets Make a Gif" sources={sources} links={links}>
        A photo &amp; video editor built with React and Nodejs
      </AppTitle>

      <div>
        <SectionHeading>Motivation</SectionHeading>
        <p>
          When I was a kid, my friends and I would spend hours making short little 10 minute horror
          movies. The video camera we used also had a stop motion feature that would film 1 frame
          every x number of seconds. We'd make videos of toys walking around the room or bites being
          taken out of a sandwich. One of my buddies took a box of bee bee pellets, poured the
          entire box out on the carpet and started drawing faces out of the huge pile of bee bees.
          This app is an homage to those days.
        </p>
      </div>
      <div>
        <SectionHeading>Frontend: React</SectionHeading>
        <p>
          The coolest part of this app (in my opinion) is the wide range of effect filters
          available. The original idea for the app was a simple file converter. Upload a video,
          download a gif. Upload some pictures, make a gif. Then, during my testing, I realized that
          I'd need to allow users to adjust certain things like the framerate. So I added a setting
          for that.
        </p>
        <p>
          Then, I started messing around with the various filters available with ffmpeg. I found a
          color filter that was pretty simple to use. So I added a setting for that as well.
          Originally, I only planned on having a few filters. But I kept discovering more and more
          in this vast collection that were just too cool to pass up. A few filters turned into a
          few more and before long, I had gone from 2 or 3 filters to 20. (There's actually 19 now
          because one of them kept crashing the server)
        </p>
      </div>

      <ImageWrapper>
        <Picture sources={config.combined} alt="desktop view of the application" />
      </ImageWrapper>

      <div>
        <SectionHeading>Backend: NodeJs</SectionHeading>
        <p>
          A lot of the heavy lifting happens in the Nodejs backend. Video and image processing can
          be very resource intensive so it's important to look for and recognize opportunities to
          increase effeciency and reduce the amount of memory consumption. This becomes absolutely
          crucial when deploying to a production environment. A $5.00 digital ocean droplet isn't
          going to have near the amount of resources available as you get when you're developing an
          app locally. (A lesson I learned and relearned many times while developing this app). One
          of the things I started doing is resizing any files with dimensions greater than 480 x
          270. Once the file is resized, the original file is deleted. All edits then use the newly
          created, much smaller file.
        </p>
      </div>
      <div>
        <SectionHeading>Secret sauce: Ffmpeg</SectionHeading>
        <p>
          This app harnesses the power of a program called ffmpeg. Ffmpeg is an extremely powerful
          command line utilty for working with all kinds of media files. From simple edits like
          cropping or trimming a video to complex operations like blending multiple images together
          or adding a semi transparent water mark, ffmpeg does it all. It's truly an amazing piece
          of software and without it, this app wouldn't exist. To learn more about ffmpeg visit{' '}
          <ExternalLink href="https://ffmpeg.org">ffmpeg.org</ExternalLink>
        </p>
      </div>
      <BottomRow>
        <PageButtons prev="/apps/monty-hall" next="/apps/elbowroom" />
      </BottomRow>
    </>
  );
}

const ImageWrapper = styled(FullBleed)`
  max-width: 1600px;
  margin: 0 auto;
`;

export async function getStaticProps() {
  const config = await getImageConfig('lets-make-a-gif');
  return {
    props: {
      config: config,
    },
  };
}
