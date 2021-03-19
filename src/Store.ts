import { Store, createStore, combineReducers } from 'redux';
import { QuestionData } from './QuestionsData';

//interface que definira la estructura o custom Type del estado inicial
interface QuestionsState {
  readonly loading: boolean;
  readonly unanswered: QuestionData[]; //preguntas sin respuesta
  readonly viewing: QuestionData | null; //no es un array solo mostyrara un apregunta y no una lista de ellas
  readonly searched: QuestionData[];
}

//vulevo exportable la interface para usarla como tipo en el combineReducers
export interface AppState {
  readonly questions: QuestionsState;
}

//estado inicial de mi app el cual es de tipo QuestionsState
const initialQuestionState: QuestionsState = {
  loading: false,
  unanswered: [],
  viewing: null,
  searched: [],
};

//types
export const GETTINGUNANSWEREDQUESTIONS = 'GettingUnansweredQuestions'; //defino el type de mi action
export const GOTUNANSWEREDQUESTIONS = 'GotUnansweredQuestions';
export const GETTINGQUESTION = 'GettingQuestion';
export const GOTQUESTION = 'GotQuestion';
export const SEARCHINGQUESTIONS = 'SearchingQuestions';
export const SEARCHEDQUESTIONS = 'SearchedQuestions';

//Actions
//action de cargando informacion de questions
export const gettingUnansweredQuestionsAction = () =>
  ({ type: GETTINGUNANSWEREDQUESTIONS } as const);

//cuando se cargo la informacion, finalizo la carga desde el server preguntas sin respuesta
export const gotUnansweredQuestionsAction = (questions: QuestionData[]) =>
  ({ type: GOTUNANSWEREDQUESTIONS, questions: questions } as const);

//actions para ver una pregunta, obteniendo la pregunta, modifica el estado de obteniendo la pregunta en true(loading:true)
export const gettingQuestionAction = () => ({ type: GETTINGQUESTION } as const);

//cuando obtengo la pregunta seleccionada que podria ser ser tipo  QuestionData o null
export const gotQuestionAction = (question: QuestionData | null) =>
  ({ type: GOTQUESTION, question: question } as const);

//Action de realizando una busqueda
export const searchingQuestionsAction = () =>
  ({ type: SEARCHINGQUESTIONS } as const);

//action que obtiene el resultado de la busqueda
export const searchedQuestionsAction = (questions: QuestionData[]) =>
  ({ type: SEARCHEDQUESTIONS, questions } as const);

//type que contiene tipos de action que representan el action a ejecutar, ReturnType retorna el type del action
type QuestionsActions =
  | ReturnType<typeof gettingUnansweredQuestionsAction> //retona GettingUnansweredQuestions que es el valor del type GETTINGUNANSWEREDQUESTIONS
  | ReturnType<typeof gotUnansweredQuestionsAction> //preguntas sin respuesta
  | ReturnType<typeof gettingQuestionAction>
  | ReturnType<typeof gotQuestionAction>
  | ReturnType<typeof searchingQuestionsAction>
  | ReturnType<typeof searchedQuestionsAction>;

//Reducers
const questionsReducer = (
  state = initialQuestionState,
  action: QuestionsActions, //QuestionsActions contiene los tipos de accion
) => {
  switch (action.type) {
    case GETTINGUNANSWEREDQUESTIONS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GOTUNANSWEREDQUESTIONS: {
      return {
        ...state,
        unanswered: action.questions,
        loading: false,
      };
    }
    case GETTINGQUESTION: {
      return {
        ...state,
        viewing: null,
        loading: true,
      };
    }
    case GOTQUESTION: {
      return {
        ...state,
        viewing: action.question,
        loading: false,
      };
    }
    case SEARCHINGQUESTIONS: {
      return {
        ...state,
        searched: [],
        loading: true,
      };
    }
    case SEARCHEDQUESTIONS: {
      return {
        ...state,
        searched: action.questions,
        loading: true,
      };
    }
  }
  return state;
};

//combina todos los reducers que tenga
const rootReducer = combineReducers<AppState>({
  questions: questionsReducer,
});

//crea el store desde los reducers que se le pasan como parametros y devuelve un store
export function configureStore(): Store<AppState> {
  const store = createStore(rootReducer, undefined);
  return store;
}
