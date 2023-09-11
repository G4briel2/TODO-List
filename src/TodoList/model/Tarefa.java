package TodoList.model;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class Tarefa {
    String nome;
    String descricao;
    LocalDate dataConclusao = LocalDate.now();
    int nivelPrioridade;
    String categoria;
    int status;

    public Tarefa(String nome, String descricao, LocalDate dataConclusao, int nivelPrioridade, String categoria, int status) {
        setNome(nome);
        setDescricao(descricao);
        setDataConclusao(dataConclusao);
        setNivelPrioridade(nivelPrioridade);
        setCategoria(categoria);
        setStatus(status);
    }

    @Override
    public String toString() {

        String nivel;
        switch (getNivelPrioridade()) {
            case 1 -> nivel = "Muito baixo";
            case 2 -> nivel = "Baixo";
            case 3 -> nivel = "Médio";
            case 4 -> nivel = "Alto";
            default -> nivel = "Muito alto";
        }

        String stat;
        switch (getStatus()){
            case 1 -> stat = "To do";
            case 2 -> stat = "Doing";
            default -> stat = "Done";
        }

        return "Nome: " + getNome() +
                ", Descrição: " + getDescricao() +
                ", Data de conclusão: " + getDataConclusaoFormatada() +
                ", Categoria: " + getCategoria() +
                ", Nível de prioridade: " + nivel +
                ", Status: " + stat;

    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public LocalDate getDataConclusao() {
        return dataConclusao;
    }

    public String getDataConclusaoFormatada() {
        DateTimeFormatter formato = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        return dataConclusao.format(formato);
    }

    public void setDataConclusao(LocalDate dataConclusao) {
        this.dataConclusao = dataConclusao;
    }

    public int getNivelPrioridade() {
        return nivelPrioridade;
    }

    public void setNivelPrioridade(int nivelPrioridade) {
        this.nivelPrioridade = nivelPrioridade;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
