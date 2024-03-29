import { lookAround } from '@animations/index.js';
import styled from 'styled-components';

export default function Eye({ ...props }) {
  return (
    <EyeSocket {...props}>
      <Eyeball {...props}>
        <Cornea {...props}>
          <Pupil {...props} />
        </Cornea>
        <Eyelid {...props} />
      </Eyeball>
    </EyeSocket>
  );
}

const EyeSocket = styled.div.attrs((props) => {
  const unit = 16;
  const double = unit * 2;
  const half = unit / 2;
  const borderRadius = `${double}px ${double}px ${half}px ${half}px`;
  // const r = props.ratio * 2;
  const padding = 'calc(((var(--cube-width) / 6) + (var(--cube-height) / 6)) / 2)';
  const { eyeWhiteColor, eyeColor, eyelidTop, eyelidColor } = props;
  return {
    style: {
      '--borderRadius': borderRadius,
      '--padding': padding,
      '--eyeWhiteColor': eyeWhiteColor || 'whitesmoke',
      '--eyeColor': eyeColor || '#8cbecf',
      '--eyelidTop': `${eyelidTop}%`,
      '--eyelidColor': eyelidColor || 'tan',
    },
  };
})`
  --animation: ${(p) => p.animation};
`;

/* margin-bottom: var(--eye-margin); */

/* --unit: 16px;
  --double: calc(var(--unit) * 2);
  --half: calc(var(--unit) * 0.5);
  --more: calc(var(--unit) * 1.5);
  --borderRadius: var(--double) var(--double) var(--half) var(--half);
  --padding: calc(((var(--cube-width) / 6) + (var(--cube-height) / 6)) / 2);

  --eyeWhiteColor: ${(p) => p.eyeWhiteColor || 'whitesmoke'};
  --eyeColor: ${(p) => p.eyeColor};
  --eyelidMargin: ${(p) => p.eyelidMargin}%;
  --animation: ${(p) => p.animation};
  --eyelidColor: ${(p) => p.eyelidColor || 'tan'}; */

const Eyeball = styled.div`
  padding: 3.2rem;
  box-shadow: 0 0 0 1px black;
  overflow: hidden;
  isolation: isolate;
  justify-self: center;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: var(--borderRadius);
  padding: var(--padding, 16px);
  background: var(--eyeWhiteColor);
  position: relative;

  transition: all var(--speed) linear;
`;

// const RedEye = styled(Eyeball)`
//   background: hsl(0deg, 15%, 75%, 1);
// `;

export const Cornea = styled(Eyeball)`
  background: var(--eyeColor);
  position: absolute;
  margin: auto;
  border-radius: 50%;
  padding: 10%;
  max-height: 40%;
  max-width: 40%;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1 / 1;
  animation: var(--animation) 30000ms ease-in 4000ms infinite alternate;
`;

export const Pupil = styled(Cornea)`
  background: black;
  height: 40%;
  width: 40%;
  transition: all 10s linear;
  animation: none;
`;

export const Eyelid = styled(Eyeball)`
  background: var(--eyelidColor);
  z-index: 999;
  position: absolute;
  top: var(--eyelidTop);
  width: 200%;
  height: 200%;
  transition: top 70ms linear;
`;

function withEye(variants) {
  return function Eyeball(props) {
    return <Eye {...variants} {...props} />;
  };
}

export const RedEye = withEye({
  eyeWhiteColor: 'hsl(0deg, 15%, 85%, 1)',
  eyeColor: '#8cbecf',
  margin: -50,
  animation: lookAround,
});

export const BigEye = withEye({
  padding: '20%',
});

export const NormalEye = withEye({});
