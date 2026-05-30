type Sucesso = { tipo: 'sucesso'; dados: string };
type Erro = { tipo: 'erro'; mensagem: string };
type Resultado  = Sucesso | Erro;

const exibirResultado = (res: Resultado): void => {
    if (res.tipo === 'sucesso') {
        return console.log('✅ Sucesso:', res.dados);
    } else {
        return console.error('❌ Erro:', res.mensagem);
    }
}

exibirResultado({ tipo: 'sucesso', dados: 'Operação concluída!' });
exibirResultado({ tipo: 'erro', mensagem: 'Algo deu errado.' });