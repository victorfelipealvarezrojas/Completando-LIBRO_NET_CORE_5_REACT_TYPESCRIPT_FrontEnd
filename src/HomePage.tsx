/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect } from 'react';
//Reedux
import { useSelector, useDispatch } from 'react-redux';
//Action del Store
import {
  gettingUnansweredQuestionsAction,
  gotUnansweredQuestionsAction,
  AppState,
} from './Store';
import { useNavigate } from 'react-router-dom'; //me permite hacer navegacion programatica
import { QuestionList } from './QuestionList';
import { getUnansweredQuestions, QuestionData } from './QuestionsData';
import { Page } from './Page';
import { PageTitle } from './PageTitle';
import { PrimaryButton } from './Styles';

//page en sus props recibe { title, children }: Props,
export const HomePage = () => {
  const dispatch = useDispatch(); //despachador de actions

  //obtengo array de las preguntas sin respuesta desde el store, aqui se encuentra con informacion cargada
  const questions = useSelector(
    (preguntas: AppState) => preguntas.questions.unanswered,
  );

  //obtengo estado de las preguntas sin respuesta del store
  const questionsLoading = useSelector(
    (estado: AppState) => estado.questions.loading,
  );

  //ahora estos estados los manejo desde el store y no de forma local en la pagina(cuando los cree no tenia sore de redux)
  //const [questions, setQuestions] = useState<QuestionData[]>([]);
  //const [questionsLoading, setQuestionsLoading] = useState<boolean>(true);

  useEffect(() => {
    const doGetUnansweredQuestions = async () => {
      dispatch(gettingUnansweredQuestionsAction());
      const unansweredQuestions: QuestionData[] = await getUnansweredQuestions(); //obtengo el array de preguntas sin respuesta
      //cargo al store todas las preguntas sin respuesta y dejo la infoemacion disponible para ser usada en el hook useSelector
      dispatch(gotUnansweredQuestionsAction(unansweredQuestions));
      //(cuanso los cree no tenia sore de redux)
      //setQuestions(unansweredQuestions);
      //setQuestionsLoading(false);
    };
    doGetUnansweredQuestions();
  }, []);

  const navigate = useNavigate(); //hook que me permite navegar entre componentes
  const handleAskQuestionClick = () => {
    navigate('ask');
  };

  //return explícita ya que queremos escribir algun a lógica JavaScript en el componente,
  return (
    <Page>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <PageTitle>Unanswered Questions</PageTitle>
        <PrimaryButton onClick={handleAskQuestionClick}>
          Ask a question
        </PrimaryButton>
      </div>
      {questionsLoading ? (
        <div>Loading…</div>
      ) : (
        <QuestionList data={questions || []} />
      )}
    </Page>
  );
};
