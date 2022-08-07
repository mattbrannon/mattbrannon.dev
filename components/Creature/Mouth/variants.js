import { makeClipPath } from '@utils/helpers.js';

export const talking = {
  initial: {
    clipPath: 'polygon(0% 48%, 100% 48%, 100% 52%, 0% 52%)',
    borderRadius: '1000px 1000px 1000px 1000px',
  },
  animate: ({ amount }) => ({
    borderRadius: '1000px 1000px 1300px 1300px',
    clipPath: makeClipPath(amount),
    transition: { delay: 1, duration: amount / 8 },
  }),
};

export const smiling = {
  initial: {
    '--mouth-padding': '1%',
    borderRadius: '2px 2px 2px 2px',
    width: '100%',
  },
  animate: {
    '--mouth-padding': '6%',
    borderRadius: '4px 4px 24px 24px',
    width: '65%',
  },
  transition: {
    delay: 1,
    duration: 0.6,
    repeat: 1,
    repeatType: 'mirror',
    repeatDelay: 3,
  },
};

export const frowning = {
  initial: {
    '--mouth-padding': '1%',
    borderRadius: '2px 2px 2px 2px',
    width: '100%',
  },
  animate: {
    '--mouth-padding': '6%',
    borderRadius: '24px 24px 4px 4px',
    width: '65%',
  },
  transition: {
    delay: 1,
    duration: 0.6,
    repeat: 1,
    repeatType: 'mirror',
    repeatDelay: 3,
  },
};

export const smirking = {
  initial: {
    padding: '3% 0',
    borderRadius: '24px 24px 24px 24px',
    clipPath: 'polygon(0% 40%, 100% 40%, 100% 60%, 0% 60%)',
  },
  animate: {
    clipPath: [
      'polygon(0% 40%, 100% 40%, 100% 60%, 0% 60%)',
      'polygon(0% 40%, 100% 40%, 100% 90%, 0% 90%)',
      'polygon(4% 20%, 100% 20%, 80% 90%, 6% 80%)',
    ],
    padding: '6% 0',
    borderRadius: '6px 6px 24px 24px',
    transition: {
      clipPath: {
        repeat: Infinity,
        repeatType: 'mirror',
        repeatDelay: 10,
        duration: 1,
      },
    },
  },
};

export const open = {
  initial: { padding: '1%' },
  animate: { padding: '5% 0', borderRadius: '80px' },
};

export const closed = {
  initial: { padding: '5% 0', borderRadius: '80px' },
  animate: { padding: '1%' },
};

export const shocked = {
  initial: { '--mouth-padding': '1px', '--mouth-margin': 'calc(var(--mouth-padding) * -2)' },
  animate: {
    '--mouth-padding': '48px',
    '--mouth-margin': 'calc(var(--mouth-padding) * -2)',
    transition: { delay: 1, duration: 1 },
  },
};
