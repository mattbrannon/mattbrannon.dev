import AppTitle from '@components/AppTitle';
import DocumentHead from '@components/Head';
import Picture from '@components/Image';
import { BottomRow, FullBleed } from '@components/Layout';
import PageButtons from '@components/PageButtons';
import SectionHeading from '@components/SectionHeading';
import { getImageConfig } from '@utils/images';
import styled from 'styled-components/macro';

export default function ElbowRoomPage({ config }) {
  const links = {
    github: 'https://github.com/mattbrannon/elbowroom.dev',
    liveSite: 'https://elbowroom.dev',
  };

  const sources = [ '/videos/demos/elbowroom.mp4' ];
  return (
    <>
      <DocumentHead
        desc="Discussion page concerning the making of elbowroom.dev"
        title="Elbow Room"
      />

      <AppTitle title="Elbow Room" sources={sources} links={links}>
        Real time chatroom built with React and Firebase
      </AppTitle>

      <div>
        <SectionHeading>Motivation</SectionHeading>
        <p>
          Ever since I caught the programming bug, I've always wanted to build a chat room
          application. I always kinda felt like if I could do that and come away with something that
          actually worked, I could finally think of myself as real programmer. When you're first
          starting out, the idea of building a chat app feels so beyond you that it seems like only
          super talented rockstar programmers could that kind of thing. Now, I am by no means a
          super talented rockstar programmer. But I am a programmer and, I built a chat app to prove
          it. 😊
        </p>
      </div>

      <ImageWrapper>
        <Picture sources={config.combined} alt="combined view of mobile and desktop layouts" />
        <Picture sources={config['login-signup2']} alt="login and signup pages" />
      </ImageWrapper>

      <div>
        <SectionHeading>FrontEnd</SectionHeading>
        <p>
          The choice to use React for building out the frontend was, by far, the easiest decision of
          the project. Using a component based approach allowed me write small chunks of code that
          could be reused multiple times. I was able to build some pretty cool components in this
          app. I'm especially proud of the floating label text input. Also, you can't really tell
          from the app but, the social media signin buttons are completely scalable. The button logo
          and any text scales evenly with the viewport. Every bit of css is hand written. The bulk
          of the app uses CSS Modules for styling. SASS is also used here and there and there's even
          a few styled-components lying around.
        </p>
      </div>

      <div>
        <SectionHeading>Backend</SectionHeading>
        <p>
          I have to give credit where credit is due. Firebase was such a lifesaver on this app.
          Utilizing Firebase for data storage allowed me not only to have a robust and battle tested
          real time database, it also allowed me to implement multiple authentication methods for
          user sign up and login functionality. Users are able to login with their Google or
          Facebook accounts as well as the standard email / password combination. The user signup
          form performs input validation of each field as the user types. Coupled with a debounce
          function ensures a more pleasant user experience while at also providing instant feedback
          to the user.
        </p>
      </div>

      <BottomRow>
        <PageButtons prev="/apps/lets-make-a-gif" next="/apps/monty-hall" />
      </BottomRow>
    </>
  );
}

const ImageWrapper = styled(FullBleed)`
  max-width: 1600px;
  margin: 0 auto;
`;

export async function getStaticProps() {
  const config = await getImageConfig('elbowroom');
  return {
    props: {
      config: config,
    },
  };
}
