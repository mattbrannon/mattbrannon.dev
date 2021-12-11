import styled from 'styled-components/macro';
import FancyText from './FancyText';

export default function PageTitle({ children, ...props }) {
  if (children.length) {
    const [ highlighted, ...rest ] = children.split(' ');
    return (
      <FluidHeading>
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
  font-size: clamp(var(--size32), 1.5vw + 1rem, var(--size40));
`;
