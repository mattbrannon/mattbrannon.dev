import styled from 'styled-components';
import { MaxWidthWrapper } from 'components/MaxWidthWrapper';
import { NavLinks } from './NavLinks';
import { forwardRef, memo } from 'react';

function ForwardBanner({ ...props }, ref) {
  return (
    <>
      <Header ref={ref} {...props}>
        <MaxWidthWrapper>
          <NavLinks {...props} />
        </MaxWidthWrapper>
      </Header>
    </>
  );
}

export const Banner = memo(forwardRef(ForwardBanner));

export const Header = styled.header.attrs(({ isVisible, dialogIsOpen }) => {
  const translateY = isVisible ? '0%' : '-100%';
  return {
    style: {
      '--translateY': translateY,
    },
  };
})`
  --color-outline: var(--azure-light);
  position: sticky;
  top: 0;
  background: var(--header-background);
  z-index: 1;
  height: var(--header-height);
  transform: translateY(var(--translateY));
  transition: transform 0.3s ease-in-out;
`;
