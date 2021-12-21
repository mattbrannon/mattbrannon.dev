import { forwardRef } from 'react';
import styled from 'styled-components/macro';
import Face from './Face';
import Side from './Side';
import { getSvgPath } from './utils';

const CubeMan = forwardRef((props, ref) => {
  const { pathA, pathB } = getSvgPath();
  const depth = 50;

  return (
    <Cube ref={ref} depth={depth}>
      {Array.from({ length: 7 }).map((side, i) => {
        const path = i % 2 === 0 ? pathA : pathB;
        return i === 4 || i === 5 ? (
          <Side key={i} index={i + 1} />
        ) : i === 6 ? (
          <Face key={i} depth={depth} />
        ) : (
          <Svg key={i} d={path} index={i} />
        );
      })}
    </Cube>
  );
});

CubeMan.displayName = 'CubeMan';

export default CubeMan;

export const Cube = styled.div`
  --cube-width: 150px;
  --cube-height: 150px;
  --depth: ${(p) => p.depth}px;

  width: var(--cube-width);
  height: var(--cube-height);

  transform: translateX(-102%) rotateX(-4deg) rotateY(12deg);
  ${'' /* animation: ${showDude} 1500ms cubic-bezier(0.17, 0.88, 0.32, 1.27) forwards 2500ms,
  ${disappear} 1000ms linear forwards 5000ms; */}
  ${'' /* ${turnDude} 12000ms ease 4200ms forwards infinite alternate; */}
  transform-style: preserve-3d;

  margin-bottom: clamp(-120px, 5vw, 0);
`;

const SvgWrapper = styled(Side).attrs(() => {
  return {
    as: 'svg',
    width: '150',
    height: '150',
    xmlns: 'http://www.w3.org/2000/svg',
    version: '1.1',
  };
})``;

const Svg = ({ index, d, children }) => {
  return (
    <SvgWrapper key={index} index={index + 1}>
      <rect x="0" y="0" width="150" height="150" fill="#D2B48C"></rect>
      <path d={d} fill="#876543" strokeLinecap="round" strokeLinejoin="miter"></path>
      {children}
    </SvgWrapper>
  );
};
