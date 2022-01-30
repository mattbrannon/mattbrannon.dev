import Link from 'next/link';
import styled from 'styled-components';

export default function PageButtons({ prev, next }) {
  return (
    <BottomRow>
      <PageButtonsWrapper>
        <PageButton href={prev}>Previous</PageButton>
        <PageButton href={next}>Next</PageButton>
      </PageButtonsWrapper>
    </BottomRow>
  );
}

export const PageButton = ({ href, children }) => {
  return (
    <Link passHref href={href}>
      <LinkContent>{children}</LinkContent>
    </Link>
  );
};

const BottomRow = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  ${'' /* margin-bottom: 48px; */}

  margin: 32px 0 64px 0;
  @media (min-width: 480px) {
    margin-top: 64px;
  }
`;

const PageButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
`;

const LinkContent = styled.button`
  padding: 8px 12px;
  font-size: var(--size20);
  font-weight: 800;
  letter-spacing: 0.03em;

  background: transparent;
  color: var(--pinkShadow);

  border-radius: 6px;
  border: none;

  &:hover {
    cursor: pointer;
    color: #a7005a;
    text-decoration: underline;
  }

  @media (prefers-color-scheme: dark) {
    color: var(--orange2);
    transition: color 198ms ease-out;

    &:hover {
      color: var(--yellow);
    }
  }
`;
