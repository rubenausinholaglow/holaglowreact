'use client';

import { useEffect } from 'react';
import MainLayout from 'app/components/layout/MainLayout';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Underlined } from 'designSystem/Texts/Texts';
import { fetchBlogPosts } from 'utils/fetch';

import BlogCategorySelector from './components/BlogCategorySelector';
import BlogIntro from './components/BlogIntro';
import BlogItem from './components/BlogItem';

export default function Blog() {
  const { blogPosts, setBlogPosts } = useGlobalPersistedStore(state => state);

  useEffect(() => {
    async function initBlog() {
      const posts = await fetchBlogPosts();
      setBlogPosts(posts);
    }

    if (!blogPosts) {
      initBlog();
    }
  }, [blogPosts]);

  if (!blogPosts) {
    return <></>;
  }

  return (
    <MainLayout>
      <div className="rounded-t-3xl shadow-centered-black-lg ">
        <Container className="border-b border-hg-black mb-8 pt-8 md:pt-12 ">
          <Text className="font-gtUltraBold text-4xl text-hg-secondary mb-10 md:text-6xl tracking-tighter md:text-center">
            Tu <Underlined color={HOLAGLOW_COLORS['primary']}>glow</Underlined>,
            tus normas
          </Text>
          <Text className="font-semibold text-xl mb-8">Lo último..</Text>

          <BlogItem showButton post={blogPosts[0]} index={1} />
        </Container>

        <Container className="px-0">
          <BlogCategorySelector className="mb-8" posts={blogPosts} />
        </Container>

        <Container>
          <Flex layout="col-left" className="gap-8 md:grid grid-cols-3">
            {blogPosts.slice(1).map((post, index) => (
              <BlogItem key={post.slug} post={post} index={index + 1} />
            ))}
          </Flex>
        </Container>
      </div>
    </MainLayout>
  );
}
