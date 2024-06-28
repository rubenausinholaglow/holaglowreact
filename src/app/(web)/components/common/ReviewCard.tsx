'use client';

import { ClinicReview } from '@interface/clinic';
import { SvgStar } from 'app/icons/IconsDs';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

export default function ReviewCard({
  review,
  className = '',
  isDerma = false,
}: {
  review: ClinicReview;
  className?: string;
  isDerma?: boolean;
}) {
  const classNameStar = isDerma
    ? 'h-5 w-5 text-derma-primary'
    : 'h-5 w-5 text-hg-secondary';
  const maxLength = 500;
  return (
    <div
      className={twMerge(
        `flex flex-col bg-white rounded-xl p-4 overflow-hidden h-full ${className}`
      )}
    >
      <Flex className="gap-4 mb-4">
        <Image
          height={64}
          width={64}
          alt={review.authorName}
          src={review.authorPicture}
          className="shrink-0"
        />
        <Flex layout="col-left">
          <Text className="text-xs">{review.clinic.city}</Text>
          <Text className="font-semibold mb-2">{review.authorName}</Text>
          <Flex className="gap-2">
            <SvgStar className={classNameStar} />
            <SvgStar className={classNameStar} />
            <SvgStar className={classNameStar} />
            <SvgStar className={classNameStar} />
            <SvgStar className={classNameStar} />
          </Flex>
        </Flex>
      </Flex>
      <Text className="text-sm text-hg-black500">
        {review.comment.substring(
          0,
          Math.min(maxLength, review.comment.length)
        )}
        {review.comment.length > maxLength && <>...</>}
      </Text>
    </div>
  );
}
