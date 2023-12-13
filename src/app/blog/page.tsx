'use client';

import { useEffect, useState } from 'react';
import FullScreenLoading from 'app/components/common/FullScreenLayout';
import MainLayout from 'app/components/layout/MainLayout';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Underlined } from 'designSystem/Texts/Texts';
import { fetchBlogPosts } from 'utils/fetch';

import BlogCategorySelector from './components/BlogCategorySelector';
import BlogItem from './components/BlogItem';

export default function Blog() {
  const { blogPosts, setBlogPosts } = useGlobalPersistedStore(state => state);

  const [activeCategories, setActiveCategories] = useState<string[]>([]);

  useEffect(() => {
    async function initBlog() {
      const posts = await fetchBlogPosts();
      setBlogPosts(posts);
    }

    if (!blogPosts) {
      initBlog();
    }
  }, [blogPosts]);

  return (
    <MainLayout>
      {!blogPosts ? (
        <FullScreenLoading />
      ) : (
        <div className="rounded-t-3xl shadow-centered-black-lg ">
          <Container className="py-8">
            <Text className="font-gtUltraBold text-4xl text-hg-secondary mb-2 md:text-6xl tracking-tighter md:text-center">
              Glow{' '}
              <Underlined color={HOLAGLOW_COLORS['primary']}>Better</Underlined>
            </Text>
            <Text className="font-gtUltraBold text-xl mb-10 md:text-2xl md:text-center tracking-tighter font-semibold">
              La medicina estética contada sin filtros
            </Text>

            <Text className="font-semibold text-xl mb-8">Lo último..</Text>

            <BlogItem
              isHighlightedPost
              post={blogPosts[0]}
              index={1}
              activeCategories={activeCategories}
            />
          </Container>

          {blogPosts.length > 1 && (
            <>
              <Container className="px-0">
                <BlogCategorySelector
                  className="mb-8"
                  posts={blogPosts}
                  activeCategories={activeCategories}
                  setActiveCategories={setActiveCategories}
                />
              </Container>

              <Container>
                <Flex
                  layout="col-left"
                  className="gap-12 md:grid grid-cols-3 md:gap-20 pb-12 md:pb-20"
                >
                  {blogPosts.slice(1).map((post, index) => (
                    <BlogItem
                      key={post.slug}
                      post={post}
                      index={index + 1}
                      activeCategories={activeCategories}
                    />
                  ))}
                </Flex>
              </Container>
            </>
          )}
        </div>
      )}
    </MainLayout>
  );
}
