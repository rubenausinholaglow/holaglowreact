'use client';

import '../styles/blog.css';

import { useEffect, useState } from 'react';
import { Professional } from '@interface/clinic';
import FullScreenLoading from 'app/components/common/FullScreenLayout';
import MainLayout from 'app/components/layout/MainLayout';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import dayjs from 'dayjs';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Post } from 'types/blog';
import { fetchBlogPosts } from 'utils/fetch';

import BlogAppointment from '../components/BlogAppointment';
import BlogAuthor from '../components/BlogAuthor';
import BlogBreadcrumb from '../components/BlogBreadcrumb';
import BlogCategories from '../components/BlogCategories';
import BlogRelatedPosts from '../components/BlogRelatedPosts';
import BlogShareBar from '../components/BlogShareBar';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { clinics, blogPosts, setBlogPosts } = useGlobalPersistedStore(
    state => state
  );

  const [post, setPost] = useState<Post | undefined>(undefined);
  const [author, setAuthor] = useState<Professional | null>(null);

  const route = usePathname();

  useEffect(() => {
    async function initBlog() {
      const posts = await fetchBlogPosts();
      setBlogPosts(posts);
    }

    if (!blogPosts) {
      initBlog();
    }

    const post: Post | undefined = blogPosts?.filter(
      post => post.slug === params.slug
    )[0];

    setPost(post);
  }, [blogPosts]);

  useEffect(() => {
    const professionalsWithCity = clinics.flatMap(clinic =>
      clinic.professionals.filter(professional => {
        if (professional.professionalType === 1) {
          return {
            ...professional,
            city: clinic.city,
          };
        }
      })
    );

    const postAuthor = professionalsWithCity.filter(
      professional => professional.name === post?.author
    )[0];

    setAuthor(!isEmpty(postAuthor) ? postAuthor : professionalsWithCity[1]);
  }, [clinics, post]);

  return (
    <MainLayout>
      {!post ? (
        <FullScreenLoading />
      ) : (
        <div className="rounded-t-3xl shadow-centered-black-lg ">
          <Container className="mb-8 py-6 md:py-12">
            <BlogBreadcrumb title={post.title} />

            <div className="aspect-[3/2] relative rounded-3xl overflow-hidden mb-8">
              <Image
                src="/images/blog/post1.png"
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>

            <Flex className="gap-20 items-start">
              <div>
                <BlogCategories className="mb-8" categories={post.categories} />

                <Text className="font-bold mb-4 text-2xl md:text-5xl">
                  {post.title}
                </Text>
                <Text size="xs" className="mb-8">
                  Por Dr. {post.author}.{' '}
                  <span className="text-hg-black500">
                    {dayjs(post.creationDate).format('D MMMM, YYYY')}
                  </span>
                </Text>

                <div
                  className="blog-post"
                  dangerouslySetInnerHTML={{ __html: post.html }}
                />
              </div>

              <div className="hidden md:block shrink-0 w-[360px]">
                <BlogShareBar
                  className="my-12"
                  url={`https://www.holaglow.com${route}`}
                  title={post.title}
                />

                <BlogRelatedPosts
                  className="pb-12"
                  categories={post.categories}
                  posts={blogPosts}
                />
              </div>
            </Flex>
          </Container>

          {author && <BlogAuthor className="mb-12" professional={author} />}

          <Container className="border-t border-hg-black md:hidden">
            <BlogShareBar
              className="my-12"
              url={`https://www.holaglow.com${route}`}
              title={post.title}
            />

            <BlogRelatedPosts
              className="pb-12"
              categories={post.categories}
              posts={blogPosts}
            />
          </Container>

          <BlogAppointment />
        </div>
      )}
    </MainLayout>
  );
}
