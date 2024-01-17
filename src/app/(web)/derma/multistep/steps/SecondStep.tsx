'use client';

import { useState } from 'react';
import { DermaQuestions } from '@interface/dermaquestions';
import { HOLAGLOW_COLORS } from '@utils/colors';
import { SvgCheck, SvgCircle } from 'app/icons/Icons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';

import { MULTISTEP_QUESTIONS } from './mockedData';

export default function SecondStep({
  question,
  item,
  dermaQuestions,
  setDermaQuestions,
  setContinueDisabled,
}: {
  question: number;
  item: any;
  dermaQuestions: DermaQuestions;
  setDermaQuestions: any;
  setContinueDisabled: any;
}) {
  const [secondStepValues, setSecondStepValues] = useState<
    Array<Array<number>>
  >([[]]);
  const [textAreaOne, setTextAreaOne] = useState<string>('');
  const [textAreaTwo, setTextAreaTwo] = useState<string>('');

  const setSelectedQuestionValue = (question: number, value: number) => {
    const newValues = [...secondStepValues];
    if (!newValues[question]) newValues.push([]);
    const index = newValues[question].indexOf(value);

    if (index === -1) {
      newValues[question].push(value);
    } else {
      newValues[question].splice(index, 1);
    }
    setSecondStepValues(newValues);
    setContinueDisabled(newValues[question].length === 0);

    if (question == 0) {
      dermaQuestions.skinConcerns = [];
      newValues[question].forEach(x => {
        dermaQuestions.skinConcerns.push({
          concern: MULTISTEP_QUESTIONS[0].questions[value].title,
        });
      });
      dermaQuestions.skinConcerns.push({ concern: textAreaOne });
    } else if (question == 1) {
      dermaQuestions.scenario = MULTISTEP_QUESTIONS[1].questions[value].title;
    }
    setDermaQuestions(dermaQuestions);
  };

  const setTextAreasValue = (value: string, question: number) => {
    if (question == 2) {
      setTextAreaOne(value);
    } else {
      setTextAreaTwo(value);
      dermaQuestions.extraInfo = value;
    }

    if (value) setContinueDisabled(false);
  };

  return (
    <>
      <Flex layout="col-left" className="w-full md:flex-row md:gap-16">
        <Flex layout="col-left" className="w-full gap-4 md:w-1/2">
          <Text className="text-sm text-derma-primary500">
            Paso {question + 2}. {item.section}
          </Text>
          <Text className="font-gtUltraThin font-bold text-xl text-derma-primary md:text-2xl">
            {item.title}
          </Text>
          <Text className="text-hg-black500 text-sm mb-8 md:text-md">
            {item.description}
          </Text>
        </Flex>

        <Flex layout="col-left" className="gap-4 w-full md:w-1/2">
          <ul className="flex flex-col gap-4 w-full">
            {secondStepValues &&
              item.questions.map((item: any, index: number) => {
                const isActive =
                  secondStepValues[question]?.indexOf(index) > -1;
                return (
                  <li
                    key={index}
                    className={`flex flex-col gap-2 relative p-4 pr-12 w-full ${
                      isActive ? 'bg-derma-primary300' : 'bg-derma-secondary400'
                    } rounded-lg cursor-pointer`}
                    onClick={() => {
                      setSelectedQuestionValue(question, index);
                    }}
                  >
                    {isActive && (
                      <SvgCheck
                        height={16}
                        width={16}
                        className="absolute top-3 right-3 h-7 w-7 p-1"
                      />
                    )}
                    <SvgCircle
                      height={16}
                      width={16}
                      stroke={HOLAGLOW_COLORS['black']}
                      className="absolute top-3 right-3 h-7 w-7"
                    />
                    <p dangerouslySetInnerHTML={{ __html: item.title }}></p>
                  </li>
                );
              })}
          </ul>
          {item.showTextArea && (
            <textarea
              value={question == 2 ? textAreaOne : textAreaTwo}
              onChange={e => setTextAreasValue(e.target.value, question)}
              placeholder={item.placeholder}
              className="w-full h-40 p-2 resize-none border rounded-lg"
            />
          )}
        </Flex>
      </Flex>
    </>
  );
}
