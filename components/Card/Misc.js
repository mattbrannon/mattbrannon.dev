import styled from 'styled-components';
import Link from 'next/link';
import { CardHeading } from '@components/Headings';

export const ToolsCard = ({ title, href, children }) => {
  return (
    <Card>
      <Link href={href}>
        <CardHeading>{title}</CardHeading>
        <Description>{children}</Description>
      </Link>
    </Card>
  );
};

const Card = styled.article`
  border: 1px solid black;
  border-radius: 6px;
  padding: 0 16px 16px 16px;
  background: var(--basic-card-background);

  min-height: 160px;
`;

const Description = styled.p`
  color: var(--color-text);
  font-family: OpenSans;
  font-variation-settings: 'wdth' 75, 'wght' 555;
  color: var(--color-text);
  margin-top: 0;
`;
