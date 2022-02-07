import AppTitle from '@components/AppTitle';
import { ExternalLink } from '@components/ExternalLink';
import Head from '@components/Head';
import Layout from '@components/Layout';
import PageButtons from '@components/PageButtons';
import { getImageConfig } from '@utils/images';
import Image from 'next/image';
import styled from 'styled-components';
// import burnGif from '/public/videos/gif/burn.gif';
// import burningGif from '/public/videos/gif/burning.gif';
// import sammyAndMolly from '/public/videos/gif/sammy-molly.gif';
import VideoPlayer from '@components/VideoPlayer';
import Text from '@components/Text';
import { H2, H3 } from '@components/Headings';
import FancyTextItalic from '@components/FancyText';
import Spacer from '@components/Spacer';

export default function LetsMakeAGifpage({ config }) {
  const links = {
    liveSite: 'https://lets-make-a-gif.com/',
    github: 'https://github.com/mattbrannon/lets-make-a-gif',
  };

  const sources = [ '/videos/demos/lets-make-a-gif.mp4' ];

  return (
    <article>
      <Head title="Let's Make a Gif" description="Let's Make a Gif discussion page" />

      <AppTitle rounded center title="Lets Make a Gif" sources={sources} links={links}>
        A photo &amp; video editor built with React and Nodejs
      </AppTitle>

      <div>
        <Heading>Motivation</Heading>
        <Text>
          When I was a kid, my friends and I would spend hours making short little 10
          minute horror movies. The video camera we used also had a stop motion feature
          that would film 1 frame every x number of seconds. We'd make videos of toys
          walking around the room or bites being taken out of a sandwich. One of my
          buddies took a box of bee bee pellets, poured the entire box out on the carpet
          and started drawing faces out of the huge pile of bee bees. This app is an
          homage to those days.
        </Text>
      </div>
      <div>
        <Heading>Frontend: React</Heading>
        <Text>
          The coolest part of this app (in my opinion) is the wide range of effect filters
          available. The original idea for the app was a simple file converter. Upload a
          video, download a gif. Upload some pictures, make a gif. Then, during my
          testing, I realized that I'd need to allow users to adjust certain things like
          the framerate. So I added a setting for that.
        </Text>

        <FlexContainer max={548} column>
          <VideoPlayer sources={[ '/videos/mp4/sammy-molly2.mp4' ]} />
        </FlexContainer>
        <ImageCaption>Sammy is not too pleased with Molly being in his bed</ImageCaption>
        <Spacer size={32} />

        <Text>
          Then, I started messing around with the various filters available with ffmpeg. I
          found a color filter that was pretty simple to use. So I added a setting for
          that as well. Originally, I only planned on having a few filters. But I kept
          discovering more and more in this vast collection that were just too cool to
          pass up. A few filters turned into a few more and before long, I had gone from 2
          or 3 filters to 20. (There's actually 19 now because one of them kept crashing
          the server)
        </Text>

        <FlexContainer>
          <VideoPlayer sources={[ '/videos/mp4/burning1.mp4' ]} />
          <VideoPlayer sources={[ '/videos/mp4/burning3.mp4' ]} />
        </FlexContainer>
        <ImageCaption>Before and after applying a few filters to a video</ImageCaption>
      </div>

      <div>
        <Heading>Backend: NodeJs</Heading>
        <Text>
          A lot of the heavy lifting happens in the Nodejs backend. Video and image
          processing can be very resource intensive so it's important to look for and
          recognize opportunities to increase effeciency and reduce the amount of memory
          consumption. This becomes absolutely crucial when deploying to a production
          environment. A $5.00 digital ocean droplet isn't going to have near the amount
          of resources available as you get when you're developing an app locally. (A
          lesson I learned and relearned many times while developing this app). One of the
          things I started doing is resizing any files with dimensions greater than 480 x
          270. Once the file is resized, the original file is deleted. All edits then use
          the newly created, much smaller file.
        </Text>

        <FlexContainer>
          <VideoPlayer sources={[ '/videos/mp4/scary-clown.mp4' ]} />
          <VideoPlayer sources={[ '/videos/mp4/scary-clown2.mp4' ]} />
        </FlexContainer>
        <ImageCaption>A couple variations of a scary clown</ImageCaption>
      </div>

      <div>
        <Heading>Secret sauce: Ffmpeg</Heading>
        <Text>
          This app harnesses the power of a program called ffmpeg. Ffmpeg is an extremely
          powerful command line utilty for working with all kinds of media files. From
          simple edits like cropping or trimming a video to complex operations like
          blending multiple images together or adding a semi transparent water mark,
          ffmpeg does it all. It's truly an amazing piece of software and without it, this
          app wouldn't exist. To learn more about ffmpeg visit{' '}
          <ExternalLink href="https://ffmpeg.org">ffmpeg.org</ExternalLink>
        </Text>
      </div>

      <div>
        <Heading>Roadmap forward</Heading>
        <Text>
          This app was and still is a challenge on many levels. As mentioned earlier,
          video and image processing is pretty resource intensive. Reducing the input file
          size is a good start but, there are still plenty more opportunities for
          optimizations. For instance, currently, when you make changes to the filters, it
          takes the unedited input file and reapplies the new filters. In some cases this
          will be unavoidable. But other times, I believe we should be able to take the
          currently filtered video, and apply the updates directly to that. For example,
          if you've applied a bunch of effects and now you want to simply adjust the
          framerate, there's no need to reapply all the effects. We've already done that.
          We should be able to adjust the framerate without having to wait around for the
          same effects to be reapplied.
        </Text>
        <Text>
          What I'd <FancyTextItalic>really</FancyTextItalic> like is to implement a live
          preview when applying effects.
        </Text>

        <p></p>
      </div>

      <PageButtons prev="/apps/monty-hall" next="/apps/elbowroom" />
    </article>
  );
}

// const ImageContainer = styled.div`
//   display: block;
//   width: 100%;
//   max-width: 548px;
//   ${'' /* margin: 0 auto; */}
// `;

// const ResponsiveImage = ({ ...props }) => {
//   return (
//     <ImageContainer>
//       <Image {...props} layout="responsive" alt={props.alt} />
//     </ImageContainer>
//   );
// };

export async function getStaticProps() {
  const config = await getImageConfig('lets-make-a-gif');
  return {
    props: {
      config: config,
    },
  };
}

const FlexContainer = styled.div`
  display: flex;
  gap: 16px;
  margin: 32px 0 0 0;
  overflow: hidden;
  object-fit: cover;
  max-height: ${(p) => p.max || 320}px;

  flex-direction: ${(p) => (p.column ? 'column' : 'row')};
`;

const ImageCaption = styled.small`
  margin-bottom: 32px;
`;

const Heading = styled(H2)`
  margin: 64px 0 8px 0;
`;
