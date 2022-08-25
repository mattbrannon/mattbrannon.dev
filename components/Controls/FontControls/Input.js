import styled from 'styled-components';

const Label = ({ children }) => {
  const tempName = children.split(' ').slice(1).join(' ');
  const name = tempName.length ? tempName : children;

  return <LabelWrapper>{name}</LabelWrapper>;
};

const LabelWrapper = styled.label`
  font-size: 14px;
  padding: 8px 0;
  white-space: nowrap;
  display: block;
`;

function withInputType(type) {
  return function withInput(Input) {
    return function Component({ ...props }) {
      const value = props.value?.toString() ?? props.defaultValue?.toString();

      return (
        <>
          <Wrapper>
            <Label>{props.name}</Label>
            <ValueDisplay>{value}</ValueDisplay>
            <Input type={type} {...props} />
          </Wrapper>
        </>
      );
    };
  };
}

const InputComponent = styled.input`
  display: block;
  border: none;
  margin: 0;
  width: 100%;
  background: none;
`;

const FullHeightInput = styled(InputComponent)`
  height: 100%;
`;

export const Range = withInputType('range')(InputComponent);
export const Color = withInputType('color')(FullHeightInput);
export const Checkbox = withInputType('checkbox')(InputComponent);

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 100px;
  align-items: center;
`;

const ValueDisplay = styled.span`
  display: block;
  font-size: 14px;
  font-family: Recursive;
  font-variation-settings: 'MONO' 1, 'CASL' 0, 'CRSV' 0;
  margin-left: auto;
  margin-right: 32px;
`;
