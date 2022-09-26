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
  const [arrayPalavra, setArrayPalavra] = useState([]);
  const [arrayPalavraComAcento, setArrayPalavraComAcento] = useState([]);
  const [tracos, setTracos] = useState([]);
  const [caractereClass, setCaractereClass] = useState("caractere");
  const [ButtonClass, setClassButton] = useState("off");
  const [interruptor, setInterruptor] = useState("down");
  const [palavraInput, setPalavraInput] = useState("");
  let auxpalavra = "";

  function start() {
    setEscolhidas([]);
    setCaractereClass("caractere");
    setClassButton("on");
    setErros(1);
    setImagem(estagios[0]);
    setInterruptor("up");
    let escolhida = Math.floor(Math.random() * palavras.length);
    let palavra = palavras[escolhida];
    let palavraSeparadaComAcento = [...palavra];
    setArrayPalavraComAcento(palavraSeparadaComAcento);
    let auxTracos = [];
    palavra = palavra.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    let palavraSeparadaSemAcento = [...palavra];
    setArrayPalavra(palavraSeparadaSemAcento);
    for (let i = 0; i < palavra.length; i++) {
      auxTracos.push("_");
      setTracos(auxTracos);
    }
  }

  function apertou(letra) {
    let adicionaEscolhidas = [...escolhidas, letra];
    setEscolhidas(adicionaEscolhidas);
    let i = 0;
    let acertou = 0;
    let auxTracos = [...tracos];
    while (i < arrayPalavra.length) {
      if (letra === arrayPalavra[i]) {
        acertou++;
        auxTracos[i] = arrayPalavraComAcento[i];
      }
      i++;
    }
    auxpalavra = auxTracos.join("");
    setTracos(auxTracos);
    if (acertou > 0) {
      final();
    }
    if (acertou <= 0) {
      erro();
      final();
    }
  }

  function erro() {
    setErros(erros + 1);
    setImagem(estagios[erros]);
  }

  function final() {
    if (estagios[erros] === img6) {
      setCaractereClass("errou");
      setEscolhidas(alfabeto);
      setTracos(arrayPalavraComAcento);
      setClassButton("off");
    }
    if (arrayPalavraComAcento.join("") === auxpalavra) {
      setCaractereClass("acertou");
      setEscolhidas(alfabeto);
      setClassButton("off");
    }
  }

  function finalInput() {
    if (palavraInput.toLowerCase() === arrayPalavra.join("")) {
      setTracos(arrayPalavraComAcento);
      setClassButton("off");
      setEscolhidas(alfabeto);
      setCaractereClass("acertou");
    } else {
      setTracos(arrayPalavraComAcento);
      setClassButton("off");
      setEscolhidas(alfabeto);
      setCaractereClass("errou");
      setImagem(estagios[6]);
    }
    setPalavraInput("");
  }

  return (
    <>
      <div className="ForcaBotao">
        <img data-identifier="game-image" className="forca" src={imagem} alt="Nao carregou" />
        <button data-identifier="choose-word" onClick={start} className="start-restart">
          Escolher Palavra
        </button>
        <ul data-identifier="word" className="resposta">
          {tracos.map((l, index) => (
            <li key={index} className={caractereClass}>
              {l}
            </li>
          ))}
        </ul>
      </div>
      <div className="teclado">
        {alfabeto.map((letra, index) => (
          <div
            key={index}
            className={
              escolhidas.includes(letra) ? "desabilitado" : "habilitado"
            }
            onClick={() => apertou(letra)}
            data-identifier="letter"
          >
            {letra}
          </div>
        ))}
      </div>
      <div className="input">
        <p>Já sei a palavra!</p>
        <input
          value={palavraInput}
          data-identifier="type-guess"
          onChange={(event) =>
            setPalavraInput(
              event.target.value
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
            )
          }
          className={interruptor}
          placeholder="Qual é seu chute?"
        ></input>
        <button data-identifier="guess-button" onClick={finalInput} className={ButtonClass}>
          Chutar
        </button>
      </div>
    </>
  );
}
