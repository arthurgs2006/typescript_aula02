const CategorysValidas = ["amigo", "trabalho", "familia", "outro"];

function validarCategory(valor) {
  return CategorysValidas.includes(valor);
}

class contactAgenda {
  #contacts = [];
  #listeners = [];
  #proximoId = 1;

  subscribe(listener) {
    this.#listeners = [...this.#listeners, listener];
    listener(this.list());
    return () => {
      this.#listeners = this.#listeners.filter((l) => l !== listener);
    };
  }

  #alertUser() {
    const duplicate = this.list();
    this.#listeners.forEach((listener) => {
      listener(duplicate);
    });
  }

  criar(data) {
    if (!validarCategory(data.category)) {
      throw new Error("Category inválida!");
    }
    const newContato = {
      id: this.#proximoId++,
      ...data,
    };
    this.#contacts = [...this.#contacts, newContato];
    this.#alertUser();
    return { ...newContato };
  }

  list() {
    return this.#contacts.map((contato) => ({ ...contato }));
  }

  searchID(id) {
    const contato = this.#contacts.find((c) => c.id === id);
    if (!contato) return undefined;
    return { ...contato };
  }

  updateStatus(id, data) {
    const contatoExistente = this.#contacts.find((c) => c.id === id);
    if (!contatoExistente) return undefined;
    if (data.category && !validarCategory(data.category)) {
      throw new Error("Category inválida!");
    }
    const contatoAtualizado = {
      ...contatoExistente,
      ...data,
    };
    this.#contacts = this.#contacts.map((c) => c.id === id ? contatoAtualizado : c);
    this.#alertUser();
    return { ...contatoAtualizado };
  }

  remover(id) {
    this.#contacts = this.#contacts.filter((c) => c.id !== id);
    this.#alertUser();
  }
}

function extrairCampos(lista, campo) {
  return lista.map((item) => item[campo]);
}

const agenda = new contactAgenda();
const listaElemento = document.getElementById("lista");

if (!listaElemento) {
  throw new Error("Elemento #lista não encontrado");
}

function renderizarLista(contacts) {
  listaElemento.innerHTML = "";
  contacts.forEach((contato) => {
    const li = document.createElement("li");
    const info = document.createElement("div");
    info.className = "info";
    const name = document.createElement("strong");
    name.textContent = contato.name;
    const Category = document.createElement("span");
    Category.className = "Category";
    Category.textContent = contato.category;
    info.appendChild(name);
    info.appendChild(Category);
    const botao = document.createElement("button");
    botao.className = "estrela";
    if (contato.liked) {
      botao.classList.add("liked");
    }
    botao.addEventListener("click", () => {
      agenda.updateStatus(contato.id, { liked: !contato.liked });
    });
    li.append(info, botao);
    listaElemento.appendChild(li);
  });
}

const unsubscribe = agenda.subscribe(renderizarLista);

try {
  agenda.criar({
    name: "Arthur",
    phone: "(11) 97444-9999",
    email: "aluno@email.com",
    category: "trabalho",
    liked: true,
  });
  agenda.criar({
    name: "Scatena",
    phone: "(16) 99345-8888",
    category: "amigo",
    liked: false,
  });
  agenda.criar({
    name: "Joshua",
    phone: "(11) 97777-7777",
    category: "familia",
    liked: false,
  });
} catch (error) {
  if (error instanceof Error) {
    alert(error.message);
  }
}

const contacts = agenda.list();
const names = extrairCampos(contacts, "name");
const phones = extrairCampos(contacts, "phone");
console.log("names:", names);
console.log("phones:", phones);
