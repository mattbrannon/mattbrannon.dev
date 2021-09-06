// import Link from 'next/link';
import styled from 'styled-components/macro';
import { MaxWidthWrapper } from '../components/MaxWidth';
import WelcomeMessage from '../components/WelcomeMessage';
import DocumentHead from '../components/Head';

export default function HomePage() {
  return (
    <>
      <DocumentHead title="Matt Brannon" desc="A brief introduction" />
      <Main>
        <MaxWidthWrapper>
          {/* <h1>Home Page</h1> */}
          <WelcomeMessage>Welcome to my site!</WelcomeMessage>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi deleniti
            dolor error, minus recusandae iste vel? Cum porro enim quaerat repellendus
            perferendis, debitis soluta, inventore sunt non possimus totam unde!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            necessitatibus ipsam harum tempora soluta iste! Numquam delectus nostrum omnis
            provident sequi, cumque aliquid similique! Consectetur modi id eius dolorum
            assumenda.
          </p>
        </MaxWidthWrapper>
      </Main>
    </>
  );
}

const Main = styled.main`
  grid-area: main;
`;
