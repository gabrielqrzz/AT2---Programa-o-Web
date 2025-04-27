const questions = [
  {
      question: "Qual é seu maior talento?",
      options: [
          { text: "Hackear sistemas", points: { Zero: 3, Blaze: 1, Nyx: 2 } },
          { text: "Combate físico", points: { Zero: 1, Blaze: 3, Nyx: 2 } },
          { text: "Analisar dados friamente", points: { Zero: 2, Blaze: 1, Nyx: 3 } },
      ],
  },
  {
      question: "O que você mais teme?",
      options: [
          { text: "Perda de liberdade", points: { Zero: 3, Blaze: 2, Nyx: 1 } },
          { text: "Ser traído", points: { Zero: 1, Blaze: 3, Nyx: 2 } },
          { text: "Ser desligado", points: { Zero: 2, Blaze: 1, Nyx: 3 } },
      ],
  },
  {
      question: "Qual seu equipamento favorito?",
      options: [
          { text: "Terminal de invasão", points: { Zero: 3, Blaze: 1, Nyx: 2 } },
          { text: "Armas pesadas", points: { Zero: 1, Blaze: 3, Nyx: 2 } },
          { text: "Interface neural", points: { Zero: 2, Blaze: 1, Nyx: 3 } },
      ],
  },
  {
      question: "Qual sua principal motivação?",
      options: [
          { text: "Buscar conhecimento e desvendar segredos", points: { Zero: 3, Blaze: 1, Nyx: 2 } },
          { text: "Lutar por aquilo que acredito, mesmo que sozinho", points: { Zero: 1, Blaze: 3, Nyx: 2 } },
          { text: "Garantir a segurança e a lógica acima de tudo", points: { Zero: 2, Blaze: 1, Nyx: 3 } },
      ],
  },
  {
      question: "Como você lida com a autoridade?",
      options: [
          { text: "Questiono e busco falhas", points: { Zero: 3, Blaze: 2, Nyx: 1 } },
          { text: "Desafio abertamente se necessário", points: { Zero: 1, Blaze: 3, Nyx: 2 } },
          { text: "Sigo protocolos, mas com senso crítico", points: { Zero: 2, Blaze: 1, Nyx: 3 } },
      ],
  },
  {
      question: "Em um trabalho em equipe, qual seu papel principal?",
      options: [
          { text: "O estrategista que planeja cada movimento", points: { Zero: 2, Blaze: 1, Nyx: 3 } },
          { text: "A força bruta que executa as tarefas difíceis", points: { Zero: 1, Blaze: 3, Nyx: 2 } },
          { text: "O especialista em informações que encontra as soluções", points: { Zero: 3, Blaze: 2, Nyx: 1 } },
      ],
  },
  {
      question: "Qual seu tipo de ambiente de trabalho ideal?",
      options: [
          { text: "Um espaço digital seguro e isolado", points: { Zero: 3, Blaze: 1, Nyx: 2 } },
          { text: "Um campo de batalha dinâmico e cheio de ação", points: { Zero: 1, Blaze: 3, Nyx: 2 } },
          { text: "Um centro de comando com informações fluindo constantemente", points: { Zero: 2, Blaze: 1, Nyx: 3 } },
      ],
  },
  {
      question: "Como você resolve um conflito?",
      options: [
          { text: "Analisando as informações para encontrar a solução lógica", points: { Zero: 3, Blaze: 1, Nyx: 2 } },
          { text: "Enfrentando a situação diretamente e com determinação", points: { Zero: 1, Blaze: 3, Nyx: 2 } },
          { text: "Buscando entender os diferentes lados e encontrar um meio-termo", points: { Zero: 2, Blaze: 2, Nyx: 3 } },
      ],
  },
  {
      question: "O que te deixa mais frustrado?",
      options: [
          { text: "Ineficiência e falta de lógica", points: { Zero: 3, Blaze: 1, Nyx: 2 } },
          { text: "Ser impedido de agir ou lutar pelo que acredita", points: { Zero: 1, Blaze: 3, Nyx: 2 } },
          { text: "Informações incompletas ou decisões irracionais", points: { Zero: 2, Blaze: 1, Nyx: 3 } },
      ],
  },
  {
      question: "Qual sua prioridade em uma missão?",
      options: [
          { text: "A coleta e análise de dados cruciais", points: { Zero: 3, Blaze: 1, Nyx: 2 } },
          { text: "A conclusão bem-sucedida, custe o que custar", points: { Zero: 1, Blaze: 3, Nyx: 2 } },
          { text: "A integridade do sistema e o cumprimento dos protocolos", points: { Zero: 2, Blaze: 1, Nyx: 3 } },
      ],
  },
];

let currentQuestionIndex = 0;
let scores = { Zero: 0, Blaze: 0, Nyx: 0 };

const questionContainer = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const restartButton = document.getElementById("restart-btn");
const resultName = document.getElementById("result-name");
const resultDescription = document.getElementById("result-description");
const resultImage = document.getElementById("result-image");

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionContainer.innerText = currentQuestion.question;
  optionsContainer.innerHTML = ""; 

  currentQuestion.options.forEach((option, index) => {
      const optionButton = document.createElement("button");
      optionButton.classList.add("option-btn");
      optionButton.innerText = option.text;
      optionButton.addEventListener("click", () => selectOption(option, optionButton));
      optionsContainer.appendChild(optionButton);
  });

  nextButton.disabled = true; 
}


function selectOption(option, button) {

  const selectedButton = optionsContainer.querySelector(".selected");
  if (selectedButton) selectedButton.classList.remove("selected");


  button.classList.add("selected");


  Object.keys(option.points).forEach((character) => {
      scores[character] += option.points[character];
  });

  nextButton.disabled = false; 
}


function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
      showQuestion();
  } else {
      showResult();
  }
}

function showResult() {

  document.getElementById("quiz-container").classList.add("hide");

  const winner = Object.keys(scores).reduce((a, b) => (scores[a] > scores[b] ? a : b));
  const characterDetails = getCharacterDetails(winner);

  resultName.innerText = `Você é: ${winner}`;
  resultDescription.innerText = characterDetails.description;
  resultImage.src = characterDetails.image;

  resultContainer.classList.remove("hide");
}

function getCharacterDetails(character) {
  const characters = {
      Zero: {
          description: "Zero, o Hacker Fantasma, é um mestre da tecnologia, capaz de derrubar qualquer sistema.",
          image: "https://videos.openai.com/vg-assets/assets%2Ftask_01jrgbqx48ejvra865v5qv5hcz%2Fimg_0.webp?st=2025-04-26T17%3A26%3A11Z&se=2025-05-02T18%3A26%3A11Z&sks=b&skt=2025-04-26T17%3A26%3A11Z&ske=2025-05-02T18%3A26%3A11Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=0tLg6COF8VK36%2FGAedOybw16qcLG4L2YW9%2BOAejWnGE%3D&az=oaivgprodscus", 
      },
      Blaze: {
          description: "Blaze, o Mercenário de Aço, é um guerreiro cibernético, pronto para qualquer batalha.",
          image: "https://videos.openai.com/vg-assets/assets%2Ftask_01jrj26etkf68t63kst9hgj3tq%2Fimg_0.webp?st=2025-04-26T17%3A26%3A11Z&se=2025-05-02T18%3A26%3A11Z&sks=b&skt=2025-04-26T17%3A26%3A11Z&ske=2025-05-02T18%3A26%3A11Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=njondRGvtFISONe8kWW3Nv3GWGQoNhq%2BVR3NZK5LHUI%3D&az=oaivgprodscus",
      },
      Nyx: {
          description: "Nyx, a Androide Rebelde, luta pela liberdade dos androides e pela destruição do sistema opressor.",
          image: "https://videos.openai.com/vg-assets/assets%2Ftask_01jsp2znjafc985smebev8vk25%2F1745572185_img_0.webp?st=2025-04-26T17%3A26%3A11Z&se=2025-05-02T18%3A26%3A11Z&sks=b&skt=2025-04-26T17%3A26%3A11Z&ske=2025-05-02T18%3A26%3A11Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=jtlJeRDnnv9VhIvUJcmgayNrAEwhrPMtr%2Ffs4JA61pE%3D&az=oaivgprodscus", 
      },
  };
  return characters[character];
}

// Função para reiniciar o quiz
function restartQuiz() {
  currentQuestionIndex = 0;
  scores = { Zero: 0, Blaze: 0, Nyx: 0 };
  resultContainer.classList.add("hide");
  document.getElementById("quiz-container").classList.remove("hide");
  showQuestion();
}

// Iniciar o quiz
nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", restartQuiz);

// Começar com a primeira pergunta
showQuestion();