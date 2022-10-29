import { HeroCard } from './Hero';
import { BlogCard } from './Blog';
import { ToolsCard } from './Misc';

export const card = {
  hero: HeroCard,
  blog: BlogCard,
  tools: ToolsCard,
};

// import styled from 'styled-components';
// import { m as motion } from 'framer-motion';
// import { breakpoints } from '@constants/breakpoints';
// import { useHasMounted } from '@hooks/useHasMounted';
// import { useEffect, useState } from 'react';
// import { useTheme } from 'next-themes';

// export default function Card({ children, ...props }) {
//   const hasMounted = useHasMounted();
//   // const [background, setBackground] = useState('');
//   // const [boxShadow, setBoxShadow] = useState('');
//   const { theme } = useTheme();
//   const [className, setClassName] = useState('');

//   useEffect(() => {
//     if (hasMounted) {
//       setClassName(`hero-card ${theme}`);
//     }
//   }, [hasMounted, theme]);

//   if (!hasMounted) {
//     return null;
//   }

//   return (
//     <CardWrapper
//       className={className}
//       // initial={{ opacity: 0 }}
//       // animate={{ opacity: 1 }}
//       initial={{
//         borderWidth: '0px',
//         borderColor: 'rgb(0, 0, 0, 0)',
//         background: 'var(--body-background)',
//         // boxShadow: 'none',
//         borderRadius: 0,
//       }}
//       animate={{
//         borderWidth: '1px',
//         borderColor: 'rgb(0, 0, 0, 1)',
//         background: 'var(--basic-card-background)',
//         // boxShadow: 'var(--card-shadow)',
//         borderRadius: 6,
//       }}
//       transition={{ delay: 1, duration: 2 }}
//       // style={{ background, boxShadow }}
//       {...props}
//     >
//       <InnerWrappper>{children}</InnerWrappper>
//     </CardWrapper>
//   );
// }

// // const CardWrapper = styled(motion.div)`
// //   overflow: hidden;
// //   border-radius: 6px;
// //   border-style: solid;
// // `;

// const CardWrapper = styled(motion.div)`
//   /* background-color: var(--background, var(--body-background)); */
//   /* box-shadow: var(--boxShadow, var(--transparent-shadow)); */
//   display: grid;
//   padding: 16px clamp(0.5rem, 1rem + 1vw, 2rem);
//   font-size: clamp(1rem, 0.65rem + 1vw, 1.125rem);
//   border-radius: 6px;
//   gap: 16px;
//   overflow: hidden;

//   /* transition: box-shadow 1s linear 1s, background-color 1s linear; */

//   /* @media (max-width: ${breakpoints.mobile}px) {
//     --card-shadow: none;
//     --basic-card-background: none;
//   } */
// `;

// const InnerWrappper = styled.div`
//   width: 100%;
//   margin: 0 auto;
//   display: flex;
//   flex-direction: column;
//   gap: 16px;
//   padding: 16px;
//   position: relative;

//   @media (max-width: ${breakpoints.mobile}px) {
//     padding: 0;
//     gap: 0;
//   }
// `;
