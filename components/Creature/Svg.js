/* eslint-disable react/display-name */
import styled from 'styled-components';
import Side from './Side';
// import { getSvgPath } from './utils';
import getHair from './Hair';
import { useEffect, useState } from 'react';
// import { useEffect, useState } from 'react';
import { Hair150 } from './waves/Hair150';
import { Hair200 } from './waves/Hair200';
import { Hair250 } from './waves/Hair250';
import { Hair300 } from './waves/Hair300';
import { Hair1200 } from './waves/Hair1200';

const SvgWrapper = styled(Side)`
  outline: var(--outline);
  box-shadow: var(--boxShadow);
  transition: none;
`;

const Svg = ({ ...props }) => {
  const { width, height } = props.size || 150;
  const Hair =
    height <= 150 && width <= 150
      ? getHair('small')
      : height < 200 && width < 200
      ? getHair('medium')
      : height < 250 && width < 250
      ? getHair('large')
      : height <= 300 && width <= 300
      ? getHair('huge')
      : getHair();

  useEffect(() => {
    console.log({ size: props.size });
  }, [ props ]);

  return (
    <SvgWrapper as={'svg'} {...props}>
      <rect x="0" y="0" width={1200} height={1200} fill="#D2B48C"></rect>
      <Hair />
    </SvgWrapper>
  );
};

// const width = props.size.width;
// const height = props.size.height;

export default Svg;

// function withHair(Hair) {
//   return function (props) {
//     return (
//       <Svg {...props}>
//         <Hair {...props} />
//       </Svg>
//     );
//   };
// }

// export const SmallHair = withHair(Hair150);
// export const MediumHair = withHair(Hair200);
// export const LargeHair = withHair(Hair250);
// export const HugeHair = withHair(Hair300);
// export const DumbHair = withHair(Hair1200);

// export default function Hair({ ...props }) {
//   return (
//     <SvgWrapper {...props} as="svg">
//       <rect x="0" y="0" width="150" height="120" fill="#D2B48C"></rect>
//       <Hair150 />
//     </SvgWrapper>
//   );
// }

// export default Svg;

// const Hair =
//   height <= 150 && width <= 150
//     ? getHair('small')
//     : height < 200 && width < 200
//     ? getHair('medium')
//     : height < 250 && width < 250
//     ? getHair('large')
//     : height <= 300 && width <= 300
//     ? getHair('huge')
//     : getHair();
