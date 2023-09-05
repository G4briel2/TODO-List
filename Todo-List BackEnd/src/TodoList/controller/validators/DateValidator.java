package TodoList.controller.validators;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class DateValidator {
    public static LocalDate converterStringParaLocalDate(String dataString, String formato){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(formato);
        return LocalDate.parse(dataString, formatter);
    }
}
