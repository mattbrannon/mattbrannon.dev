import ContactForm from '@components/ContactForm';
import Head from '@components/Head';
import { PageTitle } from '@components/PageTitle';
import { text } from '@components/Text';

import { layout } from '@components/Layout';

export default function Contact() {
  return (
    <layout.page id="main-content">
      <Head title="Contact" description="Want to get in touch? Send me a message here. It goes straight to my inbox." />
      <PageTitle inline>Contact Me</PageTitle>
      <text.paragraph>
        Wanna get in touch? Send me a message using the form below. All messages go straight to my inbox.
      </text.paragraph>
      <ContactForm />
    </layout.page>
  );
}
