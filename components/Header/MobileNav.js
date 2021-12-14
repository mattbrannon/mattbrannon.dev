import VisuallyHidden from '@components/VisuallyHidden';
import Link from 'next/link';
import { useContext, useEffect, useRef, useState } from 'react';
import styled, { css, ThemeContext } from 'styled-components/macro';
/**
 *
 * * Mobile navigation menu
 *
 */

export default function MobileNav() {
  const context = useContext(ThemeContext);
  const labels = [ 'Home', 'Blog', 'Apps', 'Contact' ];
  const [ isFirstPaint, setIsFirstPaint ] = useState(true);
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        context.setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  useEffect(() => {
    if (isFirstPaint) {
      // console.log({ isFirstPaint });
      context.setIsOpen(null);
      setIsFirstPaint(false);
    }
  }, [ context, isFirstPaint ]);

  // useEffect(() => {
  //   if (context.isOpen) {
  //     ref.current.style.setProperty('display', 'block');
  //   }
  //   else {
  //     let count = 0;
  //     const animations = ref.current.getAnimations();
  //     animations.forEach((animation) => {
  //       const playState = animation.effect.playState;
  //       if (playState !== 'playing') count++;
  //       else {
  //         animation.addEventListener('animationend', () => {
  //           count++;
  //           if (count === animations.length) {
  //             ref.current.style.setProperty('display', 'none');
  //           }
  //         });
  //       }
  //       if (count === animations.length) {
  //         ref.current.style.setProperty('display', 'none');
  //       }
  //     });
  //   }
  // });

  return (
    <MobileNavWrapper
      isOpen={context.isOpen}
      ref={ref}
      style={{
        '--zIndex': context.isOpen ? '4' : '-10',
      }}
    >
      <VisuallyHidden>
        <h2>Internal Navigation Links for Mobile Devices</h2>
      </VisuallyHidden>
      <>
        {labels.map((label, index) => {
          const href = index > 0 ? `/${labels[index].toLowerCase()}` : '/';
          return (
            <NavLink
              tabIndex={0}
              href={href}
              key={index}
              i={index + 1}
              isOpen={context.isOpen}
            >
              {label}
            </NavLink>
          );
        })}
      </>
    </MobileNavWrapper>
  );
}

function NavLink({ children, ...props }) {
  const context = useContext(ThemeContext);
  const ref = useRef();

  useEffect(() => {
    // console.log({ isOpen: context.isOpen });
    const frames = [
      { transform: 'translateX(-500px)', opacity: 0 },
      { transform: 'translateX(0)', opacity: 1 },
    ];

    const options = {
      duration: 800,
      delay: props.i * 100 + 25,
      easing: 'cubic-bezier(.55,.36,.51,1.41)',
      fill: 'forwards',
    };

    const animation = ref.current.animate(frames, options);
    animation.pause();

    // console.log('both true?', context.clickedBurger && context.isOpen);

    if (context.isOpen !== null) {
      if (context.isOpen) {
        ref.current.style.setProperty('display', 'grid');
        animation.play();
      }
      else {
        const closing = ref.current.animate(frames.reverse(), {
          ...options,
          delay: props.i * 50,
          duration: options.duration / 2,
        });
        closing.finished.then(() => {
          animation.finished.then(() => {
            ref.current.style.setProperty('display', 'none');
          });
          // ref.current.getAnimations()[0].playState = 'paused';
          // console.log(ref.current.getAnimations()[0].playState);
        });
      }
    }
  }, [ context, props.i ]);

  return (
    <Link passHref href={props.href}>
      <ButtonLink ref={ref} onClick={() => context.setIsOpen(false)} {...props}>
        {children}
      </ButtonLink>
    </Link>
  );
}

const setTransition = (props) => {
  return !props.isOpen ? css`z-index 1000ms linear` : undefined;
};

const MobileNavWrapper = styled.nav`
  display: ${(p) => (p.theme.isOpen ? 'grid' : 'none')};
  justify-items: baseline;
  justify-content: center;
  align-items: baseline;
  align-content: space-between;
  height: 30vh;

  flex: 1;
  position: absolute;
  left: 0;
  width: 100%;

  z-index: var(--zIndex);
  top: calc(var(--header-height) + 64px);
  gap: 24px;
  transition: ${(p) => setTransition(p)};
`;

const ButtonLink = styled.button`
  background: none;
  border: none;
  font-family: Recursive;
  font-variation-settings: var(--recursive8);
  font-size: var(--size24);
  font-weight: 600;
  text-shadow: -1px 0px 1px black;
  color: palegoldenrod;
  transform: translateX(-500px); 
  opacity: 0

  &:hover {
    text-decoration: underline;
    color: gold;
    transition: all 0.4s ease;
    cursor: pointer;
  }
`;

// import VisuallyHidden from '@components/VisuallyHidden';
// import Link from 'next/link';
// import { useContext, useEffect } from 'react';
// import styled, { css, keyframes, ThemeContext } from 'styled-components/macro';
// /**
//  *
//  * * Mobile navigation menu
//  *
//  */

// export default function MobileNav() {
//   const context = useContext(ThemeContext);
//   const labels = [ 'Home', 'Blog', 'Apps', 'Contact' ];

//   useEffect(() => {
//     const handler = (e) => {
//       if (e.key === 'Escape') {
//         context.setIsOpen(false);
//       }
//     };
//     window.addEventListener('keydown', handler);
//     return () => window.removeEventListener('keydown', handler);
//   });

//   return (
//     <MobileNavWrapper
//       style={{
//         '--height': context.isOpen ? '80%' : '0px',
//         '--width': context.isOpen ? 'auto' : '0px',
//         '--zIndex': context.isOpen ? '4' : '-1',
//         '--display': context.isOpen ? 'flex' : 'none',
//       }}
//     >
//       <VisuallyHidden>
//         <h2>Internal Navigation Links for Mobile Devices</h2>
//       </VisuallyHidden>
//       <Wrapper>
//         {labels.map((label, index) => {
//           const href = index > 0 ? `/${labels[index].toLowerCase()}` : '/';
//           return (
//             <NavLink
//               tabIndex={0}
//               href={href}
//               key={index}
//               isOpen={context.isOpen}
//               style={{
//                 '--index': index + 1,
//               }}
//             >
//               {label}
//             </NavLink>
//           );
//         })}
//       </Wrapper>
//     </MobileNavWrapper>
//   );
// }

// const Wrapper = styled.div`
// display: grid;
// justify-items: baseline;
// justify-content: center;
// align-items: baseline;
// align-content: space-between;
// height: 30vh;
// `;

// function NavLink({ children, ...props }) {
//   const context = useContext(ThemeContext);
//   const { setIsOpen } = context;
//   const handleClick = () => setIsOpen(false);
//   return (
//     <Link passHref href={props.href}>
//       <ButtonLink onClick={handleClick} {...props}>
//         {children}
//       </ButtonLink>
//     </Link>
//   );
// }

// // * Animations: mobile nav
// const staggerIn = keyframes`
//   from {
//     transform: translateX(-200px);
//     padding: 5vh 0;
//   }

//   to {
//     /* transform: translateX(140px); */
//     transform: translateX(200px);

//     padding: 2vh 0;
//   }
// `;

// const staggerOut = keyframes`
//   0% {
//     transform: translateX(140px);
//     padding: 2vh 0;
//     display: block;
//   }

//   99% {
//     transform: translateX(-200px);
//     padding: 5vh 0;
//     display: block;
//   }
//   100% {
//     transform: translateX(-200px);
//     padding: 5vh 0;
//     display: none;
//   }
// `;

// const showMenu = css`
//   animation: ${staggerIn} calc(300ms + var(--index) * 100ms) linear normal both 1;
// `;

// const hideMenu = css`
//   animation: ${staggerOut} calc(300ms + var(--index) * 200ms) ease-in-out normal both 1;
// `;

// // * Components: mobile nav
// const MobileNavWrapper = styled.nav`
//   ${'' /* display: var(--display); */}
//   flex-direction: column;
//   justify-content: center;
//   align-items: flex-start;
//   flex: 1;
//   position: fixed;
//   ${'' /* position: absolute; */}
//   left: 0;
//   width: 100%;
//   ${'' /* transform: translateX(-100%); */}

//   z-index: var(--zIndex);
//   /* width: var(--width);
//   height: var(--height); */

//   top: 80px;
//   gap: 24px;
// `;

// const ButtonLink = styled.button`
//   /* width: 142px; */

//   background: none;
//   border: none;

//   ${'' /* margin-left: 24px; */}
//   ${'' /* transform: translateX(-150px); */}
//   font-family: Recursive;
//   font-variation-settings: var(--recursive8);
//   font-size: var(--size24);
//   font-weight: 600;
//   text-shadow: -1px 0px 1px black;
//   color: palegoldenrod;

//   ${'' /* ${(p) => (p.isOpen ? showMenu : p.isOpen !== null ? hideMenu : null)}; */}

//   &:hover {
//     text-decoration: underline;
//     color: gold;
//     transition: all 0.4s ease;
//     cursor: pointer;
//   }
// `;

// import VisuallyHidden from '@components/VisuallyHidden';
// import Link from 'next/link';
// import { useContext, useEffect, useRef } from 'react';
// import styled, { css, ThemeContext } from 'styled-components/macro';
// /**
//  *
//  * * Mobile navigation menu
//  *
//  */

// export default function MobileNav() {
//   const context = useContext(ThemeContext);
//   const labels = [ 'Home', 'Blog', 'Apps', 'Contact' ];

//   useEffect(() => {
//     const handler = (e) => {
//       if (e.key === 'Escape') {
//         context.setIsOpen(false);
//       }
//     };
//     window.addEventListener('keydown', handler);
//     return () => window.removeEventListener('keydown', handler);
//   });

//   return (
//     <MobileNavWrapper
//       isOpen={context.isOpen}
//       style={{
//         '--zIndex': context.isOpen ? '4' : '-10',
//       }}
//     >
//       <VisuallyHidden>
//         <h2>Internal Navigation Links for Mobile Devices</h2>
//       </VisuallyHidden>
//       <>
//         {labels.map((label, index) => {
//           const href = index > 0 ? `/${labels[index].toLowerCase()}` : '/';
//           return (
//             <NavLink
//               tabIndex={0}
//               href={href}
//               key={index}
//               i={index + 1}
//               isOpen={context.isOpen}
//               style={{
//                 '--index': index + 1,
//               }}
//             >
//               {label}
//             </NavLink>
//           );
//         })}
//       </>
//     </MobileNavWrapper>
//   );
// }

// function NavLink({ children, ...props }) {
//   const context = useContext(ThemeContext);
//   const { setIsOpen, isOpen } = context;
//   const ref = useRef();
//   const handleClick = () => setIsOpen(false);

//   useEffect(() => {
//     console.log({ isOpen });
//     const frames = [
//       { transform: 'translateX(-500px)', opacity: 0 },
//       { transform: 'translateX(0)', opacity: 1 },
//     ];

//     const options = {
//       duration: 800,
//       delay: props.i * 100 + 25,
//       easing: 'cubic-bezier(.55,.36,.51,1.41)',
//       fill: 'both',
//     };

//     const animation = ref.current.animate(frames, options);
//     animation.pause();
//     if (isOpen) {
//       ref.current.style.setProperty('display', 'block');
//       animation.play();
//     }
//     else {
//       const rev = frames.reverse();
//       const opts = { ...options };
//       opts.delay = props.i * 50; //options.delay / 3;
//       opts.duration = options.duration / 2;
//       const closing = ref.current.animate(rev, opts);
//       closing.finished.then(() => {
//         ref.current.style.setProperty('display', 'none');
//       });
//       // animation.currentTime = animation.effect.getComputedTiming().duration;
//       // animation.reverse();
//     }
//   }, [ isOpen, props.i ]);

//   return (
//     <Link passHref href={props.href}>
//       <ButtonLink ref={ref} onClick={handleClick} {...props}>
//         {children}
//       </ButtonLink>
//     </Link>
//   );
// }

// const setTransition = (props) => {
//   return !props.isOpen ? css`z-index 1000ms linear` : undefined;
// };

// // * Components: mobile nav
// const MobileNavWrapper = styled.nav`
//   display: grid;
//   justify-items: baseline;
//   justify-content: center;
//   align-items: baseline;
//   align-content: space-between;
//   height: 30vh;

//   flex: 1;
//   position: absolute;
//   left: 0;
//   width: 100%;

//   z-index: var(--zIndex);
//   top: calc(var(--header-height) + 64px);
//   gap: 24px;
//   transition: ${(p) => setTransition(p)};
// `;

// const ButtonLink = styled.button`
//   background: none;
//   border: none;
//   font-family: Recursive;
//   font-variation-settings: var(--recursive8);
//   font-size: var(--size24);
//   font-weight: 600;
//   text-shadow: -1px 0px 1px black;
//   color: palegoldenrod;

//   &:hover {
//     text-decoration: underline;
//     color: gold;
//     transition: all 0.4s ease;
//     cursor: pointer;
//   }
// `;
