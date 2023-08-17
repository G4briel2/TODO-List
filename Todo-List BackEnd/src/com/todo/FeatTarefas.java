package com.todo;

import Objects.Tarefa;

import java.io.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

public class FeatTarefas {
    Scanner tarefasTec = new Scanner(System.in);
    ArrayList<Tarefa> tarefas = new ArrayList<>();
    HashSet<String> categorias = new HashSet<>();

    public void criarTarefas() {

        String _nome = "";
        String _descricao = "";
        String _dataConclusao = "";
        String _categoria = "";
        int _nivelPrioridade = 1;
        int _status = 1;

        System.out.print("#Criar tarefa#\nNome: ");
        _nome = tarefasTec.nextLine();

        System.out.print("Descrição: ");
        _descricao = tarefasTec.nextLine();

        boolean dateError = true;

        do {
            System.out.print("Data de conclusão (dd/mm/aaaa): ");
            _dataConclusao = tarefasTec.nextLine();
            Date result = null;

            try {
                SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
                result = dateFormat.parse(_dataConclusao);
                dateError = false;
            } catch (ParseException e) {
                System.out.println("Valor inválido");
            }

        } while (dateError);

        System.out.print("Categoria: ");
        _categoria = tarefasTec.nextLine();
        categorias.add(_categoria);

        boolean priorityError = true;

        do {
            System.out.println("Nível de prioridade:\n1 - Baixo\n2 - Médio\n3 - Alto");
            if (tarefasTec.hasNextInt()) {
                _nivelPrioridade = tarefasTec.nextInt();
                tarefasTec.nextLine();
                if (_nivelPrioridade > 0 && _nivelPrioridade < 4) {
                    priorityError = false;
                } else {
                    System.out.println("Valor inválido");
                }
            } else {
                tarefasTec.nextLine();
                System.out.println("Valor inválido");
            }
        } while (priorityError);

        boolean statusError = true;

        do {
            System.out.println("Status da tarefa:\n1 - To do\n2 - Doing\n3 - Done");
            if (tarefasTec.hasNextInt()) {
                _status = tarefasTec.nextInt();
                tarefasTec.nextLine();
                if (_status > 0 && _status < 4) {
                    statusError = false;
                } else {
                    System.out.println("Valor inválido");
                }
            } else {
                tarefasTec.nextLine();
                System.out.println("Valor inválido");
            }
        } while (statusError);

        tarefas.add(new Tarefa(_nome, _descricao, _dataConclusao, _categoria, _nivelPrioridade, _status));

        tarefas.sort(new Comparator<Tarefa>() {
            @Override
            public int compare(Tarefa o1, Tarefa o2) {
                return o2.getNivelPrioridade() - o1.getNivelPrioridade();
            }
        });
    }

    public void listarTarefas() {
        if (tarefas.size() >= 1) {
            for (int i = 0; i < tarefas.size(); i++) {
                System.out.println("Tarefa " + (i + 1) + " (" + tarefas.get(i) + ")");
            }
        } else {
            System.out.println("Nenhuma tarefa cadastrada");
        }
    }

    public void excluirTarefa() {

        boolean excludeError = true;

        if (tarefas.size() >= 1) {
            do {
                System.out.println("Que tarefa deseja excluir ?\n0 - Cancelar");
                listarTarefas();
                if (tarefasTec.hasNextInt()) {
                    int opcao = tarefasTec.nextInt();
                    tarefasTec.nextLine();
                    if (opcao >= 1 && opcao <= tarefas.size()) {
                        tarefas.remove(opcao - 1);
                        excludeError = false;
                    } else if (opcao == 0) {
                        excludeError = false;
                    } else {
                        System.out.println("Valor inválido");
                    }
                } else {
                    tarefasTec.nextLine();
                    System.out.println("Valor inválido");
                }
            } while (excludeError);
        } else {
            System.out.println("Nenhuma tarefa cadastrada");
        }
    }

    public void listarTarefasFiltradas() {
        if (tarefas.size() >= 1) {
            int opcao = 0;
            boolean repeat = true;

            do {
                System.out.println("Filtrar por:\n1 - Categoria\n2 - Prioridade\n3 - Status\n4 - Nenhum");
                if (tarefasTec.hasNextInt()) {
                    opcao = tarefasTec.nextInt();
                    tarefasTec.nextLine();
                    if (opcao >= 1 && opcao <= 4) {
                        if (opcao == 1) {
                            listarCategorias();
                        } else if (opcao == 2) {
                            listarPrioridades();
                        } else if (opcao == 3) {
                            listarStatus();
                        } else {
                            listarTarefas();
                        }

                        repeat = false;
                    } else {
                        System.out.println("Opção inválida");
                    }
                } else {
                    tarefasTec.nextLine();
                    System.out.println("Opção inválida");
                }
            } while (repeat);
        } else {
            System.out.println("Nenhuma tarefa cadastrada");
        }
    }

    public void listarCategorias() {
        List<String> _categoria = new ArrayList<>(categorias);

        for (int i = 0; i < categorias.size(); i++) {
            System.out.println((i + 1) + " - " + _categoria.get(i));
        }

        boolean categoryError = true;

        do {
            System.out.println("Selecione uma categoria");
            if (tarefasTec.hasNextInt()) {
                int opcao = tarefasTec.nextInt();
                tarefasTec.nextLine();

                if (opcao >= 1 && opcao <= _categoria.size()) {
                    String valorCategoria = _categoria.get(opcao - 1);
                    listarPorFiltro(valorCategoria, 1);
                    categoryError = false;
                } else {
                    System.out.println("Valor inválido");
                }
            } else {
                tarefasTec.nextLine();
                System.out.println("Valor inválido");
            }
        } while (categoryError);
    }

    public void listarPrioridades() {
        boolean repeat = true;
        int opcao = 0;

        do {
            System.out.println("Selecione uma prioridade\n1 - Alta\n2 - Média\n3 - Baixa");
            if (tarefasTec.hasNextInt()) {
                opcao = tarefasTec.nextInt();
                tarefasTec.nextLine();
                if (opcao >= 1 && opcao <= 3) {
                    if (opcao == 1) {
                        listarPorFiltro("3", 2);
                    } else if (opcao == 2) {
                        listarPorFiltro("2", 2);
                    } else {
                        listarPorFiltro("1", 2);
                    }

                    repeat = false;
                } else {
                    System.out.println("Opção inválida");
                }
            } else {
                tarefasTec.nextLine();
                System.out.println("Opção inválida");
            }
        } while (repeat);
    }

    public void listarStatus() {
        boolean repeat = true;
        int opcao = 0;

        do {
            System.out.println("Selecione um status\n1 - To do\n2 - Doing\n3 - Done");
            if (tarefasTec.hasNextInt()) {
                opcao = tarefasTec.nextInt();
                tarefasTec.nextLine();
                if (opcao >= 1 && opcao <= 3) {
                    if (opcao == 1) {
                        listarPorFiltro("1", 3);
                    } else if (opcao == 2) {
                        listarPorFiltro("2", 3);
                    } else {
                        listarPorFiltro("3", 3);
                    }

                    repeat = false;
                } else {
                    System.out.println("Opção inválida");
                }
            } else {
                tarefasTec.nextLine();
                System.out.println("Opção inválida");
            }
        } while (repeat);
    }

    public void listarPorFiltro(String valor, int tipo) {

        for (Tarefa task : tarefas) {
            if (tipo == 1) {
                if (task.getCategoria().equals(valor)) {
                    System.out.println(task);
                }
            } else if (tipo == 2) {
                int _valor = Integer.parseInt(valor);
                if (task.getNivelPrioridade() == _valor) {
                    System.out.println(task);
                }
            } else {
                int _valor = Integer.parseInt(valor);
                if (task.getStatus() == _valor) {
                    System.out.println(task);
                }
            }

        }
    }

    public void salvarTarefas() throws IOException {
        FileWriter save = new FileWriter("Tasks.csv");

        for (Tarefa data: tarefas){
            save.write(data.getNome() + "," +
                    data.getDescricao() + "," +
                    data.getDataConclusao() + "," +
                    data.getCategoria() + "," +
                    data.getNivelPrioridade() + "," +
                    data.getStatus() + System.lineSeparator());
        }
        save.close();
    }

    public void carregarTarefas(){
        try {
            String linha = "";
            BufferedReader loader = new BufferedReader(new FileReader("Tasks.csv"));

            while((linha = loader.readLine()) != null){
                String[] task = linha.split(",");
                int nvlPrioridade = Integer.parseInt(task[4]);
                int sts = Integer.parseInt(task[5]);
                tarefas.add(new Tarefa(task[0], task[1], task[2], task[3],  nvlPrioridade, sts));
                categorias.add(task[3]);
            }

        } catch (IOException e) {
            return;
        }

    }
}