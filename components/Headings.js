import { breakpoints } from '@constants/index';
import styled from 'styled-components';
import { BlogLink } from '@components/Links';
import { toHeadingId } from '@utils/helpers.js';

export const H1 = styled.h1`
  /* margin: 80px 0 24px 0; */
  color: var(--h1);
  @media (max-width: ${breakpoints.mobile}px) {
    margin: 16px 0 16px 0;
  }
`;

// export const H2 = styled.h2`
//   font-size: var(--size36);
//   margin: 32px 0 8px 0;
//   color: var(--h2);
//   position: relative;
//   @media (max-width: ${breakpoints.mobile}px) {
//     font-size: var(--size28);
//     margin: 16px 0 16px 0;
//   }
// `;

export const H2 = styled.h2`
  font-size: var(--size28);
  margin: 24px 0 12px 0;
  color: var(--h2);
  position: relative;
  @media (max-width: ${breakpoints.mobile}px) {
    font-size: var(--size21);
    margin: 16px 0 16px 0;
  }
`;

export const H3 = styled.h3`
  font-size: var(--size24);
  margin: 24px 0 24px 0;
  color: var(--h3);
  position: relative;
  @media (max-width: ${breakpoints.mobile}px) {
    font-size: var(--size21);
    margin: 16px 0 16px 0;
  }
`;

export const H4 = styled.h4`
  font-size: var(--size21);

  margin: 21px 0 21px 0;
  color: var(--h4);
  position: relative;
  @media (max-width: ${breakpoints.mobile}px) {
    font-size: var(--size18);
    margin: 16px 0 16px 0;
  }
`;

export const H5 = styled.h5`
  font-size: var(--size18);
  margin: 18px 0;
  color: var(--h5);
  position: relative;
  @media (max-width: ${breakpoints.mobile}px) {
    font-size: var(--size16);
    margin: 16px 0 16px 0;
  }
`;
export const H6 = styled.h6``;

export const CardHeading = styled(H2)`
  margin-top: 16px;
  font-size: var(--size28);
  color: var(--h3);
  position: relative;
  @media (max-width: ${breakpoints.mobile}px) {
    font-size: var(--size21);
    margin: 16px 0 16px 0;
  }
`;

export const AppCardHeading = styled(H2)`
  font-family: Recursive, sans-serif;
  font-variation-settings: var(--recursive4);
  width: fit-content;
  transition: all 10ms;
  /* font-size: clamp(var(--size32), 7vw, var(--size40)); */
  font-size: clamp(var(--size24), 7vw, var(--size36));
  /* color: var(--h2); */
  color: var(--app-card-color);

  &:hover {
    /* color: var(--h3); */
    color: var(--app-card-hover);
  }

  margin: 0;
  @media (max-width: ${breakpoints.tablet}px) {
    margin: auto;
  }

  &:focus-visible {
    outline: 2px solid var(--color-outline);
  }
`;

const withHeading = (Component) => {
  return function heading(props) {
    const heading = toHeadingId(props.children);

    return (
      <Component id={heading} {...props}>
        <BlogLink title={heading} href={`#${heading}`} {...props}>
          {props.children}
        </BlogLink>
      </Component>
    );
  };
};

export const H1Link = withHeading(H1);
export const H2Link = withHeading(H2);
export const H3Link = withHeading(H3);
export const H4Link = withHeading(H4);
export const H5Link = withHeading(H5);
export const H6Link = withHeading(H6);
