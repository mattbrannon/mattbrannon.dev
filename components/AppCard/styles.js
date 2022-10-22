import styled from 'styled-components';
import FutureImage from 'next/future/image';
import { breakpoints } from '@constants/breakpoints';
import { H2 } from '@components/Headings';

export const Wrapper = styled.div`
  display: block;
  margin: 64px 0 64px 0;
  cursor: pointer;
  @media (max-width: ${breakpoints.tablet}px) {
    text-align: center;
    margin: 32px 0 32px 0;
  }
`;

export const Heading = styled(H2)`
  font-family: Recursive, sans-serif;
  font-variation-settings: var(--recursive4);

  width: fit-content;
  transition: all 10ms;
  font-size: clamp(var(--size24), 7vw, var(--size36));
  color: var(--app-card-color);

  &:hover {
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

export const Small = styled.small`
  margin-bottom: 23px;
  display: block;
  color: var(--color-text);
`;

export const ImageWrapper = styled.div`
  filter: drop-shadow(1px 3px 6px var(--app-card-shadow));
  &:hover {
    cursor: pointer;
  }
`;

export const Image = styled(FutureImage)`
  height: auto;
  width: 100%;
`;
