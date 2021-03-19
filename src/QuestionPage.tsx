/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect, Fragment } from 'react';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { AppState, gettingQuestionAction, gotQuestionAction } from './Store';

import { useForm } from 'react-hook-form'; //useSearchParams pasa parametros entyre url
import { useParams } from 'react-router-dom'; //me permite obtener parametros de ruta
import { Page } from './Page';
import { getQuestion, postAnswer } from './QuestionsData';
import { AnswerList } from './AnswerList';

import {
  gray3,
  gray6,
  Fieldset,
  FieldContainer,
  FieldLabel,
  FieldTextArea,
  FormButtonContainer,
  PrimaryButton,
  FieldError,
  SubmissionSuccess,
} from './Styles';

type FormData = { content: string };

export const QuestionPage = () => {
  const dispatch = useDispatch();

  //state del reducer de la pregunta que se esata viendo
  const question = useSelector((state: AppState) => state.questions.viewing);

  const [successfullySubmitted, setSuccessfullySubmitted] = useState(false);

  //función de registro permite registrar un elemento de entrada con React Hook Form y luego ser administrado por él.
  const { register, errors, handleSubmit, formState } = useForm<FormData>({
    mode: 'onBlur',
  });
  //obtengo por parametro el Id de la pregunta seleccionada
  const { questionId } = useParams();

  //ahora lo amnejo desde el state del stode
  //const [question, setQuestion] = useState<QuestionData | null>(null);

  useEffect(() => {
    //loadin de obteniendo la pregunnta en true
    dispatch(gettingQuestionAction());

    const doGetQuestion = async (questionId: number) => {
      const foundQuestion = await getQuestion(questionId); //obtengo la pregunta por id dede la pregunta seleccionada
      dispatch(gotQuestionAction(foundQuestion)); //asigno la pregunta en el state del store por medio del action
      //setQuestion(foundQuestion);de forma local anterior a incluir redux
    };

    if (questionId) {
      doGetQuestion(Number(questionId));
    }
  }, [questionId]);

  const submitForm = async (data: FormData) => {
    const result = await postAnswer({
      questionId: question!.questionId, //! no sea null
      content: data.content,
      userName: 'Fred',
      created: new Date(),
    });
    setSuccessfullySubmitted(result ? true : false);
  };

  return (
    <Page>
      <div
        css={css`
          background-color: white;
          padding: 15px 20px 20px 20px;
          border-radius: 4px;
          border: 1px solid ${gray6};
          box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
        `}
      >
        <div
          css={css`
            font-size: 19px;
            font-weight: bold;
            margin: 10px 0px 5px;
          `}
        >
          {question === null ? null : question.title}
        </div>
        {question !== null && (
          <Fragment>
            <p
              css={css`
                margin-top: 0px;
                background-color: white;
              `}
            >
              {question.content}
            </p>
            <div
              css={css`
                font-size: 12px;
                font-style: italic;
                color: ${gray3};
              `}
            >
              {`Asked by ${question.userName} on  
              ${question.created.toLocaleDateString()} /  
              ${question.created.toLocaleTimeString()}`}
            </div>
            <AnswerList data={question.answers} />
            <form
              onSubmit={handleSubmit(submitForm)}
              css={css`
                margin-top: 20px;
              `}
            >
              <Fieldset
                disabled={formState.isSubmitting || successfullySubmitted}
              >
                <FieldContainer>
                  <FieldLabel htmlFor="content"> Your Answer </FieldLabel>
                  <FieldTextArea
                    id="content"
                    name="content"
                    ref={register({
                      required: true,
                      minLength: 50,
                      maxLength: 200,
                    })}
                  />
                  {errors.content && errors.content.type === 'required' && (
                    <FieldError>You must enter the question content</FieldError>
                  )}
                  {errors.content && errors.content.type === 'minLength' && (
                    <FieldError>
                      The content must be at least 50 characters
                    </FieldError>
                  )}
                  {errors.content && errors.content.type === 'maxLength' && (
                    <FieldError>
                      The content must be at max 200 characters
                    </FieldError>
                  )}
                </FieldContainer>
                <FormButtonContainer>
                  <PrimaryButton type="submit">
                    Submit Your Answer
                  </PrimaryButton>
                </FormButtonContainer>
                {successfullySubmitted && (
                  <SubmissionSuccess>
                    Your answer was successfully submitted
                  </SubmissionSuccess>
                )}
              </Fieldset>
            </form>
          </Fragment>
        )}
      </div>
    </Page>
  );
};
