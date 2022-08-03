import AppTitle from '@components/AppTitle';
import Head from '@components/Head';
import { H3 } from '@components/Headings';
import PageButtons from '@components/PageButtons';
import Text from '@components/Text';
import { FlatVideo } from '@components/VideoPlayer';
import Image from 'next/future/image';
import styled from 'styled-components';
import desktopImage from '/public/images/elbowroom/desktop.png';
import mobileImage from '/public/images/elbowroom/mobile.png';

export default function ElbowRoomPage() {
  const links = {
    github: 'https://github.com/mattbrannon/elbowroom.dev',
    liveSite: 'https://elbowroom.dev',
  };

  const sources = [ '/videos/demos/elbowroom.mp4' ];
  return (
    <article>
      <Head
        description="Discussion page concerning the making of elbowroom.dev"
        title="Elbow Room"
      />

      <AppTitle title="Elbow Room" sources={sources} links={links}>
        Real time chatroom built with React and Firebase
      </AppTitle>

      <div>
        <Heading>Motivation</Heading>
        <Text>
          Ever since I caught the programming bug, I've always wanted to build a chat room
          application. I always kinda felt like if I could do that and come away with something that
          actually worked, I could finally think of myself as real programmer. When you're first
          starting out, the idea of building a chat app feels so beyond you that it seems like only
          super talented rockstar programmers could that kind of thing. Now, I am by no means a
          super talented rockstar programmer. But I am a programmer and, I built a chat app to prove
          it. 😊
        </Text>
      </div>

      <div>
        <Heading>FrontEnd</Heading>
        <FlexContainer>
          <Image src={desktopImage} alt="desktop view of the app" />
          <Image src={mobileImage} alt="mobile view of the app" />
        </FlexContainer>
        <Text>
          The choice to use React for building out the frontend was, by far, the easiest decision of
          the project. Using a component based approach allowed me write small chunks of code that
          could be reused multiple times. I was able to build some pretty cool components in this
          app. I'm especially proud of the floating label text input. Also, you can't really tell
          from the app but, the social media signin buttons are completely scalable. The button logo
          and any text scales evenly with the viewport. Every bit of css is hand written. The bulk
          of the app uses CSS Modules for styling. SASS is also used here and there and there's even
          a few styled-components lying around.
        </Text>
      </div>

      <div>
        <Heading>Backend</Heading>
        <FlexContainer>
          <FlatVideo
            sources={[ '/videos/mp4/elbowroom-signup.mp4', '/videos/webm/elbowroom-signup.webm' ]}
          />
          {/* <Image src={signupGif} alt="demonstration of the signup process" /> */}
        </FlexContainer>
        <Text>
          I have to give credit where credit is due. Firebase was such a lifesaver on this app.
          Utilizing Firebase for data storage allowed me not only to have a robust and battle tested
          real time database, it also allowed me to implement multiple authentication methods for
          user sign up and login functionality. Users are able to login with their Google or
          Facebook accounts as well as the standard email / password combination. The user signup
          form performs input validation of each field as the user types. Coupled with a debounce
          function ensures a more pleasant user experience while at also providing instant feedback
          to the user.
        </Text>
      </div>

      <PageButtons prev="/apps/lets-make-a-gif" next="/apps/monty-hall" />
    </article>
  );
}

const FlexContainer = styled.div`
  display: flex;
  gap: 24px;
  filter: drop-shadow(1px 3px 6px #333);
  margin: 16px 0 32px 0;
`;

const Heading = styled(H3)`
  margin: 64px 0 8px 0;
  font-size: var(--size28);
`;
