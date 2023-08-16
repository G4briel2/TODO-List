package Objects;

public class Tarefa {
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

    public String getDataConclusao() {
        return dataConclusao;
    }

    public void setDataConclusao(String dataConclusao) {
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

    public Tarefa(String nome, String descricao, String dataConclusao, String categoria, int nivelPrioridade, int status) {
        this.nome = nome;
        this.descricao = descricao;
        this.dataConclusao = dataConclusao;
        this.categoria = categoria;
        this.nivelPrioridade = nivelPrioridade;
        this.status = status;
    }

    @Override
    public String toString() {
        String nivel;

        if (nivelPrioridade == 1){
            nivel = "Baixo";
        } else if (nivelPrioridade == 2) {
            nivel = "Médio";
        } else {
            nivel = "Alto";
        }

        String stat;
        if (status == 1){
            stat = "To do";
        } else if (status == 2) {
            stat = "Doing";
        } else {
            stat = "Done";
        }

        return "Nome: " + nome +
                ", Descrição: " + descricao +
                ", Data de conclusão: " + dataConclusao +
                ", Categoria: " + categoria +
                ", Nível de prioridade: " + nivel +
                ", Status: " + stat;

    }

    String nome;
    String descricao;
    String dataConclusao;

    String categoria;
    int nivelPrioridade;
    int status;
}
