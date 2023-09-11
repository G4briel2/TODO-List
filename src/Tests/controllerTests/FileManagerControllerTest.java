package Tests.controllerTests;

import TodoList.controller.FileManagerController;
import TodoList.model.Tarefa;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;

import static org.mockito.Mockito.*;

public class FileManagerControllerTest {
    static FileManagerController mockGerenciadorArquivos;
    @BeforeAll
    static void mockarFileManagerController(){
        mockGerenciadorArquivos = mock(FileManagerController.class);
    }

    @Test
    public void salvarTarefasTeste(){
        int chamadasEsperadas = 1;
        ArrayList<Tarefa> arrayTest = new ArrayList<>();

        mockGerenciadorArquivos.salvarTarefas(arrayTest);

        verify(mockGerenciadorArquivos, times(chamadasEsperadas)).salvarTarefas(arrayTest);
        System.out.println("Método de salvar tarefas chamado com sucesso");
    }

    @Test
    public void carregarTarefasTeste(){
        int chamadasEsperadas = 2;

        mockGerenciadorArquivos.carregarTarefas();
        mockGerenciadorArquivos.carregarTarefas();

        verify(mockGerenciadorArquivos, times(chamadasEsperadas)).carregarTarefas();
        System.out.println("Método de carregar tarefas chamado com sucesso");
    }

    @Test
    public void carregarCategorias(){
        int chamadasEsperadas = 1;

        mockGerenciadorArquivos.carregarCategorias();

        verify(mockGerenciadorArquivos, times(chamadasEsperadas)).carregarCategorias();
        System.out.println("Método de carregar categorias chamado com sucesso");
    }
}
