import { breakpoints } from '@constants/breakpoints';
import styled from 'styled-components';
import { toHeadingId } from '@utils/helpers.js';
import { link } from '@components/Links';
import { useEffect, useRef, useState } from 'react';

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
        }
        else {
          setId(ref.current.id);
        }
      }
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
        <link.icon
          aria-label={props.children}
          isFocused={isFocused}
          isHovering={isHovering}
          ref={svg}
          href={'#' + id}
        />
        <span>{props.children}</span>
      </Heading>
    );
  };
};

export const CardHeading = styled(H2)`
  font-size: var(--size28);
  color: var(--h3);
  position: relative;

  font-variation-settings: 'wght' 750;
  margin: 16px 0 16px 0;
  font-size: var(--size21);

  @media (min-width: ${breakpoints.laptop}px) {
    margin: 16px 0 8px 0;
    font-size: var(--size28);
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
