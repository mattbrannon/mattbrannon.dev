export const options = {
  duration: 3000,
  delay: 1700, // 17000,
  fill: 'both',
  iterations: 1,
  easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.05)',
};

export const gradientFrames = [
  {
    offset: 0,
    // width: '0%',
    fontVariationSettings: 'var(--decovar-checkered)',
    opacity: 0,
    backgroundSize: '100% 10000%',
    clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
  },
  {
    offset: 0.01,
    // width: '1%',
    fontVariationSettings: 'var(--decovar-checkered)',
  },
  {
    offset: 0.3,
    // width: '30%',
    fontVariationSettings: 'var(--decovar-striped)',
  },
  {
    offset: 0.6,
    // width: '60%',
    fontVariationSettings: 'var(--decovar-open)',
    backgroundSize: '100% 220%',
  },

  {
    offset: 1,
    // width: '94%',
    fontVariationSettings: 'var(--decovar-end)',
    backgroundSize: '100% 100%',
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    opacity: 1,
  },
];

export const shadowFrames = [
  {
    offset: 0,
    // width: '0%',
    fontVariationSettings: 'var(--decovar-checkered)',
    textShadow: 'none',
    clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
  },
  {
    offset: 0.01,
    // width: '1%',
    fontVariationSettings: 'var(--decovar-checkered)',
    opacity: 1,
  },
  {
    offset: 0.3,
    // width: '30%',
    fontVariationSettings: 'var(--decovar-striped)',
    textShadow: `
    var(--text-shadow1), 
    `,
  },
  {
    offset: 0.6,
    // width: '60%',
    fontVariationSettings: 'var(--decovar-open)',
    textShadow: `
    var(--text-shadow1), 
    var(--text-shadow2)
    `,
  },
  {
    offset: 1,
    // width: '94%',
    fontVariationSettings: 'var(--decovar-end)',
    textShadow: `
    var(--text-shadow1), 
    var(--text-shadow2),
    var(--text-shadow3)
    `,
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
  },
];

// 1px	0.06em
// 2px	0.13em
// 3px	0.19em
// 4px	0.3em
// 5px	0.3em
// 6px	0.4em

/* 
default
open
worm
checkered
checkered-reverse
striped
rounded
flared
flared-open
rounded-slab
sheared
bifurcated
inline
slab
contrast
fancy
mayhem
random 
*/
