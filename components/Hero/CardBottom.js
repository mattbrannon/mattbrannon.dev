import styled from 'styled-components';
import { breakpoints } from '@constants/breakpoints';
import Link from 'next/link';
import { NormalButton } from '@components/Button';
import { motion } from 'framer-motion';

export default function CardBottom({ ...props }) {
  return (
    <ButtonWrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Link passHref href="/blog/about-me">
        <NormalButton {...props}>Who am I?</NormalButton>
      </Link>
      <Link passHref href="/apps">
        <NormalButton {...props}>View my work</NormalButton>
      </Link>

      <Link passHref href="/contact">
        <NormalButton {...props}>Get in touch</NormalButton>
      </Link>
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled(motion.div)`
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
