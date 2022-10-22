import styled from 'styled-components';

const Space = ({ direction, size }) => {
  return (
    <span
      style={{
        display: 'block',
        width: direction === 'block' ? 1 + 'px' : size + 'px',
        height: direction === 'inline' ? 1 + 'px' : size + 'px',
        minWidth: direction === 'block' ? 1 + 'px' : size + 'px',
        minHeight: direction === 'inline' ? 1 + 'px' : size + 'px',
      }}
    />
  );
};

function getHeight({ axis, size }) {
  return axis === 'horizontal' ? 1 : size;
}
function getWidth({ axis, size }) {
  return axis === 'vertical' ? 1 : size;
}

export const Spacer = styled.span`
  display: block;
  width: ${getWidth}px;
  min-width: ${getWidth}px;
  height: ${getHeight}px;
  min-height: ${getHeight}px;
`;

export const HeaderGap = styled.div`
  height: var(--header-height);
`;

export const Gap = styled(Spacer).attrs({ axis: 'vertical' })``;

export default Spacer;

export const spacer = {
  block: ({ size }) => <Space direction="block" size={size} />,
  inline: ({ size }) => <Space direction="inline" size={size} />,
};
