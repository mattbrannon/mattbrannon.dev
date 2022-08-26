import styled from 'styled-components';
import { breakpoints } from '@constants/breakpoints';
import { Anchor } from '@components/Links';

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
  }
`;

const Link = styled(Anchor)`
  height: inherit;
  display: block;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--orange);
  font-weight: 700;
  color: var(--black);

  &:focus-visible {
    margin-top: -12px;
    outline: 2px solid var(--color-outline);
    padding: 24px 18px;
  }

  &:hover {
    color: black;
    background-color: var(--amber);
  }

  @media (max-width: ${breakpoints.mobile}px) {
    &:focus-visible {
      margin-top: 0;
      padding: 0 8px;
    }
  }

  transition: background-color 0.2s ease;
  /* position: absolute; */
`;
