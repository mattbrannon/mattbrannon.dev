import styled from 'styled-components';
import Link from 'next/link';
import { toHeadingId } from '@utils/helpers.js';
import { useHasMounted } from '@hooks/useHasMounted';

export const TableOfContents = ({ headings }) => {
  const hasMounted = useHasMounted();

  if (hasMounted) {
    return (
      <Aside>
        <Nav>
          {headings?.map((heading, i) => {
            const [level, ...rest] = heading.split(' ');
            const text = rest.join(' ');
            const href = toHeadingId(text);
            return (
              <Anchor href={'#' + href} key={i} level={level.length}>
                {text}
              </Anchor>
            );
          })}
        </Nav>
      </Aside>
    );
  }
  return null;
};

const Aside = styled.aside`
  position: sticky;
  /* width: 100px; */
  /* height: 100vh; */
  top: 200px;
  right: 32px;
  bottom: 0;

  font-size: 14px;
  white-space: nowrap;
  isolation: isolate;
  z-index: 100;
`;

const Wrapper = styled.div`
  position: relative;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Anchor = styled(Link).attrs(({ level }) => {
  const margin =
    level === 2 ? '0 0 0 0' : level === 3 ? '0 0 0 16px' : level === 4 ? '0 0 0 32px' : 'revert';

  return {
    style: {
      '--margin': margin,
    },
  };
})`
  margin: var(--margin);
  display: block;
`;
