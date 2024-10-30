const palavraAtual = document.querySelector("#palavraEscolhida");
const dicaAtual = document.querySelector("#dica");
const categoriaAtual = document.querySelector("#categoria");
const letrasContainer = document.querySelector(".letrasContainer");
const chancesTxt = document.querySelector("#chances");
const resultadoDiv = document.querySelector("#resultado-div");
const resultado = document.querySelector("#resultado");
const resposta = document.querySelector("#resposta");
const restart = document.querySelector("#restart");
const content = document.querySelector(".content");

const palavraArr = [];
const escondidoArr = [];

getRandomWord();

let palavraSorteada;
let escondido;
let chances = 0;

const letras = "abcdefghijklmnopqrstuvwxyz";
for (let i = 0; i < letras.length; i++) {
    letrasContainer.insertAdjacentHTML(
        "beforeend",
        `<p id='letra${letras[i]}'>${letras[i]}</p>`
    );
}

const letrasArr = document.querySelectorAll(".letrasContainer p");

letrasArr.forEach((letra) => {
    letra.addEventListener("click", () => {
        handleClick(letra);
    });
});

document.addEventListener("keydown", (e) => {
    const letra = document.querySelector(`#letra${e.key}`);
    handleClick(letra);
});

restart.addEventListener("click", () => {
    location.reload();
});

async function getRandomWord() {
    const result = await fetch("https://forcaapi.vercel.app/random");
    const data = await result.json();
    const { palavra, categoria, dica } = data;

    palavraSorteada = palavra;

    for (let i = 0; i < palavra.length; i++) {
        escondidoArr.push("-");
        palavraArr.push(palavra[i]);
    }

    escondido = escondidoArr.join(" ");

    palavraAtual.textContent = escondido;
    dicaAtual.textContent = `Dica: ${dica}`;
    categoriaAtual.textContent = `Categoria: ${categoria}`;
}

function handleClick(letra) {
    if (!letra.classList.contains("clicado")) {
        palavraArr.forEach((el, i) => {
            if (el == letra.textContent) {
                escondidoArr[i] = letra.textContent;

                escondido = escondidoArr.join(" ");
                palavraAtual.textContent = escondido;
            }

            letra.classList.add("clicado");
        });

        if (!palavraArr.includes(letra.textContent)) {
            chances++;

            document.querySelector("img").src = `./img/${chances}.png`;
        }

        if (chances >= 6) {
            content.classList.add("hidden");
            resultadoDiv.classList.remove("hidden");
            resultadoDiv.style.background = "#dc3545";
            resultado.textContent = "Você perdeu...";
            resposta.textContent = `A palavra era: ${palavraSorteada}`;
        }

        if (escondido.split(" ").join("") === palavraSorteada) {
            resultadoDiv.classList.remove("hidden");
            resultadoDiv.style.background = "#28a745";
            resultado.textContent = "Você ganhou!!!";
            resposta.textContent = `A palavra era: ${palavraSorteada}`;
        }
    }
}
