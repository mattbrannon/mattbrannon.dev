import styled from '@styled-components';
import Link from 'next/link';

export default function StaticButton({ children }) {
  const href = children.toLowerCase() === 'view my work' ? '/apps' : '/contact';
  return (
    <Link passHref href={href}>
      <ButtonWrapper>
        <Button>{children}</Button>
      </ButtonWrapper>
    </Link>
  );
}

export const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  background: var(--tealBg);
  border-radius: 6px;
  padding: 12px 0;

  @media (max-width: 300px) {
    width: 100%;
    grid-template-columns: unset;
  }
`;

export const Button = styled.button`
  background: var(--tealBg);
  color: white;
  font-size: clamp(var(--size16), 1vw + 0.6rem, var(--size21));
  font-family: 'Open Sans';
  font-variation-settings: 'wdth' 85, 'wght' 655;
  text-shadow: 0.05em 0.05em 0.1em black;
  border: none;
  height: 100%;
  background: var(--tealBg);
  transition: all 0.2s linear;
  border-radius: 6px;
`;
