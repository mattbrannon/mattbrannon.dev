import styled from 'styled-components/macro';
import Img from 'next/image';

const Image = styled(Img)`
  display: block;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  width: 100%;
  height: auto;
`;

export default Image;
