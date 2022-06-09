import styled from 'styled-components';
import { Shape } from './Shape';

export default function Globe({ ...props }) {
  const { state, sides } = props;
  const transforms = getTransform(sides);
  return (
    <Scene {...props}>
      {Array.from({ length: 12 }, (_, i) => {
        const transform = transforms[i];
        return (
          <GlobeSide i={i} transform={transform}>
            <Thing sides={sides} i={i} color={'hsl(20, 75%, 50%, 0.1)'} size={300}>
              <Thing sides={sides} i={i} color={'hsl(80, 75%, 50%, 0.1)'} size={150}>
                <Thing sides={sides} i={i} color={'hsl(140, 75%, 50%, 0.1)'} size={75}></Thing>
              </Thing>
            </Thing>
          </GlobeSide>
        );
      })}
    </Scene>
  );
}

const Thing = styled.div`
  ${(p) => console.log('thing sides', p.sides, p.i)};
  height: ${(p) => p.size}px;
  width: ${(p) => p.size}px;
  box-shadow: 0 0 0 1px ${(p) => p.color};
  border-radius: 50%;
  display: grid;
  place-content: center;
  background: ${(p) => (p.i <= p.sides ? p.color : 'transparent')};
  box-shadow: 0 0 0 2px black;
  transition: all 5s linear;
`;

export const getTransform = (currentSides) => {
  return Array.from({ length: currentSides }, (_, i) => {
    const angle = (360 / currentSides / 2) * i;
    const rotateX = i % 2 === 0 ? angle : 0;
    const rotateY = i % 2 === 1 ? angle : 0;
    const transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    return { rotateX, rotateY, transform, angle };
  });
};

const Scene = styled(Shape)`
  /* transform: rotateX(24deg) rotateY(32deg) rotateZ(0deg); */

  perspective: var(--perspective);
  transform: translateX(var(--translateX)) translateY(var(--translateY)) rotateX(var(--rotateX))
    rotateY(var(--rotateY)) rotateZ(var(--rotateZ)) translateZ(var(--translateZ));

  transform-style: preserve-3d;

  width: var(--cube-width);
  height: var(--cube-height);

  transition: all var(--speed) linear;
`;

const GlobeSide = styled.div.attrs((props) => {
  const delay = (props.i + 1) * 100;
  const transform = props.transform;
  // const background = transform ? 'rgb(0, 0, 255, 0.2)' : 'rgb(0, 0, 255, 0)';
  return {
    style: {
      '--delay': delay + 'ms',
      '--transform': transform?.transform,
      // '--background': background,
    },
  };
})`
  transform: var(--transform);
  position: absolute;
  /* background: var(--background); */
  height: var(--cube-height);
  width: var(--cube-width);
  /* opacity: var(--opacity); */
  /* transition-delay: ; */
  border-radius: 50%;
  /* box-shadow: 0 0 0 2px black; */
  transform-style: preserve-3d;
  color: white;
  display: grid;
  place-content: center;
  transition: all 5s linear;
`;
