import styled from 'styled-components';
import Side from '../Creature/Side';

export default function Front() {
  return (
    <Face>
      <Eyes>
        <Eye>
          <Cornea>
            <Pupil />
          </Cornea>
        </Eye>
        <Eye>
          <Cornea>
            <Pupil />
          </Cornea>
        </Eye>
      </Eyes>
      <Mouth />
    </Face>
  );
}

const Face = styled(Side).attrs({
  'data-face': true,
})`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Eyes = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

const Eye = styled.div`
  width: calc(var(--width) / 4);
  height: var(--height);
  background: white;
  box-shadow: 0 0 0 1px black;
  border-radius: 24px 24px 8px 8px;
  padding: 15%;
  max-height: 40px;
  max-width: 200px;
  min-width: 40px;
  display: grid;
  place-content: center;
  position: relative;

  transition: all 0.2s linear;
  overflow: hidden;
`;

const Cornea = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: hsl(210, 65%, 65%);
  clip-path: circle(25% at 50% 50%);
  transform: translate(var(--eyeX), var(--eyeY));
  transition: transform 0.2s linear;
`;

const Pupil = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: black;
  clip-path: circle(12.5% at 50% 50%);
`;

const Mouth = styled.div`
  max-width: 40%;
  width: 100%;
  height: 8%;
  border-radius: 6px 6px 24px 24px;
  background: #222;
  animation: goofySmile 4s linear 2s both;
`;
