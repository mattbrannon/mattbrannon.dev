import styled from 'styled-components';

import Link from 'next/link';
import { text } from '@components/Text';
import { CardHeading } from '@components/Headings';

export const BlogCard = ({ post, href }) => {
  return (
    // <li key={post.filePath}>
    <Card key={post.filePath}>
      <Link href={href}>
        <CardHeading>{post.data.title}</CardHeading>
      </Link>
      <text.description>{post.data.description}</text.description>
    </Card>
    // </li>
  );
};

const Card = styled.article`
  border: 1px solid black;
  border-radius: 6px;
  background: #222;
  /* grid-column: 2; */
  width: 100%;
  padding: 0 16px;
  background: var(--basic-card-background);
  font-variation-settings: 'wght' 700;
  min-height: 150px;
  max-width: 540px;
`;

const Description = styled.p`
  font-family: OpenSans;
  font-variation-settings: 'wdth' 75, 'wght' 555;
  color: var(--color-text);
  margin-top: 0;
`;
