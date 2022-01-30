import small from './waves/Hair150';
import medium from './waves/Hair200';
import large from './waves/Hair250';
import huge from './waves/Hair300';
import hair from './waves/Hair1200';
// import { Hair200 as medium } from './Hair200';
// import { Hair300 as large } from './Hair300';

function withHair(Hair) {
  return function hairSize(props) {
    return <Hair {...props} />;
  };
}

export default function getHair(size) {
  const Component =
    size === 'small'
      ? small
      : size === 'medium'
      ? medium
      : size === 'large'
      ? large
      : size === 'huge'
      ? huge
      : hair;

  return withHair(Component);
}
