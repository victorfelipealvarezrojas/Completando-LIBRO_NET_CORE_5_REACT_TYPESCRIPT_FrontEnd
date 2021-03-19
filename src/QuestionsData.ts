export interface QuestionData {
  questionId: number;
  title: string;
  content: string;
  userName: string;
  created: Date;
  answers: AnswerData[];
}

export interface AnswerData {
  answerId: number;
  content: string;
  userName: string;
  created: Date;
}

export interface PostQuestionData {
  title: string;
  content: string;
  userName: string;
  created: Date;
}

export interface PostAnswerData {
  questionId: number;
  content: string;
  userName: string;
  created: Date;
}

const questions: QuestionData[] = [
  {
    questionId: 1,
    title: 'Why should I learn TypeScript?',
    content:
      'TypeScript seems to be getting popular so I wondered whether it is worth my time learning it? What benefits does it give over JavaScript?',
    userName: 'Bob',
    created: new Date(),
    answers: [
      {
        answerId: 1,
        content: 'To catch problems earlier speeding up your developments',
        userName: 'Jane',
        created: new Date(),
      },
      {
        answerId: 2,
        content:
          'So, that you can use the JavaScript features of tomorrow, today',
        userName: 'Fred',
        created: new Date(),
      },
    ],
  },
  {
    questionId: 2,
    title: '¿Qué herramienta de gestión de estado debo utilizar?',
    content:
      'Parece que hay unas pocas herramientas de gestión de estado para React: React, Unstated, ... ¿Cuál debería usar?',
    userName: 'Bob',
    created: new Date(),
    answers: [],
  },
  {
    questionId: 3,
    title: '¿Qué herramienta de gestión de estado debo utilizar 2?',
    content:
      'Parece que hay unas pocas herramientas de gestión de estado para React: React, Unstated, ... ¿Cuál debería usar?',
    userName: 'Bob',
    created: new Date(),
    answers: [],
  },
];

//Preguntas sin respuesta
export const getUnansweredQuestions = async (): Promise<QuestionData[]> => {
  await wait(500);
  return questions.filter((q) => q.answers.length === 0);
};

const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getQuestion = async (
  questionId: number,
): Promise<QuestionData | null> => {
  await wait(500);
  const results = questions.filter((q) => q.questionId === questionId);
  return results.length === 0 ? null : results[0];
};

export const searchQuestions = async (
  criteria: string,
): Promise<QuestionData[]> => {
  await wait(500);
  return questions.filter(
    (q) =>
      q.title.toLowerCase().indexOf(criteria.toLowerCase()) >= 0 ||
      q.content.toLowerCase().indexOf(criteria.toLowerCase()) >= 0,
  );
};

export const postQuestion = async (
  question: PostQuestionData,
): Promise<QuestionData | undefined> => {
  await wait(500);
  const questionId = Math.max(...questions.map((q) => q.questionId)) + 1; //genera un id nuevo sumando 1 al id max
  const newQuestion: QuestionData = { ...question, questionId, answers: [] };
  questions.push(newQuestion);
  return newQuestion;
};

export const postAnswer = async (
  answer: PostAnswerData,
): Promise<AnswerData | undefined> => {
  await wait(500);
  //filtra de array questions la pregunta a responder, obtengo la pregunta que estoy respondiendo
  const question = questions.filter(
    (q) => q.questionId === answer.questionId,
  )[0];
  //datos de la respuesta y armo la esrtructura de la respuesta
  const answerInQuestion: AnswerData = { answerId: 99, ...answer };
  //a la pregunta le agrego la respuesta
  question.answers.push(answerInQuestion);
  //retorno la respuesta
  return answerInQuestion;
};
