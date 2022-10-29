import { format, parseISO } from 'date-fns';
import styled from 'styled-components';
import { blogHeader } from '@constants/blog';
import { breakpoints } from '@constants/breakpoints';
import { FancyTitle } from '@components/FancyTitle';
import { useTheme } from 'next-themes';
import { makeGradient } from '@utils/helpers.js';

const gradient = makeGradient({
  gradientColorStart: 'darkorange',
  gradientColorEnd: 'gold',
  gradientBlend: 50,
  gradientAngle: 175,
  gradientMidpoint: 45,
});

export default function BlogHeader({ children: { title, date } }) {
  const { theme } = useTheme();
  const { shadow, fontSettings } = blogHeader;

  return (
    <BlogTitleWrapper>
      <FancyTitle
        style={{
          '--gradient': gradient,
          '--shadow': 'none',
        }}
        variants={blogHeader.blogVariant}
        initial="hidden"
        animate="show"
        exit="close"
        fontSettings={fontSettings}
      >
        {title}
      </FancyTitle>
      <Date date={date} />
    </BlogTitleWrapper>
  );
}

function Date({ date }) {
  if (date) {
    const dateString = parseISO(date);
    const formatted = format(dateString, 'LLLL d, yyyy');
    return <Time>{formatted}</Time>;
  }
  return null;
}

const BlogTitleWrapper = styled.div`
  margin-top: 24px;
  margin-bottom: 32px;
  font-family: Recursive;

  @media (min-width: ${breakpoints.tablet}px) {
    margin-top: 64px;
  }
`;

const Time = styled.div`
  white-space: nowrap;
  color: var(--color-blog-date);
  flex: 1;
  min-width: revert;
`;
