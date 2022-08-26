import styled from 'styled-components';

export const RootContainer = styled.div`
  --fontFamily: Recursive;
  --fontSize: 20vw;
  --fontVariationSettings: 'wght' 1000, 'slnt' -6, 'CASL' 0, 'CRSV' 1, 'MONO' 0;

  --gradient: linear-gradient(0deg, hsl(0deg, 0%, 0%) 26%, hsl(154deg, 75%, 33%) 76%);
  --strokeColor: rgba(255, 193, 122, 1);
  --strokeWidth: 0.0125em;
  --shadow: 0em 0em 0em hsl(46.3deg, 100%, 45.81%), -0.01em -0.01em 0em hsl(45.6deg, 100%, 44.62%),
    -0.01em -0.01em 0em hsl(44.9deg, 100%, 43.43%), -0.01em -0.01em 0em hsl(44.2deg, 100%, 42.24%),
    -0.02em -0.02em 0em hsl(43.5deg, 100%, 41.05%), -0.02em -0.02em 0em hsl(42.8deg, 100%, 39.86%),
    -0.02em -0.02em 0em hsl(42.1deg, 100%, 38.67%),
    -0.03em -0.03em 0.01em hsl(41.4deg, 100%, 37.48%),
    -0.03em -0.03em 0.01em hsl(40.7deg, 100%, 36.29%),
    -0.03em -0.03em 0.01em hsl(40.1deg, 100%, 35.1%),
    -0.04em -0.04em 0.01em hsl(39.4deg, 100%, 33.91%),
    -0.04em -0.04em 0.01em hsl(38.7deg, 100%, 32.72%),
    -0.04em -0.04em 0.01em hsl(38deg, 100%, 31.53%),
    -0.05em -0.05em 0.01em hsl(37.3deg, 100%, 30.34%),
    -0.05em -0.05em 0.01em hsl(36.6deg, 100%, 29.15%),
    -0.05em -0.05em 0.01em hsl(35.9deg, 100%, 27.96%),
    -0.06em -0.06em 0.01em hsl(35.2deg, 100%, 26.77%),
    -0.06em -0.06em 0.01em hsl(34.5deg, 100%, 25.58%),
    -0.06em -0.06em 0.01em hsl(33.8deg, 100%, 24.39%),
    -0.07em -0.07em 0.01em hsl(33.2deg, 100%, 23.2%),
    -0.07em -0.07em 0.01em hsl(32.5deg, 100%, 22.01%),
    -0.08em -0.08em 0.02em hsl(31.8deg, 100%, 20.82%),
    -0.08em -0.08em 0.02em hsl(31.1deg, 100%, 19.63%),
    -0.08em -0.08em 0.02em hsl(30.4deg, 100%, 18.44%),
    -0.09em -0.09em 0.02em hsl(29.7deg, 100%, 17.25%),
    -0.09em -0.09em 0.02em hsl(29deg, 100%, 16.06%);
`;

export const Text = styled.div`
  display: block;
  font-size: var(--fontSize);

  margin: 0 auto;
  padding: 24px 0;

  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;

  font-variation-settings: var(--fontVariationSettings);
  background-image: var(--gradient);


  &:before {
    content: '${(p) => p.children}';
    text-shadow: var(--shadow);
    position: absolute;
    z-index: -1;
    -webkit-text-stroke: var(--strokeWidth) var(--strokeColor);

  }


`;
