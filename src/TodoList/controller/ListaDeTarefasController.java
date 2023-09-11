package TodoList.controller;

import TodoList.model.Tarefa;

import java.time.LocalDate;
import java.util.*;

import static TodoList.controller.validators.DateValidator.*;
import static TodoList.controller.validators.IntValidator.*;
import static TodoList.controller.validators.StringValidator.forcarInputStringComRegex;

public class ListaDeTarefasController {
    FileManagerController fileManager = new FileManagerController();
    ArrayList<Tarefa> listaDeTarefas = new ArrayList<>(fileManager.carregarTarefas());

    Set<String> categoriasTarefa = new HashSet<>(fileManager.carregarCategorias());

    public ArrayList<Tarefa> getListaDeTarefas() {
        return listaDeTarefas;
    }
    public Set<String> getCategoriasTarefa() {
        return categoriasTarefa;
    }

    public <T> boolean temCadastrosNaLista(List<T> lista) {
        return lista.size() > 0;
    }

    public Tarefa criarTarefa(){
        Scanner input = new Scanner(System.in);
        System.out.print("#Cadastro#\n" +
                "Nome da tarefa:");
        String nome = input.nextLine();

        System.out.print("Descrição:");
        String descricao = input.nextLine();

        System.out.print("Data de término - (dd/mm/aaaa):");
        String dataString = forcarInputStringComRegex("^([0-2][0-9]|(3)[0-1])(\\/)(((0)[0-9])|((1)[0-2]))(\\/)\\d{4}$");
        LocalDate dataConclusao = converterStringParaLocalDate(dataString, "dd/MM/yyyy");

        System.out.println("""
                            Nível de prioridade:
                            1 - Muito baixo
                            2 - Baixo
                            3 - Médio
                            4 - Alto
                            5 - Muito alto
                            Selecione uma prioridade""");
        int nivelPrioridade = intMaiorQueEMenorQue(0, forcarInputInteiro(), 6);

        System.out.print("Categoria:");
        String categoria = input.nextLine();
        categoriasTarefa.add(categoria);

        return new Tarefa(nome, descricao, dataConclusao, nivelPrioridade, categoria, 1);
    }
    public void cadastrarTarefa(Tarefa tarefa){
        listaDeTarefas.add(tarefa);
        listaDeTarefas.sort((o1, o2) -> o2.getNivelPrioridade() - o1.getNivelPrioridade());
    }

    public void editarTarefa(Tarefa tarefa, int indiceTarefa){
        listaDeTarefas.set(indiceTarefa, tarefa);
    }

    public String listarTarefasSemFiltro(){
        String tarefasCadastradas = "";
        int indice = 1;

        for (Tarefa tarefa : listaDeTarefas){
            tarefasCadastradas += indice + " - " + tarefa + "\n";
            indice++;
        }

        return tarefasCadastradas;
    }

    public void excluirTarefa(int indice){
        listaDeTarefas.remove(indice);
    }

    public String listarCategorias() {
        String listaCategorias = "";
        int indice = 1;
        ArrayList<String> categorias = new ArrayList<>(categoriasTarefa);

        for (String categoria : categorias){
            listaCategorias += indice + " - " + categoria + "\n";
            indice++;
        }

        return listaCategorias;
    }

    public String listarTarefasPorCategoria(int indiceCategoriaEscolhida){
        String tarefasDeCategoria = "";
        ArrayList<String> categorias = new ArrayList<>(categoriasTarefa);

        for (Tarefa tarefa : listaDeTarefas){
            if (tarefa.getCategoria().equals(categorias.get(indiceCategoriaEscolhida-1))){
                tarefasDeCategoria += tarefa + "\n";
            }
        }

        return tarefasDeCategoria;
    }

    public String listarTarefasPorPrioridade(int prioridadeEscolhida){
        String tarefasDePrioridade = "";

        for (Tarefa tarefa : listaDeTarefas){
            if (tarefa.getNivelPrioridade() == prioridadeEscolhida){
                tarefasDePrioridade += tarefa + "\n";
            }
        }

        return tarefasDePrioridade;
    }

    public String listarTarefasPorStatus(int statusEscolhido){
        String tarefasDeStatus = "";

        for (Tarefa tarefa : listaDeTarefas){
            if (tarefa.getStatus() == statusEscolhido){
                tarefasDeStatus += tarefa + "\n";
            }
        }

        return tarefasDeStatus;
    }
}
