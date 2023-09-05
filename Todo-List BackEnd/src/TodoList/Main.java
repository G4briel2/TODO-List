package TodoList;

import TodoList.controller.FileManagerController;
import TodoList.controller.ListaDeTarefasController;
import TodoList.model.Tarefa;

import java.util.ArrayList;
import java.util.Scanner;
import java.util.Set;

import static TodoList.controller.validators.IntValidator.*;

public class Main {
    public static void main(String[] args) {
        int opc;
        Scanner input = new Scanner(System.in);

        ListaDeTarefasController controladorTarefas = new ListaDeTarefasController();
        FileManagerController arquivamentoTarefas = new FileManagerController();

        ArrayList<Tarefa> tarefas = controladorTarefas.getListaDeTarefas();
        boolean temTarefas = controladorTarefas.temCadastrosNaLista(tarefas);

        Set<String> categorias = controladorTarefas.getCategoriasTarefa();

        do {
            System.out.println("""
                    #To Do List#
                    Selecione uma opção
                    1 - Listar tarefas
                    2 - Cadastrar tarefa
                    3 - Editar tarefa
                    4 - Excluir tarefa
                    0 - Sair""");

            opc = forcarInputInteiro();

            switch (opc) {
                case 1 -> {
                    if (temTarefas) {
                        System.out.println("#Listagem#\n1 - Categoria\n2 - Prioridade\n3 - Status\n4 - Nenhum\nSelecione um filtro");
                        int filtroSelecionado = intMaiorQue(0, forcarInputInteiro());

                        switch (filtroSelecionado) {
                            case 1 -> {
                                System.out.println(controladorTarefas.listarCategorias() + "\nSelecione uma categoria");
                                int categoriaEscolhida = intMaiorQueEMenorQue(0, forcarInputInteiro(), categorias.size()+1);

                                System.out.println(controladorTarefas.listarTarefasPorCategoria(categoriaEscolhida));
                            }
                            case 2 -> {
                                System.out.println("1 - Muito baixo\n2 - Baixo\n3 - Médio\n4 - Alto\n5 - Muito alto\nSelecione uma prioridade");
                                int prioridadeEscolhida = intMaiorQueEMenorQue(0, forcarInputInteiro(), 6);

                                System.out.println(controladorTarefas.listarTarefasPorPrioridade(prioridadeEscolhida));
                            }
                            case 3 -> {
                                System.out.println("1 - To do\n2 - Doing\n3 - Done\nSelecione um status de tarefa");
                                int statusEscolhido = intMaiorQueEMenorQue(0, forcarInputInteiro(), 4);

                                System.out.println(controladorTarefas.listarTarefasPorStatus(statusEscolhido));
                            }
                            case 4 -> System.out.println(controladorTarefas.listarTarefasSemFiltro());
                            default -> System.out.println("Opção inválida");
                        }
                    } else {
                        System.out.println("Nenhuma tarefa cadastrada");
                    }
                }
                case 2 -> controladorTarefas.cadastrarTarefa(controladorTarefas.criarTarefa());
                case 3 -> {
                    System.out.println(controladorTarefas.listarTarefasSemFiltro() + "Que tarefa deseja editar ?");
                    int tarefaSelecionada = intMaiorQueEMenorQue(0, forcarInputInteiro(), tarefas.size()+1)-1;

                    controladorTarefas.editarTarefa(controladorTarefas.criarTarefa(), tarefaSelecionada);
                }
                case 4 -> {
                    if (temTarefas) {
                        System.out.println(controladorTarefas.listarTarefasSemFiltro() + "0 - Para cancelar\n#Excluir tarefa#\nQue tarefa deseja excluir?");
                        int indice = intMaiorQueEMenorQue(0, forcarInputInteiro(), tarefas.size()+1) -1;

                        if (indice != 0) {
                            controladorTarefas.excluirTarefa(indice);
                        }
                    } else {
                        System.out.println("Nenhuma tarefa cadastrada");
                    }
                }
                case 0 -> {
                    System.out.println("Saindo...");
                    arquivamentoTarefas.salvarTarefas(tarefas);
                }
                default -> System.out.println("Opção inválida");
            }
        }while (opc != 0);
    }
}
