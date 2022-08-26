import styled from 'styled-components';
import Select from '@components/Select';
import { NormalButton, FancyButton } from '@components/Button';
// import { CustomInput } from './RangeSlider';
import ControlsLayout, { ControlsContainer } from './Layout';
import { useEffect, useRef, useState } from 'react';
// import Checkbox from '@components/Checkbox';

import { ColorInput, RangeInput } from './Input';

const fonts = [
  {
    name: 'Recursive',
    properties: {
      MONO: [0, 1],
      CRSV: [0, 1],
      CASL: [0, 1],
      wght: [300, 1000],
      slnt: [-15, 0],
    },
    settings: {
      wght: 800,
      slnt: -6,
      CASL: 0,
      CRSV: 0,
      MONO: 0,
    },
    default: true,
    homepage: 'https://www.recursive.design/',
    github: 'https://github.com/arrowtype/recursive',
  },
  {
    name: 'Inter',
    properties: {
      wght: [100, 900],
      slnt: [-10, 0],
    },
    settings: {
      wght: 900,
      slnt: 0,
    },
    default: false,
    homepage: 'https://rsms.me/inter/',
    github: 'https://github.com/rsms/inter',
  },
  {
    name: 'OpenSans',
    properties: {
      wght: [300, 800],
      wdth: [75, 100],
    },
    settings: {
      wght: 700,
      wdth: 95,
    },
    default: false,
    homepage: 'https://www.opensans.com/',
    github: 'https://github.com/googlefonts/opensans',
  },
  {
    name: 'Jost',
    properties: {
      wght: [100, 900],
      ital: [0, 2],
    },
    settings: {
      wght: 600,
      ital: 1,
    },
    default: false,
    homepage: 'https://indestructibletype.com/Jost.html',
    github: 'https://github.com/indestructible-type/Jost',
  },
  {
    name: 'Decovar',
    properties: {
      BLDA: [0, 1000],
      TRMD: [0, 1000],
      TRMC: [0, 1000],
      SKLD: [0, 1000],
      TRML: [0, 1000],
      SKLA: [0, 1000],
      TRMF: [0, 1000],
      TRMK: [0, 1000],
      BLDB: [0, 1000],
      WMX2: [0, 1000],
      TRMB: [0, 1000],
      TRMA: [0, 1000],
      SKLB: [0, 1000],
      TRMG: [0, 1000],
      TRME: [0, 1000],
    },
    settings: {
      BLDA: 0,
      BLDB: 0,
      SKLA: 500,
      SKLB: 0,
      SKLD: 0,
      TRMA: 0,
      TRMB: 0,
      TRMC: 0,
      TRMD: 0,
      TRME: 0,
      TRMF: 0,
      TRMG: 0,
      TRMK: 0,
      TRML: 0,
      WMX2: 0,
    },
    default: false,
    homepage:
      'https://www.typenetwork.com/brochure/decovar-a-decorative-variable-font-by-david-berlow',
    github: 'https://github.com/sannorozco/Decovar',
  },
];

// const toCamelCase = (str) => {
//   return str
//     .split(/\s|-|_/g)
//     .map((word, i) => {
//       return i > 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word;
//     })
//     .join('');
// };

export function FontControls({ dispatch, ...props }) {
  const ref = useRef();

  useEffect(() => {
    if (ref && ref.current) {
      const minWidth = getComputedStyle(ref.current).minWidth;
      return props.setControlWidth(minWidth);
    }
  }, [props, props.setControlWidth]);

  return (
    <ControlsLayout ref={ref}>
      <ControlsContainer>
        <FontSelection onChange={dispatch.handleFontSelection} {...props} />
        <FontProperties onChange={dispatch.handleFontVariation} {...props} />
        <GradientColor dispatch={dispatch} {...props} />
        <GradientProperties onChange={dispatch.handleGradientSlider} {...props} />
        <ShadowColor onInput={dispatch.handleShadowColor} {...props} />
        <ShadowProperties onChange={dispatch.handleShadowSlider} {...props} />
        <TextOutline onInput={dispatch.handleStroke} {...props} />
        <Buttons {...props} />
      </ControlsContainer>
    </ControlsLayout>
  );
}

const Heading = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--orange);
  margin: 0;
  margin-bottom: 0px;
  margin-top: 0;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ButtonGroup = styled(Group)`
  gap: 8px;
  align-items: center;
  width: 100%;
`;

const FontProperties = ({ font, ...props }) => {
  const { fontProperties } = props.state.font;
  return (
    <Group>
      <Heading>Font Properties</Heading>
      {Object.keys(fontProperties).map((key, i) => {
        const [min, max] = fontProperties[key];
        const step = max - min > 2 ? 1 : key === 'CRSV' ? 0.5 : 0.01;
        const attrs = { min, max, step, ...props };
        return <RangeInput key={key} name={key} font={font} {...attrs} />;
      })}
    </Group>
  );
};

const FontSize = ({ ...props }) => {
  const [size, setSize] = useState(8);

  const handleFontSize = (e) => {
    setSize(e.target.value);
  };

  return (
    <Group>
      <Heading>Font Size</Heading>
      <RangeInput
        onChange={handleFontSize}
        value={size}
        min={1}
        max={8}
        name="font size"
        {...props}
      />
    </Group>
  );
};

const ShadowProperties = ({ ...props }) => {
  return (
    <Group>
      <Heading>Shadow Properties</Heading>
      <RangeInput min={0} max={20} name="shadow layers" {...props} />
      <RangeInput min={1} max={20} step={0.2} name="shadow gap" {...props} />
      <RangeInput min={0} max={10} step={0.1} name="shadow blur" {...props} />
      <RangeInput min={-10} max={10} step={0.2} name="shadow offset x" {...props} />
      <RangeInput min={-10} max={10} step={0.2} name="shadow offset y" {...props} />
    </Group>
  );
};

const GradientProperties = ({ ...props }) => {
  return (
    <Group>
      <Heading>Gradient Properties</Heading>
      <RangeInput min={0} max={360} step={1} name="gradient angle" {...props} />
      <RangeInput min={0} max={100} step={1} name="gradient midpoint" {...props} />
      <RangeInput min={0} max={100} step={1} name="gradient blend" {...props} />
    </Group>
  );
};

const ShadowColor = ({ ...props }) => {
  return (
    <Group>
      <Heading>Shadow Color</Heading>
      <ColorInput type="color" name="shadow color start" {...props} />
      <ColorInput type="color" name="shadow color end" {...props} />
    </Group>
  );
};

const GradientColor = ({ ...props }) => {
  return (
    <Group>
      <Heading>Gradient Color</Heading>
      <ColorInput type="color" name="gradient color start" {...props} />
      <ColorInput type="color" name="gradient color end" {...props} />
    </Group>
  );
};

const TextOutline = ({ ...props }) => {
  return (
    <Group>
      <Heading>Text Outline</Heading>
      <RangeInput name="text stroke width" min={0} max={0.1} step={0.001} {...props} />
      <ColorInput type="color" name="text stroke color" {...props} />
    </Group>
  );
};

const Buttons = ({ state, ...props }) => {
  const handleReset = () => {
    props.dispatch({ type: 'RESET', prevState: state });
    props.dispatch({ type: 'IS_CHANGING_FONTS', value: true });
  };

  const toggleButtonText = state.toggleState.showCode ? 'Back to Editor' : 'Get Css';
  const toggleHelpText = state.toggleState.showHelp ? 'Back to Editor' : 'Help';

  return (
    <ButtonGroup>
      <NormalButton name="show help" {...props}>
        {toggleHelpText}
      </NormalButton>
      <NormalButton name="show code" {...props}>
        {toggleButtonText}
      </NormalButton>
      <FancyButton name="reset" {...props}>
        Reset
      </FancyButton>
    </ButtonGroup>
  );
};

const Option = ({ ...props }) => {
  return (
    <option key={props.key} {...props}>
      {props.children}
    </option>
  );
};

const FontSelection = ({ state, ...props }) => {
  // console.log(state);
  // console.log(props);
  return (
    <Group>
      <Heading>Font Family</Heading>
      <Select value={state.font.fontName ?? fonts[0].name} {...props}>
        {fonts.map((font, i) => {
          return (
            <Option key={i} value={font.name}>
              {font.name}
            </Option>
          );
        })}
      </Select>
    </Group>
  );
};
