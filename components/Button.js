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
    box-shadow: 0 0 0 1px var(--pink);
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
  box-shadow: 0 0 0 1px var(--darkPink);
  background: var(--pink);

  &:hover {
    background: var(--medLightPink);
  }
  &:focus,
  &:active {
    background: var(--lightPink);
  }
`;
