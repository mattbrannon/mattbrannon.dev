// import ControlsLayout, { Group, Heading } from './Layout';
// import RangeSlider from './RangeSlider';
import { useRef, forwardRef, useState } from 'react';
import Select from '@components/Select';
import { Range as RangeSlider } from './FontControls/Input';
import { Group, Layout, SectionHeading } from './FontControls/Layout';

const composites = [
  'source-over',
  'destination-over',
  'lighter',
  'xor',
  'multiply',
  'screen',
  'overlay',
  'darken',
  'lighten',
  'color-dodge',
  'color-burn',
  'hard-light',
  'soft-light',
  'difference',
  'exclusion',
  'hue',
  'saturation',
  'color',
  'luminosity',
];

const FractalControls = forwardRef(({ ...props }, ref) => {
  const scaleRef = useRef();
  // console.log(props);
  // const [selected, setSelected] = useState('');
  // const [ scaleValue, setScaleValue ] = useState(1);
  // const [ radianValue, setRadianValue ] = useState();

  // console.log(props);

  // const handleRotate = (e) => {
  //   // const maxRadians = Math.PI * 2;
  //   // const maxScale = 1;
  //   const scale = (1 / (Math.PI * 2)) * e.target.value;
  //   // console.log({ scale, radians: e.target.value });
  //   props.dispatch({ type: 'RADIANS', value: e.target.value });
  //   props.dispatch({ type: 'SCALE', value: scale });
  // };

  const handleCompositeChange = (e) => {
    // setSelected(e.target.value);
    props.dispatch({ type: 'COMPOSITE', value: e.target.value });
  };

  // const handleSizeAndDepth = (e) => {
  //   let maxSize = 144;
  //   let maxDepth = 12;
  //   const step = maxSize / maxDepth;

  //   if (e.target.name === 'size') {
  //     props.dispatch({ type: 'SIZE', value: e.target.value });
  //     if (e.target.value % step === 0) {
  //       props.dispatch({ type: 'MAX_DEPTH', value: e.target.value / step });
  //     }
  //   }
  //   if (e.target.name === 'max depth') {
  //     props.dispatch({ type: 'MAX_DEPTH', value: e.target.value });
  //     props.dispatch({ type: 'SIZE', value: e.target.value * step });
  //   }
  // };

  return (
    <Layout ref={ref}>
      <Group>
        <SectionHeading>Fractal Settings</SectionHeading>

        <Select value={props.state.composite} onChange={handleCompositeChange}>
          {composites.map((composite, i) => (
            <Option key={i} value={composite}>
              {composite}
            </Option>
          ))}
        </Select>

        <RangeSlider name="fractal x axis" min={0} max={1000} {...props} />
        <RangeSlider name="fractal y axis" min={0} max={1000} {...props} />

        {/* <RangeSlider name="fractal limit" min={10} max={30} {...props} /> */}
        <RangeSlider name="fractal size" min={1} max={144} {...props} />
        <RangeSlider name="fractal sides" min={1} max={8} {...props} />
        {/* <RangeSlider name="fractal branches" min={1} max={2} {...props} /> */}
        <RangeSlider name="fractal max depth" min={1} max={12} {...props} />

        {/* <RangeSlider name="fractal angle" min={45} max={315} step={1} {...props} /> */}
        <RangeSlider
          ref={scaleRef}
          name="fractal scale"
          min={-0.9}
          max={0.9}
          step={0.01}
          {...props}
        />
        <RangeSlider
          name="fractal radians"
          min={Math.PI * -2}
          max={Math.PI * 2}
          step={0.01}
          {...props}
        />
        <RangeSlider name="fractal line width" min={0.01} max={30} step={0.01} {...props} />
      </Group>
      {/* <Group>
        <CustomInput type="color" name="shadow color" {...props} />
        <RangeSlider name="shadow offset x" min={-10} max={10} {...props} />
        <RangeSlider name="shadow offset y" min={-10} max={10} {...props} />
        <RangeSlider name="shadow blur" min={0} max={10} {...props} />
      </Group> */}
    </Layout>
  );
});

FractalControls.displayName = 'FractalControls';
export default FractalControls;

const Option = ({ ...props }) => {
  return (
    <option key={props.key} {...props}>
      {props.children}
    </option>
  );
};
