import styled from '@styled-components';
import DocumentHead from '@components/Head';

export default function SamplesPage() {
  return (
    <>
      <DocumentHead
        title="Sample Gifs"
        desc="A small collection of gifs made using lets-make-a-gif.com"
      />
      <Div>
        <div>HELLO</div>
      </Div>
    </>
  );
}

const Div = styled.div`
  background: red;
  height: 200px;
  width: 200px;
`;
