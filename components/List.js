import styled from 'styled-components';

export default function List({ children, title }) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <strong>{title}</strong>
      <Ul>{children}</Ul>
    </div>
  );
}

const Ul = styled.ul`
  padding: revert;
`;
