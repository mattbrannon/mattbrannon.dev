import { useFontSize } from '@hooks/useFontSize';
import styled from 'styled-components';
import FancyText from './Text/FancyText';
import { breakpoints } from '@constants/breakpoints';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { forwardRef } from 'react';
import { H1 } from '@components/Headings';

const Title = (props, ref) => {
  const isMobile = useMediaQuery({ maxWidth: breakpoints.mobile });
  const desktopFontSize = useFontSize(32, 40, breakpoints.mobile, breakpoints.desktop);
  const mobileFontSize = useFontSize(24, 32, 0, breakpoints.mobile);
  const fontSize = isMobile ? mobileFontSize : desktopFontSize;

  if (props.children.length) {
    const [highlighted, ...rest] = props.children.split(' ');
    return (
      <>
        <FluidHeading style={{ '--fontSize': fontSize }} tabIndex={-1}>
          <FancyText {...props}>{highlighted}&nbsp;</FancyText>
          <Span ref={ref} {...props}>
            {rest.join(' ')}
          </Span>
        </FluidHeading>
      </>
    );
  }
  return null;
};

export const PageTitle = forwardRef(Title);

// const RecursiveText = styled(FancyText)`
//   font-size: var(--size40);
// `;

const FluidHeading = styled(H1)`
  font-family: Recursive, 'OpenSans', system-ui, sans-serif;
  font-variation-settings: var(--recursive6);
  font-size: var(--fontSize);
  line-height: 1.2;
  margin: revert;
  /* margin-top: 64px; */
  @media (max-width: ${breakpoints.mobile}px) {
    font-size: 24px;
    /* margin-bottom: 16px;
    margin-top: 16px; */
  }
  @media (max-width: ${breakpoints.tablet}px) {
    text-align: center;
  }
`;

const Span = styled.span`
  @media (max-width: ${breakpoints.mobile}px) {
    display: ${(p) => (p.inline ? 'inline' : 'block')};
  }
  outline: none;
`;
