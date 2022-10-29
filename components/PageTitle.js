import { useFontSize } from '@hooks/useFontSize';
import styled from 'styled-components';
import { text } from '@components/Text';
import { breakpoints } from '@constants/breakpoints';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { forwardRef, useEffect, useState } from 'react';
import { headings } from '@components/Headings';
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
  const [displayStyle, setDisplayStyle] = useState('block');

  useEffect(() => {
    const pink = '#990078';
    const blue = '#00bfff';

    return theme === 'light' ? setColor(pink) : setColor(blue);
  }, [theme, ref]);

  useEffect(() => {
    const [_, ...rest] = props.children.split(' ');
    const displayStyle = rest.length > 1 ? 'block' : 'inline';
    setDisplayStyle(displayStyle);
  }, [props]);

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
            displayStyle={displayStyle}
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

const FluidHeading = styled(headings.h1)`
  font-family: Recursive, 'OpenSans', system-ui, sans-serif;
  font-variation-settings: var(--recursive6);
  font-size: var(--fontSize);
  line-height: 1.2;
  margin: revert;
  text-align: center;

  @media (min-width: ${breakpoints.laptop}px) {
    text-align: left;
  }
`;

const Span = styled.span`
  outline: none;
`;
