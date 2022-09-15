import { useRef, useEffect, forwardRef, useState } from 'react';
import { FontSelect } from './FontSelect';
import { Color, Range, Checkbox } from './Input';
import { FontProperties } from './FontProperties';
import { Layout, Group, SectionHeading } from './Layout';
import { Buttons } from './Buttons';
// import Checkbox from '@components/Checkbox';
// import Select, { Option } from '@components/Select';

export const FontControls = forwardRef(Controls);

function Controls({ ...props }, ref) {
  const { gradient, shadow, styles, applyToWords } = props.state;

  useEffect(() => {
    if (ref && ref.current) {
      try {
        props.setControlWidth(ref.current.getBoundingClientRect().width);
      }
      catch {}
    }
  }, [ref, props]);

  return (
    <Layout ref={ref}>
      <Group>
        <SectionHeading>Font</SectionHeading>
        <FontSelect {...props} />
        <FontProperties {...props} />
        <Range {...props} name="font size" value={styles.fontSize} step={1} min={16} max={160} />
        <Range
          {...props}
          name="letter spacing"
          value={styles.letterSpacing}
          step={0.001}
          min={-0.25}
          max={0.25}
        />
      </Group>

      <Group>
        <SectionHeading>Gradient</SectionHeading>
        <Color {...props} name="gradient color start" value={gradient.gradientColorStart} />
        <Color {...props} name="gradient color end" value={gradient.gradientColorEnd} />
        <Range {...props} name="gradient angle" value={gradient.gradientAngle} max={360} />
        <Range {...props} name="gradient midpoint" value={gradient.gradientMidpoint} />
        <Range {...props} name="gradient blend" value={gradient.gradientBlend} />
      </Group>

      <Group>
        <SectionHeading>Shadow</SectionHeading>
        <Color {...props} name="shadow color start" value={shadow.shadowColorStart} />
        <Color {...props} name="shadow color end" value={shadow.shadowColorEnd} />
        <Range {...props} name="shadow layers" value={shadow.shadowLayers} max={30} />
        <Range {...props} name="shadow gap" value={shadow.shadowGap} max={20} step={0.1} />
        <Range {...props} name="shadow blur" value={shadow.shadowBlur} max={10} step={0.1} />
        <Range
          {...props}
          name="shadow offset x"
          value={shadow.shadowOffsetX}
          min={-10}
          max={10}
          step={0.1}
        />
        <Range
          {...props}
          name="shadow offset y"
          value={shadow.shadowOffsetY}
          min={-10}
          max={10}
          step={0.1}
        />
      </Group>

      <Group>
        <SectionHeading>Stroke</SectionHeading>
        <Color {...props} name="stroke color" value={styles.strokeColor} />
        <Range {...props} name="stroke width" value={styles.strokeWidth} step={0.001} max={0.25} />
      </Group>

      {/* <Group>
        <SectionHeading>Letter Spacing</SectionHeading>
        <Range
          {...props}
          name="letter spacing"
          value={styles.letterSpacing}
          step={0.001}
          min={-0.25}
          max={0.25}
        />
        <SectionHeading>Font Size</SectionHeading>
        <Range {...props} name="font size" value={styles.fontSize} step={1} min={16} max={160} />
      </Group> */}
      <Group>
        <Buttons {...props} />
      </Group>
    </Layout>
  );
}
