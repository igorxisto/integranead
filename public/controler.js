let cart = [];

fetch("/api/produtos")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("produtos-container");
    container.innerHTML = "";

    data.forEach((produto) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";
      productCard.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}" class="product-image">
        <div class="product-details">
        <h2 class="product-name">${produto.nome}</h2>
        <p class="product-price">R$ ${produto.preco.toFixed(2)}</p>
        <p class="product-description">${produto.descricao}</p>
        <button class="add-to-cart" data-id="${produto.id}">Adicionar ao Carrinho</button>
        </div>
                    `;
      container.appendChild(productCard);
    });

    document.querySelectorAll(".add-to-cart").forEach((button) => {
      button.addEventListener("click", function (event) {
        const productId = event.target.getAttribute("data-id");
        const produto = data.find((p) => p.id == productId);
        addToCart(produto);
      });
    });
  })
  .catch((error) => console.error("Erro ao obter produtos:", error));

function addToCart(produto) {
  cart.push(produto);
  updateCart();
}

function updateCart() {
  const carrinhoContainer = document.getElementById("carrinho-container");
  const ButtonCart = document.getElementsByClassName("button");
  carrinhoContainer.innerHTML = "";

  if (cart.length === 0) {
    carrinhoContainer.innerHTML = "<p>Seu carrinho está vazio.</p>";
  } else {
    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.innerHTML = `
        <p>${item.nome} - R$ ${item.preco.toFixed(2)} </p>
        
      `;

      carrinhoContainer.appendChild(cartItem);
    });
  }
}

document.getElementById("carrinho-icon").addEventListener("click", function () {
  const carrinhoContainer = document.getElementById("carrinho-stylo");
  carrinhoContainer.classList.toggle("hidden");
});
