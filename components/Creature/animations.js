import { keyframes, css } from 'styled-components';
import { createWalkingAnimation } from './utils';

export const walkLeft = keyframes`
  from {
    transform: translateX(200px) rotateY(-65deg);
  }
  to {
    transform: translateX(-200px) rotateY(-65deg)
  }
`;

export const hideAndSeek = keyframes`
  from {
    transform: translate(-200px, 200px)
  }
  to {
    transform: translate(-200px, 110px)
  }
`;

export const walkIntoPage = (props) => {
  const { startX } = props;

  const getSteps = createWalkingAnimation(startX, 0);
  const getRotation = getSteps(20);
  const animation = getRotation(-5, -65);
  const copy = [ ...animation ];
  const re = /(rotateX)\((-?5deg)\)/g;
  const last = copy.pop();
  let rotation;
  if (re.test(last)) {
    let temp = last.match(re).join('');
    rotation = temp.replace(/rotateX\((-?\d+deg)\)/g, '$1');
  }

  const walking = keyframes`
    ${animation}
  `;

  const turning = keyframes`
    from {
      transform: translateX(0) rotateX(${rotation}) rotateY(-65deg);
    }
    to {
      transform: translateX(0) rotateX(${rotation}) rotateY(8deg);
    }
  `;

  return css`
    ${walking} 4s linear both 1s,
    ${turning} 500ms cubic-bezier(0.25, 1.04, 0.56, 1.23) forwards 6s;
  `;
};
