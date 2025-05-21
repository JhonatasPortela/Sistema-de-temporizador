const html = document.querySelector("html");

const focoBtn = document.querySelector(".app__card-button--foco");
const curtoBtn = document.querySelector(".app__card-button--curto");
const longoBtn = document.querySelector(".app__card-button--longo");
const startPauseBtn = document.querySelector("#start-pause");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const musicaFocoInput = document.querySelector("#alternar-musica");
const musicaFoco = new Audio("/sons/luna-rise-part-one.mp3");
const somDePause = new Audio("/sons/pause.mp3");
const somDePlay = new Audio("/sons/play.wav");
const somTemporizadorZerado = new Audio("/sons/beep.mp3");
musicaFoco.loop = true;

let tempoDecorridoEmSegundos = 5;
let intervaloId = null;

focoBtn.addEventListener("click", () => {
  alterarContexto("foco");
  focoBtn.classList.add("active");
});

curtoBtn.addEventListener("click", () => {
  alterarContexto("descanso-curto");
  curtoBtn.classList.add("active");
});

longoBtn.addEventListener("click", () => {
  alterarContexto("descanso-longo");
  longoBtn.classList.add("active");
});

function alterarContexto(contexto) {
  botoes.forEach((botao) => {
    botao.classList.remove("active");
  });
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `/imagens/${contexto}.png`);
  switch (contexto) {
    case "foco":
      titulo.innerHTML = `
        Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
        `;
      break;
    case "descanso-curto":
      titulo.innerHTML = `
        Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
        `;
      break;
    case "descanso-longo":
      titulo.innerHTML = `
        Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
        `;
      break;
    default:
      break;
  }
}

musicaFocoInput.addEventListener("change", () => {
  if (musicaFoco.paused) {
    musicaFoco.play();
  } else {
    musicaFoco.pause();
  }
});

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    zerar();
    somTemporizadorZerado.play();
    alert("Tempo esgotado!");
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  console.log(tempoDecorridoEmSegundos);
};

startPauseBtn.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  if (intervaloId) {
    zerar();
    somDePause.play();
    return;
  }
  intervaloId = setInterval(contagemRegressiva, 1000);
  somDePlay.play();
}

function zerar() {
  clearInterval(intervaloId);
  intervaloId = null;
}
