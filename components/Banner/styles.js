import styled from 'styled-components';
import { breakpoints } from '@constants/breakpoints';
import { link } from '@components/Links';

export const Header = styled.header.attrs(({ isVisible, dialogIsOpen }) => {
  const translateY = isVisible ? '0%' : '-100%';
  const position = dialogIsOpen ? 'sticky' : 'fixed';
  return {
    style: {
      '--translateY': translateY,
      '--position': position,
    },
  };
})`
  --color-outline: var(--azure-light);
  position: sticky;
  top: 0;
  width: 100%;
  background: var(--header-background);
  z-index: 1;
  padding: ${12 / 16}rem 0;
  min-height: 56px;
  /* height: var(--header-height); */
  transform: translateY(var(--translateY));
  transition: transform 0.3s ease-in-out;

  @media (min-width: ${breakpoints.laptop}px) {
    padding: ${24 / 16}rem 0;
    min-height: 80px;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  min-height: 100%;
`;

export const Right = styled.div`
  display: flex;

  justify-content: flex-end;
  align-items: center;
  flex: 1;
  gap: var(--header-link-gap);
`;

export const LinkWrapper = styled.span`
  background: transparent;
  border: none;
  font-size: var(--size16);

  margin-bottom: -6px;

  &:hover {
    cursor: pointer;
  }
`;

export const NameWrapper = styled.div`
  display: block;

  font-family: decovar;
  font-variation-settings: 'TRMA' 1000;
  color: var(--myName);

  transition: all 70ms ease;
  outline: none;

  &:hover {
    color: var(--myNameHover);
    text-decoration: none;
    cursor: pointer;
  }
`;

export const Left = styled.div`
  white-space: nowrap;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: var(--header-link-gap);
  position: relative;
  /* margin-bottom: -8px; */

  @media (min-width: ${breakpoints.laptop}px) {
    margin-bottom: 0px;
  }
`;

export const NameLink = styled(link.next)`
  color: var(--myName);
  font-size: clamp(var(--size20), 1rem - -1vw, var(--size28));
  &:hover {
    text-decoration: none;
  }
`;
