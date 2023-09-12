//OBJETO
//Tarefa
class Tarefa {
  constructor(nome, descricao, dataConclusao, categoria, nivelPrioridade, status){
    this.nome = nome;
    this.descricao = descricao;
    this.dataConclusao = dataConclusao;
    this.categoria = categoria;
    this.nivelPrioridade = nivelPrioridade;
    this.status = status;
  }
}

//REFERENCIANDO OS ELEMENTOS ==========================
//Formulário
let formularioCriacao = document.getElementById("formularioCriacao");

let tituloFormulario = document.getElementById("tituloFormulario");

//Input nome: String
let inputNome = document.getElementById("inputNome");

//Input descrição: String
let inputDescricao = document.getElementById("inputDescricao");

//Input data de conclusão: Date -> mínimo = data atual
let inputDataConclusao = document.getElementById("inputDataConclusao");

let dataAtual = new Date();
var ano = dataAtual.toLocaleString("default", { year: "numeric" });
var mes = dataAtual.toLocaleString("default", { month: "2-digit" });
var dia = dataAtual.toLocaleString("default", { day: "2-digit" });
inputDataConclusao.min = `${ano}-${mes}-${dia}`;

//Input categoria: String
let inputCategoria = document.getElementById("inputCategoria");

//Input nível de prioridade: int
let inputNivelPrioridade = document.getElementById("inputNivelPrioridade");

//Input status: int
let inputStatus = document.getElementById("inputStatus");

//==============================================

let mensagemErroFormulario = document.getElementById("mensagemErroFormulario");

//==============================================

let botaoConfirmarFormulario = document.getElementById("botaoConfirmarFormulario");

let botaoCancelarFormulario = document.getElementById("botaoCancelarFormulario");

//==============================================
//Fundo não selecionável
let fundoNaoSelecionavel = document.getElementById("fundoNaoSelecionavel");

//==============================================
//Caixa de confirmação de ação
let caixaDeConfirmacao = document.getElementById("caixaDeConfirmacao");

let opcaoSim = document.getElementById("opcaoSim");

let opcaoNao = document.getElementById("opcaoNao");

//==============================================
//Botão abrir formulário
let botaoAbrirFormularioCriacao = document.getElementById("botaoAbrirFormCriacao");

//==============================================
//Listas de tarefas
let listasDeTarefas = document.querySelectorAll(".listaDeTarefas");

//LÓGICA =======================================
let ArrayDeTarefas = [
  {
    nome: "Tarefa de exemplo",
    descricao: "Descrição de exemplo",
    dataConclusao: "2023-09-08",
    nivelPrioridade: 3,
    categoria: "Categoria de exemplo",
    status: 1
  }
];

//Formatador
function formatadorDataPadraoBrasileiro(dataString) {
  let dataRecebida = new Date(dataString);

  const dataFormatada = dataRecebida.toLocaleDateString("pt-BR", {
    timeZone: "UTC",
    day: "numeric",
    month: "numeric",
    year: "2-digit"
  });

  return dataFormatada;
}

//==============================================

//Altera visibilidade de elementos
function mostrarElementos(display, ...elementos) {
  elementos.forEach(function (elemento) {
    elemento.style.display = display;
  })
}

function ocultarElementos(...elementos) {
  elementos.forEach(function (elemento) {
    elemento.style.display = "none";
  })
}

//LIMPA ========================================
function limparFormulario() {
  inputNome.value = "";

  inputDescricao.value = "";
  inputDescricao.style.height = "17px"

  inputDataConclusao.value= "";
  inputCategoria.value = "";

  inputNivelPrioridade.value = "";
  inputNivelPrioridade.classList.remove("nivel1", "nivel2", "nivel3", "nivel4", "nivel5", "nivelSelecionado");

  inputStatus.value = "";

  ocultarElementos(mensagemErroFormulario);
}

//Verificar se inputs não são vazios ===========
function verificarInputsFormulario() {
  if (!inputNome.value || !inputDescricao.value || !inputDataConclusao.value || !inputCategoria.value || !inputNivelPrioridade.value || !inputStatus.value){
    return false;
  } else {
    return true;
  }
}

//Modificar formulário para edição =============
function modificarFormularioParaEdicao(tarefa) {
  tituloFormulario.innerHTML = "Editar Tarefa";

  inputNome.value = tarefa.nome;
  inputDescricao.value = tarefa.descricao;
  inputDataConclusao.value = tarefa.dataConclusao;
  inputCategoria.value = tarefa.categoria;
  inputNivelPrioridade.value = tarefa.nivelPrioridade;
  inputStatus.value = tarefa.status;

  botaoConfirmarFormulario.innerHTML = "Atualizar"
}

//Modificar formulário para cadastro ===========
function modificarFormularioParaCadastro() {
  tituloFormulario.innerHTML = "Cadastrar tarefa";

  inputNome.placeholder = "Digite o nome da tarefa";
  inputDescricao.placeholder = "Uma descrição...";
  inputDataConclusao.value;
  inputCategoria.placeholder = "Categoria da tarefa";
  inputNivelPrioridade.value;
  inputStatus.value;

  botaoConfirmarFormulario.innerHTML = "Cadastrar"
}

//Recebe dados dos inputs do formulário ========
function receberDadosFormulario() {
  let nomeTarefa = inputNome.value;
  let descricaoTarefa = inputDescricao.value;
  let dataConclusaoTarefa = inputDataConclusao.value;
  let categoriaTarefa = inputCategoria.value;

  let nivelPrioridadeTarefa = inputNivelPrioridade.value;
  nivelPrioridadeTarefa = parseInt(nivelPrioridadeTarefa);
  
  let statusTarefa = inputStatus.value;
  statusTarefa = parseInt(statusTarefa);

  let dadosInput = {
    nomeTarefa,
    descricaoTarefa,
    dataConclusaoTarefa,
    categoriaTarefa,
    nivelPrioridadeTarefa,
    statusTarefa
  };

  return dadosInput;
}

function criarTarefa() {
  let dados = receberDadosFormulario();

  return new Tarefa(dados.nomeTarefa, dados.descricaoTarefa, dados.dataConclusaoTarefa, dados.categoriaTarefa, dados.nivelPrioridadeTarefa, dados.statusTarefa);
}

function cadastrarTarefaNoVetor(tarefa) {
  ArrayDeTarefas.push(tarefa);
}

//Cria card para tarefa x
function criarCardTarefa(tarefa) {
  let cardTarefa = document.createElement("div");
  cardTarefa.className = "tarefaCard";

  let dataTarefa = "";
  let textoBotao = "";

  switch(tarefa.status){
    case 1:
      textoBotao = "Começar";
      dataTarefa = formatadorDataPadraoBrasileiro(tarefa.dataConclusao);
      break;
    case 2:
      textoBotao = "Concluir";
      dataTarefa = formatadorDataPadraoBrasileiro(tarefa.dataConclusao);
      break;
    case 3:
      textoBotao = "Feito";
      dataTarefa = formatadorDataPadraoBrasileiro(new Date());
  }

  let nivelPrioridadeCor = "";
  let nivelPrioridadeTexto = "";
  switch (tarefa.nivelPrioridade) {
    case 1:
      nivelPrioridadeCor = "nivel1";
      nivelPrioridadeTexto = "Muito baixo";
      break;
    case 2:
      nivelPrioridadeCor = "nivel2";
      nivelPrioridadeTexto = "Baixo";
      break;
    case 3:
      nivelPrioridadeCor = "nivel3";
      nivelPrioridadeTexto = "Médio";
      break;
    case 4:
      nivelPrioridadeCor = "nivel4";
      nivelPrioridadeTexto = "Alto";
      break;
    case 5:
      nivelPrioridadeCor = "nivel5";
      nivelPrioridadeTexto = "Muito alto";
  }

  cardTarefa.innerHTML = `
                  <div class="content">
                      <span id="nomeTarefa">${tarefa.nome}</span>
                      <span id="descricaoTarefa" class="desc">${tarefa.descricao}</span>
                      <div class="prioridade">
                          <div class="nivel ${nivelPrioridadeCor}"></div>
                          <span>PRIORIDADE: </span>
                          <span id="nivelPrioridadeTarefa">${nivelPrioridadeTexto}</span>
                      </div>
                      <div id="categoria" class="categoria">
                          <span>CATEGORIA: </span>
                          <span>${tarefa.categoria}</span>
                      </div>
                  </div>
                  <div class="actions">
                      <div class="act1">
                          <button id="mandarProximaLista" class="proximaLista">${textoBotao}</button>
                          <span id="dataConclusao" class="date">${dataTarefa}</span>
                      </div>
                      <div class="act2">
                          <button id="mandarListaAnterior" class="icon"><img src="../assets/tasks/reset.svg" alt="retro"></button>
                          <button class="editarTarefa" class="icon"><img src="../assets/tasks/edit.svg" alt="edit"></button>
                          <button class="excluirTarefa" class="icon"><img src="../assets/tasks/exclude.svg" alt="exclude"></button>
                      </div>
                  </div>
  `;

  let botaoProximaLista = cardTarefa.querySelector("#mandarProximaLista");
  botaoProximaLista.addEventListener("click", function () {
    moverParaProximaLista(tarefa);
    renderizarListaTarefas(ArrayDeTarefas);
  });

  let botaoListaAnterior = cardTarefa.querySelector("#mandarListaAnterior");
  botaoListaAnterior.addEventListener("click", function () {
    moverParaListaAnterior(tarefa);
    renderizarListaTarefas(ArrayDeTarefas);
  });

  let botaoExcluirTarefa = cardTarefa.querySelector(".excluirTarefa");
  botaoExcluirTarefa.addEventListener("click", function () {
    mostrarElementos("flex", caixaDeConfirmacao, fundoNaoSelecionavel);

    opcaoSim.onclick = function() {
      excluirTarefa(ArrayDeTarefas.indexOf(tarefa));

      renderizarListaTarefas(ArrayDeTarefas);
      
      ocultarElementos(caixaDeConfirmacao, fundoNaoSelecionavel);
    };
    
    opcaoNao.onclick = function () {
      ocultarElementos(caixaDeConfirmacao, fundoNaoSelecionavel);
    };
  });

  let botaoEditarTarefa = cardTarefa.querySelector(".editarTarefa");
  botaoEditarTarefa.addEventListener("click", function () {
    modificarFormularioParaEdicao(tarefa);
    mostrarElementos("flex", formularioCriacao, fundoNaoSelecionavel);
    ocultarElementos(botaoAbrirFormularioCriacao);

    botaoConfirmarFormulario.onclick = function() {
      if(verificarInputsFormulario()){
        editarTarefa(tarefa);

        renderizarListaTarefas(ArrayDeTarefas);
        
        ocultarElementos(formularioCriacao, fundoNaoSelecionavel);
        mostrarElementos("flex", botaoAbrirFormularioCriacao);

        limparFormulario();

      } else {
        mostrarElementos("flex", mensagemErroFormulario);
      }
    }

    botaoCancelarFormulario.onclick = function() {
      ocultarElementos(formularioCriacao, fundoNaoSelecionavel);
      mostrarElementos("flex", botaoAbrirFormularioCriacao);

      limparFormulario();
    }
  });

  return cardTarefa;
} //Final da criação de card ===================


//Funções do card de tarefa ====================
//Create
botaoAbrirFormularioCriacao.onclick = function() {
  modificarFormularioParaCadastro();
  mostrarElementos("flex", formularioCriacao, fundoNaoSelecionavel);
  ocultarElementos(botaoAbrirFormularioCriacao);

  botaoConfirmarFormulario.onclick = function() {
    if(verificarInputsFormulario()){
      cadastrarTarefaNoVetor(criarTarefa());

      renderizarListaTarefas(ArrayDeTarefas);
      
      ocultarElementos(formularioCriacao, fundoNaoSelecionavel);
      mostrarElementos(botaoAbrirFormularioCriacao);

      limparFormulario();

    } else {
      mostrarElementos("flex", mensagemErroFormulario);
    }
  }

  botaoCancelarFormulario.onclick = function() {
    ocultarElementos(formularioCriacao, fundoNaoSelecionavel);
    mostrarElementos("flex", botaoAbrirFormularioCriacao);

    limparFormulario();
  }
}

function moverParaProximaLista(tarefa) {
  if (tarefa.status < 3){
    tarefa.status++;
  }
}

function moverParaListaAnterior(tarefa){
  if (tarefa.status > 1){
    tarefa.status--;
  }
}

//Delete =======================================
function excluirTarefa(indiceTarefa){
  ArrayDeTarefas.splice(indiceTarefa, 1);
}

//Update =======================================
function editarTarefa(tarefa){
  let dados = receberDadosFormulario();

  tarefa.nome = dados.nomeTarefa;
  tarefa.descricao = dados.descricaoTarefa
  tarefa.dataConclusao = dados.dataConclusaoTarefa;
  tarefa.categoria = dados.categoriaTarefa;
  tarefa.nivelPrioridade = dados.nivelPrioridadeTarefa;
  tarefa.status = dados.statusTarefa;
}

//RENDERIZÇÂO ==================================
//Read
function renderizarListaTarefas(tarefas) {
  listasDeTarefas.forEach(function (lista) {
    lista.innerHTML = "";

    tarefas.forEach(function (tarefa) { 
      if (tarefa.status == parseInt(lista.id)) {
        let cardTarefa = criarCardTarefa(tarefa);
        lista.appendChild(cardTarefa);
      }
    })
  })
}

//ESTILIZAÇÂO ==================================

function mudarCorSelect(){
  inputNivelPrioridade.classList.add("nivelNaoSelecionado");

  inputNivelPrioridade.addEventListener("change", function () {
    inputNivelPrioridade.classList.remove("nivel5", "nivel4", "nivel3", "nivel2", "nivel1", "nivelSelecionado");
    switch (inputNivelPrioridade.value) {
      case "1":
        inputNivelPrioridade.classList.add("nivel1", "nivelSelecionado");
        break;
      case "2":
        inputNivelPrioridade.classList.add("nivel2", "nivelSelecionado");
        break;
      case "3":
        inputNivelPrioridade.classList.add("nivel3", "nivelSelecionado");
        break;
      case "4":
        inputNivelPrioridade.classList.add("nivel4", "nivelSelecionado");
        break;
      case "5":
        inputNivelPrioridade.classList.add("nivel5", "nivelSelecionado");
    }
  });
}

//ON INIT ======================================
renderizarListaTarefas(ArrayDeTarefas);
mudarCorSelect();