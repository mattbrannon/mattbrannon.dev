import fs from 'fs';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import path from 'path';
import { MaxWidthWrapper } from '../../components/MaxWidth';
import BlogHeader from '../../components/BlogHeader';
import Section from '../../components/Section';
import { postFilePaths, POSTS_PATH } from '../../utils/mdxUtils';
import 'prismjs/themes/prism-tomorrow.css';
import prism from 'prismjs';
import { useEffect } from 'react';
import DocumentHead from '../../components/Head';

const components = {
  Section,
};

export default function PostPage({ source, frontMatter }) {
  useEffect(() => {
    prism.highlightAll();
  }, []);

  return (
    <MaxWidthWrapper>
      <DocumentHead title={frontMatter.title} desc={frontMatter.description} />
      <div>
        <BlogHeader>{frontMatter}</BlogHeader>
      </div>
      <main>
        <MDXRemote {...source} components={components} />
      </main>
    </MaxWidthWrapper>
  );
}

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};