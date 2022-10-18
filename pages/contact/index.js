import ContactForm from '@components/ContactForm';
import Head from '@components/Head';
import { PageTitle } from '@components/PageTitle';
import { text } from '@components/Text';

import { Main } from '@components/Layout';

export default function Contact() {
  return (
    <Main id="main-content">
      <Head title="Contact" description="If you want to get in touch, here's how.." />
      <PageTitle inline>Contact Me</PageTitle>
      <text.paragraph>
        Wanna get in touch? Send me a message using the form below. All messages go straight to my inbox.
      </text.paragraph>
      <ContactForm />
    </Main>
  );
}
