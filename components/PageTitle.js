import { useFontSize } from '@hooks/useFontSize';
import styled from 'styled-components';
import FancyText from './Text/FancyText';
import { breakpoints } from '@constants/index';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { forwardRef } from 'react';
import { H1 } from '@components/Headings';

// eslint-disable-next-line react/display-name
const PageTitle = forwardRef((props, ref) => {
  const isMobile = useMediaQuery({ maxWidth: breakpoints.mobile });
  const desktopFontSize = useFontSize(32, 40, breakpoints.mobile, breakpoints.desktop);
  const mobileFontSize = useFontSize(24, 32, 0, breakpoints.mobile);
  const fontSize = isMobile ? mobileFontSize : desktopFontSize;

  if (props.children.length) {
    const [highlighted, ...rest] = props.children.split(' ');
    return (
      // <TopRow style={{ '--fontSize': fontSize }}>
      <FluidHeading style={{ '--fontSize': fontSize }} tabIndex={-1}>
        <RecursiveText {...props}>{highlighted}&nbsp;</RecursiveText>
        <Span ref={ref} {...props}>
          {rest.join(' ')}
        </Span>
      </FluidHeading>
      // </TopRow>
    );
  }
  return null;
});

const RecursiveText = styled(FancyText)`
  font-size: var(--size40);
`;

const FluidHeading = styled(H1)`
  font-family: Recursive, 'OpenSans', system-ui, sans-serif;
  font-variation-settings: var(--recursive6);
  font-size: var(--fontSize);
  line-height: 1.2;
  @media (max-width: ${breakpoints.mobile}px) {
    font-size: 24px;
    margin-bottom: 16px;
  }
  @media (max-width: ${breakpoints.tablet}px) {
    text-align: center;
  }
`;

// const TopRow = styled.div`
//   /* display: flex;
//   justify-content: center;
//   flex-direction: column;

//   outline-offset: -12px;
//   outline: none; */
// `;

const Span = styled.span`
  @media (max-width: ${breakpoints.mobile}px) {
    display: ${(p) => (p.inline ? 'inline' : 'block')};
  }
  outline: none;
`;

export default PageTitle;
