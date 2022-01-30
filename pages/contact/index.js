import ContactForm from '@components/ContactForm';
import Layout from '@components/Layout';
import PageTitle from '@components/PageTitle';
import Head from '@components/Head';

{
  /* */
}

export default function Contact() {
  return (
    <Layout>
      <Head title="Contact" description="If you want to get in touch, here's how.." />
      <PageTitle>Contact Me</PageTitle>

      <p>
        Wanna get in touch? Send me a message using the form below. All messages go
        staight to my inbox.
      </p>
      <ContactForm />
    </Layout>
  );
}
