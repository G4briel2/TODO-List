package TodoList.controller.validators;

import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public final class StringValidator {
    public static String forcarInputStringComRegex(String pattern){
        Scanner input = new Scanner(System.in);

        String response = input.nextLine();

        if(validator(pattern, response)){
            return response;
        }
        else {
            System.out.println("Valor inválido");
            return forcarInputStringComRegex(pattern);
        }
    }

    public static boolean validator(String pattern, String toValidate){
        Pattern regexPattern = Pattern.compile(pattern);
        Matcher matcher = regexPattern.matcher(toValidate);

        return matcher.matches();
    }
}