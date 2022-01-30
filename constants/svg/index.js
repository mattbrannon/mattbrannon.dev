import { Hair150 as small } from './Hair150';
import { Hair200 as medium } from './Hair200';
import { Hair300 as large } from './Hair300';

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
      : null;

  return withHair(Component);
}
