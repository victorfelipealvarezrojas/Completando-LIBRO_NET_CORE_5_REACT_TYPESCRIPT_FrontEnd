/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { PageTitle } from './PageTitle';

//Definimos la propiedad children con una anotación de tipo ReactNode.
//ReactNode. Esto nos permitirá utilizar una amplia gama de elementos secundarios,
//como otros componentes de React y texto sin formato.
interface Props {
  title?: string; //props opcional
  children: React.ReactNode; //cualquier elemento texto,componente,buttons,etc
}

export const Page = ({ title, children }: Props) => (
  <div
    css={css`
      margin: 50px auto 20px auto;
      padding: 30px 20px;
      max-width: 600px;
    `}
  >
    {/*Hemos hecho referencia a la propiedad children dentro del elemento div.
      Esto significa que los elementos secundarios que especifican los componentes 
      consumidores se colocarán dentro del elemento div */}
    {/*título? opcional que lo representa dentro del componente PageTitle */}
    {title && <PageTitle>{title}</PageTitle>} {children}
    {/* tambien recibe un children desde el componente consumodor(HomePage.tsx) el cual despielga aqui mismo */}
  </div>
);
