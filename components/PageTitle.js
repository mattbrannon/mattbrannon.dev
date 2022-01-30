import { useFontSize } from '@hooks/useFontSize';
import styled from 'styled-components';
import FancyText from './FancyText';
import { breakpoints } from '@constants/index';
import { useMediaQuery } from '@hooks/useMediaQuery';

export default function PageTitle({ children, ...props }) {
  const isMobile = useMediaQuery({ maxWidth: breakpoints.mobile });
  const desktopFontSize = useFontSize(32, 40, breakpoints.mobile, breakpoints.desktop);
  const mobileFontSize = useFontSize(24, 32, 0, breakpoints.mobile);

  // console.log(mobileFontSize);
  // console.log(desktopFontSize);

  const fontSize = isMobile ? mobileFontSize : desktopFontSize;

  // console.log({ isMobile });

  if (children.length) {
    const [ highlighted, ...rest ] = children.split(' ');
    return (
      <TopRow>
        <FluidHeading fontSize={fontSize}>
          <RecursiveText {...props}>{highlighted}&nbsp;</RecursiveText>
          <Span {...props}>{rest.join(' ')}</Span>
        </FluidHeading>
      </TopRow>
    );
  }
  return null;
}

const RecursiveText = styled(FancyText)`
  font-size: var(--size40);
`;

const FluidHeading = styled.h3`
  font-family: Recursive, 'OpenSans', system-ui, sans-serif;
  font-variation-settings: var(--recursive6);
  font-size: ${(p) => p.fontSize || 'var(--size24)}'};
  line-height: 1.2;
  @media (max-width: ${breakpoints.mobile}px) {
    font-size: 24px;
    margin-bottom: 16px;
  }
  @media (max-width: ${breakpoints.tablet}px) {
    text-align: center;
  }
`;

const TopRow = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  margin-top: 16px;
  @media (min-width: ${breakpoints.mobile}px) {
    margin-top: 64px;
    margin-bottom: 32px;
  }
`;

const Span = styled.span`
  @media (max-width: ${breakpoints.mobile}px) {
    display: ${(p) => (p.inline ? 'inline' : 'block')};
  }
`;
