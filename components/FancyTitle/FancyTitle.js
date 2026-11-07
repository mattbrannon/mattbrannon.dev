import { Container, Heading, GradientSpan, OutlineText } from './styles';

export const FancyTitle = ({ children, ...props }) => {
  return (
    <Container {...props}>
      {/* Only the visible text is the heading; the outline copy sits outside it so the h1 reads once. */}
      <Heading>
        <GradientSpan {...props}>{children}</GradientSpan>
      </Heading>
      <OutlineText aria-hidden>{children}</OutlineText>
    </Container>
  );
};
