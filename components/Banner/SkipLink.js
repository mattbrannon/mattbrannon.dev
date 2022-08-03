import styled from 'styled-components';
import { breakpoints } from '@constants/breakpoints';

export default function SkipLink({ children, ...props }) {
  return (
    <SkipWrapper {...props}>
      <Link href="#main-content">{children}</Link>
    </SkipWrapper>
  );
}

const SkipWrapper = styled.div`
  position: absolute;
  top: -100px;

  &:focus-within {
    top: 0px;
    background: var(--header-background);
    height: 100%;
    width: 100%;
  }

  @media (max-width: ${breakpoints.mobile}px) {
    &:focus-within {
      top: 0;
    }
  }
`;

const Link = styled.a`
  height: inherit;
  display: block;
  display: flex;
  justify-content: center;
  align-items: center;
  /* position: absolute; */
`;
