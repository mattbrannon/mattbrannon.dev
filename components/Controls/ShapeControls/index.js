import { forwardRef, useState, useEffect } from 'react';
import { Color, Range } from './Input';
import { Layout, Group, SectionHeading, ButtonGroup } from './Layout';
import { ShapeSelect } from './ShapeSelect';
import { useWindowSize } from '@hooks/useWindowSize';
import { button } from '@components/Button';

export const ShapeControls = forwardRef(Controls);

function Controls({ ...props }, ref) {
  const [maxX, setMaxX] = useState(0);
  const [maxY, setMaxY] = useState(0);
  const windowSize = useWindowSize();

  console.log(props);

  useEffect(() => {
    const cubeWidth = props.state.cubeWidth;
    const cubeHeight = props.state.cubeHeight;

    const maxX = windowSize.width / 2 - cubeWidth / 2 - props.controlWidth / 2;
    const maxY = windowSize.height / 2 - cubeHeight / 2 - 123;

    setMaxX(Math.abs(maxX));
    setMaxY(Math.abs(maxY));
  }, [props.state.cubeWidth, props.state.cubeHeight, windowSize, props.controlWidth]);

  useEffect(() => {
    if (ref && ref.current) {
      const controlWidth = ref.current.getBoundingClientRect().width;
      props.setControlWidth(controlWidth);
      // setControlWidth(controlWidth);
    }
  }, [props, ref]);

  return (
    <Layout ref={ref}>
      <Group>
        <SectionHeading>Shape</SectionHeading>
        <ShapeSelect {...props} />
      </Group>

      {props.state.shape === 'Sphere' && (
        <Group>
          <SectionHeading>Sides</SectionHeading>
          <Range {...props} name="shape sides" min={1} max={props.state.max || 15} />
        </Group>
      )}

      <Group>
        <SectionHeading>Rotate</SectionHeading>
        <Range {...props} name="shape rotate x axis" min={-180} max={180} />
        <Range {...props} name="shape rotate y axis" min={-180} max={180} />
        <Range {...props} name="shape rotate z axis" main={-180} max={180} />
      </Group>

      <Group>
        <SectionHeading>Position</SectionHeading>
        <Range {...props} name="shape translate x axis" min={Math.round(maxX * -1)} max={maxX} />
        <Range {...props} name="shape translate y axis" min={Math.round(maxY * -1)} max={maxY} />
        <Range {...props} name="shape translate z axis" min={-100} />
      </Group>

      {props.state.shape === 'Cube' && (
        <Group>
          <SectionHeading>Dimensions</SectionHeading>
          <Range name="shape cube width" min={150} max={300} {...props} />
          <Range name="shape cube height" min={150} max={300} {...props} />
          <Range name="shape cube depth" min={20} max={100} {...props} />
        </Group>
      )}

      <Group>
        <SectionHeading>Transition</SectionHeading>
        <Range name="shape speed" reverse min={0} max={10} {...props} />
      </Group>

      <Group>
        <SectionHeading>Color</SectionHeading>
        {props.state.shape === 'Cube' && (
          <>
            <Color name="shape cube main" {...props} />
            <Color name="shape cube hair" {...props} />
            <Color name="shape cube eyes" {...props} />
            <Range max={1} step={0.01} name="shape cube opacity" {...props} />
          </>
        )}

        {props.state.shape === 'Sphere' && (
          <>
            <Color name="shape sphere outer" {...props} />
          </>
        )}
      </Group>
      <ButtonGroup>
        <button.teal onClick={() => props.dispatch({ type: 'RESET' })}>reset</button.teal>
      </ButtonGroup>
    </Layout>
  );
}
