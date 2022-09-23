import React, { useState } from "react";
import palavras from "./palavras";
import "./CSS/reset.css";
import "./CSS/style.css";
import img0 from "./assets/forca0.png";
import img1 from "./assets/forca1.png";
import img2 from "./assets/forca2.png";
import img3 from "./assets/forca3.png";
import img4 from "./assets/forca4.png";
import img5 from "./assets/forca5.png";
import img6 from "./assets/forca6.png";

const estagios = [img0, img1, img2, img3, img4, img5, img6];

const alfabeto = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

export default function App() {
  const [classeLetra, setClasseLetra] = useState("letra desabilitado");
  const [erros, setErros] = useState(0);
  const [imagem, setImagem] = useState(estagios[0]);

  function start() {
    console.log("apertado");
    setClasseLetra("letra habilitado");
  }

  function apertou(letra) {
    console.log(letra);
  }

  function erro(){
    setErros(erros + 1);
    setImagem(estagios[erros]);
  }

  function rodaduas(funcao1, funcao2){
    funcao1();
    funcao2();

  }

  return (
    <>
      <div className="ForcaBotao">
        <img className="forca" src={imagem} alt="Nao carregou" />
        <button onClick={() => rodaduas(start, erro)} className="start-restart">
          Escolher Palavra
        </button>
      </div>
      <div className="teclado">
        {alfabeto.map((letra, index) => (
          <div
            key={index}
            className={classeLetra}
            onClick={() => apertou(letra)}
          >
            {letra}
          </div>
        ))}
      </div>
      <div className="input"></div>
    </>
  );
}
