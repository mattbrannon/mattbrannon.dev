import Select from '@components/Select';
import { useEffect, useState } from 'react';

export const ShapeSelect = ({ ...props }) => {
  // console.log(props);
  const shapes = ['Sphere', 'Cube'];

  // const [selected, setSelected] = useState(props.state.shape);

  // useEffect(() => {
  //   console.log(selected);
  // }, [selected]);

  return (
    <Select
      {...props}
      onChange={(e) => props.dispatch({ type: 'SHAPE_CHANGE', value: e.target.value })}
      value={props.state.shape}
    >
      {shapes.map((shape) => {
        return <Option key={shape}>{shape}</Option>;
      })}
    </Select>
  );
};

const Option = ({ ...props }) => {
  return (
    <option key={props.key} {...props}>
      {props.children}
    </option>
  );
};
