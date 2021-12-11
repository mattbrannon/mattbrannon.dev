import styled from 'styled-components/macro';
import { SectionTitle } from './PageTitle';

export default function AboutMe() {
  return (
    <Article>
      <SectionTitle animate>About Me</SectionTitle>
      <p>
        I've always had an interest in tech. When I was a little kid, my dad taught me how to work
        my way around an MS-DOS system. When I got a little older and had my first Mac, I started
        learning all about Unix systems and how to work from the command line.
      </p>
      <p>
        Since that time, I've had the opportunity to work with and learn from some wonderful people.
        A couple years ago, I was fortunate enough to join Hack Reactor's 38th cohort in Austin, Tx.
        After graduating, I stayed on as a resident for an additional two cohorts. After my
        residency with Hack Reactor, I flew halfway around the world to a little country on the
        Northern tip of Africa called Tunisia to work as a full-time instructor in the country's
        first and only coding bootcamp.
      </p>

      <p>
        Read more about my time in Tunisa <b>here</b>
      </p>

      <p></p>
    </Article>
  );
}

// I took the plunge
//         into software development a little later in life once it became clear that fame and fortune
//         in the music industry would continue to elude me.

const Article = styled.article`
  ${'' /* background: dimgrey; */}
`;
