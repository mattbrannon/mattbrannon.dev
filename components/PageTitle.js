import { useFontSize } from '@hooks/useFontSize';
import styled from 'styled-components';
import { text } from '@components/Text';
import { breakpoints } from '@constants/breakpoints';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { forwardRef, useEffect, useState } from 'react';
import { H1 } from '@components/Headings';
import { spacer } from '@components/Spacer';
import { useTheme } from 'next-themes';

const slantText = {
  initial: {
    color: 'var(--color-text)',
    fontVariationSettings: 'var(--recursive6)',
  },
  animate: ({ color }) => {
    return {
      color,
      fontVariationSettings: 'var(--recursive2)',
    };
  },
  transition: {
    delay: 0.3,
    duration: 1,
    easing: 'ease',
  },
};

const Title = (props, ref) => {
  const isMobile = useMediaQuery({ maxWidth: breakpoints.mobile });
  const desktopFontSize = useFontSize(32, 40, breakpoints.mobile, breakpoints.desktop);
  const mobileFontSize = useFontSize(24, 32, 0, breakpoints.mobile);
  const fontSize = isMobile ? mobileFontSize : desktopFontSize;
  const [color, setColor] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    const pink = '#990078';
    const blue = '#00bfff';

    return theme === 'light' ? setColor(pink) : setColor(blue);
  }, [theme, ref]);

  if (props.children.length) {
    const [highlighted, ...rest] = props.children.split(' ');
    const { initial, animate, transition } = slantText;

    return (
      <>
        <FluidHeading style={{ '--fontSize': fontSize }} tabIndex={-1}>
          <text.italic
            variants={slantText}
            initial={initial}
            animate={animate}
            transition={transition}
            custom={{ color }}
            {...props}
          >
            {highlighted}&nbsp;
          </text.italic>
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
  text-align: center;
  /* margin-top: 64px; */
  @media (max-width: ${breakpoints.mobile}px) {
    font-size: 24px;
    /* margin-bottom: 16px;
    margin-top: 16px; */
  }
  @media (min-width: ${breakpoints.laptop}px) {
    text-align: left;
  }
`;

const Span = styled.span`
  @media (max-width: ${breakpoints.mobile}px) {
    display: ${(p) => (p.inline ? 'inline' : 'block')};
  }
  outline: none;
`;
