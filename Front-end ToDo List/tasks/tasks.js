let selectNivelPrioridade = document.querySelectorAll("select");

selectNivelPrioridade.forEach(function (select) {
  select.classList.add("nivelNaoSelecionado");

  select.addEventListener("change", function () {
    select.classList.remove(
      "nivel5",
      "nivel4",
      "nivel3",
      "nivel2",
      "nivel1",
      "nivelSelecionado"
    );

    let valorSelecionado = select.value;

    switch (valorSelecionado) {
      case "5":
        select.classList.add("nivel5", "nivelSelecionado");
        break;
      case "4":
        select.classList.add("nivel4", "nivelSelecionado");
        break;
      case "3":
        select.classList.add("nivel3", "nivelSelecionado");
        break;
      case "2":
        select.classList.add("nivel2", "nivelSelecionado");
        break;
      case "1":
        select.classList.add("nivel1", "nivelSelecionado");
        break;
    }
  });
});

// =========================================

class Tarefa {
  constructor(
    nome,
    descricao,
    dataConclusao,
    nivelPrioridade,
    categoria,
    estatus
  ) {
    this.nome = nome;
    this.descricao = descricao;
    this.dataConclusao = dataConclusao;
    this.nivelPrioridade = nivelPrioridade;
    this.categoria = categoria;
    this.estatus = estatus;
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

let nomeFormEdit = document.getElementById("nomeFormEdit");
let descricaoFormEdit = document.getElementById("descricaoFormEdit");
let dataConclusaoFormEdit = document.getElementById("dataConclusaoFormEdit");
let categoriaFormEdit = document.getElementById("categoriaFormEdit");
let nivelPrioridadeFormEdit = document.getElementById(
  "nivelPrioridadeFormEdit"
);

let ArrayDeTarefas = [
  {
    nome: "Tarefa de exemplo",
    descricao: "Descrição de exemplo",
    dataConclusao: "2023-09-08",
    nivelPrioridade: 3,
    categoria: "Categoria de exemplo",
    estatus: 1,
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
  let categoriaForm = document.getElementById("categoriaForm").value;

  nivelPrioridadeForm = parseInt(nivelPrioridadeForm);

  return new Tarefa(
    nomeForm,
    descricaoForm,
    dataConclusaoForm,
    nivelPrioridadeForm,
    categoriaForm,
    1
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
  mensagemErroEdicao.style.display = "none";
}

function formatadorData(dataString) {
  let dataRecebida = new Date(dataString);

  const dataFormatada = dataRecebida.toLocaleDateString("pt-BR", {
    timeZone: "UTC",
    day: "numeric",
    month: "numeric",
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
    nivelPrioridadeForm.value === ""
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
});

function renderizarListaTarefas(tarefas) {
  const listas = document.querySelectorAll(".listaDeTarefas");

  listas.forEach(function (lista) {
    lista.innerHTML = "";

    tarefas.forEach(function (tarefa) {
      if (tarefa.estatus === parseInt(lista.id)) {
        let cardTarefa = criarCardTarefa(tarefa);
        lista.appendChild(cardTarefa);
      }
    });
  });
}

function criarCardTarefa(tarefa) {
  let cardTarefa = document.createElement("div");
  cardTarefa.className = "tarefaCard";

  let textoBotao = "";
  switch (tarefa.estatus) {
    case 1:
      textoBotao = "Realizar";
      break;
    case 2:
      textoBotao = "Concluir";
      break;
    case 3:
      textoBotao = "Feito";
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
    case 1:
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
                            <span id="dataConclusao" class="date">${formatadorData(
                              tarefa.dataConclusao
                            )}</span>
                        </div>
                        <div class="act2">
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
  if (tarefa.estatus === 1) {
    tarefa.estatus = 2;
  } else if (tarefa.estatus === 2) {
    tarefa.estatus = 3;
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

  botaoConfirmarEdicao.onclick = function () {
    if (
      !nomeFormEdit.value ||
      !descricaoFormEdit.value ||
      !dataConclusaoFormEdit.value ||
      !categoriaFormEdit.value ||
      nivelPrioridadeFormEdit.value === ""
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
