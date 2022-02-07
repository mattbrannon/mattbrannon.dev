import { Hair150 as small } from './waves/Hair150';
import { Hair200 as medium } from './waves/Hair200';
import { Hair250 as large } from './waves/Hair250';
import { Hair300 as huge } from './waves/Hair300';
import { Hair1200 as hair } from './waves/Hair1200';
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
      : huge;

  return withHair(Component);
}
