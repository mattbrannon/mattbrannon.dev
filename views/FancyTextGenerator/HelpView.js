import { Container, Wrapper, Section, Heading, Row, SubHeading, Text, ViewWrapper } from './styles';
import { AnimatePresence, m as motion } from 'framer-motion';

export const Help = ({ state: { help } }) => {
  return (
    <AnimatePresence exitBeforeEnter>
      <ViewWrapper
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        exit={{ width: 0, transition: { duration: 0.3 } }}
        transition={{ duration: 2.8, ease: 'anticipate' }}
        key={help}
      >
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
                <span>
                  Controls how much or how little the colors blend together. Ranges from 0 - 100%
                </span>
              </Row>
            </Section>
            <Section>
              <Heading>Shadow Properties</Heading>
              <Row>
                <strong>Layers</strong>
                <span>
                  Controls the depth of the shadow by adding or removing layers. Ranges from 0 - 30.
                  Note: adding layers also adds to the overall computational expense when the
                  browser renders the elements.
                </span>
              </Row>
              <Row>
                <strong>Gap</strong>
                <span>Controls the amount of space between each layer. Ranges from 0 - 30.</span>
              </Row>
              <Row>
                <strong>Blur</strong>
                <span>
                  The amount of blur applied to the shadow. Currently the amount of blur applied is
                  the same across all layers. I'm still trying to figure out how to best apply blur
                  incrementally to each layer. Ranges from 0 - 10.
                </span>
              </Row>
              <Row>
                <strong>Offset X</strong>
                <span>
                  Controls how far offset the shadow's x-axis is from the center. Ranges from -10 -
                  10
                </span>
                <strong>Offset Y</strong>
                <span>
                  Controls how far offset the shadow's y-axis is from the center. Ranges from -10 -
                  10
                </span>
              </Row>
            </Section>
            <Section>
              <Heading>Variable Fonts</Heading>
              <Row>
                <strong>Properties</strong>
                <span>
                  Currently there are 4 font families to play with. Each one is a variable font.
                  Variable fonts are neat because they can be tweaked and morphed in ways that would
                  be impossible for non variable fonts. Variable fonts are adjust by the "axes".
                  These are non standard properties. Each variable font is free to come up with
                  their own axes. A few of the common ones among many variable fonts are "WDTH" for
                  width, "SLNT" for slant, and "WGHT" for weight.
                </span>
              </Row>
            </Section>
            <Section>
              <Heading>Troubleshooting</Heading>
              <SubHeading>Controls feel sluggish</SubHeading>
              <Text>
                If the controls start to feel sluggish or if there is a noticable slowdown in
                performance, try working on one thing at a time and reducing the values for the
                properties that you're not currently working on.
              </Text>
              <Text>
                For example, if you're trying to fine tune the font variation settings, try reducing
                the number of shadow layers until you're satisfied with how the font looks. If
                you're working with a font like Decovar, you'll find that because it's such a crazy
                font with so many different axes, reducing the shadow layer is critical when fine
                tuning the font properties.
              </Text>
              <Text>
                If you're using Safari, I'd suggest switching to Chrome when using this tool.
              </Text>
            </Section>
          </Wrapper>
        </Container>
      </ViewWrapper>
    </AnimatePresence>
  );
};
