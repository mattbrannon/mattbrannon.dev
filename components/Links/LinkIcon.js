import styled from 'styled-components';
import { forwardRef, memo } from 'react';
import { InternalLink } from './InternalLink';
import Link from 'next/link';

function Icon(props, ref) {
  return (
    <Anchor replace ref={ref} {...props}>
      <Svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <BottomLink d="M44.45 252.59l37.11-37.1c9.84-9.84 26.78-3.3 27.29 10.6a184.45 184.45 0 0 0 9.69 52.72 16.08 16.08 0 0 1-3.78 16.61l-13.09 13.09c-28 28-28.9 73.66-1.15 102a72.07 72.07 0 0 0 102.32.51L270 343.79A72 72 0 0 0 270 242a75.64 75.64 0 0 0-10.34-8.57 16 16 0 0 1-6.95-12.6A39.86 39.86 0 0 1 264.45 191l21.06-21a16.06 16.06 0 0 1 20.58-1.74A152.05 152.05 0 0 1 327 400l-.36.37-67.2 67.2c-59.27 59.27-155.7 59.26-215 0s-59.26-155.72.01-214.98z" />
        <TopLink d="M410.33 203.49c28-28 28.9-73.66 1.15-102a72.07 72.07 0 0 0-102.32-.49L242 168.21A72 72 0 0 0 242 270a75.64 75.64 0 0 0 10.34 8.57 16 16 0 0 1 6.94 12.6A39.81 39.81 0 0 1 247.55 321l-21.06 21.05a16.07 16.07 0 0 1-20.58 1.74A152.05 152.05 0 0 1 185 112l.36-.37 67.2-67.2c59.27-59.27 155.7-59.26 215 0s59.27 155.7 0 215l-37.11 37.1c-9.84 9.84-26.78 3.3-27.29-10.6a184.45 184.45 0 0 0-9.69-52.72 16.08 16.08 0 0 1 3.78-16.61z" />
      </Svg>
    </Anchor>
  );
}

export const LinkIcon = memo(forwardRef(Icon));

// LinkIcon.displayName = 'LinkIcon';

// export default LinkIcon;

const Svg = styled.svg`
  /* position: absolute; */

  border-radius: 1px;
  outline-offset: 4px;
  outline: ${(p) => (p.isFocused ? '2px solid var(--color-outline)' : 'none')};
  opacity: ${(p) => (p.isHovering || p.isFocused ? 1 : 0)};
  &:focus,
  &:focus-visible,
  &:focus-within {
    outline: 2px solid var(--color-outline);
    opacity: 1;
  }
  &:hover {
    opacity: 1;
  }

  /* opacity: 0; */
  transition: opacity 0.2s ease;

  /* transform: translateX(-24px); */
`;

const BottomLink = styled.path`
  fill: var(--color-link-icon-bottom);
`;

const TopLink = styled.path`
  fill: var(--color-link-icon-top);
`;

const Anchor = styled.a`
  /* position: absolute; */
  width: 24px;
  height: 100%;
  /* top: 50%; */
  left: 0;
  right: 0;
  bottom: 0;

  /* transform: translate(150%, -50%); */
  /* transform: translate(-32px, -50%); */
  display: flex;
  flex-direction: column;
  justify-content: center;
  outline: none;
`;
