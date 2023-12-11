'use client';

import '../styles/blog.css';

import { useEffect, useState } from 'react';
import { Professional } from '@interface/clinic';
import MainLayout from 'app/components/layout/MainLayout';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import dayjs from 'dayjs';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Post } from 'types/blog';

import BlogAppointment from '../components/BlogAppointment';
import BlogAuthor from '../components/BlogAuthor';
import BlogBreadcrumb from '../components/BlogBreadcrumb';
import BlogCategories from '../components/BlogCategories';
import BlogRelatedPosts from '../components/BlogRelatedPosts';
import BlogShareBar from '../components/BlogShareBar';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { clinics, blogPosts } = useGlobalPersistedStore(state => state);

  const [professionals, setProfessionals] = useState<Professional[] | null>([]);

  const route = usePathname();

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

    setProfessionals(professionalsWithCity);
  }, [clinics]);

  const post: Post | undefined = blogPosts?.filter(
    post => post.slug === params.slug
  )[0];

  if (!post) {
    return <></>;
  }

  return (
    <MainLayout>
      <div className="rounded-t-3xl shadow-centered-black-lg ">
        <Container className="mb-8 py-6 md:py-12">
          <BlogBreadcrumb title={post.title} />

          <Image
            src="/images/blog/post1.png"
            alt="placeholder"
            height={400}
            width={600}
            className="w-full rounded-3xl mb-8"
          />

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
                title="titulo del post"
              />

              <BlogRelatedPosts
                className="pb-12"
                categories={post.categories}
                posts={blogPosts}
              />
            </div>
          </Flex>
        </Container>

        {professionals && (
          <BlogAuthor className="mb-12" professional={professionals[1]} />
        )}

        <Container className="border-t border-hg-black md:hidden">
          <BlogShareBar
            className="my-12"
            url={`https://www.holaglow.com${route}`}
            title="titulo del post"
          />

          <BlogRelatedPosts
            className="pb-12"
            categories={post.categories}
            posts={blogPosts}
          />
        </Container>

        <BlogAppointment />
      </div>
    </MainLayout>
  );
}
