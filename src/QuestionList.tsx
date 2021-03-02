/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Question } from './Question';
import { QuestionData } from './QuestionsData';
import { accent2, gray5 } from './Styles';

// definamos la interfaz para los datos del componente
interface Props {
  data: QuestionData[];
  //es una función que toma un parámetro que contiene la pregunta(item) de tipo QuestionData y devuelve un elemento JSX.
  renderItem?: (item: QuestionData) => JSX.Element; //props de funcion
}
//recibe por parametro props que es ded tipo Props
export const QuestionList = ({ data, renderItem }: Props) => (
  <ul
    css={css`
      list-style: none;
      margin: 10px 0 0 0;
      padding: 0px 20px;
      background-color: #fff;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      border-top: 3px solid ${accent2};
      box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
    `}
  >
    {data.map((question) => (
      <li
        key={question.questionId}
        css={css`
          border-top: 1px solid ${gray5};
          :first-of-type {
            border-top: none;
          }
        `}
      >
        {renderItem ? renderItem(question) : <Question data={question} />}
      </li>
    ))}
  </ul>
);
