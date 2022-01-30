import styled from 'styled-components/macro';
import * as Eyes from './Eyes';
import * as Mouth from './Mouth';

const FaceContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: transparent;
  transform: translateZ(calc(var(--cube-depth) * 0.5));
`;

export default function withFace(EyeComponent) {
  return function Eyes(MouthComponent) {
    return function Mouth(props) {
      return (
        <FaceContainer {...props}>
          <EyeComponent {...props} />
          <MouthComponent {...props} />
        </FaceContainer>
      );
    };
  };
}

export const Normal = withFace(Eyes.Normal)(Mouth.Closed);
export const Shocked = withFace(Eyes.Wide)(Mouth.Shocked);
export const Smiling = withFace(Eyes.Normal)(Mouth.Smile);
export const Frowning = withFace(Eyes.Normal)(Mouth.Frown);
export const Shifty = withFace(Eyes.Shifty)(Mouth.Closed);
export const Shifty2 = withFace(Eyes.Shifty2)(Mouth.Closed);
export const ShiftySmirking = withFace(Eyes.Shifty)(Mouth.Smirk);
export const Talking = withFace(Eyes.Normal)(Mouth.Talk);
export const Smirking = withFace(Eyes.Normal)(Mouth.Smirk);
export const ShiftyTalking = withFace(Eyes.Shifty)(Mouth.Talk);
export const Sleeping = withFace(Eyes.Closed)(Mouth.Closed);
export const HalfBaked = withFace(Eyes.Baked)(Mouth.Smirk);
export const Slow = withFace(Eyes.Normal)(Mouth.Slow);
