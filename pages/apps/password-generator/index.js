import { AppTitle } from '@components/AppTitle';
import { ExternalLink } from '@components/Links';
import Head from '@components/Head';
import { H2Link, H3Link } from '@components/Headings';
import PageButtons from '@components/PageButtons';
import { Spacer } from '@components/Spacer';
import { text } from '@components/Text';
import { VideoPlayer } from '@components/VideoPlayer';
import styled from 'styled-components';
import { memo, useState } from 'react';
import { Blockquote, SideNote } from '@components/SideNote';
import { Button } from '@components/Button';
import { SyntaxHighlighter } from '@components/SyntaxHighlighter';

const entropyCode = `
const charMap = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: \`!@#$%^&*()_-+={[}]|\\<,>.?/;:'"\\\`~\`,
};

const getMatches = (password) => {
  const lower = /[a-z]+/g;
  const upper = /[A-Z]+/g;
  const nums = /[0-9]+/g;
  const syms = /[!@#$%^&*()_-+={[}]|\\<,>.?/;:'"\`~ ]+/g;

  const lowercase = password.match(lower);
  const uppercase = password.match(upper);
  const numbers = password.match(nums);
  const symbols = password.match(syms);

  return { lowercase, uppercase, numbers, symbols };
};

const getCharSpace = (password) => {
  const matches = getMatches(password);
  return Object.keys(charMap)
    .filter((key) => matches[key])
    .reduce((acc, key) => charMap[key].length + acc, 0);
};

const calculateEntropy = (password) => {
  const chars = getCharSpace(password);
  const n = Math.pow(chars, password.length);
  return Math.log10(n) / Math.log10(2);
};
`;

export default memo(function PasswordGenerator() {
  const [hasClicked, setHasClicked] = useState(false);

  const links = {
    liveSite: 'https://mattbrannon-password-generator.vercel.app/',
    github: 'https://github.com/mattbrannon/coding-challenges/tree/main/password-generator',
  };

  const sources = ['/videos/password-generator.mp4', '/videos/password-generator.webm'];

  return (
    <article>
      <Head title="Password Generator" description="Password Generator app" />
      <AppTitle rounded center title="Password Generator" sources={sources} links={links}>
        Configurable random password generator.
      </AppTitle>
      <section>
        <Heading>Motivation</Heading>

        <text.paragraph>
          A few years ago I wrote a{' '}
          <ExternalLink href="https://github.com/mattbrannon/password-generator">
            shell script for generating random passwords
          </ExternalLink>
          . I was pretty proud of it and I still use it to this day. I always wanted to make a UI for it. But I also
          know that if I try and design it myself, I'm going to get all caught up in the weeds for way too long
          obsessing about things that don't matter. So it remained a shell script.
        </text.paragraph>
        <text.paragraph>
          Then, recently I was looking at some website designs on{' '}
          <ExternalLink href="https://frontendmentor.io">Frontend Mentor</ExternalLink>. One of the first designs that
          caught my eye was the design for a password generator. So I downloaded the design files and got to work.
        </text.paragraph>

        <SideNote>The link above is NOT an affiliate link. It's just where the design came from.</SideNote>
      </section>

      <section>
        <Heading>Planning</Heading>
        <text.paragraph>
          Having a design file to work from really simplified things and allowed me to focus entirely on building rather
          than creating. I spent a few minutes jotting down the typography and color values so I'd have them on hand
          when needed. Then a few minutes looking at the design in Figma determining the different individual components
          of the app.
        </text.paragraph>
        <text.paragraph>
          Before moving on to writing any actual code, I like to take a few minutes and diagram the interactions between
          components and make sure I have a solid mental model for managing the application state under various
          conditions. It may seem like overkill for an app this size but, I've found that taking the extra time to be
          thorough, more often than not, reveals at least one thing I had previously overlooked. And it's much easier to
          make adjustments at this stage.
        </text.paragraph>

        {/* <text.paragraph>
          The value of taking the time to plan ahead before ever writing a line of code cannot be overstated. Depending
          on the size and scope of the app in question, having a plan of attack in place beforehand can save you hours,
          days, weeks, or even months of work.
        </text.paragraph>
        <text.paragraph>
          With an app this size and Figma design ready to go, the planning phase doesn't have to take a long time. For
          this app, I spent a few minutes jotting down the typography and color values so I'd have them on hand when
          needed. Then a few minutes looking at the design in Figma determining the different individual components of
          the app.
        </text.paragraph> */}
      </section>

      <section>
        <Heading>Research</Heading>
        <text.paragraph>To make a good password generator, a few basic questions needed to be answered.</text.paragraph>

        <ul>
          <li>What makes a good/bad password?</li>
          <li>How is the strength of a password determined?</li>
          <li>Which is more important complexity or length?</li>
        </ul>

        <text.paragraph>
          In order to answer those questions, we need to understand the concept of entropy.
        </text.paragraph>
      </section>
      <section>
        <SubHeading>What is entropy?</SubHeading>
        {/* <SideNote></SideNote> */}

        <SideNote>
          A thermodynamic quantity representing the unavailability of a system's thermal energy for conversion into
          mechanical work, often interpreted as the degree of disorder or randomness in the system.
          <span style={{ position: 'relative', display: 'block' }}>
            <cite
              style={{
                position: 'absolute',
                right: '0px',
                transform: 'translate(-50%, -75%)',
                textAlign: 'right',
                fontFamily: 'Jost',
                fontStyle: 'normal',
                fontVariationSettings: "'wght' 200, 'ital' 2 ",
              }}
            >
              Oxford Languages
            </cite>
          </span>
        </SideNote>
        <text.paragraph>
          A good analogy for entropy is melting ice. When the ice is frozen solid, there is very little entropy. The
          molecules within the ice are fixed in space with very little movement. As the ice melts, the molecules have
          more freedom to move through space. As heat continues to raise the temperature, the ice turns into water,
          before finally turning into a gas. Each of these stages is an increase in entropy. The solid ice is stable and
          predictable. The liquid water is less predictable than the ice. The steam from evaporated water is less
          predictable than both.
        </text.paragraph>
        <text.paragraph>
          <em>We want our passwords to be like steam.</em>
        </text.paragraph>

        <SideNote>
          This is the definition is for entropy in physics. Entropy in cryptography is, while not entirely the same
          concept, fundamentally rooted in the same principles of measuring uncertainty.
        </SideNote>
      </section>

      <section>
        {/* <Heading>Challenges</Heading> */}
        <text.paragraph>
          But how do we calculate a value for entropy? First we need to determine which character sets the password is
          using. Character sets typically fall into these categories:
        </text.paragraph>
        <ul>
          <li>Lowercase letters: 26</li>
          <li>Uppercase letters: 26</li>
          <li>Numbers: 10</li>
          <li>Symbols: 33 (if all symbols allowed)</li>
        </ul>

        <text.paragraph>Once we've determined the length of the character set, we use the formula</text.paragraph>

        <SyntaxHighlighter
          code={'const entropy = password.length * Math.log(charSet.length) / Math.log(2)'}
          language="js"
        />

        <text.paragraph>
          A password 8 characters long using all four character sets has 52.5 bits of entropy. By current standards,
          this is not a lot. A password with 52 bits of entropy wouldn't necessarily be easy to crack. But it wouldn't
          necessarily be difficult either. It really all depends on the attacker and their capabilities. That is
          assuming your password isn't something like <code>P@s5w0Rd</code>
        </text.paragraph>

        <text.paragraph>
          Generally speaking, the longer your password the more secure it is. Complexity helps but length is more
          important for adding bits of entropy. A 10 character password consisting of lowercase and uppercase characters
          will generate 57 bits of entropy. This <em>might</em> be ok but adding an additional 4 characters will
          generate nearly 80 bits of entropy, which is more than enough by current standards.
        </text.paragraph>

        {/* <Spacer size={64} />
        <text.paragraph>So, based on all that, which of these do you think is the stronger password?</text.paragraph>
        <ButtonGroup>
          <Button onClick={() => setHasClicked(true)}>|-|@c|&lt;3R</Button>
          <Button onClick={() => setHasClicked(true)}>fried okra is gross</Button>
        </ButtonGroup> */}
      </section>

      <section>
        <Heading>Roadmap forward</Heading>
        <text.paragraph>
          The original design didn't have any mention an entropy meter. But I thought it would be a nice feature so I
          added it. I'd also like to add the ability for users to enter their own password and gauge their entropy
          levels. Another cool thing would be the ability to generate random pass phrases instead of passwords.
          Something like <code>fried:okra is:gross</code> will generate over 111 bits of entropy. And it's much easier
          to remember.
        </text.paragraph>
      </section>
      <PageButtons prev="/apps/monty-hall" next="/apps/lets-make-a-gif" />
    </article>
  );
});

const FlexContainer = styled.div`
  display: flex;
  gap: 16px;
  margin: 32px 0 0 0;
  object-fit: cover;
  max-height: ${(p) => p.max || 320}px;

  flex-direction: ${(p) => (p.column ? 'column' : 'row')};
`;

const ImageCaption = styled.small`
  margin-bottom: 32px;
`;

const Heading = styled(H2Link)`
  /* margin: 64px 0 8px 0; */
  font-size: var(--size28);
  color: var(--h2);
`;

const SubHeading = styled(H3Link)`
  font-size: var(--size21);
  color: var(--h4);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: clamp(16px, 5vw, 32px);
  align-items: center;
  /* flex-wrap: wrap; */
  justify-content: space-evenly;

  margin: 32px 0;
  padding: 32px 0;
  padding-top: 0;
  margin: auto;
  width: 100%;
`;
