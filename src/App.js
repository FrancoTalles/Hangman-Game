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
  const [erros, setErros] = useState(1);
  const [imagem, setImagem] = useState(estagios[0]);
  const [escolhidas, setEscolhidas] = useState(alfabeto);
  let [arrayPalavra, setArrayPalavra] = useState([]);

  function start() {
    console.log("apertado");
    setEscolhidas([]);
    let escolhida = Math.floor(Math.random() * palavras.length);
    let palavra = palavras[escolhida];
    console.log(palavra);
    palavra = palavra.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    setArrayPalavra([...palavra]);
    console.log(palavra);
    console.log(arrayPalavra);
  }

  function apertou(letra) {
    console.log(letra);
    let adicionaEscolhidas = [...escolhidas, letra];
    setEscolhidas(adicionaEscolhidas);
    let i = 0;
    let acertou = 0;
    while(i < arrayPalavra.length){
      if(letra === arrayPalavra[i]){
        console.log("acertou")
        acertou++
      }
      i++
    }
    if (acertou <= 0){
      erro();
    }
  }

  function erro() {
    setErros(erros + 1);
    setImagem(estagios[erros]);
  }


  return (
    <>
      <div className="ForcaBotao">
        <img className="forca" src={imagem} alt="Nao carregou" />
        <button onClick={start} className="start-restart">
          Escolher Palavra
        </button>
        <ul className="resposta">
          {arrayPalavra.map((l, index) => (
            <li key={index} className="caractere">
              _
            </li>
          ))}
        </ul>
      </div>
      <div className="teclado">
        {alfabeto.map((letra, index) => (
          <div
            key={index}
            className={escolhidas.includes(letra) ? "desabilitado" : "habilitado"}
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
