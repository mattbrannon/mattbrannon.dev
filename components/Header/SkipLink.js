import styled from 'styled-components';
import { Link } from '@components/ExternalLink';
import { usePathname } from '@hooks/usePathname';
import { breakpoints } from '@constants/breakpoints';

export default function SkipLink({ children, ...props }) {
  const handleScrollToContent = (e) => {
    if (e.type === 'keypress' && e.code === 'Space') {
      try {
        document.querySelector('#main-content').scrollIntoView();
        document.querySelector('#main-content').focus();
      } catch (error) {
        return;
      }
    }

    try {
      document.querySelector('#main-content').scrollIntoView();
      document.querySelector('#main-content').focus();
    } catch (error) {
      return;
    }
  };

  return (
    <SkipWrapper
      {...props}
      onClick={handleScrollToContent}
      onKeyPress={handleScrollToContent}
    >
      <Link {...props} passHref href="#main-content">
        <Span>{children}</Span>
      </Link>
    </SkipWrapper>
  );
}

const SkipWrapper = styled.div`
  position: absolute;
  top: -100px;
  left: 0;
  width: 100%;

  &:focus-within {
    top: 32px;
  }

  @media (max-width: ${breakpoints.mobile}px) {
    &:focus-within {
      top: 18px;
    }
  }
`;

const Span = styled.span`
  display: block;
  width: 100%;
  background: var(--header-background);

  font: inherit;
  color: inherit;

  color: var(--skip-link);
  &:hover {
    cursor: pointer;
  }
`;
