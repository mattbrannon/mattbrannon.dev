import styled from 'styled-components/macro';
import VideoPlayer from '../../components/VideoPlayer';
import Spacer from '../../components/Spacer';

import { MaxWidthWrapper } from '../../components/MaxWidth';
import DocumentHead from '../../components/Head';

import PageButtons from '../../components/PageButtons';
import { PageHeading } from '../../components/PageHeading';
import { Discussion } from '../../components/Discussion';
import { ExternalLink } from '../../components/ExternalLink';

export default function ElbowRoomPage() {
  return (
    <>
      <DocumentHead
        desc="Discussion page concerning the making of elbowroom.dev"
        title="Elbow Room"
      />

      <main>
        <MaxWidthWrapper>
          <PageHeading title="Elbow Room">
            Real time chatroom application built with React and Firebase
          </PageHeading>

          <VideoPlayer
            sources={[ '/videos/minnie-480.mp4', '/videos/minnie-480.webm' ]}
          />

          <Discussion title="Motivation:">
            The motivation behind this app is simple. I wanted to design and build a
            production ready site with a full set of features from the ground up. I wanted
            the final product to be a well polished, robust application that's also easily
            extensible and maintainable. If you'd like to check out the live site, you can
            do so <ExternalLink href="https://elbowroom.dev">here</ExternalLink>
          </Discussion>

          <Discussion title="Frontend: React">
            The modern web is all about components and for good reason. Component driven
            development allows developers to focus on building smaller individual pieces
            of an app and then gradually combine those pieces together. Much like building
            a complex model of the Millenium Falcon out of Lego blocks. And when it comes
            to building a component based app from the ground up, I can think of no other
            framework more suited to the task than React. While building this app I was
            able to create some pretty neat components, such as a floating label text
            input, which I've been able to re-use in completely separate applications.
          </Discussion>
        </MaxWidthWrapper>

        <ImageRow>
          <Img
            src="/images/elbowroom/combined.png"
            alt="desktop and mobile view"
            height="450"
          />
        </ImageRow>

        <ImageRow>
          <Img
            src="/images/elbowroom/login-signup2.png"
            alt="login and signup forms"
            height="450"
          />
        </ImageRow>

        <MaxWidthWrapper>
          <Discussion title="Backend: Firebase">
            This was a really fun app to build. Utilizing Firebase for data storage
            allowed me not only to have a robust and battle tested real time database, it
            also allowed me to implement multiple authentication methods for user sign up
            and login functionality. Users are able to login with their Google or Facebook
            accounts as well as the standard email / password combination. The user signup
            form performs input validation of each field as the user types. Coupled with a
            debounce function ensures a more pleasant user experience while at also
            providing instant feedback to the user.
          </Discussion>

          <Spacer axis="vertical" size={64} />

          <PageButtons prev="/apps/lets-make-a-gif" next="/apps/monty-hall" />
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
