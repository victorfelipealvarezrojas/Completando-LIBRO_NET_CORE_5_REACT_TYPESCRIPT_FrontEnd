/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

//Definimos la propiedad children con una anotación de tipo ReactNode.
//ReactNode. Esto nos permitirá utilizar una amplia gama de elementos secundarios,
//como otros componentes de React y texto sin formato.
interface Props {
  children: React.ReactNode; //cualquier elemento texto,componente,buttons,etc
}

//Hemos hecho referencia a la propiedad children dentro del elemento h2.
//Esto significa que los elementos secundarios que especifican los componentes consumidores se colocarán dentro del elemento h2
export const PageTitle = ({ children }: Props) => (
  <h2
    css={css`
      font-size: 15px;
      font-weight: bold;
      margin: 10px 0px 5px;
      text-align: center;
      text-transform: uppercase;
    `}
  >
    {children}
  </h2>
);
