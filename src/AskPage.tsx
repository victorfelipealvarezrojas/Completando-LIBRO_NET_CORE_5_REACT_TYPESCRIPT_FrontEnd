import React from 'react';
import { Page } from './Page';
import { useForm } from 'react-hook-form'; //useSearchParams pasa parametros entyre url
import { postQuestion } from './QuestionsData';

import {
  Fieldset,
  FieldContainer,
  FieldLabel,
  FieldInput,
  FieldTextArea,
  FormButtonContainer,
  PrimaryButton,
  FieldError,
  SubmissionSuccess,
} from './Styles';

type FormData = { title: string; content: string };

export const AskPage = () => {
  const [successfullySubmitted, setSuccessfullySubmitted] = React.useState(
    false,
  );
  //función de registro permite registrar un elemento de entrada con React Hook Form y luego ser administrado por él.
  const { register, errors, handleSubmit, formState } = useForm<FormData>({
    mode: 'onBlur',
  });

  const submitForm = async (data: FormData) => {
    const result = await postQuestion({
      title: data.title,
      content: data.content,
      userName: 'victor alvarez',
      created: new Date(),
    });
    setSuccessfullySubmitted(result ? true : false);
  };

  return (
    <Page title="Ask a question">
      <form onSubmit={handleSubmit(submitForm)}>
        <Fieldset disabled={formState.isSubmitting || successfullySubmitted}>
          <FieldContainer>
            {/*htmlFor esta etiqueta establecerá automáticamente el foco en la entrada al estar posicionado en ella */}
            <FieldLabel htmlFor="title"> Title </FieldLabel>
            <FieldInput
              id="title"
              name="title"
              type="text"
              ref={register({ required: true, minLength: 10 })}
            />
            {errors.title && errors.title.type === 'required' && (
              <FieldError> You must enter the question title </FieldError>
            )}
            {errors.title && errors.title.type === 'minLength' && (
              <FieldError>The title must be at least 10 characters</FieldError>
            )}
          </FieldContainer>
          <FieldContainer>
            <FieldLabel htmlFor="content"> Content </FieldLabel>
            <FieldTextArea
              id="content"
              name="content"
              ref={register({ required: true, minLength: 50 })}
            />
            {errors.content && errors.content.type === 'required' && (
              <FieldError> You must enter the question content </FieldError>
            )}
            {errors.content && errors.content.type === 'minLength' && (
              <FieldError>
                The content must be at least 50 characters
              </FieldError>
            )}
          </FieldContainer>
          <FormButtonContainer>
            <PrimaryButton type="submit">Submit Your Question</PrimaryButton>
          </FormButtonContainer>
          {successfullySubmitted && (
            <SubmissionSuccess>
              Your question was successfully submitted
            </SubmissionSuccess>
          )}
        </Fieldset>
      </form>
    </Page>
  );
};
