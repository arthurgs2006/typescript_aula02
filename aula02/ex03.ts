interface Usuario {
    id: number;
    nome: string;
    email: string;
    senha: string;
}

type UsuarioSemSenha = Omit<Usuario, 'senha'>;
type UsuarioAtualizacao = Partial<Usuario>;

function exibirPerfil (u: UsuarioSemSenha ): void {
    console.log(`ID: ${u.id}`);
    console.log(`Nome: ${u.nome}`);
    console.log(`Email: ${u.email}`);
}

function atualizarUsuario (id:number, dados: UsuarioAtualizacao): void {
    console.log(`Atualizando usuário ${id} com os seguintes dados:`);
    console.log(dados);
}

const usuario: Usuario = {
    id: 1,
    nome: 'Arthur',
    email: 'arthur@email.com',
    senha: '123456'
};

exibirPerfil(usuario);
atualizarUsuario(usuario.id, { nome: 'Arthur Saldanha', email: 'arthur.saldanha@email.com' });