import { Container, Wrapper, Section, Heading, Row, SubHeading, Text, ViewWrapper } from './styles';

export const HelpView = ({ state: { help } }) => {
  return (
    <ViewWrapper>
      <Container>
        <Wrapper>
          <Section>
            <Heading>Text Color</Heading>
            <Row>
              <strong>Angle</strong>
              <span>Control the direction of the gradient. Ranges from 0 - 360 degrees</span>
            </Row>
            <Row>
              <strong>Midpoint</strong>
              <span>Controls where the the colors meet. Ranges from 0 - 100%</span>
            </Row>
            <Row>
              <strong>Blend</strong>
              <span>Controls how much or how little the colors blend together. Ranges from 0 - 100%</span>
            </Row>
          </Section>
          <Section>
            <Heading>Shadow Properties</Heading>
            <Row>
              <strong>Layers</strong>
              <span>
                Controls the depth of the shadow by adding or removing layers. Ranges from 0 - 30. Note: adding layers
                also adds to the overall computational expense when the browser renders the elements.
              </span>
            </Row>
            <Row>
              <strong>Gap</strong>
              <span>Controls the amount of space between each layer. Ranges from 0 - 30.</span>
            </Row>
            <Row>
              <strong>Blur</strong>
              <span>
                The amount of blur applied to the shadow. Currently the amount of blur applied is the same across all
                layers. I'm still trying to figure out how to best apply blur incrementally to each layer. Ranges from 0
                - 10.
              </span>
            </Row>
            <Row>
              <strong>Offset X</strong>
              <span>Controls how far offset the shadow's x-axis is from the center. Ranges from -10 - 10</span>
              <strong>Offset Y</strong>
              <span>Controls how far offset the shadow's y-axis is from the center. Ranges from -10 - 10</span>
            </Row>
          </Section>
          <Section>
            <Heading>Variable Fonts</Heading>
            <Row>
              <strong>Properties</strong>
              <span>
                Currently there are 6 font families to play with. Each one is a variable font. Variable fonts are neat
                because they can be tweaked and morphed in ways that would be impossible for non variable fonts.
                Variable fonts are adjust by the "axes". These are non standard properties. Each variable font is free
                to come up with their own axes. A few of the common ones among many variable fonts are "WDTH" for width,
                "SLNT" for slant, and "WGHT" for weight.
              </span>
            </Row>
          </Section>
          <Section>
            <Heading>Troubleshooting</Heading>
            <SubHeading>Controls feel sluggish</SubHeading>
            <Text>
              There may be several reasons for performance issues. The most likely cause is <code>text-shadow</code>
            </Text>
            <Text>
              <code>text-shadow</code> appears to be somewhat computationally expensive. As more layers are added the
              more expensive those computations get. Blur in particular seems to cause slow down more frequently than
              other properties. Try turning <code>blur</code> completely off until the very end. You can also try
              reducing the number of layers and increasing the gap between layers.
            </Text>

            <Text>
              Some fonts like <code>Jet Brains Mono</code> have only one or two axes while others like{' '}
              <code>Decovar</code> may have up to fifteen custom axes. More customization means more complexity. Try
              scaling back on the number of axes being edited to see if performance improves.
            </Text>

            <Text>If you're using Safari, I'd suggest switching to Chrome when using this tool.</Text>
          </Section>
        </Wrapper>
      </Container>
    </ViewWrapper>
  );
};
