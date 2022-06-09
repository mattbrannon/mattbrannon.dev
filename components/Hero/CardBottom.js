import styled from 'styled-components';
import { breakpoints } from '@constants/breakpoints';
import Link from 'next/link';
import { NormalButton } from '@components/Button';
import { motion, useAnimation } from 'framer-motion';
import { useState, useReducer, useEffect } from 'react';

export default function CardBottom({ ...props }) {
  return (
    <Container>
      <Wrapper side="left">
        <Link passHref href="/blog/about-me">
          <NormalButton {...props}>Who am I?</NormalButton>
        </Link>
      </Wrapper>

      <Wrapper side="center">
        <Link passHref href="/apps">
          <NormalButton {...props}>View my work</NormalButton>
        </Link>
      </Wrapper>

      <Wrapper side="right">
        <Link passHref href="/contact">
          <NormalButton {...props}>Get in touch</NormalButton>
        </Link>
      </Wrapper>
    </Container>
  );
}

const getCssValues = ({ side, isContainerVisible = true }) => {
  const translateX = isContainerVisible
    ? 0
    : side === 'left'
    ? 'calc(100% + 8px)'
    : side === 'right'
    ? 'calc(-100% - 8px)'
    : 0;

  const clipPath = isContainerVisible ? 'circle(100%)' : 'circle(0px)';

  const color = isContainerVisible ? 'rgb(255, 255, 255, 1)' : 'rgb(255, 255, 255, 0)';
  const textShadow = isContainerVisible
    ? '-0.05em -0.05em 0.05em rgb(0, 0, 0, 1)'
    : '0 0 0 rgb(0, 0, 0, 0)';

  const opacity = isContainerVisible ? 1 : 0;

  return { translateX, clipPath, color, textShadow, opacity };
};

const Wrapper = styled.div.attrs((props) => {
  const { translateX, clipPath, color, textShadow, opacity } = getCssValues(props);
  return {
    style: {
      '--translateX': translateX,
      '--clipPath': clipPath,
      '--color': color,
      '--textShadow': textShadow,
      '--opacity': opacity,
    },
  };
})`
  transform: translateX(var(--translateX));
  color: var(--color);
  text-shadow: var(--textShadow);
  clip-path: var(--clipPath);
  /* opacity: var(--opacity); */
  transition: transform 1s cubic-bezier(0.09, 0.78, 0.3, 1.5) 1s, color 1.25s ease-in-out 1s,
    text-shadow 0.75s ease-in-out 1.75s, clip-path 0.2s ease 1s;
`;

const Container = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  position: relative;
  margin-top: 16px;
  transition: all 1s linear;
  @media (max-width: ${breakpoints.mobile}px) {
    margin: 16px 0;
    flex-wrap: wrap;
    grid-template-columns: 1fr;
  }
`;
