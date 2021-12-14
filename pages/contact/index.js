import { TopRow } from '@components/Layout';
import PageTitle from '@components/PageTitle';
import ContactForm from '@components/ContactForm';

{
  /* <DocumentHead title="Contact" desc="If you want to get in touch, here's how.." /> */
}

export default function Contact() {
  return (
    <section id="contact">
      <TopRow>
        <PageTitle>Contact Me</PageTitle>
      </TopRow>
      <p>
        Wanna get in touch? Send me a message using the form below. All messages go
        staight to my inbox.
      </p>
      <ContactForm />
    </section>
  );
}
