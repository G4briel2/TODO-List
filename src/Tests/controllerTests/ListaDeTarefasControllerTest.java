package Tests.controllerTests;

import TodoList.controller.ListaDeTarefasController;
import TodoList.model.Tarefa;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;
import java.util.ArrayList;

import static org.mockito.Mockito.*;

public class ListaDeTarefasControllerTest {

    static ListaDeTarefasController tarefasController;
    static ListaDeTarefasController mockTarefasController;

    @BeforeAll
    static void tarefaControllerInstancia(){
        tarefasController = new ListaDeTarefasController();
        mockTarefasController = mock(ListaDeTarefasController.class);
    }

    @Test
    public void getListaTarefasTeste(){
        int chamadasEsperadas = 1;

        mockTarefasController.getListaDeTarefas();

        verify(mockTarefasController, times(chamadasEsperadas)).getListaDeTarefas();
        System.out.println("Método getListaDeTarefas() chamado com sucesso");
    }

    @Test
    public void getCategoriasTeste(){
        int chamadasEsperadas = 2;

        mockTarefasController.getCategoriasTarefa();
        mockTarefasController.getCategoriasTarefa();

        verify(mockTarefasController, times(chamadasEsperadas)).getCategoriasTarefa();
        System.out.println("Método getCategoriasTarefa() chamado com sucesso");
    }

    @Test
    public void temCadastrosNaListaTeste(){
        ArrayList<String> listaVazia = new ArrayList<>();
        boolean condicaoEsperada = false;

        assertEquals(tarefasController.temCadastrosNaLista(listaVazia), condicaoEsperada);
        System.out.println("Método temCadastroNaLista() com retorno certo");
    }

    @Test
    public void criarTarefaTeste(){
        int chamadasEsperadas = 1;

        mockTarefasController.criarTarefa();

        verify(mockTarefasController, times(chamadasEsperadas)).criarTarefa();
        System.out.println("Método criarTarefa() chamado com sucesso");
    }

    @Test
    public void cadastrarTarefaNoArrayDeTarefasTeste(){
        ArrayList<Tarefa> tarefas = tarefasController.getListaDeTarefas();
        String toStringDaTarefaEsperado = "Nome: NomeExemplo, Descrição: DescriçãoExemplo, Data de conclusão: 10/09/2023, Categoria: Lazer, Nível de prioridade: Muito baixo, Status: To do";

        tarefasController.cadastrarTarefa(new Tarefa("NomeExemplo","DescriçãoExemplo", LocalDate.now(),1, "Lazer", 1));

        assertEquals(tarefas.get(tarefas.size()-1).toString(), toStringDaTarefaEsperado);
        System.out.println("Tarefa cadastrada com sucesso");
    }

    @Test
    public void editarTarefaTeste(){
        ArrayList<Tarefa> tarefas = tarefasController.getListaDeTarefas();
        String toStringDaTarefaEsperado = "Nome: NomeExemplo, Descrição: DescriçãoExemplo, Data de conclusão: 10/09/2023, Categoria: Lazer, Nível de prioridade: Muito baixo, Status: To do";
        int indice = 3;

        tarefasController.editarTarefa((new Tarefa("NomeExemplo","DescriçãoExemplo", LocalDate.now(),1, "Lazer", 1)), 3);

        assertEquals(tarefas.get(indice).toString(), toStringDaTarefaEsperado);
        System.out.println("Tarefa de índice " + indice + " editada com sucesso");
    }

    @Test
    public void listarTarefasSemFiltroTeste(){
        int chamadasEsperadas = 2;

        mockTarefasController.listarTarefasSemFiltro();
        mockTarefasController.listarTarefasSemFiltro();

        verify(mockTarefasController, times(chamadasEsperadas)).listarTarefasSemFiltro();
        System.out.println("Método de listagem de tarefas sem filtro chamado com sucesso");
    }

    @Test
    public void excluirTarefaTeste(){
        ArrayList<Tarefa> tarefas = tarefasController.getListaDeTarefas();
        String toStringDaTarefaEsperado = "Nome: Jantar com amigos, Descrição: Encontro social com amigos, Data de conclusão: 30/09/2023, Categoria: Lazer, Nível de prioridade: Baixo, Status: To do";
        int indice = 5;

        tarefasController.excluirTarefa(indice);

        assertEquals(tarefas.get(indice).toString(), toStringDaTarefaEsperado);
        System.out.println("Tarefa de índice " + indice +" excluída com sucesso");
    }

    @Test
    public void listarCategoriasTeste(){
        int chamadasEsperadas = 1;

        mockTarefasController.listarCategorias();

        verify(mockTarefasController, times(chamadasEsperadas)).listarCategorias();
        System.out.println("Método de listar categorias chamado com sucesso");
    }

    @Test
    public void listarTarefasPorCategoriaTeste(){
        int chamadasEsperadas = 2;

        mockTarefasController.listarTarefasPorCategoria(1);
        mockTarefasController.listarTarefasPorCategoria(1);

        verify(mockTarefasController, times(chamadasEsperadas)).listarTarefasPorCategoria(1);
        System.out.println("Método de listar tarefas por categoria chamado com sucesso");
    }

    @Test
    public void listarTarefasPorPrioridadeTeste(){
        int chamadasEsperadas = 3;

        mockTarefasController.listarTarefasPorPrioridade(1);
        mockTarefasController.listarTarefasPorPrioridade(1);
        mockTarefasController.listarTarefasPorPrioridade(1);

        verify(mockTarefasController, times(chamadasEsperadas)).listarTarefasPorPrioridade(1);
        System.out.println("Método de listar tarefas por prioridade chamado com sucesso");
    }

    @Test
    public void listarTarefasPorStatusTeste(){
        int chamadasEsperadas = 1;

        mockTarefasController.listarTarefasPorStatus(1);

        verify(mockTarefasController, times(chamadasEsperadas)).listarTarefasPorStatus(1);
        System.out.println("Método de listar tarefas por status chamado com sucesso");
    }

}
