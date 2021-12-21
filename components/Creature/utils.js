export const setVariables = (index) => {
  // const hue = index * 60;
  const cubeWidth = 'var(--cube-width)';
  const cubeHeight = 'var(--cube-height)';
  const depth = 'var(--depth)';
  const coefficient = index === 1 ? -0.5 : 0.5;
  const rotation = index === 4 || index === 6 ? -90 : 90;
  const rotate =
    index === 3 || index === 4 ? `rotateY(${rotation}deg)` : `rotateX(${rotation}deg)`;
  const topLeft = index > 2 && '50%';
  const sideWidth = index === 3 || index === 4 ? 'var(--depth)' : 'var(--cube-width)';
  const sideHeight = index === 5 || index === 6 ? 'var(--depth)' : 'var(--cube-height)';
  const direction =
    index === 3 || index === 4
      ? cubeWidth
      : index === 5 || index === 6
      ? cubeHeight
      : undefined;
  const translate3d =
    index > 2
      ? `0, 0, calc(${direction} * ${coefficient})`
      : `0, 0, calc(${depth} * ${coefficient})`;

  const width = index > 2 ? sideWidth : 'var(--cube-width)';
  const height = index > 2 ? sideHeight : 'var(--cube-height)';
  const transform =
    index > 2
      ? `translate(-${topLeft}, -${topLeft}) ${rotate} translate3d(${translate3d})`
      : `translate3d(${translate3d})`;

  // const background = `hsl(${hue} 100% 50% / 1)`;
  const background = index === 5 ? '#876543' : 'tan';

  return {
    '--topLeft': topLeft,
    '--background': background,
    '--width': width,
    '--height': height,
    '--transform': transform,
  };
};

export const pathA = `
M0 37
L1 37.8
C2 38.7 4 40.3 6 38.2
C8 36 10 30 11.8 25.8
C13.7 21.7 15.3 19.3 17.2 21
C19 22.7 21 28.3 23 30.3
C25 32.3 27 30.7 29 28.8
C31 27 33 25 34.8 24.5
C36.7 24 38.3 25 40.2 25.5
C42 26 44 26 46 25
C48 24 50 22 52 20
C54 18 56 16 57.8 16
C59.7 16 61.3 18 63.2 19.7
C65 21.3 67 22.7 69 21.8
C71 21 73 18 75 16.5
C77 15 79 15 81 16.7
C83 18.3 85 21.7 86.8 26.3
C88.7 31 90.3 37 92.2 37.5
C94 38 96 33 98 31.5
C100 30 102 32 104 33.7
C106 35.3 108 36.7 109.8 36
C111.7 35.3 113.3 32.7 115.2 31.7
C117 30.7 119 31.3 121 28.8
C123 26.3 125 20.7 127 21.5
C129 22.3 131 29.7 132.8 30.5
C134.7 31.3 136.3 25.7 138.2 25
C140 24.3 142 28.7 144 30.5
C146 32.3 148 31.7 149 31.3
L150 31
L150 0
L149 0
C148 0 146 0 144 0
C142 0 140 0 138.2 0
C136.3 0 134.7 0 132.8 0
C131 0 129 0 127 0
C125 0 123 0 121 0
C119 0 117 0 115.2 0
C113.3 0 111.7 0 109.8 0
C108 0 106 0 104 0
C102 0 100 0 98 0
C96 0 94 0 92.2 0
C90.3 0 88.7 0 86.8 0
C85 0 83 0 81 0
C79 0 77 0 75 0
C73 0 71 0 69 0
C67 0 65 0 63.2 0
C61.3 0 59.7 0 57.8 0
C56 0 54 0 52 0
C50 0 48 0 46 0
C44 0 42 0 40.2 0
C38.3 0 36.7 0 34.8 0
C33 0 31 0 29 0
C27 0 25 0 23 0
C21 0 19 0 17.2 0
C15.3 0 13.7 0 11.8 0
C10 0 8 0 6 0
C4 0 2 0 1 0
L0 0
Z`;

export const pathB = `
M0 36
L1 33.8
C2 31.7 4 27.3 6 27.3
C8 27.3 10 31.7 11.8 32.2
C13.7 32.7 15.3 29.3 17.2 27.3
C19 25.3 21 24.7 23 27.3
C25 30 27 36 29 37
C31 38 33 34 34.8 34.5
C36.7 35 38.3 40 40.2 37.8
C42 35.7 44 26.3 46 23.5
C48 20.7 50 24.3 52 28
C54 31.7 56 35.3 57.8 37.3
C59.7 39.3 61.3 39.7 63.2 36.5
C65 33.3 67 26.7 69 25
C71 23.3 73 26.7 75 29.8
C77 33 79 36 81 34
C83 32 85 25 86.8 23.5
C88.7 22 90.3 26 92.2 25.8
C94 25.7 96 21.3 98 21.7
C100 22 102 27 104 26.3
C106 25.7 108 19.3 109.8 19.5
C111.7 19.7 113.3 26.3 115.2 26.8
C117 27.3 119 21.7 121 19
C123 16.3 125 16.7 127 18.2
C129 19.7 131 22.3 132.8 24.5
C134.7 26.7 136.3 28.3 138.2 26.7
C140 25 142 20 144 19.2
C146 18.3 148 21.7 149 23.3
L150 25
L150 0
L149 0
C148 0 146 0 144 0
C142 0 140 0 138.2 0
C136.3 0 134.7 0 132.8 0
C131 0 129 0 127 0
C125 0 123 0 121 0
C119 0 117 0 115.2 0
C113.3 0 111.7 0 109.8 0
C108 0 106 0 104 0
C102 0 100 0 98 0
C96 0 94 0 92.2 0
C90.3 0 88.7 0 86.8 0
C85 0 83 0 81 0
C79 0 77 0 75 0
C73 0 71 0 69 0
C67 0 65 0 63.2 0
C61.3 0 59.7 0 57.8 0
C56 0 54 0 52 0
C50 0 48 0 46 0
C44 0 42 0 40.2 0
C38.3 0 36.7 0 34.8 0
C33 0 31 0 29 0
C27 0 25 0 23 0
C21 0 19 0 17.2 0
C15.3 0 13.7 0 11.8 0
C10 0 8 0 6 0
C4 0 2 0 1 0
L0 0
Z`;

export const getSvgPath = () => {
  return {
    pathA: pathA,
    pathB: pathB,
  };
};
