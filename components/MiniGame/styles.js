import styled from 'styled-components';
import { m as motion } from 'framer-motion';

export const ResultContainer = styled.div`
  width: 100%;
  display: grid;
  place-content: center;
  font-variation-settings: 'wdth' 120, 'wght' 700;
  min-height: 140px;
`;

export const Result = styled.div`
  font-weight: 700;
  text-align: center;
  color: var(--color);
`;

export const Small = styled.small`
  display: block;
  text-align: center;
`;

export const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: clamp(16px, 5vw, 32px);
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-evenly;

  margin: 32px 0;
  padding: 32px 0;
  margin: auto;
  width: 100%;
  min-height: 140px;
`;

export const ButtonWrapper = styled.div`
  max-width: 160px;
  width: 100%;
  color: white;
`;
