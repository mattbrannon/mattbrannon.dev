import styled from 'styled-components';
import { FullWidth, MaxWidthWrapper } from 'components/MaxWidthWrapper';
import { NavLinks } from './NavLinks';
import { forwardRef } from 'react';

function ForwardBanner({ ...props }, ref) {
  return (
    <FullWidth>
      <Header ref={ref} {...props}>
        <MaxWidthWrapper>
          <NavLinks {...props} />
        </MaxWidthWrapper>
      </Header>
    </FullWidth>
  );
}

export const Banner = forwardRef(ForwardBanner);

const Header = styled.header.attrs(({ isVisible }) => {
  const translateY = isVisible ? '0%' : '-100%';
  return {
    style: {
      '--translateY': translateY,
    },
  };
})`
  --color-outline: var(--azure-light);
  position: fixed;
  width: 100%;
  background: var(--header-background);
  z-index: 1;
  height: var(--header-height);
  transform: translateY(var(--translateY));
  transition: transform 0.3s ease-in-out;
`;
