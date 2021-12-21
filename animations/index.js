import { keyframes } from 'styled-components';

export const shadowAnimation = keyframes`
  0% {
    box-shadow: var(--start-shadow);
  }

  100% {
    box-shadow: var(--end-shadow);

  }
`;

export const cardAnimation = keyframes`
  0%{
    transform: translate(0, -100px);
    box-shadow: var(--start-shadow);
    background-position:0% 100%;
    background-size:100% 200%;
    opacity: 0;
    ${'' /* clip-path: polygon(0 50%, 0 50%, 100% 50%, 100% 50%); */}

    
  }
  100%{
    transform: translate(0, 0px);
    box-shadow: var(--end-shadow);
    background-position:0% 200%;
    background-size:100% 200%;
    opacity: 1;
    ${'' /* clip-path: polygon(-20% -20%, -20% 120%, 120% 120%, 120% -20%); */}

  }
`;

export const typing = keyframes`
  0%,50%{
    visibility: hidden;
  }
  51%,100%{
    visibility: visible;
  }
`;

export const rollIntoView = keyframes`
  from {
    opacity: 0;
    transform: translate(-400px, 0) rotate(-360deg);
  }

  to {
    opacity: 1;
    transform: translate(0, 0) rotate(0deg);
  }
`;

export const spotlight = keyframes`
  0% {
    clip-path: circle(5% at 50% 50%);
  }

  20% {
    clip-path:circle(5% at 20% 40%);
  }
  40%{
    clip-path:circle(5% at 80% 70%);
  }
  60%{
    clip-path:circle(5% at 30% 50%);
  }

  80%{
    clip-path:circle(5% at 50% 40%);
  }

  100% {
    clip-path:circle(140% at 50% 50%);
  }
`;

export const openPath = keyframes`
  from {
    clip-path: ellipse(0px 0px at 0% 0%)
  }
  to {
    clip-path: ellipse(300px 300px at 0% 0%)
  }
`;

export const reversePath = keyframes`
  from {
    clip-path: ellipse(300px 300px at 50% 50%)
  }
  to {
    clip-path: ellipse(112px 112px at 300px 300px)
  }
`;

export const slideUp = keyframes`
  from {
    transform: translateY(30%);
    opacity: 0
  }
  to {
    transform: translateY(15%);
    opacity: 1;
  }
`;

export const slideUpText = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0
  }
  to {
    transform: translateY(0%) ;
    opacity: 1;
  }
`;

export const backgroundChange = keyframes`
  from {
    background-size: 1000% 1000%;
    background-position: 50% 50%;
  }
  to {
    background-size: 100% 100%;
    background-position: 50% 50%;

  }
`;

export const makeCircle = keyframes`
  from {
    ${'' /* clip-path: circle(100% at 50% 80%); */}
    border-radius: 0;
    ${'' /* background: black; */}
  }
  to {
    ${'' /* clip-path: circle(2% at 50% 15%); */}
    border-radius: 50%;
    ${'' /* background: gold; */}
  }
`;

export const makeBall = keyframes`
  from {
    ${'' /* background: transparent; */}

    clip-path: circle(2% at 50% -15%)
  }
  to {
    ${'' /* background: gold; */}
    clip-path: circle(2% at 50% 80%);
  }
`;

export const expandCircle = keyframes`
  0% {
    transform: translate(0, 25%);
    clip-path: circle(2% at 50% 15%);
    ${'' /* background: gold; */}
  }

  50% {
    transform: translate(0, 0%);
    clip-path: circle(100% at 50% 0%);
    ${'' /* background: gold */}
  }

  75%{
    transform: translate(0, 0%);
    clip-path: circle(100% at 50% 0%);
    ${'' /* background: transparent; */}
  }

  100% {
    transform: translate(0, 0%);
    clip-path: circle(0% at 50% 0%);
    ${'' /* background: transparent; */}
  }

`;

export const dropBall = keyframes`
  from {
    ${'' /* transform: translate(0, 0%); */}
    top: 10%;
  }
  to {
    ${'' /* transform: translate(0, 70%); */}
    top: 70%;
  }
`;

export const bounceBall = keyframes`
  from {
    transform: translate(0, 70%);
  }
  to {
    transform: translate(0, 0%);
  }
`;

export const bounceCopy = keyframes`
  0% {
    transform: translate(0, 70%);
  }
  100% {
    transform: translate(0, 6%);
  }
`;

export const bounce = keyframes`
  0% {
    top: 70%;
    border-radius: 50%;
    width: 50px;
    ${'' /* transform: translate(0, 70%); */}
  }

  80%{ 
    width: 50px;
  }

  100% {
    top: 40%;
    width: 300px;
    height: 200px;
    left: calc(50% - 150px);
    border-radius: 8px;
    ${'' /* transform: translate(0, 0%); */}
  }
`;

export const closePath = keyframes`
  to {

    clip-path: circle(0%)
  }
`;

export const revealPage = keyframes`
  from {
    clip-path: circle(100% at 50% 15%);
  }
  to {
    clip-path: circle(0% at 50% 15%);
  }
`;

export const removeBall = keyframes`
  from {
    transform: translate(0, 25%);
    clip-path: circle(2% at 50% 15%);
  }
  to {
    transform: translate(0, -10%);
    clip-path: circle(0% at 50% 15%);
  }
`;

export const rotate = keyframes`
  from {
    opacity: 0;
    transform: translate(-200%, 0) rotate(-180deg) scale(0);
  }
  to {
    opacity: 1;
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
`;

export const toTopLeft = keyframes`
  from {
    transform: translate(0%, 70%);
  }
  to {
    transform: translate(-50%, -15%);
  }
`;

export const toPolygon = keyframes`
  from {
    clip-path: circle()
  }
  to {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%)
  }
`;

//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////

const borderRadius = keyframes`
  0% {
    border-radius: 50%;
  }
  100% {
    border-radius: 0px;
  }
`;

const init = keyframes`
  0%{
    clip-path: circle(0% at 50% 50%);
    transform: translate(0, 10vh);
  }
  100%{
    clip-path: circle(var(--size) at 50% 50%);
    transform: translate(0, 0vh);
  }

`;

export const moveIn = keyframes`
  0% {
    margin-top: 50px;
    opacity: 0;
  }
  100% {
    opacity: 1;
    margin-top: -20px;
  }
`;

const scaleIn = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const ripple = keyframes`
  0% {
    transform: scale3d(0, 0, 0);
  }
  50%,
  100% {
    transform: scale3d(1, 1, 1);
  }
  100% {
    opacity: 0;
  }
`;

const change = keyframes`
  from {
    width: 440px;
    height: 280px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    clip-path: circle(30px at 50% 50%);
  }
  to {
    clip-path: circle(100% at 50% 50%);
    width: 440px;
    height: 280px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

const materia = keyframes`
  from {
    background-size: 1000% 1000%;
    background-position: 0% 0%;
    background: linear-gradient(to right, lightblue, blue);
    clip-path: circle(var(--size) at 50% 50%);
  }
  to {
    background-size: 100% 100%;
    background-position: 50% 50%;

    clip-path: circle(100% at 50% 50%);
    background: linear-gradient(to right, lightblue, blue);
  }
`;

// export const lookAround = keyframes`
//     0%,5% {
//       transform: translateX(0%);
//     }

//     6%,15% {
//       transform: translateX(45%);
//     }

//     16%,25% {
//       transform: translateX(0%);
//     }

//     26%,35% {
//       transform: translateX(35%);
//     }

//     36%, 40% {
//       transform: translateX(0%);
//     }

//     41%, 55%{
//       transform: translateY(50%);
//     }

//     56%, 65%{
//       transform: translateX(0%);
//     }

//     66%, 80%{
//       transform: translateX(40%);
//     }

//     81%, 85%{
//       transform: translateX(0%);
//     }
//     86%, 96%{
//       transform: translateX(-37%);
//     }

//     97%, 100%{
//       transform: translateX(0%);
//     }
// `;

export const lookAround = keyframes`
    0%,3% {
      transform: translateX(0%);
    }

    4%,9% {
      transform: translateX(45%);
    }

    10%, 16% {
      transform: translateX(0%);
    }

    17%,21% {
      transform: translateY(35%);
    }
    
    22%, 29% {
      transform: translateX(0%);
    }

    30%, 36%{
      transform: translateX(-24%);
    }

    37%, 45%{
      transform: translateX(0%);
    }
    
    46%, 54%{
      transform: translateY(34%);
    }

    55%, 60%{
      transform: translateX(0%);
    }
    61%, 68%{
      transform: translateX(-37%);
    }

    69%, 74%{
      transform: translateX(0%);
    }
    75%,79% {
      transform: translateY(30%);
    }
    80%, 83% {
      transform: translateY(0%);
    }
    84%, 88%{
      transform: translateY(36%)
    }
    89%, 100%{
      tranform: translateX(0%);
    }
    96%, 98%{
      transform: translateX(0%);
    }
    99%, 100% {
      tranform: translateX(0%);
    }
`;

export const eyesWide = keyframes`
  0% { 
    padding: 22px;
  }

  5%{
    padding: 26px;
  }

  100% { 
    padding: 26px
  }
`;

const goofySmile = keyframes`
  0% {
    border-radius: 24px 24px 24px 24px;
    clip-path: polygon(0% 40%, 100% 40%, 100% 60%, 0% 60%);
  }
  50%{
    clip-path: polygon(0% 40%, 100% 40%, 100% 90%, 0% 90%);
  }
  100%{
    borderRadius: 6px 6px 24px 24px;
    clip-path: polygon(4% 20%, 100% 20%, 80% 90%, 6% 80%);

    ${'' /* clip-path: polygon(0% 20%, 100% 20%, 80% 100%, 0% 80%); */}
  }

`;

export const textAnimation = keyframes`
  0% {
    transform: translate(var(--distance), 0);
  }

  100% {
    opacity: 1.0;
    transform:translate(0, 0)
  }
`;

const moveDown = keyframes`
  0% {
    transform: translate(0, 0%);
  }
  50% {
    transform: translate(0, -25%);
  }
  100% {
    transform: translate(0, 100%);
  }
`;

const moveUp = keyframes`
  0% {
    transform: translate(0, 100%);
  }
  50% {
    transform: translate(0, -25%);
  }
  100% {
    transform: translate(0, 0%);
  }
`;

const moveRight = keyframes`
  0% {
    transform: translateX(0%);
  }
  65% {
    transform: translateX(-25%);
  }
  100% {
    transform: translateX(200%);
  }
`;

const moveLeft = keyframes`
  0% {
    transform: translateX(200%);
  }
  35% {
    transform: translateX(-5%);
  }
  100% {
    transform: translateX(0%);
  }
`;

const raiseCardLight = keyframes`
  to {
    background: hsl(223 35% 85% / 0.5);
    ${'' /* transform: perspective(500px) translateZ(12px); */}
    box-shadow:
       2px 2px 4px hsl(210 5% 38% / 0.1),
       3px 3px 6px hsl(210 5% 38% / 0.1),
       4px 4px 8px hsl(210 5% 38% / 0.1),
       5px 5px 10px hsl(210 5% 38% / 0.1),
       6px 6px 12px hsl(210 5% 38% / 0.1),
       7px 7px 14px hsl(210 5% 38% / 0.1),
       8px 8px 16px hsl(210 5% 38% / 0.1),
       9px 9px 18px hsl(210 5% 38% / 0.1);

  }
`;

const raiseCardDark = keyframes`
  to {
    ${'' /* background: hsl(223 5% 15% / 0.5); */}
    background: #292929;
    ${'' /* transform: perspective(500px) translateZ(12px); */}
    box-shadow:
       2px 2px 4px hsl(210 5% 5% / 0.3),
       3px 3px 6px hsl(210 5% 5% / 0.3),
       4px 4px 8px hsl(210 5% 5% / 0.3),
       5px 5px 10px hsl(210 5% 5% / 0.3),
       6px 6px 12px hsl(210 5% 5% / 0.3)
  }
`;

export const expand = keyframes`
  to {
    opacity: 1;
    clip-path: circle(100% at 50% 50%);
  }
`;

export const contract = keyframes`
  from {
    clip-path: circle(100% at 50% 50%);
  }
  to {
    clip-path: circle(0% at 50% 50%);
  }
`;

export const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const animations = {
  init,
  borderRadius,
  moveDown,
  moveUp,
  moveRight,
  moveLeft,
  materia,
  scaleIn,
  ripple,
  change,
  expand,
  contract,
  fadeIn,
  fadeOut,
  raiseCardLight,
  raiseCardDark,
  goofySmile,
};
