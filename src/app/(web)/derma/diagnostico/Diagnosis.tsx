import { Diagnosis } from '@interface/derma/diagnosis';
import { SvgReceiptEdit } from 'app/icons/Icons';
import { SvgArrow, SvgReceipt2, SvgUserSquare } from 'app/icons/IconsDs';
import dayjs from 'dayjs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import Image from 'next/image';

import DiagnosisImages from './DiagnosisImages';

export default function Diagnosis({ data }: { data: Diagnosis | object }) {
  if (isEmpty(data)) {
    return (
      <div className="bg-white/50 rounded-2xl p-4 md:border border-derma-secondary400">
        <Flex layout="row-left" className="mb-4">
          <div className="bg-hg-black100 p-2 rounded-full mr-4">
            <SvgUserSquare className="h-7 w-7 text-hg-black400" />
          </div>
          <div className="p-2 rounded-full w-full bg-hg-black100" />
        </Flex>
        <div className="p-3 rounded-full w-full bg-hg-black100 mb-4" />
        <div className="p-3 rounded-full w-full bg-hg-black100" />
      </div>
    );
  }

  // waiting for our first customer <3
  return <p>TO DO!</p>;
}
