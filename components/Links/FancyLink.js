import styled from 'styled-components';
import NextLink from 'next/link';

export const HeaderLink = styled(NextLink)`
  color: var(--color);
  display: block;
  letter-spacing: 0.8px;
  font-family: Jost;
  font-weight: 525;

  &:hover {
    color: var(--off-white);
    cursor: pointer;
  }
  color: white;
  font-size: clamp(0.85rem, 0.85rem + 0.25vw, 1rem);

  /* border-bottom-color: ${(p) => (p.$isActive ? ' var(--fancy-link-underline)' : 'transparent')};
  border-bottom-style: solid;
  border-bottom-width: 2px; */

  /* transition: color 0.15s ease, border-bottom-color 0.2s ease; */
`;

const Underline = styled.span`
  height: 2px;
  width: 100%;

  max-width: ${(p) => (p.isActive ? '100%' : '0%')};
  background: var(--fancy-link-underline);
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  margin-right: auto;
  margin-left: auto;

  transition: max-width 0.2s ease-in-out;
`;

const Wrapper = styled.div`
  position: relative;
`;

export const FancyLink = ({ children, ...props }) => {
  return (
    <Wrapper>
      <HeaderLink {...props}>{children}</HeaderLink>
      <Underline {...props} />
    </Wrapper>
  );
};
