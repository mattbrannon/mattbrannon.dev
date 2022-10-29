import { Container, GradientSpan, OutlineText } from './styles';

export const FancyTitle = ({ children, ...props }) => {
  return (
    <Container {...props}>
      <GradientSpan {...props}>{children}</GradientSpan>
      <OutlineText aria-hidden>{children}</OutlineText>
    </Container>
  );
};
