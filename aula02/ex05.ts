interface PropsBotao {
    titulo: string;
    ativo?: boolean;
}

function renderizarBotao({ titulo, ativo = true }: PropsBotao): string {
  return ativo ? `[ ${titulo} ]` : `( ${titulo} )`;
}

console.log(renderizarBotao({ titulo: 'Enviar' })); 
console.log(renderizarBotao({ titulo: 'Enviar', ativo: false })); 