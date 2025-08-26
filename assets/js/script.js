console.log("OK");

const elemento = {
  containerProdutos: document.querySelector(".containerProdutos"),
};

let produtos = [];

async function carregarProdutos() {
  try {
    const response = await fetch("./assets/produtos_atualizados.json");
    if (!response.ok) {
      throw new Error("Erro ao carregar o JSON");
    }
    produtos = await response.json();
    produtos.forEach((item) => {
      criarCardProduto(item.nome, item.preco, item.imagem, item.categoria);
    });

    console.log(produtos);
    // listarProdutos(produtos);
  } catch (error) {
    console.error("Ocorreu um problema:", error);
  }
}

carregarProdutos();

// function listarProdutos(produto) {
//   produto.forEach((elemento) => {
//     console.log(elemento.id);
//   });
// }

function criarCardProduto(nome, preco, src, categoria) {
  let section = document.createElement("section");
  section.classList.add("flex", "justify-between", "p-4");

  let picture = document.createElement("picture");
  let img = document.createElement("img");
  img.classList.add(
    "size-40",
    "transition",
    "hover:scale-105",
    "hover:cursor-pointer",
  );
  img.src = src;
  picture.appendChild(img);

  //USAR APPEND PARA ADD TODOS AO MSM TEMPO
  //   section.appendChild(picture);

  let div = document.createElement("div");
  div.classList.add("flex", "flex-col", "gap-2", "px-6");

  let h2 = document.createElement("h2");
  h2.innerText = nome;

  let h3 = document.createElement("h3");
  h3.classList.add("text-xl", "font-bold");
  h3.innerHTML = preco;

  let p = document.createElement("p");
  p.classList.add("text-sm");
  p.innerText = categoria;

  let span = document.createElement("span");
  span.classList.add("text-sm", "text-[#00a650]");
  span.innerText = "Frete Grátis";

  let button = document.createElement("button");
  button.classList.add(
    "rounded-lg",
    "bg-blue-500",
    "px-4",
    "py-2",
    "font-semibold",
    "text-white",
    "transition",
    "hover:scale-105",
    "hover:cursor-pointer",
    "hover:bg-blue-600",
  );
  button.innerText = "COMPRAR";

  div.append(h2, h3, p, span, button);

  section.append(picture, div);

  elemento.containerProdutos.append(section);
}
