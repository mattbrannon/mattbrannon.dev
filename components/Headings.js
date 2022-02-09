import { breakpoints } from '@constants/index';
import styled from 'styled-components';
import GradientText from './GradientText';

export const H1 = styled.h1`
  margin: 80px 0 24px 0;
  color: var(--orange);
  ${'' /* position: sticky;
  top: 0; */}

  @media (prefers-color-scheme: light) {
    color: var(--dark-pink);
  }

  @media (max-width: ${breakpoints.mobile}px) {
    margin: 16px 0 16px 0;
  }
`;

export const H2 = styled.h2`
  font-size: var(--size36);
  margin: 32px 0 8px 0;
  color: var(--orange);

  @media (prefers-color-scheme: light) {
    color: var(--dark-pink);
  }
`;
export const H3 = styled.h3`
  font-size: var(--size24);
  margin: 24px 0 4px 0;
  color: var(--yellow);

  @media (prefers-color-scheme: light) {
    color: var(--dark-pink);
    color: #4051b5;
  }
`;

export const H4 = styled.h4`
  margin: 21px 0 21px 0;
`;

export const H5 = styled.h5``;
export const H6 = styled.h6``;

export const GradientHeading = ({ children }) => {
  return (
    <h1>
      <GradientText>{children}</GradientText>
    </h1>
  );
};
