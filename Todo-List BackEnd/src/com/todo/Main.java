package com.todo;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner tec = new Scanner(System.in);
        FeatTarefas t1 = new FeatTarefas();

        System.out.println("#TODO-LIST#");
        int opcao = 0;
        boolean repeat = true;

        do{
            System.out.println("Escolha uma opção:\n1 - Listar tarefas\n2 - Criar tarefas\n3 - Editar tarefas\n4 - Excluir tarefas\n5 - Sair");
            if (tec.hasNextInt()){
                opcao = tec.nextInt();
                if (opcao >=1 && opcao <=5){
                    if (opcao == 1){
                        t1.listarTarefasFiltradas();
                    }

                    else if (opcao == 2){
                        t1.criarTarefas();
                    }

                    else if (opcao == 3){
                        System.out.println("vai editar uma tarefa");
                    }

                    else if (opcao == 4){
                        t1.excluirTarefa();
                    }

                    else {
                        repeat = false;
                    }
                }

                else {
                    System.out.println("Opção inválida");
                }
            }

            else{
                tec.nextLine();
                System.out.println("Opção inválida");
            }
        }while (repeat);
    }
}
