interface Produto {
    nome: string;
    preco: number;
}

const lista: Produto[] = [
    { nome: 'Camiseta', preco: 29.99 },
    { nome: 'Calça', preco: 59.99 },
    { nome: 'Tênis', preco: 89.99 }
];

const obterPrimeiroProduto = (p : Produto[]) :Produto => {
    return p[0];
}

console.log(obterPrimeiroProduto(lista));