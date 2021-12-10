import styled, { keyframes } from 'styled-components/macro';
import Link from 'next/link';
// import Creature from '../components/Creature';
import DocumentHead from '@components/Head';

export default function Error404() {
  return (
    <>
      <DocumentHead title="Whoops" desc="We must have taken a wrong turn at Albuquerque" />

      <div style={{ display: 'grid', placeItems: 'center' }}>
        {/* <Creature /> */}
        <AnimatedText>
          <li>
            <p>
              <strong>Pay no attention to the man behind the curtain</strong>
            </p>
          </li>
          <li style={{ textAlign: 'center' }}>
            <Link href="/">Go Back</Link>
          </li>
        </AnimatedText>
      </div>
    </>
  );
}

const fadeIn = keyframes`
  from {
    opacity: 0%;
  }

  to {
    opacity: 100%;
  }
`;

const AnimatedText = styled.ul`
  font-size: var(--size24);
  opacity: 0%;
  margin-top: -200px;
  animation: ${fadeIn} 2s linear forwards 0.4s;
`;
