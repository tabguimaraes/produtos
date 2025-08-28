const elemento = {
  containerProdutos: document.querySelector(".containerProdutos"),
  cardItem: document.getElementsByClassName("card-item"),
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

const tooltip = document.createElement("div");
tooltip.className =
  "absolute z-50 bg-gray-800 text-white text-sm px-2 py-1 rounded-lg shadow-lg hidden";
document.body.appendChild(tooltip);

elemento.containerProdutos.addEventListener("mouseover", (e) => {
  const img = e.target.closest("img");
  if (img && img.dataset.descricao) {
    tooltip.textContent = img.dataset.descricao;
    tooltip.classList.remove("hidden");

    document.addEventListener("mousemove", moverTooltip);
  }
});

elemento.containerProdutos.addEventListener("mouseout", (e) => {
  const img = e.target.closest("img");
  if (img && img.dataset.descricao) {
    tooltip.classList.add("hidden");
    document.removeEventListener("mousemove", moverTooltip);
  }
});

function moverTooltip(e) {
  tooltip.style.left = e.pageX + 15 + "px";
  tooltip.style.top = e.pageY + 15 + "px";
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
  card.classList.add(
    "card-item",
    "grid",
    "grid-cols-2",
    "justify-between",
    "p-4",
    "grid-row-2",
    "xl:grid-row-1",
  );

  let picture = document.createElement("picture");
  picture.classList.add("flex", "items-center");

  let img = document.createElement("img");
  img.classList.add("transition", "hover:scale-105", "hover:cursor-pointer");
  img.src = src;
  img.dataset.descricao = descricao;
  picture.appendChild(img);

  let div = document.createElement("div");
  div.classList.add(
    "justify-center",
    "flex",
    "flex-col",
    "gap-2",
    "justify-between",
    "w-[90%]",
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
    "justify-end",
    "gap-1",
  );

  function inserirAvaliacao(classificacao) {
    let index = 0;

    while (index < classificacao) {
      let estrela = document.createElement("img");
      estrela.src = "./assets/icons/estrela.svg";
      estrela.classList.add(
        "estrela",
        "w-6",
        "transition",
        "hover:scale-[130%]",
        "hover:cursor-pointer",
      );
      containerAvaliacoes.appendChild(estrela);
      avaliacoes.appendChild(containerAvaliacoes);
      index++;
    }
  }

  inserirAvaliacao(classificacao);

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
    "col-span-full",
  );
  button.innerText = "COMPRAR";

  if (id === 1) {
    card.classList.add("xl:col-span-full", "xl:p-8");
    picture.classList.add("justify-center");
    img.classList.add("md:w-full");
  }

  div.append(h2, h3, p, span, avaliacoes);

  card.append(picture, div, button);

  elemento.containerProdutos.append(card);
}
