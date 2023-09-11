let selectNivelPrioridade = document.getElementById("nivelPrioridadeForm");
let selectNivelPrioridadeEdit = document.getElementById("nivelPrioridadeFormEdit");
mudarCorSelect(selectNivelPrioridade)
mudarCorSelect(selectNivelPrioridadeEdit)

function mudarCorSelect(elemento){
  elemento.classList.add("nivelNaoSelecionado");

  elemento.addEventListener("change", function () {
    elemento.classList.remove(
      "nivel5",
      "nivel4",
      "nivel3",
      "nivel2",
      "nivel1",
      "nivelSelecionado"
    );

    let valorSelecionado = elemento.value;

    switch (valorSelecionado) {
      case "5":
        elemento.classList.add("nivel5", "nivelSelecionado");
        break;
      case "4":
        elemento.classList.add("nivel4", "nivelSelecionado");
        break;
      case "3":
        elemento.classList.add("nivel3", "nivelSelecionado");
        break;
      case "2":
        elemento.classList.add("nivel2", "nivelSelecionado");
        break;
      case "1":
        elemento.classList.add("nivel1", "nivelSelecionado");
        break;
    }
  });
}

// =========================================

class Tarefa {
  constructor(
    nome,
    descricao,
    dataConclusao,
    nivelPrioridade,
    categoria,
    status
  ) {
    this.nome = nome;
    this.descricao = descricao;
    this.dataConclusao = dataConclusao;
    this.nivelPrioridade = nivelPrioridade;
    this.categoria = categoria;
    this.status = status;
  }
}

let backgroundUnselect = document.getElementById("backGroundUnselect");

let confirmBox = document.getElementById("confirmBox");
let botaoConfirmarExclusao = document.getElementById("yes");
let botaoCancelarExclusao = document.getElementById("no");

let formCadastrar = document.getElementById("formularioCriacao");
let formEditar = document.getElementById("formularioEdicao");

let botaoConfirmarCadastro = document.getElementById("botaoConfirmarCadastro");
let botaoCancelarCadastro = document.getElementById("botaoCancelarCadastro");

let botaoConfirmarEdicao = document.getElementById("botaoConfirmarEdicao");
let botaoCancelarEdicao = document.getElementById("botaoCancelarEdicao");

let botaoAbrirFormularioCadastro = document.getElementById("abrirFormCriacao");

let mensagemErroCadastro = document.getElementById("mensagemErroCadastro");
let mensagemErroEdicao = document.getElementById("mensagemErroEdicao");

let nomeForm = document.getElementById("nomeForm");
let descricaoForm = document.getElementById("descricaoForm");
let dataConclusaoForm = document.getElementById("dataConclusaoForm");
let categoriaForm = document.getElementById("categoriaForm");
let nivelPrioridadeForm = document.getElementById("nivelPrioridadeForm");
let statusForm = document.getElementById("statusForm");

let nomeFormEdit = document.getElementById("nomeFormEdit");
let descricaoFormEdit = document.getElementById("descricaoFormEdit");
let dataConclusaoFormEdit = document.getElementById("dataConclusaoFormEdit");
let categoriaFormEdit = document.getElementById("categoriaFormEdit");
let nivelPrioridadeFormEdit = document.getElementById("nivelPrioridadeFormEdit");
let statusFormEdit = document.getElementById("statusFormEdit");

let ArrayDeTarefas = [
  {
    nome: "Tarefa de exemplo",
    descricao: "Descrição de exemplo",
    dataConclusao: "2023-09-08",
    nivelPrioridade: 3,
    categoria: "Categoria de exemplo",
    status: 1,
  },
];

let categoriasDeTarefas = [];

function criarTarefa() {
  let nomeForm = document.getElementById("nomeForm").value;
  let descricaoForm = document.getElementById("descricaoForm").value;
  let dataConclusaoForm = document.getElementById("dataConclusaoForm").value;
  let nivelPrioridadeForm = document.getElementById(
    "nivelPrioridadeForm"
  ).value;
  let statusForm = document.getElementById("statusForm").value;
  let categoriaForm = document.getElementById("categoriaForm").value;

  statusForm = parseInt(statusForm);
  nivelPrioridadeForm = parseInt(nivelPrioridadeForm);

  return new Tarefa(
    nomeForm,
    descricaoForm,
    dataConclusaoForm,
    nivelPrioridadeForm,
    categoriaForm,
    statusForm
  );
}

function limparFormulario() {
  document.getElementById("nomeForm").value = "";
  document.getElementById("descricaoForm").value = "";
  document.getElementById("dataConclusaoForm").value = "";

  document.getElementById("nivelPrioridadeForm").value = "";
  document.getElementById("nivelPrioridadeForm").classList.remove(
    "nivel5",
    "nivel4",
    "nivel3",
    "nivel2",
    "nivel1",
    "nivelSelecionado"
  );

  document.getElementById("categoriaForm").value = "";
  statusForm.value = "";

  mensagemErroCadastro.style.display = "none";

  document.getElementById("nomeFormEdit").value = "";
  document.getElementById("descricaoFormEdit").value = "";
  document.getElementById("dataConclusaoFormEdit").value = "";

  document.getElementById("nivelPrioridadeFormEdit").value = "";
  document.getElementById("nivelPrioridadeFormEdit").classList.remove(
      "nivel5",
      "nivel4",
      "nivel3",
      "nivel2",
      "nivel1",
      "nivelSelecionado"
    );

  document.getElementById("categoriaFormEdit").value = "";
  statusFormEdit.value = "";

  mensagemErroEdicao.style.display = "none";
}

function formatadorData(dataString) {
  let dataRecebida = new Date(dataString);

  const dataFormatada = dataRecebida.toLocaleDateString("pt-BR", {
    timeZone: "UTC",
    day: "numeric",
    month: "numeric",
    year: "2-digit"
  });

  return dataFormatada;
}

let mostrarElemento = false;

function alterarVisibilidadeElemento(...elementos) {
  mostrarElemento = !mostrarElemento;

  elementos.forEach(function (elemento) {
    if (mostrarElemento) {
      elemento.style.display = "flex";
    } else {
      elemento.style.display = "none";
    }
  });
}

botaoAbrirFormularioCadastro.addEventListener("click", function () {
  alterarVisibilidadeElemento(formCadastrar, backgroundUnselect);
});

botaoConfirmarCadastro.addEventListener("click", function () {
  if (
    !nomeForm.value ||
    !descricaoForm.value ||
    !dataConclusaoForm.value ||
    !categoriaForm.value ||
    nivelPrioridadeForm.value === "" || statusForm.value === ""
  ) {
    mensagemErroCadastro.style.display = "flex";
  } else {
    let novaTarefa = criarTarefa();
    console.log(novaTarefa);
    ArrayDeTarefas.push(criarTarefa());
    renderizarListaTarefas(ArrayDeTarefas);

    alterarVisibilidadeElemento(formCadastrar, backgroundUnselect);
    limparFormulario();
  }
});

botaoCancelarCadastro.addEventListener("click", function () {
  alterarVisibilidadeElemento(formCadastrar, backgroundUnselect);
  limparFormulario();
});

function renderizarListaTarefas(tarefas) {
  const listas = document.querySelectorAll(".listaDeTarefas");

  listas.forEach(function (lista) {
    lista.innerHTML = "";

    tarefas.forEach(function (tarefa) {
      if (tarefa.status === parseInt(lista.id)) {
        let cardTarefa = criarCardTarefa(tarefa);
        lista.appendChild(cardTarefa);
      }
    });
  });
}

function criarCardTarefa(tarefa) {
  let cardTarefa = document.createElement("div");
  cardTarefa.className = "tarefaCard";
  cardTarefa.setAttribute("draggable", "true");
  cardTarefa.setAttribute("ondragstart", "drag(event)")
  cardTarefa.setAttribute("id", "draggable");
  
  let dataTarefa;
  let textoBotao = "";
  switch (tarefa.status) {
    case 1:
      textoBotao = "Começar";
      dataTarefa = formatadorData(tarefa.dataConclusao)
      break;
    case 2:
      textoBotao = "Concluir";
      dataTarefa = formatadorData(tarefa.dataConclusao)
      break;
    case 3:
      textoBotao = "Feito";
      dataTarefa = new Date()
      dataTarefa = formatadorData(dataTarefa);
  }

  let nivelPrioridadeCor = "";
  let nivelPrioridadeTexto = "";
  switch (tarefa.nivelPrioridade) {
    case 5:
      nivelPrioridadeCor = "nivel5";
      nivelPrioridadeTexto = "Muito alto";
      break;
    case 4:
      nivelPrioridadeCor = "nivel4";
      nivelPrioridadeTexto = "Alto";
      break;
    case 3:
      nivelPrioridadeCor = "nivel3";
      nivelPrioridadeTexto = "Médio";
      break;
    case 2:
      nivelPrioridadeCor = "nivel2";
      nivelPrioridadeTexto = "Baixo";
      break;
    case 1:
      nivelPrioridadeCor = "nivel1";
      nivelPrioridadeTexto = "Muito baixo";
  }

  cardTarefa.innerHTML = `
                    <div class="content">
                        <span id="nomeTarefa">${tarefa.nome}</span>
                        <span id="descricaoTarefa" class="desc">${
                          tarefa.descricao
                        }</span>
                        <div class="prioridade">
                            <div class="nivel ${nivelPrioridadeCor}"></div>
                            <span>PRIORIDADE: </span>
                            <span id="nivelPrioridadeTarefa">${nivelPrioridadeTexto}</span>
                        </div>
                        <div id="categoria" class="categoria"><span>CATEGORIA: </span><span>${
                          tarefa.categoria
                        }</span></div>
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

  const botaoProximaLista = cardTarefa.querySelector("#mandarProximaLista");
  botaoProximaLista.addEventListener("click", function () {
    moverParaProximaLista(tarefa);
    renderizarListaTarefas(ArrayDeTarefas);
  });

  const botaoListaAnterior = cardTarefa.querySelector("#mandarListaAnterior");
  botaoListaAnterior.addEventListener("click", function () {
    moverParaListaAnterior(tarefa);
    renderizarListaTarefas(ArrayDeTarefas);
  });

  const botaoExcluirTarefa = cardTarefa.querySelector(".excluirTarefa");
  botaoExcluirTarefa.addEventListener("click", function () {
    excluirTarefa(tarefa);
  });

  const botaoEditarTarefa = cardTarefa.querySelector(".editarTarefa");
  botaoEditarTarefa.addEventListener("click", function () {
    editarTarefa(tarefa);
    alterarVisibilidadeElemento(formEditar);
  });

  return cardTarefa;
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

function excluirTarefa(tarefa) {
  alterarVisibilidadeElemento(confirmBox, backgroundUnselect);

  botaoConfirmarExclusao.onclick = function () {
    const indice = ArrayDeTarefas.indexOf(tarefa);
    ArrayDeTarefas.splice(indice, 1);

    renderizarListaTarefas(ArrayDeTarefas);
    alterarVisibilidadeElemento(confirmBox, backgroundUnselect);
  };

  botaoCancelarExclusao.onclick = function () {
    alterarVisibilidadeElemento(confirmBox, backgroundUnselect);
  };
}

function editarTarefa(tarefa) {
  document.getElementById("nomeFormEdit").placeholder = tarefa.nome;
  document.getElementById("descricaoFormEdit").placeholder = tarefa.descricao;
  document.getElementById("dataConclusaoFormEdit").value = tarefa.dataConclusao;
  document.getElementById("nivelPrioridadeFormEdit").value =
    tarefa.nivelPrioridade;
  document.getElementById("categoriaFormEdit").placeholder = tarefa.categoria;
  statusFormEdit.value = tarefa.status;

  botaoConfirmarEdicao.onclick = function () {
    if (
      !nomeFormEdit.value ||
      !descricaoFormEdit.value ||
      !dataConclusaoFormEdit.value ||
      !categoriaFormEdit.value ||
      nivelPrioridadeFormEdit.value === "" || statusFormEdit.value === ""
    ) {
      mensagemErroEdicao.style.display = "flex";
    } else {
      tarefa.nome = document.getElementById("nomeFormEdit").value;
      tarefa.descricao = document.getElementById("descricaoFormEdit").value;
      tarefa.dataConclusao = document.getElementById(
        "dataConclusaoFormEdit"
      ).value;
      tarefa.nivelPrioridade = parseInt(
        document.getElementById("nivelPrioridadeFormEdit").value
      );
      tarefa.categoria = document.getElementById("categoriaFormEdit").value;
      tarefa.status = parseInt(statusFormEdit.value);

      renderizarListaTarefas(ArrayDeTarefas);

      limparFormulario();
      alterarVisibilidadeElemento(formEditar, backgroundUnselect);
    }
  };

  botaoCancelarEdicao.onclick = function () {
    limparFormulario();
    alterarVisibilidadeElemento(formEditar, backgroundUnselect);
  };
}

renderizarListaTarefas(ArrayDeTarefas);

// ============================

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

let card = document.getElementById("draggable");