import styled from 'styled-components';

import { spaceToCamelCase as toCamelCase, toSnakeUpperCase } from '@utils/helpers';

const createLabel = (name) => {
  const removeText = [ 'update', 'cube', 'shadow', 'translate', 'rotate', 'text stroke' ];

  let label = name;
  removeText.forEach((str) => {
    label = label.replace(str, '');
  });
  return label;
};

export default function RangeSlider({ ...props }) {
  const { name, state, dispatch } = props;

  // const replaceText = [ 'translate', 'rotate' ];
  // const removeText = [ 'update', 'cube', 'shadow', 'translate', 'rotate' ];

  // let label = name;
  // for (let i = 0; i < removeText.length; i++) {
  //   if (label.includes(removeText[i])) {
  //     label = label.replace(removeText[i], '');
  //   }
  // }

  const label = createLabel(name);

  // let label = name;
  // removeText.forEach((str) => {
  //   label = label.replace(str, '');
  // });

  // const label = replaceText.includes(props.name)
  //   ? props.name.replace(/(translate|rotate) ([XYZ]$)/g, '$2 axis')
  //   : removeText.includes(props.name)
  //   ? props.name.replace(/update|cube|shadow/g, '')
  //   : props.name;

  // const thing = props.name.replace(/update|cube|(translate|rotate) ([XYZ]$)/g, '$2 axis');

  const key = toCamelCase(name);

  const dispatchAction = (e) => {
    const type = name
      .split(' ')
      .map((v) => v.toUpperCase())
      .join('_');

    const value = e.target.value;
    console.log({ type, value });
    return dispatch({ type, value });
  };

  return (
    <Slider>
      <Label htmlFor={name}>{label}:</Label>
      <Input
        onChange={dispatchAction}
        type={props.type || 'range'}
        id={name}
        value={state[key]}
        {...props}
      />
    </Slider>
  );
}

export const CustomInput = ({ ...props }) => {
  const { name, state, dispatch, type } = props;
  // const label = props.name.replace(/update|cube /g, '');
  const key = toCamelCase(name);

  const label = createLabel(name);

  const dispatchAction = (e) => {
    const type = toSnakeUpperCase(name);
    const value = e.target.value;

    console.log({ type, value });
    return dispatch({ type, value });
  };

  // console.log(state, key);

  return (
    <Wrapper>
      <Label {...props}>{label}:</Label>
      <Input
        onChange={dispatchAction}
        // type={props.type || 'range'}
        id={name}
        value={state[key]}
        {...props}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const Label = styled.label`
  font-size: 14px;
  margin-right: auto;
  flex: 1;
`;
const Slider = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Input = styled.input.attrs((props) => {
  const maxWidth = props.type === 'number' || props.type === 'color' ? 50 : 100;
  return {
    style: {
      '--maxWidth': maxWidth + 'px',
    },
  };
})`
  display: block;
  max-width: var(--maxWidth);
  min-width: 0;

  justify-self: flex-start;

  direction: ${(p) => (p.reverse ? 'rtl' : undefined)};
`;

const Color = styled(Input)`
  min-width: 0;
`;
