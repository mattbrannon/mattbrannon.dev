import { fadein } from './animations';
import styled from 'styled-components/macro';

export default function WelcomeMessage({ children, ...props }) {
  return (
    <>
      <Span>
        Hey there! My name is<FancyText> Matt</FancyText>
      </Span>
      <br />
      I'm a web developer and musician
      <MessageWrapper {...props}>{children}</MessageWrapper>
    </>
  );
}

const MessageWrapper = styled.span`
  --from: hsla(220deg, 80%, 15%, 1);
  --to: hsla(220deg, 35%, 65%, 1);
  display: block;
  /* font-size: clamp(3rem, 5vw + 1.9rem, 5rem); */
  /* font-size: clamp(2rem, 5.2vw + 1rem, 5rem); */
  font-size: clamp(2rem, 6.4vw, 5rem);
  background: linear-gradient(90deg, var(--from), var(--to));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  font-family: 'Roboto Flex';
  height: 100%;
  width: 0%;
  white-space: nowrap;
  overflow: hidden;
  animation: ${fadein} 3s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.6s 1 normal forwards;

  @media (prefers-color-scheme: dark) {
    --from: #af8445;
    --to: #eee;
  }

  /* @media (max-width: 480px) {
    white-space: unset;
  } */
`;

const FancyText = styled.span`
  display: inline;
  font-family: 'Coming Soon';
  color: deeppink;
  @media (prefers-color-scheme: dark) {
    color: deepskyblue;
    font-weight: 700;
  }
`;

const Span = styled.span`
  font-size: 1.7rem;
`;
