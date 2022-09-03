import ContactForm from '@components/ContactForm';
import Head from '@components/Head';
import PageTitle from '@components/PageTitle';
import { P } from '@components/Text';
import { Main } from '@components/Layout';

export default function Contact() {
  return (
    <Main id="main-content">
      <Head title="Contact" description="If you want to get in touch, here's how.." />
      <PageTitle inline>Contact Me</PageTitle>

      <P>
        Wanna get in touch? Send me a message using the form below. All messages go straight to my
        inbox.
      </P>
      <ContactForm />
    </Main>
  );
}
