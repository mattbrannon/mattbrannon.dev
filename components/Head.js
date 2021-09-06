import Head from 'next/head';

export default function DocumentHead({ desc, title }) {
  return (
    <Head>
      <meta name="description" content={desc} />
      <meta property="og:title" content={title} key="title" />
      <title>{title}</title>
    </Head>
  );
}
