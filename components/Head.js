import Head from 'next/head';

export default function DocumentHead({ desc, title, children }) {
  return (
    <Head>
      <meta name="description" content={desc} />
      <meta property="og:title" content={title} key="title" />
      <title>{title}</title>
      <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon" />
      {children}
    </Head>
  );
}
