import styled from 'styled-components/macro';

export default function Button({ children, ...props }) {
  return (
    <Wrapper {...props}>
      <InnerButton {...props}>{children}</InnerButton>
    </Wrapper>
  );
}

// outer_radius = inner_radius + gap_between_elements / 2;
const Wrapper = styled.button`
  --background: var(--pink-main);
  --hover: var(--pink3);
  --focus: var(--pink4);
  --shadow: var(--pink0);

  padding: 3px 3px;
  border-radius: 10px;
  border: none;
  min-width: 140px;

  font-family: system-ui;
  color: white;
  background: transparent;
  outline: none;
  text-shadow: 1px 1px 2px black;

  &:focus,
  &:active {
    box-shadow: 0 0 0 1px var(--background);
    background: white;
  }
  &:hover {
    cursor: pointer;
  }
`;

const InnerButton = styled.span`
  display: block;
  padding: 12px 24px;
  font-size: ${21 / 16}rem;
  font-weight: 700;
  border-radius: 8px;
  border: none;
  box-shadow: 0 0 0 1px var(--shadow);
  background: var(--background);

  &:hover {
    background: var(--hover);
  }
  &:focus,
  &:active {
    background: var(--focus);
  }
`;
