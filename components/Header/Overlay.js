import { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/macro';

/**
 *
 * * Overlay
 *
 */

export function Overlay() {
  const context = useContext(ThemeContext);
  const { isOpen } = context;
  return (
    <OverlayWrapper
      style={{
        '--visibility': isOpen ? 'visible' : 'hidden',
        '--blur': isOpen ? 'blur(8px)' : 'blur(0px)',
        '--background': isOpen ? 'hsla(220deg, 35%, 10%, 0.8)' : 'transparent',
        '--zIndex': isOpen ? '2' : '0',
      }}
    />
  );
}

const OverlayWrapper = styled.aside`
  position: fixed;
  z-index: var(--zIndex);
  left: 0;
  top: 0;

  height: 100%;
  width: 100%;

  visibility: var(--visibility);
  overflow: hidden;

  backdrop-filter: var(--blur);
  background: var(--background);

  transition: all 500ms linear;
`;
