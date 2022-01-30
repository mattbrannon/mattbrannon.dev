import styled from 'styled-components';
import Link from 'next/link';
import { CardImage } from '@components/Image';
import { Anchor } from '@components/Anchor';
import { breakpoints } from '@constants/index';

export default function AppCard({ ...props }) {
  const { href, title, description, src, alt } = props.config;
  return (
    <Card>
      <Link passHref href={href}>
        <Wrapper>
          <Heading before={title}>
            <A href={href}>{title}</A>
          </Heading>
          <Small>{description}</Small>

          <CardImage src={src} alt={alt} />
        </Wrapper>
      </Link>
    </Card>
  );
}

const Card = styled.div`
  margin 16px 0 64px 0;
  @media (max-width: ${breakpoints.mobile}px) {
    margin: 16px 0 32px 0;
  }
`;

const A = styled(Anchor)`
  display: block;
  color: var(--pinkBg);
  font-size: clamp(var(--size24), 7vw, var(--size48));
  line-height: 1.2;

  ${'' /* --stroke: black;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
  --amount: 0.065em; */}
  ${'' /* 
  &:before {
    content: "${(p) => p.children}";
    font-family: Recursive, sans-serif;
    font-variation-settings: var(--recursive4);
    width: fit-content;
    font-size: inherit;
    position: absolute;
    top: 0;
    z-index: -1;
    -webkit-text-stroke: var(--amount) var(--stroke);
    transition: font-variation-settings 0.2s ease;
  } */}

   &:hover {
    color: var(--dark-pink);
    --amount: 3px;
    --stroke: hsl(0deg, 0%, 0%, 1);
    &:before {
      -webkit-text-stroke: var(--amount) var(--stroke);
      transition: all 0.2s ease;
    }
  }

  transition: all 0.2s ease;

  &:visited {
    color: currentColor;
  }

  @media (max-width: ${breakpoints.mobile}px) {
    font-size: clamp(1.15rem, 1rem + 2vw, 1.5rem);
  }

  @media (prefers-color-scheme: dark) {
    color: var(--orange2);
    &:hover {
      color: orange;
    }
  }
`;

const Small = styled.small`
  font-size: clamp(var(--size14), 3vw, var(--size21));
  font-variation-settings: 'wdth' 75, 'wght' 555;
  margin-bottom: 23px;
  display: inline-block;
`;

const Heading = styled.h4`
  font-family: Recursive, sans-serif;
  font-variation-settings: var(--recursive4);
  width: fit-content;
  transition: all 10ms;
  font-size: var(--size40);
  font-size: clamp(var(--size24), 3vw, var(--size40));

  @media (max-width: ${breakpoints.mobile}px) {
    font-size: var(--size21);
  }

  @media (max-width: ${breakpoints.tablet}px) {
    margin: auto;
  }
`;

// ${'' /* font-size: clamp(var(--size18), 4vw, var(--size32)); */}
// ${'' /* font-size: clamp(var(--size20), 15vw, var(--size40)); */}

// const Heading = styled.h4`
//   font-family: Recursive, sans-serif;
//   font-variation-settings: var(--recursive4);
//   width: fit-content;
//   transition: all 10ms;
//   ${(p) => console.log(p)};
//   font-size: clamp(var(--size24), 10vw, var(--size48));
//   position: relative;

//   ${
//     '' /* &:after {
//     content: "${(p) => p.before}";
//     font-family: Recursive, sans-serif;
//     font-variation-settings: var(--recursive4);
//     width: fit-content;
//     font-size: inherit;
//     position: absolute;
//     top: -1px;
//     bottom: 0;
//     z-index: -1;
//     -webkit-text-stroke: 0.06em black;
//   } */
//   }

//   @media (max-width: ${breakpoints.mobile}px) {
//     font-size: var(--size16);
//   }

//   @media (max-width: 795px) {
//     margin: auto;
//   }
// `;

const Wrapper = styled.div`
  @media (max-width: 795px) {
    text-align: center;
  }
`;

// @media (prefers-color-scheme: dark) {
//   color: var(--orange2);
//   &:hover {
//     color: var(--orange-hover);
//     text-decoration: underline;
//   }
// }

// ${'' /* @media (max-width: 320px) {
//   text-align: center;
// } */}

// @media (prefers-color-scheme: light) {
//   color: var(--pinkBg);
//   &:hover {
//     color: var(--pinkHover);
//     text-decoration: underline;
//   }
//   &:visited {
//     color: green;
//   }
// }
