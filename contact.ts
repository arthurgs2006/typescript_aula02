type Category = "amigo" | "trabalho" | "familia" | "outro";

interface Contato {
  id: number;
  name: string;
  phone: string;
  email?: string;
  category: Category;
  liked: boolean;
}

type updateC = Partial<Omit<Contato, "id">>;
type newC = Omit<Contato, "id">;
type generalAccountContact = Readonly<Contato>;

const CategorysValidas: Category[] = [
  "amigo",
  "trabalho",
  "familia",
  "outro",
];

function validarCategory(valor: string): valor is Category {
  return CategorysValidas.includes(valor as Category);
}

class contactAgenda {
  private contacts: Contato[] = [];
  private listeners: Array<(contacts: generalAccountContact[]) => void> = [];
  private proximoId: number = 1;

  subscribe(listener: (contacts: generalAccountContact[]) => void) {
    this.listeners = [...this.listeners, listener];
    listener(this.list());
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private alertUser() {
    const duplicate = this.list();
    this.listeners.forEach((listener) => {
      listener(duplicate);
    });
  }

  criar(data: newC): generalAccountContact {
    if (!validarCategory(data.category)) {
      throw new Error("Category inválida!");
    }
    const newContato: Contato = {
      id: this.proximoId++,
      ...data,
    };
    this.contacts = [...this.contacts, newContato];
    this.alertUser();
    return { ...newContato };
  }

  list(): generalAccountContact[] {
    return this.contacts.map((contato) => ({ ...contato }));
  }

  searchID(id: number): generalAccountContact | undefined {
    const contato = this.contacts.find((c) => c.id === id);
    if (!contato) return undefined;
    return { ...contato };
  }

  updateStatus(
    id: number,
    data: updateC
  ): generalAccountContact | undefined {
    const contatoExistente = this.contacts.find((c) => c.id === id);
    if (!contatoExistente) return undefined;
    if ( data.category && !validarCategory(data.category) ) {
      throw new Error("Category inválida!");
    }
    const contatoAtualizado: Contato = {
      ...contatoExistente,
      ...data,
    };
    this.contacts = this.contacts.map((c) => c.id === id ? contatoAtualizado : c );
    this.alertUser();
    return { ...contatoAtualizado };
  }

  remover(id: number): void {
    this.contacts = this.contacts.filter((c) => c.id !== id);
    this.alertUser();
  }
}

function extrairCampos<T, K extends keyof T>(
  lista: T[],
  campo: K
): T[K][] {
  return lista.map((item) => item[campo]);
}

const agenda = new contactAgenda();
const listaElemento = document.getElementById("lista");

if (!listaElemento) {
  throw new Error("Elemento #lista não encontrado");
}

function renderizarLista(contacts: generalAccountContact[]) {
  listaElemento!.innerHTML = "";
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
      agenda.updateStatus(contato.id, { liked: !contato.liked, });
    });
    li.append(info, botao);
    listaElemento!.appendChild(li);
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
