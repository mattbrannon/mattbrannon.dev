import styled from 'styled-components/macro';
import ShadowGradient from './GradientText';
export default function AboutMe() {
  return (
    <Article>
      <Intro>
        <p>
          I've always had an interest in tech. When I was a little kid, my dad taught me
          how to work my way around an MS-DOS system. When I got a little older and had my
          first Mac, I started learning all about Unix systems and how to work from the
          command line.
        </p>
        <p>
          Since that time, I've had the opportunity to work with and learn from some
          wonderful people. A couple years ago, I was fortunate enough to join Hack
          Reactor's 38th cohort in Austin, Tx. After graduating, I stayed on as a resident
          for an additional two cohorts. After my residency with Hack Reactor, I flew
          halfway around the world to a little country on the Northern tip of Africa
          called Tunisia to work as a full-time instructor in the country's first and only
          coding bootcamp.
        </p>
      </Intro>
    </Article>
  );
}

// const fadeUpAndIn = keyframes`
//   from {
//     opacity: 0;
//     transform: translate(0, 100%);
//   }
//   to {
//     opacity: 1;
//     transform: translate(0, 0);
//   }
// `;

// const secondaryAnimation = (props) => {
//   const cookieIsSet = props.theme.cookieExists;
//   if (cookieIsSet) {
//     return css`
//       ${fadeUpAndIn} 1000ms ease both;
//     `;
//   }
// };

const Article = styled.article`
  ${'' /* animation: ${(p) => secondaryAnimation(p)}; */}
  display: flex;
  flex-direction: column;
`;

export function SectionTitle({ children, ...props }) {
  return (
    <Wrapper>
      <ShadowGradient {...props}>{children}</ShadowGradient>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  margin: -32px 0 32px 0;
  padding: 0 2px;
`;

const Intro = styled.div`
  margin: 96px 0 0 0;
`;
