import styled from 'styled-components';
import { MaxWidthWrapper } from 'components/MaxWidthWrapper';
import { NavLinks } from './NavLinks';
import { forwardRef, memo } from 'react';

function ForwardHeader({ ...props }, ref) {
  return (
    <>
      <Container ref={ref} {...props}>
        <MaxWidthWrapper>
          <NavLinks {...props} />
        </MaxWidthWrapper>
      </Container>
    </>
  );
}

export const Header = memo(forwardRef(ForwardHeader));

export const Container = styled.header.attrs(({ isVisible, dialogIsOpen }) => {
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
