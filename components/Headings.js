import { breakpoints } from '@constants/index';
import styled from 'styled-components';
// import { BlogLink } from '@components/Links'
import { toHeadingId } from '@utils/helpers.js';
import { LinkIcon } from '@components/Links';
import { useEffect, useRef, useState } from 'react';

// export const H1 = styled.h1`
//   color: var(--h1);
//   font-size: var(--fontSize);
//   @media (max-width: ${breakpoints.mobile}px) {
//     margin: 16px 0 16px 0;
//   }
// `;

// export const H2 = styled.h2`
//   font-size: var(--size28);
//   margin: 24px 0 12px 0;
//   color: var(--h2);
//   position: relative;
//   @media (max-width: ${breakpoints.mobile}px) {
//     font-size: var(--size21);
//     margin: 16px 0 16px 0;
//   }
// `;

// export const H3 = styled.h3`
//   font-size: var(--size24);
//   margin: 24px 0 24px 0;
//   color: var(--h3);
//   position: relative;
//   @media (max-width: ${breakpoints.mobile}px) {
//     font-size: var(--size21);
//     margin: 16px 0 16px 0;
//   }
// `;

// export const H4 = styled.h4`
//   font-size: var(--size21);

//   margin: 21px 0 21px 0;
//   color: var(--h4);
//   position: relative;
//   @media (max-width: ${breakpoints.mobile}px) {
//     font-size: var(--size18);
//     margin: 16px 0 16px 0;
//   }
// `;

// export const H5 = styled.h5`
//   font-size: var(--size18);
//   margin: 18px 0;
//   color: var(--h5);
//   position: relative;
//   @media (max-width: ${breakpoints.mobile}px) {
//     font-size: var(--size16);
//     margin: 16px 0 16px 0;
//   }
// `;
// export const H6 = styled.h6``;

// export const H1Link = withHeading(H1);
// export const H2Link = withHeading(H2);
// export const H3Link = withHeading(H3);
// export const H4Link = withHeading(H4);
// export const H5Link = withHeading(H5);
// export const H6Link = withHeading(H6);

const BlogLink = styled.div`
  scroll-margin-top: 60px;
  /* outline: 3px solid lime; */
  width: fit-content;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  gap: 16px;
`;

const H2Blog = styled(BlogLink).attrs({ as: 'h2' })`
  position: relative;

  color: var(--h4);
  /* color: var(--yellow); */
  margin: 0;
  margin: 64px 0 16px 0;
`;

const H3Blog = styled(BlogLink).attrs({ as: 'h3' })`
  position: relative;
  margin-top: 0;
  color: var(--h3);
  margin: 48px 0 16px 0;
  /* color: var(--yellow); */
`;

const H4Blog = styled(BlogLink).attrs({ as: 'h4' })`
  position: relative;
  margin-top: 0;
  color: var(--h4);
  margin: 32px 0 16px 0;
`;

export const H1 = styled.h1`
  position: relative;
  margin-top: 0;
`;

export const H2 = styled.h2`
  position: relative;

  color: var(--h4);
  /* color: var(--yellow); */
  margin: 0;
  margin: 64px 0 16px 0;
`;

export const H3 = styled.h3`
  position: relative;
  margin-top: 0;
  color: var(--h3);
  margin: 48px 0 16px 0;
  /* color: var(--yellow); */
`;

export const H4 = styled.h4`
  position: relative;
  margin-top: 0;
  color: var(--h4);
  margin: 32px 0 16px 0;
  /* color: var(--darkorange); */
`;

export const H5 = styled.h5`
  position: relative;
  color: lime;
`;

export const H6 = styled.h6`
  position: relative;
  color: var(--h6);
`;

const withLink = (Heading) => {
  return function HeadingComponent(props) {
    const ref = useRef();
    const svg = useRef();
    const heading = toHeadingId(props.children);
    const [id, setId] = useState(ref?.current?.id);
    const [isHovering, setIsHovering] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
      if (ref.current) {
        if (!ref.current.id) {
          setId(heading);
          console.log(ref.current);
        }
        else {
          setId(ref.current.id);
        }
      }
      console.log(heading);
    }, [ref, heading]);

    return (
      <Heading
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onMouseOver={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => svg.current.click()}
        ref={ref}
        id={id}
        {...props}
      >
        {/* <div> */}
        <LinkIcon isFocused={isFocused} isHovering={isHovering} ref={svg} href={'#' + id} />
        <span>{props.children}</span>
      </Heading>
    );
  };
};

// export const H1 = styled.h1`
//   position: relative;
//   margin-top: 0;
// `
// export const H2 = styled.h2`
//   position: relative;

//   color: var(--h2);
//   color: var(--yellow);
//   margin: 0;
//   margin: 96px 0 16px 0;
// `;
// export const H3 = styled.h3`
//   position: relative;

//   color: var(--h3);
//   /* color: var(--yellow); */
// `
// export const H4 = styled.h4`
//   position: relative;

//   color: var(--h4);
//   /* color: var(--darkorange); */
// `
// export const H5 = styled.h5`
//   position: relative;

//   color: var(--h5);
// `

export const CardHeading = styled(H2)`
  font-size: var(--size28);
  color: var(--h3);
  position: relative;
  margin: 16px 0 8px 0;
  font-variation-settings: 'wght' 750;
  @media (max-width: ${breakpoints.mobile}px) {
    font-size: var(--size21);
    margin: 16px 0 16px 0;
  }
  &:hover {
    color: var(--app-card-hover);
  }
`;

export const H1Link = withLink(H1);
export const H2Link = withLink(H2Blog);
export const H3Link = withLink(H3Blog);
export const H4Link = withLink(H4Blog);
export const H5Link = withLink(H5);
export const H6Link = withLink(H6);
