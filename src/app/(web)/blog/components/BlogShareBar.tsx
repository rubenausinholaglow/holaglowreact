'use client';

import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
import Bugsnag from '@bugsnag/js';
import { SvgWhatsapp } from 'app/icons/IconsDs';
import { SvgExport, SvgFacebook, SvgX } from 'app/icons/socialIcons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';

export default function BlogShareBar({
  className = '',
  url,
  title,
  text,
}: {
  className?: string;
  url: string;
  title: string;
  text: string;
}) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = () => {
    const textarea = document.createElement('textarea');
    textarea.value = url;

    document.body.appendChild(textarea);

    textarea.select();
    document.execCommand('copy');

    document.body.removeChild(textarea);

    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  async function handleNativeShare() {
    const shareData = {
      title: title,
      text: text,
      url: url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        Bugsnag.notify('Error sharing', error as any);
      }
    } else {
      Bugsnag.notify('Web Share API is not supported in your browser.');
    }
  }

  return (
    <Flex className={` p-4 rounded-2xl justify-between ${className}`}>
      <Text className="mr-8 md:mr-16">Comparte</Text>

      <Flex className="gap-8">
        <TwitterShareButton url={url} title={title}>
          <SvgX height={24} width={24} />
        </TwitterShareButton>
        <FacebookShareButton url={url} title={title}>
          <SvgFacebook height={24} width={24} />
        </FacebookShareButton>
        <WhatsappShareButton url={url} title={title}>
          <SvgWhatsapp height={24} width={24} />
        </WhatsappShareButton>

        {isCopied ? (
          <Text className="text-xs leading-[10px]">
            !Enlace
            <br />
            copiado!
          </Text>
        ) : (
          <SvgExport
            height={24}
            width={24}
            onClick={isMobile ? handleNativeShare : handleCopyToClipboard}
          />
        )}
      </Flex>
    </Flex>
  );
}
