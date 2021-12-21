import BlogHeader from '@components/BlogHeader';
import DocumentHead from '@components/Head';
import Section from '@components/Section';
import SideNote from '@components/SideNote';
import { postFilePaths, POSTS_PATH } from '@utils/mdxUtils';
import fs from 'fs';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import path from 'path';
import Prism from 'prismjs';
import { useEffect } from 'react';

const components = {
  SideNote,
  Section,
};

export default function PostPage({ source, frontMatter }) {
  useEffect(() => {
    async function copyText(selectedText) {
      try {
        await navigator.clipboard.writeText(selectedText);
        console.log('text copied clipboard');
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }

    setTimeout(() => {
      Prism.plugins.toolbar.registerButton('copy', function (env) {
        const button = document.createElement('button');
        button.innerHTML = 'Copy snippet';

        button.addEventListener('click', function () {
          // Source: http://stackoverflow.com/a/11128179/2757940
          if (document.body.createTextRange) {
            // ms
            const range = document.body.createTextRange();
            range.moveToElementText(env.element);
            range.select();
          }
          else if (window.getSelection) {
            // moz, opera, webkit
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(env.element);
            selection.removeAllRanges();
            selection.addRange(range);
            copyText(selection.toString())
              .then(selection.removeAllRanges())
              .then(() => {
                button.innerHTML = 'Snippet Copied to clipboard!';
                button.style.color = 'white';
                button.style.transition = 'all 0.3s ease';
              })
              .then(() =>
                setTimeout(() => {
                  button.innerHTML = 'Copy snippet';
                }, 2000)
              )
              .catch(console.log);
          }
        });

        return button;
      });
      Prism.highlightAll();
      console.log(Prism.plugins);
    }, 0);
  }, []);

  return (
    // <MaxWidthWrapper>
    <>
      <DocumentHead title={frontMatter.title} desc={frontMatter.description} />
      <div style={{ marginTop: '32px' }}>
        <BlogHeader>{frontMatter}</BlogHeader>
      </div>
      <main>
        <MDXRemote {...source} components={components} />
      </main>
    </>
    // </MaxWidthWrapper>
  );
}

export const getStaticProps = async ({ params }) => {
  const filename = fs
    .readdirSync(POSTS_PATH)
    .filter((file) => file.slice(0, file.lastIndexOf('.')) === params.slug)
    .join('');

  const postFilePath = path.join(POSTS_PATH, filename);
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
