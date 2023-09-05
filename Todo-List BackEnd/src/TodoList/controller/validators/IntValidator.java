package TodoList.controller.validators;

import java.util.Scanner;

public final class IntValidator {
    public static int forcarInputInteiro(){
        Scanner teclado = new Scanner(System.in);

        try{
            return teclado.nextInt();
        }
        catch (Exception e){
            System.out.println("Opção inválida");
            teclado.nextLine();
            return forcarInputInteiro();
        }
    }

    public static int intMaiorQue(int maiorQue, int numero){

        if(numero > maiorQue){
            return numero;
        } else {
            System.out.println("Opção inválida");
            return intMaiorQue(maiorQue, forcarInputInteiro());
        }
    }

    public static int intMaiorQueEMenorQue(int maiorQue, int numero, int menorQue){

        if(menorQue > numero && numero > maiorQue){
            return numero;
        } else {
            System.out.println("Opção inválida");
            return intMaiorQueEMenorQue(maiorQue, forcarInputInteiro(), menorQue);
        }
    }
}
