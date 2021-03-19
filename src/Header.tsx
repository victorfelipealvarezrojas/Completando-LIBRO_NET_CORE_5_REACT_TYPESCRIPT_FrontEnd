//tiene que ir de est<a forma en la parte superior para que funcione
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
//*************************************************************** */
import React from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom'; //useSearchParams pasa parametros entyre url
import { useForm } from 'react-hook-form';
import { UserIcon } from './Icons';
import { fontFamily, fontSize, gray1, gray2, gray5 } from './Styles';

type FormData = { search: string }; //Agregue un tipo que represente los datos del formulario

export const Header = () => {
  const navigate = useNavigate();
  //función de registro permite registrar un elemento de entrada con React Hook Form y luego ser administrado por él. Debe establecerse en la propiedad ref en el elemento.
  const { register, handleSubmit } = useForm<FormData>(); //se engancha por referencia al input(ref)  ref={register},handleSubmit => gatilla el submit del formulario
  const [searchParams] = useSearchParams(); //usamos el hook useSearchParams de React Router para trabajar con parametros de url
  //El valor predeterminado para el cuadro de búsqueda es criteria, desde aqui(input) asigno un valor al parametro criteria que viajara por la url
  const criteria = searchParams.get('criteria') || '';

  //funcion que asigna el valor del input a la variable de busqueda que viajara por la url y navega hasta la pagina de busqueda
  //con la variable en la url
  const submitForm = ({ search }: FormData) => {
    navigate(`search?criteria=${search}`);
  };

  return (
    <div
      css={css`
        position: fixed;
        box-sizing: border-box;
        top: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 20px;
        background-color: #fff;
        border-bottom: 1px solid ${gray5};
        box-shadow: 0 3px 7px 0 rgba(110, 112, 114, 0.21);
      `}
    >
      <Link
        to="/"
        css={css`
          font-size: 24px;
          font-weight: bold;
          color: ${gray1};
          text-decoration: none;
        `}
      >
        Q & A
      </Link>
      <form onSubmit={handleSubmit(submitForm)}>
        <input
          type="text"
          name="search"
          placeholder="Search..."
          ref={register} //La propiedad ref es una propiedad especial que React agrega a los elementos que permiten acceder al nodo DOM subyacente.
          defaultValue={criteria}
          css={css`
            box-sizing: border-box;
            font-family: ${fontFamily};
            font-size: ${fontSize};
            padding: 8px 10px;
            border: 1px solid ${gray5};
            border-radius: 3px;
            color: ${gray2};
            background-color: white;
            width: 200px;
            height: 30px;
            :focus {
              outline-color: ${gray5};
            }
          `}
        />
      </form>
      <Link
        to="/signin"
        css={css`
          font-family: ${fontFamily};
          font-size: ${fontSize};
          padding: 5px 10px;
          background-color: transparent;
          color: ${gray2};
          text-decoration: none;
          cursor: pointer;
          :focus {
            outline-color: ${gray5};
          }
          span {
            margin-left: 7px;
          }
        `}
      >
        <UserIcon />
        <span
          css={css`
            margin-left: 7px;
          `}
        >
          Sign In
        </span>
      </Link>
    </div>
  );
};
