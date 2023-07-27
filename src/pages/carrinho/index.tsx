import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import NavBarCustom from "../../components/navbar";
import { RootState } from "../../redux/store";
import { removeProdutoNome, incrementarQuantidade, decrementarQuantidade } from "../../redux/slices/carrinho.slice";
import "./index.css";

export default function Carrinho() {
  const produtosNoCarrinho = useSelector((state: RootState) => state.carrinho.produtos);
  const listaProdutos = useSelector((state: RootState) => state.apiProduto.produtos);
  const dispatch = useDispatch();

  function getPrecoByNome(nome: string) {
    const produto = listaProdutos.find((p) => p.nome === nome);
    return produto ? produto.preco : 0;
  }

  function getEstoqueByNome(nome: string) {
    const produto = listaProdutos.find((p) => p.nome === nome);
    return produto ? produto.estoque : 0;
  }

  const precoFinal = produtosNoCarrinho.reduce((total, produto) => {
    return total + getPrecoByNome(produto.nome) * produto.quantidade;
  }, 0);
  
  useEffect(() => {
    let newPrecoFinal = 0;

    const produtosAtualizados = produtosNoCarrinho.map((produto) => {
      const estoque = getEstoqueByNome(produto.nome);
      if (produto.quantidade > estoque) {
        window.alert("A quantidade de um ou mais produtos foi ajustada devido ao estoque disponível.");
        return { ...produto, quantidade: estoque };
      }
      return produto;
    });

    newPrecoFinal = produtosAtualizados.reduce((total, produto) => {
      return total + getPrecoByNome(produto.nome) * produto.quantidade;
    }, 0);

    dispatch({ type: "carrinho/setProdutos", payload: produtosAtualizados });

    dispatch({ type: "carrinho/setPrecoFinal", payload: newPrecoFinal });

  }, [produtosNoCarrinho, listaProdutos, dispatch]);

  return (
    <div className="containerCart">
      <div style={{ width: "100%" }}>
        <NavBarCustom />
      </div>
      <h2>CARRINHO</h2>

      <div style={{ overflow: "scroll", height: "500px" }}>
        <ListGroup flush>
          {produtosNoCarrinho.map((produto) => (
            <ListGroupItem key={produto.nome}>
              <span>{produto.nome}</span>
              <span>Preço: R$ {getPrecoByNome(produto.nome)} || </span>
              <span>Quantidade: {produto.quantidade} || </span>
              <span>Preço Total: R$ {getPrecoByNome(produto.nome) * produto.quantidade} </span>
              <Button onClick={() => dispatch(incrementarQuantidade(produto.nome))}>+</Button>
              <span> </span>
              <Button onClick={() => dispatch(decrementarQuantidade(produto.nome))}>-</Button>
              <span> </span>
              <Button onClick={() => dispatch(removeProdutoNome(produto.nome))}>Remover</Button>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>

      <div className="precoFinal">Preço Final da Compra: R$ {precoFinal}</div>
    </div>
  );
}
