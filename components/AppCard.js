import styled from 'styled-components';
import { useRef } from 'react';
// import Image from 'next/future/image';
import { InternalLink } from '@components/Links';
import { breakpoints } from '@constants/index';
import { AppCardHeading } from '@components/Headings';
import Link from 'next/link';

import { Picture } from './Picture';

export function AppCard({ ...props }) {
  const { href, title, description, sources, alt, priority } = props.config;
  const ref = useRef();

  return (
    <Wrapper onClick={() => ref.current.click()}>
      <AppCardHeading>
        <InternalLink ref={ref} href={href}>
          {title}
        </InternalLink>
      </AppCardHeading>
      <Small>{description}</Small>
      <PictureWrapper>
        <Picture sources={sources} alt={alt} priority={priority} />
      </PictureWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: block;
  margin: 64px 0 64px 0;
  cursor: pointer;
  @media (max-width: ${breakpoints.tablet}px) {
    text-align: center;
    margin: 32px 0 32px 0;
  }
`;

const Small = styled.small`
  margin-bottom: 23px;
  display: block;
  color: var(--color-text);
`;

const PictureWrapper = styled.div`
  --shadow-color: #333;
  filter: drop-shadow(1px 3px 6px var(--shadow-color));
  &:hover {
    cursor: pointer;
  }
  @media (prefers-color-scheme: dark) {
    --shadow-color: #000;
  }
`;

// import styled from 'styled-components';
// import { Link } from '@components/Links';
// // import { CardImage } from '@components/Image';
// import { breakpoints } from '@constants/index';
// import { AppCardHeading } from '@components/Headings';
// import { useRef } from 'react';
// import { Picture } from '@components/Picture';

// export default function AppCard({ ...props }) {
//   const { href, title, description, sources, alt, priority } = props.config;
//   const ref = useRef();

//   return (
//     <Card>
//       <Wrapper onClick={() => ref.current.click()}>
//         <AppCardHeading before={title}>
//           <Link passHref href={href}>
//             <span ref={ref}>{title}</span>
//           </Link>
//         </AppCardHeading>
//         <Small>{description}</Small>
//         <PictureWrapper>
//           <Picture sources={sources} alt={alt} priority={priority} />
//         </PictureWrapper>
//         {/* <CardImage {...props} priority={priority} src={src} alt={alt} /> */}
//       </Wrapper>
//     </Card>
//   );
// }

// const Card = styled.div`
//   margin: 64px 0 64px 0;
//   @media (max-width: ${breakpoints.mobile}px) {
//     margin: 32px 0 32px 0;
//   }
// `;

// const Wrapper = styled.div`
//   @media (max-width: ${breakpoints.tablet}px) {
//     text-align: center;
//   }
// `;

// const Small = styled.small`
//   margin-bottom: 23px;
//   display: block;
//   color: var(--color-text);
// `;
