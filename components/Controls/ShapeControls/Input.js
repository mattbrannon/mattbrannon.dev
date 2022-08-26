import styled from 'styled-components';

const getPropName = ({ name }) => {
  const propName = name
    .split(' ')
    .slice(1)
    .map((word, i) => {
      return i > 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word;
    })
    .join('');

  return propName;
};

const Label = ({ children }) => {
  const tempName = children.split(' ').slice(1).join(' ');
  const name = tempName.length ? tempName : children;

  return <LabelWrapper>{name}</LabelWrapper>;
};

const LabelWrapper = styled.label`
  font-size: 14px;
  /* margin-right: auto; */
  padding: 12px 0;
  white-space: nowrap;
  display: block;
  margin-right: 24px;
  /* margin-right: auto; */
`;

// function withInputType(type) {
//   return function InputType({ ...props }) {
//     return <Input type={type} {...props} />;
//   };
// }

// export const Range = withInputType('range');
// export const Color = withInputType('color');

// function withInputType(Input) {
//   return function InputComponent({ ...props }) {
//     return <Input {...props} />;
//   };
// }

const getValueFromProps = (props) => {
  let value;
  try {
    const propName = getPropName(props);
    value = props?.state?.[propName];
  }
  catch {
    value = props.value?.toString() ?? props.defaultValue?.toString();
  }

  return value;
};

const getLabelFromProps = (props) => {
  const parts = props.name.split(' ');
  const label = parts.length > 1 ? parts.slice(1).join(' ') : props.name;
  return label;
};

function withInputType(type) {
  return function withInput(Input) {
    return function Component({ ...props }) {
      const value = getValueFromProps(props);
      const label = getLabelFromProps(props);
      const direction = props.reverse && 'rtl';

      return (
        <>
          <Wrapper>
            <Label>{label}</Label>
            <InnerWrapper>
              <ValueDisplay>{value}</ValueDisplay>
              <Input direction={direction} value={value} type={type} {...props} />
            </InnerWrapper>
          </Wrapper>
        </>
      );
    };
  };
}

// const Input = ({ ...props }) => {
//   const value = props.value?.toString() ?? props.defaultValue?.toString();
//   return (
//     <>
//       <Wrapper>
//         <Label>{props.name}</Label>
//         <ValueDisplay>{value}</ValueDisplay>
//         <InputComponent {...props} />
//       </Wrapper>
//     </>
//   );
// };

const Input = styled.input.attrs((props) => {
  return {
    style: {
      '--direction': props.direction,
    },
  };
})`
  display: block;
  border: none;
  margin: 0;
  width: 100%;
  background: none;
  direction: var(--direction);
`;

const FullHeightInput = styled(Input)`
  height: 100%;
`;

export const Range = withInputType('range')(Input);
export const Color = withInputType('color')(FullHeightInput);

// const RangeSlider = withInputType(InputComponent);
// const ColorPicker = withInputType(FullHeightInput);

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr 100px;
  grid-template-columns: auto auto;
  gap: 12px;
  align-items: baseline;
`;

const InnerWrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: auto 100px;
  align-items: center;
`;

const ValueDisplay = styled.span`
  display: block;
  font-size: 14px;
  font-family: Recursive;
  font-variation-settings: 'MONO' 1, 'CASL' 0, 'CRSV' 0;
  margin-left: auto;
  margin-right: 24px;
`;
