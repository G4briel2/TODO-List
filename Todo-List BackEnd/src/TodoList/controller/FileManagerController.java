package TodoList.controller;

import TodoList.model.Tarefa;

import static TodoList.controller.validators.DateValidator.*;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashSet;

public class FileManagerController {
    public void salvarTarefas(ArrayList<Tarefa> listaDeTarefasCadastradas){
        try {
            FileWriter save = new FileWriter("Tasks.csv");

            for (Tarefa tarefa: listaDeTarefasCadastradas){
                save.write(tarefa.getNome() + "," +
                        tarefa.getDescricao() + "," +
                        tarefa.getDataConclusao() + "," +
                        tarefa.getNivelPrioridade() + "," +
                        tarefa.getCategoria() + "," +
                        tarefa.getStatus() + System.lineSeparator());
            }
            save.close();
        } catch (Exception e){
            System.out.println("Erro ao salvar tarefas " + e);
        }
    }

    public ArrayList<Tarefa> carregarTarefas(){
        ArrayList<Tarefa> tarefasSalvas = new ArrayList<>();

        try{
            BufferedReader loader = new BufferedReader(new FileReader("Tasks.csv"));

            String linha;
            while((linha = loader.readLine()) != null){
                String[] task = linha.split(",");

                //LocalDateParser
                LocalDate dateLoad = converterStringParaLocalDate(task[2], "yyyy-MM-dd");

                //intParser
                int nivelPrioridadeFormatado = Integer.parseInt(task[3]);
                int statusFormatado = Integer.parseInt(task[5]);

                tarefasSalvas.add(new Tarefa(task[0], task[1], dateLoad, nivelPrioridadeFormatado, task[4], statusFormatado));
            }
        } catch(Exception e) {
            System.out.println("Erro ao carregar tarefas " + e);
        }

        return tarefasSalvas;
    }

    public HashSet<String> carregarCategorias(){
        HashSet<String> categoriasSalvas = new HashSet<>();

        try{
            BufferedReader loader = new BufferedReader(new FileReader("Tasks.csv"));

            String linha;
            while((linha = loader.readLine()) != null){
                String[] task = linha.split(",");

                categoriasSalvas.add(task[4]);
            }
        } catch(Exception e) {
            System.out.println("Erro ao carregar categorias " + e);
        }

        return categoriasSalvas;
    }
}
