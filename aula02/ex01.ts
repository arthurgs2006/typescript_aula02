interface Livro {
    titulo: string;
    autor: string;
    ano: number;
    disponivel: boolean;
}

const biblioteca : Livro[] = [
    {
        titulo: "O Senhor dos Anéis",
        autor: "J.R.R. Tolkien",
        ano: 1954,
        disponivel: true
    },
    {
        titulo: "1984",
        autor: "George Orwell",
        ano: 1949,
        disponivel: false
    },
    {
        titulo: "O Pequeno Príncipe",
        autor: "Antoine de Saint-Exupéry",
        ano: 1943,
        disponivel: true
    }
];

const listarTitulosDisponiveis = (livros:Livro[]) :string[] => {
    return livros.map(l => l.disponivel == true ? l.titulo : '').filter(t => t !== '');
}

