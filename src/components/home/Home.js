import React, { useEffect, useState } from 'react';
import './Home.css';




function Home() {

  const [carrinho, setCarrinho] = useState([]);
  const [total, setTotal] = useState(0);

  function adicionarAoCarrinho(produto) {
    const convertStr = Number(produto.price) || 0;
    const novoCarrinho = [...carrinho];
    const index = novoCarrinho.findIndex((item) => item.id === produto.id);

    if (index !== -1) {

      novoCarrinho[index].quantidade += 1;
    } else {

      const novoProduto = { ...produto, quantidade: 1 };
      novoCarrinho.push(novoProduto);
    }

    const novoTotal = total + convertStr;
    setCarrinho(novoCarrinho);
    setTotal(novoTotal);
  }

  function removerDoCarrinho(index) {
    const novoCarrinho = [...carrinho];
    const itemRemovido = novoCarrinho.splice(index, 1)[0];
    const novoTotal = total - Number(itemRemovido.price * itemRemovido.quantidade) || 0;
    setCarrinho(novoCarrinho);
    setTotal(novoTotal);
  }

  function aumentarQuantidade(index) {
    const novoCarrinho = [...carrinho];
    novoCarrinho[index].quantidade += 1;
    const novoTotal = total + Number(novoCarrinho[index].price);
    setCarrinho(novoCarrinho);
    setTotal(novoTotal);

  }

  function diminuirQuantidade(index) {
    const novoCarrinho = [...carrinho];
    if (novoCarrinho[index].quantidade > 1) {
      novoCarrinho[index].quantidade -= 1;
      const novoTotal = total - Number(novoCarrinho[index].price);
      setCarrinho(novoCarrinho);
      setTotal(novoTotal);
    }
  }


  function showCart() {
    let cart = document.querySelector(".content-cart")
    if (cart.classList.contains("open")) {
      cart.classList.remove("open")
    } else {
      cart.classList.add("open")
    }
  }


  const [products, setProducts] = useState([]);

  useEffect(() => {
    const url = 'https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products?page=1&rows=10&sortBy=id&orderBy=DESC';

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.products && Array.isArray(data.products)) {
          setProducts(data.products);
        }
      })

  }, []);

  return (
    <main className='container'>
      <header className='header'>
        <div className='content-title'>

          <h1 className='title'>MKS</h1>
          <div className='cart' onClick={showCart}>
            <i className='material-symbols-outlined'>
              shopping_cart
            </i>
            <p className='qtd'>{carrinho.length}</p>
          </div>

        </div>
      </header>

      <main className='content-cart'>
        <div className='title-cart'>
          <h1>Carrinho de Compras</h1>
          <p onClick={showCart} className='material-symbols-outlined'>
            close
          </p>
        </div>

        <div className='content-itens-cart'>
          <ul className='products'>
            {carrinho.map((item, index) => (
              <li key={index} className='products-ind'>
                <p onClick={() => removerDoCarrinho(index)} className='material-symbols-outlined' id='close'>
                  close
                </p>
                <div className='product-detail'>
                  <img className='img-detail' src={item.photo} alt={item.name} />
                  <p className='title-product'>{item.name}</p>
                </div>
                <div className='products-add'>
                  <div className='quantity'>
                    <button className='quantity-btn' onClick={() => diminuirQuantidade(index)}>
                      -
                    </button>
                    <p className='qtd-product'>{item.quantidade}</p>
                    <button className='quantity-btn' onClick={() => aumentarQuantidade(index)}>
                      +
                    </button>
                  </div>
                  <p className='coast-product'>{item.price * item.quantidade} R$</p>

                </div>
              </li>
            ))}
          </ul>

          <div className='box-total'>
            <div className='amount'>
              <h2>Total:</h2>
              <h2>R$ {total}</h2>
            </div>
            <button className='finish-buy-btn'>
              <h2>Finalizar Compra</h2>
            </button>
          </div>
        </div>
      </main>

      <section className='content-itens'>
        <ul className='list-itens'>
          {products.map((product, index) => (
            <li key={index} className='itens'>
              <img className='img' src={product.photo} alt={product.name} title={product.name} />
              <div>
                <div className='box-one'>
                  <h3 className='name-item'>{product.name}</h3>
                  <p className='coast-item'>{product.price} R$</p>

                </div>
                <div className='box-two'>
                  <p className='description'>{product.description}</p>
                </div>
                <button className='btn-buy' onClick={() => adicionarAoCarrinho(product)}>
                  <i className='material-symbols-outlined'>local_mall</i>COMPRAR
                </button>
              </div>
            </li>
          ))}
        </ul>
        <footer className='footer'>
          <p>MKS sistemas &copy; todos os direitos reservados</p>
        </footer>
      </section>
    </main>
  );
}

export default Home;