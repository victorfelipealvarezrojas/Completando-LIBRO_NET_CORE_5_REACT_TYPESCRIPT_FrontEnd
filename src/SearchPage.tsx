/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect } from 'react';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import {
  AppState,
  searchingQuestionsAction,
  searchedQuestionsAction,
} from './Store';

import { Page } from './Page';
import { useSearchParams } from 'react-router-dom';
import { QuestionList } from './QuestionList';
import { searchQuestions } from './QuestionsData';

//pagina que muestra el resultado buscado(busqueda de preguntas)
export const SearchPage = () => {
  const dispatch = useDispatch();

  //state de preguntas buscadas desde el store de redux
  const questions = useSelector((state: AppState) => state.questions.searched);

  const [searchParams] = useSearchParams();

  //const [questions, setQuestions] = useState<QuestionData[]>([]);no manejo es estado local
  const search = searchParams.get('criteria') || ''; //obtiene el parametro llamado criteria que contiene el texto a buscar

  useEffect(() => {
    const doSearch = async (criteria: string) => {
      dispatch(searchingQuestionsAction()); //loadin de buscando
      const foundResults = await searchQuestions(criteria);
      dispatch(searchedQuestionsAction(foundResults));
    };
    doSearch(search);
  }, [search]);

  return (
    <Page title="Search Results">
      {search && (
        <p
          css={css`
            font-size: 16px;
            font-style: italic;
            margin-top: 0px;
          `}
        >
          for "{search}"
        </p>
      )}
      <QuestionList data={questions} />
    </Page>
  );
};
