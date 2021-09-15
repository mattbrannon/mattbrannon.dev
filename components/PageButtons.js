import styled from 'styled-components/macro';
import Link from 'next/link';

export default function PageButtons({ prev, next }) {
  return (
    <PageButtonsWrapper>
      <PageButton href={prev}>Previous</PageButton>
      <PageButton href={next}>Next</PageButton>
    </PageButtonsWrapper>
  );
}

export const PageButton = ({ href, children }) => {
  return (
    <Link href={href}>
      <LinkContent>{children}</LinkContent>
    </Link>
  );
};

const PageButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
`;

const LinkContent = styled.button`
  padding: 8px 12px;
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: 0.03em;

  background: transparent;
  color: var(--medDarkPink);

  border-radius: 6px;
  border: none;

  &:hover {
    cursor: pointer;
    color: #a7005a;
    text-decoration: underline;
  }

  @media (prefers-color-scheme: dark) {
    color: var(--darkModeLinkColor);

    &:hover {
      color: var(--veryLightPink);
    }
  }
`;
