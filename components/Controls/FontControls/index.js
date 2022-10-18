import { useRef, useEffect, forwardRef, useState } from 'react';
import { FontSelect } from './FontSelect';
import { Color, Range, Checkbox } from './Input';
import { FontProperties } from './FontProperties';
import { Layout, Group, SectionHeading } from './Layout';
import { Buttons } from './Buttons';

export const FontControls = forwardRef(Controls);

function Controls({ ...props }, ref) {
  useEffect(() => {
    return ref && ref.current ? props.setControlWidth(ref.current.getBoundingClientRect().width) : 0;
  }, [ref, props]);

  return (
    <Layout ref={ref}>
      <VariableFontControls {...props} />
      <GradientControls {...props} />
      <ShadowControls {...props} />
      <StrokeControls {...props} />
      <ButtonControls {...props} />
    </Layout>
  );
}

const ShadowControls = ({ shadow, ...props }) => {
  const {
    state: {
      shadow: { shadowColorStart, shadowColorEnd, shadowLayers, shadowGap, shadowBlur, shadowOffsetX, shadowOffsetY },
    },
  } = props;
  return (
    <Group>
      <SectionHeading>Shadow</SectionHeading>
      <Color {...props} name="shadow color start" value={shadowColorStart} />
      <Color {...props} name="shadow color end" value={shadowColorEnd} />
      <Range {...props} name="shadow layers" value={shadowLayers} max={30} />
      <Range {...props} name="shadow gap" value={shadowGap} max={20} step={0.1} />
      <Range {...props} name="shadow blur" value={shadowBlur} max={10} step={0.1} />
      <Range {...props} name="shadow offset x" value={shadowOffsetX} min={-10} max={10} step={0.1} />
      <Range {...props} name="shadow offset y" value={shadowOffsetY} min={-10} max={10} step={0.1} />
    </Group>
  );
};

const GradientControls = ({ ...props }) => {
  const {
    state: {
      gradient: { gradientColorStart, gradientColorEnd, gradientAngle, gradientMidpoint, gradientBlend },
    },
  } = props;

  return (
    <Group>
      <SectionHeading>Gradient</SectionHeading>
      <Color {...props} name="gradient color start" value={gradientColorStart} />
      <Color {...props} name="gradient color end" value={gradientColorEnd} />
      <Range {...props} name="gradient angle" value={gradientAngle} max={360} />
      <Range {...props} name="gradient midpoint" value={gradientMidpoint} />
      <Range {...props} name="gradient blend" value={gradientBlend} />
    </Group>
  );
};

const VariableFontControls = ({ ...props }) => {
  const {
    state: {
      styles: { fontSize, letterSpacing },
    },
  } = props;

  return (
    <Group>
      <SectionHeading>Font</SectionHeading>
      <FontSelect {...props} />
      <FontProperties {...props} />
      <Range {...props} name="font size" value={fontSize} step={1} min={16} max={128} />
      <Range {...props} name="letter spacing" value={letterSpacing} step={0.001} min={-0.25} max={0.25} />
    </Group>
  );
};

const StrokeControls = ({ ...props }) => {
  const {
    state: {
      styles: { strokeColor, strokeWidth },
    },
  } = props;
  return (
    <Group>
      <SectionHeading>Stroke</SectionHeading>
      <Color {...props} name="stroke color" value={strokeColor} />
      <Range {...props} name="stroke width" value={strokeWidth} step={0.001} max={0.25} />
    </Group>
  );
};

const ButtonControls = ({ ...props }) => {
  return (
    <Group>
      <Buttons {...props} />
    </Group>
  );
};
