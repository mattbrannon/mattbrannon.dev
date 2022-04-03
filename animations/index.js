import { keyframes } from 'styled-components';
export { textGeneratorVariant } from './variants';

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

export const lookAround2 = keyframes`
0%, 2% { transform: translateY(0%); }
3%, 6% { transform: translateX(10%); }
7%, 12% { transform: translateX(0%); }
13%, 16% { transform: translateX(22%); }
17%, 24% { transform: translateY(-17%); }
25%, 28% { transform: translateX(20%); }
29%, 35% { transform: translateX(0%); }
36%, 40% { transform: translateX(27%); }
41%, 46% { transform: translateY(0%); }
47%, 53% { transform: translateX(10%); }
54%, 59% { transform: translateX(-23%); }
60%, 63% { transform: translateX(24%); }
64%, 72% { transform: translateY(0%); }
73%, 77% { transform: translateX(23%); }
78%, 83% { transform: translateX(0%); }
84%, 88% { transform: translateX(18%); }
89%, 95% { transform: translateY(-18%); }
96%, 100% { transform: translateX(10%); }
`;

export const goofySmile = keyframes`
  0% {
    padding: 3% 0;
    border-radius: 24px 24px 24px 24px;
    clip-path: polygon(0% 40%, 100% 40%, 100% 60%, 0% 60%);
  }
  50%{
    clip-path: polygon(0% 40%, 100% 40%, 100% 90%, 0% 90%);
  }
  100%{
    padding: 6% 0;
    border-radius: 6px 6px 24px 24px;
    clip-path: polygon(4% 20%, 100% 20%, 80% 90%, 6% 80%);

    /* clip-path: polygon(0% 20%, 100% 20%, 80% 100%, 0% 80%); */
  }
`;
