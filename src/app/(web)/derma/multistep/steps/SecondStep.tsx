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
  const [secondStepValues, setSecondStepValues] = useState<any>([[], []]);
  const [textAreaOne, setTextAreaOne] = useState<string>('');
  const [textAreaTwo, setTextAreaTwo] = useState<string>('');

  const setSelectedQuestionValue = (question: number, value: number) => {
    const newValues = [...secondStepValues];

    if (question === 0) {
      newValues[question] = [value];
    }

    if (question === 1) {
      const index = newValues[question].indexOf(value);

      console.log(index);
      if (index === -1) {
        newValues[question].push(value);
      } else {
        newValues[question].splice(index, 1);
      }
    }

    setSecondStepValues(newValues);

    if (question === 0) {
      dermaQuestions.scenario = MULTISTEP_QUESTIONS[0].questions[value].title;
      setContinueDisabled(false);
    } else if (question === 1) {
      const selectedConcern = MULTISTEP_QUESTIONS[1].questions[value].title;

      dermaQuestions.skinConcerns = dermaQuestions.skinConcerns || [];

      const existingIndex = dermaQuestions.skinConcerns.findIndex(
        item => item.concern === selectedConcern
      );

      if (existingIndex === -1) {
        dermaQuestions.skinConcerns.push({ concern: selectedConcern });
      } else {
        dermaQuestions.skinConcerns.splice(existingIndex, 1);
      }

      setContinueDisabled(false);
    }

    setDermaQuestions({ ...dermaQuestions });
  };

  console.log(dermaQuestions);

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
        <Flex layout="col-left" className="w-full md:w-1/2">
          <Text className="text-sm text-derma-primary500">
            Paso {question + 2}. {item.section}
          </Text>
          <Text className="font-gtUltraThin text-xl text-derma-primary md:text-2xl mb-4">
            {item.title}
          </Text>
          <Text className="text-hg-black500 text-sm mb-8 md:text-md">
            {item.description}
          </Text>
        </Flex>

        <Flex layout="col-left" className="gap-4 w-full md:w-1/2">
          <ul className="flex flex-col gap-4 w-full">
            {dermaQuestions &&
              item.questions.map((listItem: any, index: number) => {
                const isActive =
                  secondStepValues[question]?.indexOf(index) > -1;

                return (
                  <li
                    key={index}
                    className={`flex flex-col gap-2 relative p-4 w-full ${
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
                    <p
                      className="text-derma-tertiary pr-12"
                      dangerouslySetInnerHTML={{ __html: listItem.title }}
                    />
                    {listItem.title === 'Otros' &&
                      item.showTextArea &&
                      question == 1 && (
                        <textarea
                          value={textAreaTwo}
                          onClick={e => e.stopPropagation()}
                          onChange={e =>
                            setTextAreasValue(e.target.value, question)
                          }
                          placeholder={item.placeholder}
                          className="w-full h-40 p-2 resize-none border rounded-lg placeholder-hg-black300"
                        />
                      )}
                  </li>
                );
              })}
          </ul>

          {item.showTextArea && question === 2 && (
            <div className="relative w-full h-[300px] md:h-[400px]">
              <label className="absolute left-4 top-4 text-sm text-hg-black500">
                Haznos saber
              </label>
              <textarea
                value={textAreaOne}
                onChange={e => setTextAreasValue(e.target.value, question)}
                placeholder={item.placeholder}
                className="w-full h-[300px] md:h-[400px] p-4 pt-12 resize-none border rounded-lg placeholder-hg-black300"
              />
            </div>
          )}
        </Flex>
      </Flex>
    </>
  );
}
