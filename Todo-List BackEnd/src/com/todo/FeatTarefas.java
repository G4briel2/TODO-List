package com.todo;

import Objects.Tarefa;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

public class FeatTarefas {
    Scanner tarefasTec = new Scanner(System.in);
    ArrayList<Tarefa> tarefas = new ArrayList<>();
    HashSet<String> categorias = new HashSet<>();

    public void criarTarefas(){

        String _nome;
        String _descricao;
        String _dataConclusao = "";
        String _categoria;
        int _nivelPrioridade = 1;
        int _status = 1;

        System.out.println("#Criar tarefa#");
        System.out.print("Nome: ");
        _nome = tarefasTec.nextLine();

        System.out.print("Descrição: ");
        _descricao = tarefasTec.nextLine();

        boolean dateError = true;

        do {
            System.out.print("Data de conclusão (dd/mm/aaaa): ");
            _dataConclusao = tarefasTec.nextLine();
            Date result = null;

            try{
                SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
                result  = dateFormat.parse(_dataConclusao);
                dateError = false;
            }

            catch(ParseException e){
                System.out.println("Valor inválido");
            }

        }while(dateError);

        System.out.print("Categoria: ");
        _categoria = tarefasTec.nextLine();
        categorias.add(_categoria);

        boolean priorityError = true;

        do{
            System.out.println("Nível de prioridade:\n1 - Baixo\n2 - Médio\n3 - Alto");
            if (tarefasTec.hasNextInt()){
                _nivelPrioridade = tarefasTec.nextInt();
                if (_nivelPrioridade > 0 && _nivelPrioridade < 4){
                    priorityError = false;
                }
                else {
                    System.out.println("Valor inválido");
                }
            }
            else{
                tarefasTec.nextLine();
                System.out.println("Valor inválido");
            }
        }while (priorityError);

        boolean statusError = true;

        do{
            System.out.println("Status da tarefa:\n1 - To do\n2 - Doing\n3 - Done");
            if (tarefasTec.hasNextInt()){
                _status = tarefasTec.nextInt();
                if (_status > 0 && _status < 4){
                    statusError = false;
                }
                else {
                    System.out.println("Valor inválido");
                }
            }
            else{
                tarefasTec.nextLine();
                System.out.println("Valor inválido");
            }
        }while (statusError);
        tarefasTec.nextLine();

        tarefas.add(new Tarefa(_nome,_descricao, _dataConclusao, _categoria, _nivelPrioridade, _status));
    }

    public void listarTarefas(){
        if(tarefas.size() >= 1) {
            for (int i = 0; i < tarefas.size(); i++) {
                System.out.println("Tarefa " + (i + 1) + " (" + tarefas.get(i) + ")");
            }
        }
        else {
            System.out.println("Nenhuma tarefa cadastrada");
        }
    }

    public void excluirTarefa(){

        boolean excludeError = true;

        if(tarefas.size() >= 1){
            do{
                System.out.println("Que tarefa deseja excluir ?\n0 - Cancelar");
                listarTarefas();
                if (tarefasTec.hasNextInt()){
                    int opcao = tarefasTec.nextInt();
                    if (opcao > 1 && opcao <= tarefas.size()){
                        tarefas.remove(opcao-1);
                        excludeError = false;
                    } else if (opcao == 0) {
                        excludeError = false;
                    } else {
                        System.out.println("Valor inválido");
                    }
                }
                else{
                    tarefasTec.nextLine();
                    System.out.println("Valor inválido");
                }
            }while (excludeError);
        }
        else {
            System.out.println("Nenhuma tarefa cadastrada");
        }
    }
}