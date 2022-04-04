import { format, parseISO } from 'date-fns';
import styled from 'styled-components';
import { mobile, blogHeader } from '@constants/index';
// import { withGradient, Text } from '@components/GradientText';
// import FancyTitle from './FancyTitle';
// import { makeGradient, makeShadow } from '@utils/helpers';
// import { loadFeatures } from '@utils/helpers';
import { H2 } from '@components/Headings';

// const shadow = makeShadow({
//   shadowColorStart: '#021f5f',
//   shadowColorEnd: '#0d0d0d',
//   shadowLayers: 10,
// });

// const shadow = makeShadow({
//   shadowColorStart: 'white',
//   shadowColorEnd: 'white',
//   shadowLayers: 30,
//   shadowGap: 20,
//   offsetX: 0,
//   offsetY: 0,
//   blur: 4,
// });

// const gradient = makeGradient({
//   gradientColorStart: 'deepskyblue',
//   gradientColorEnd: 'magenta',
//   gradientBlend: 50,
//   gradientAngle: 175,
//   gradientMidpoint: 45,
// });

// export default function BlogHeader({ children }) {
//   return (
//     <BlogTitleWrapper style={{ '--fontSize': blogHeader.fontSize }}>
//       {/*  */}
//       {/* <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}> */}
//       <Title tabIndex={-1}>
//         {/* <FancyTitle
//         letterSpacing={'0.075em'}
//         gradient={gradient}
//         shadow={shadow}
//         custom={blogHeader}
//       > */}
//         {children.title}
//         {/* </FancyTitle> */}

//         {/* <Gradient custom={blogHeader}>{children.title}</Gradient> */}
//       </Title>
//       {/* </motion.div> */}
//       <Date date={children.date} />
//       {/*  */}
//     </BlogTitleWrapper>
//   );
// }

export default function BlogHeader({ children }) {
  return (
    <BlogTitleWrapper style={{ '--fontSize': blogHeader.fontSize }}>
      <Title id="main-content" tabIndex={-1}>
        {children.title}
      </Title>
      <Date date={children.date} />
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
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  margin-top: 32px;
  margin-bottom: 2rem;
  font-family: Recursive;
  flex-direction: column;

  --fontFamily: Recursive;
  --fontSize: clamp(24px, 9vw, 80px);
  ${'' /* --fontVariationSettings: 'wght' 974, 'slnt' -7, 'CASL' 0.42, 'CRSV' 0, 'MONO' 0; */}

  --strokeWidth: 0.021875em;
  --strokeColor: #000000;

  @media (max-width: ${mobile}px) {
    margin-top: 24px;
  }
`;

export const Title = styled(H2)`
  /* font-size: 64px; */
  margin-bottom: 0rem;
  flex: 1 0 100%;
  font-variation-settings: 'wght' 876, 'slnt' -6, 'CASL' 0, 'CRSV' 1, 'MONO' 0;

  color: var(--color-blog-title);
  @media (max-width: ${mobile}px) {
    font-size: var(--size32);
  }
`;

const Time = styled.div`
  white-space: nowrap;
  color: var(--color-blog-date);
  flex: 1;
  min-width: revert;
`;
