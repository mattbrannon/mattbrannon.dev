import ContactForm from '@components/ContactForm';
import Head from '@components/Head';
import PageTitle from '@components/PageTitle';
import { P } from '@components/Text';

export default function Contact() {
  return (
    <>
      <Head title="Contact" description="If you want to get in touch, here's how.." />
      <PageTitle inline>Contact Me</PageTitle>

      <P>
        Wanna get in touch? Send me a message using the form below. All messages go straight to my
        inbox.
      </P>
      <ContactForm />
    </>
  );
}
