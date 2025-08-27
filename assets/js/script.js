/* PENDÊNCIAS:

- Criar um campo de Avalie! sobre o nome do produto, com 5 estrelas - Complexidade: fácil
- Ao carregar a página, será exibido a avaliação inicial, porém ao passar o mouse sobre o campo de avaliação, o usuário poderá re-avaliar o produto clicando na quantidade desejada de estrelas. - Complexidade: médio / difícil
*/

const elemento = {
  containerProdutos: document.querySelector(".containerProdutos"),
  avaliacoes: document.querySelectorAll(".avaliacoes"),
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
      criarCardProduto(
        item.id,
        item.nome,
        item.descricao,
        item.preco,
        item.imagem,
        item.categoria,
        item.classificacao,
      );
    });
  } catch (error) {
    console.error("Ocorreu um problema:", error);
  }
}

carregarProdutos();

function criarCardProduto(
  id,
  nome,
  descricao,
  preco,
  src,
  categoria,
  classificacao,
) {
  let card = document.createElement("section");
  card.classList.add("grid", "grid-cols-2", "justify-between", "p-4");

  if (id === 1) {
    card.classList.add("xl:col-span-full", "xl:p-8");
  }

  let picture = document.createElement("picture");
  picture.classList.add("flex", "items-center");
  let img = document.createElement("img");
  img.classList.add(
    "w-fit",
    "transition",
    "hover:scale-105",
    "hover:cursor-pointer",
  );
  img.src = src;
  picture.appendChild(img);

  let div = document.createElement("div");
  div.classList.add(
    "place-self-end",
    "flex",
    "flex-col",
    "gap-2",
    "justify-between",
    "xl:w-[150px]",
  );

  let h2 = document.createElement("h2");
  h2.innerText = nome;

  let h3 = document.createElement("h3");
  h3.classList.add("text-xl", "font-bold");

  let precoAjustado = preco;

  h3.innerHTML = precoAjustado.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  let p = document.createElement("p");
  p.classList.add("text-sm");
  p.innerText = categoria;

  let span = document.createElement("span");
  span.classList.add("text-sm", "text-[#00a650]");
  span.innerText = "Frete Grátis";

  let avaliacoes = document.createElement("span");
  avaliacoes.innerText = "Avaliações:";

  let containerAvaliacoes = document.createElement("div");
  containerAvaliacoes.classList.add(
    "avaliacoes",
    "my-4",
    "flex",
    "justify-center",
    "gap-1",
  );

  let maxAvaliacao = 5;
  if (classificacao <= maxAvaliacao) {
    while (classificacao <= maxAvaliacao) {
      let estrela = document.createElement("img");
      estrela.src = "./assets/img/estrela.svg";
      estrela.classList.add(
        "estrela",
        "w-6",
        "transition",
        "hover:scale-[130%]",
        "hover:cursor-pointer",
      );
      containerAvaliacoes.appendChild(estrela);
      maxAvaliacao--;
    }
  }

  avaliacoes.appendChild(containerAvaliacoes);

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

  div.append(h2, h3, p, span, avaliacoes, button);

  card.append(picture, div);

  elemento.containerProdutos.append(card);
}
