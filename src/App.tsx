//tiene que ir de est<a forma en la parte superior para que funcione
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
//*************************************************************** */
import React, { FC, lazy, Suspense } from 'react';
//importaciones para utuilizar el store de redux
import { Provider } from 'react-redux';
import { configureStore } from './Store';

import { Header } from './Header';
import { HomePage } from './HomePage';
//rutas
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import { AskPage } from './AskPage';

import { SearchPage } from './SearchPage';
import { SignInPage } from './SignInPage';
import { NotFoundPage } from './NotFoundPage';
//pagina de preguntas
import { QuestionPage } from './QuestionPage';

import { fontFamily, fontSize, gray2 } from './Styles';
//carga peresoza
const AskPage = lazy(() =>
  import('./AskPage').then((module) => ({
    default: module.AskPage,
  })),
);

//Instancia de tienda
const store = configureStore();

const App: FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div
          css={css`
            font-family: ${fontFamily};
            font-size: ${fontSize};
            color: ${gray2};
          `}
        >
          <Header />
          <Routes>
            <Route path="" element={<HomePage />} />
            <Route path="search" element={<SearchPage />} />
            {/*<Route path="ask" element={<AskPage />} />*/}
            <Route
              path="ask"
              element={
                <Suspense
                  fallback={
                    <div
                      css={css`
                        margin-top: 100px;
                        text-align: center;
                      `}
                    >
                      Loading...
                    </div>
                  }
                >
                  <AskPage />
                </Suspense>
              }
            />
            <Route path="signin" element={<SignInPage />} />
            <Route path="questions/:questionId" element={<QuestionPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
