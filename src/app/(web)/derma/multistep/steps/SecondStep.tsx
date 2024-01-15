'use client';

import { useState } from 'react';
import { DermaQuestions } from '@interface/dermaquestions';
import { HOLAGLOW_COLORS } from '@utils/colors';
import { SvgCheck, SvgCircle } from 'app/icons/Icons';
import { Text } from 'designSystem/Texts/Texts';

import { MULTISTEP_QUESTIONS } from './mockedData';

export default function SecondStep({
  question,
  item,
  activeSlideIndex,
  dermaQuestions,
  setDermaQuestions,
  setContinueDisabled,
}: {
  question: number;
  item: any;
  activeSlideIndex: number;
  dermaQuestions: DermaQuestions;
  setDermaQuestions: any;
  setContinueDisabled: any;
}) {
  const [values, setValues] = useState<Array<Array<number>>>([[]]);
  const [textAreaOne, setTextAreasOne] = useState<string>('');
  const [textAreaTwo, setTextAreasTwo] = useState<string>('');

  const setSelectedQuestionValue = (question: number, value: number) => {
    console.log(question, value);
    const newValues = [...values];
    if (!newValues[question]) newValues.push([]);
    const index = newValues[question].indexOf(value);

    console.log(index);

    if (index === -1) {
      newValues[question].push(value);
    } else {
      newValues[question].splice(index, 1);
    }
    setValues(newValues);
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
    if (question == 2) setTextAreasOne(value);
    else setTextAreasTwo(value);
    if (value) setContinueDisabled(false);
  };

  return (
    <>
      <Text className="text-sm text-derma-primary500 mb-2">
        Paso {question + 2}, {item.section}
      </Text>
      <Text className="font-gtUltraThin mb-2 font-bold text-xl text-derma-primary">
        {item.title}
      </Text>
      <Text className="text-hg-black500 text-sm mb-8">{item.description}</Text>

      <section>
        <ul className="flex flex-col gap-4">
          {values &&
            item.questions.map((item: any, index: number) => {
              const isActive = values[question]?.indexOf(index) > -1;
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
                  <Text>{item.title}</Text>
                  <Text size="xs" className="text-hg-black500">
                    {item.text}
                  </Text>
                </li>
              );
            })}
        </ul>
      </section>
      {item.showTextArea && (
        <section>
          <textarea
            value={question == 2 ? textAreaOne : textAreaTwo}
            onChange={e => setTextAreasValue(e.target.value, question)}
            placeholder="Escribe tu comentario..."
            className="w-full h-40 p-2 resize-none border rounded-lg"
          />
        </section>
      )}
    </>
  );
}
