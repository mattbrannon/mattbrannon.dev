import { useState, useEffect } from 'react';

function useAnimation(ref, obj) {
  const element = document.querySelector(ref);
  Object.entries(obj).map((entry) => {
    const [ key, value ] = entry;
    element.style.transition = 'all 2s linear';
    element.style[key] = value;
  });
}

export const useTransition = (ref, props) => {};

// function makeAnimation() {
//   let id, start, on;
//   let prev;
//   let radius = 0;
//   let direction = 'round';
//   return {
//     start(timestamp) {
//       if (start === undefined) {
//         start = timestamp;
//       }
//       const elapsed = timestamp - start;

//       //   div.style.borderRadius = `${radius}%`;

//       radius <= 50 && direction === 'round'
//         ? (radius += 1)
//         : radius >= 0 && direction === 'square'
//         ? (radius -= 1)
//         : radius;

//       if (direction === 'round' && radius === 50) {
//         direction = 'square';
//       }
//       if (direction === 'square' && radius === 0) {
//         direction = 'round';
//       }

//       console.log(radius);
//       prev = timestamp;
//       id = window.requestAnimationFrame((current) => this.start(current));
//     },
//     stop() {
//       window.cancelAnimationFrame(id);
//     },
//   };
// }

// export const useAnimationFrame = (ref, ...properties) => {
//   const [ id, setId ] = useState(null);
//   const [ startTime, setStartTime ] = useState(null);
//   const [ previousTimeStamp, setPreviousTimeStamp ] = useState(null);

//   return {
//     start(timestamp) {
//       if (startTime === null) {
//         setStartTime(timestamp);
//       }

//       const timeElapsed = timestamp - startTime;
//     },
//   };
// };
