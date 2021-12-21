import { useCookie } from '@hooks/useCookie';
import { useMediaQuery } from '@hooks/useMediaQuery';
import styled from '@styled-components';
import { LazyMotion, m as motion } from 'framer-motion';
import Link from 'next/link';
import StaticButton from './StaticButton';
const loadFeatures = () => import('@animations/features.js').then((res) => res.default);

export const MotionButton = ({ x, showImage, ...props }) => {
  const [ hasCookie, setCookie ] = useCookie('navigated');
  const isMobile = useMediaQuery({ maxWidth: 564 });
  const isSmall = useMediaQuery({ maxWidth: 320 });
  console.info({ hasCookie });
  const side = props.left ? 'left' : props.right ? 'right' : null;
  // const amount = 85;
  const xAmount = side === 'left' ? x : x * -1;
  console.info(xAmount);

  const buttons = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        opacity: {
          duration: 1,
        },
      },
    },
  };

  const wrapper = {
    initial: { clipPath: 'circle(0%)', x: xAmount },
    animate: {
      clipPath: [
        'circle(0%)',
        'circle(16px)',
        'circle(16px)',
        'circle(100%)',
        'circle(100%)',
      ],
      x: 0,
      borderRadius: '6px',
      transition: {
        clipPath: {
          delay: 0,
          duration: 4.25,
          times: [ 0, 0.1, 0.9, 0.99, 1 ],
        },
        x: {
          delay: 1.25,
          duration: 0.75,
          type: 'spring',
          bounce: 5,
          damping: 10,
        },
      },
    },
  };

  const shouldLoadStatic = hasCookie || isSmall || isMobile;

  const href = props.children.toLowerCase() === 'view my work' ? '/apps' : '/contact';
  const handleButtonClick = () => {
    if (!hasCookie) {
      setCookie('navigated');
    }
  };

  return (
    <LazyMotion features={loadFeatures}>
      {shouldLoadStatic ? (
        <StaticButton>{props.children}</StaticButton>
      ) : (
        <Wrapper variants={wrapper} initial={wrapper.initial} animate={wrapper.animate}>
          <Link passHref href={href}>
            <Button
              variants={buttons}
              initial={{ opacity: 0 }}
              animate={showImage && buttons.animate}
              onClick={handleButtonClick}
            >
              {props.children}
            </Button>
          </Link>
        </Wrapper>
      )}
    </LazyMotion>
  );
};

const Wrapper = styled(motion.div)`
  display: grid;
  place-items: center;
  background: var(--tealBg);
`;

const Button = styled(motion.button)`
  background: var(--tealBg);
  color: white;

  font-size: clamp(var(--size12), 2vw + 0.5rem, var(--size21));
  font-family: 'Open Sans';
  font-variation-settings: 'wdth' 85, 'wght' 655;
  text-shadow: 0.05em 0.05em 0.1em black;
  border: none;
  padding: 8px 4px;
  width: clamp(8.75rem, 4.5vw + 7.2rem, 11.25rem);
  height: 100%;
  white-space: nowrap;

  background: var(--tealBg);
  border-radius: 6px;

  transition: all 0.2s linear;
`;

// const LeftButton = styled(Button)`
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   opacity: 1;
// `;

// const RightButton = styled(Button)`
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   opacity: 1;
// `;

///////////////////////////////
///////////////////////////////

// const getPosition = (cardDimensions, bounds) => {
//   const position = {
//     x: bounds.x - cardDimensions.x,
//     y: bounds.y - cardDimensions.y,
//     width: bounds.width,
//     height: bounds.height,
//   };
//   return position;
// };

// const loadFeatures = () => import('@animations/features.js').then((res) => res.default);

// export default function MotionButtons({ cardDimensions }) {
//   const [ middle, setMiddle ] = useState(0);
//   const buttons = variants.buttons();
//   const container = variants.container();
//   const ref = useRef();
//   const { setShowImage } = useContext(ThemeContext);
//   const [ hasCookie, setCookie ] = useCookie('navigated');

//   useEffect(() => {
//     if (ref.current && cardDimensions) {
//       const bounds = ref.current.getBoundingClientRect();
// const position = getPosition(cardDimensions, bounds);
// const x = position ? position.x - (120 - position.width) : null;
//       const middle = variants.middle(x);
//       setMiddle(middle);
//     }
//   }, [ ref, cardDimensions ]);

//   const handleFinished = () => {
//     setShowImage(true);
//     // setCookie('navigated');
//   };

//   return (
//     <LazyMotion features={loadFeatures}>
//       <Container
//         initial={{ gap: '0px' }}
//         animate={{ gap: '8px', transition: { delay: 4, duration: 1 } }}
//       >
//         <MotionButton left>Contact Me</MotionButton>
//         <MotionButton right>View my work</MotionButton>
//       </Container>
//     </LazyMotion>
//   );
// }
