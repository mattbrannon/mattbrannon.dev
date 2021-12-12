import { useFontSize } from '@hooks/useFontSize';
import styled from 'styled-components/macro';
import FancyText from './FancyText';

export default function PageTitle({ children, ...props }) {
  const fontSize = useFontSize(21, 40, 320, 1200);
  if (children.length) {
    const [ highlighted, ...rest ] = children.split(' ');
    return (
      <FluidHeading fontSize={fontSize}>
        <FancyText {...props}>{highlighted}&nbsp;</FancyText>
        {rest.join(' ')}
      </FluidHeading>
    );
  }
  return null;
}

const FluidHeading = styled.h3`
  font-family: Recursive, 'Open Sans', system-ui, sans-serif;
  font-variation-settings: var(--recursive6);
  font-size: ${(p) => p.fontSize || 'var(--size24)}'};
`;
