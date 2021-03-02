//tiene que ir de est<a forma en la parte superior para que funcione
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
//*************************************************************** */
import React, { FC } from 'react';
import { Header } from './Header';
import { HomePage } from './HomePage';
import { fontFamily, fontSize, gray2 } from './Styles';

const App: FC = () => {
  return (
    <div
      css={css`
        font-family: ${fontFamily};
        font-size: ${fontSize};
        color: ${gray2};
      `}
    >
      <Header />
      <HomePage />
    </div>
  );
};

export default App;
