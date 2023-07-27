import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Card, Button } from "react-bootstrap";
import { addProdutoNome } from "../redux/slices/carrinho.slice";
import { RootState } from "../redux/store";

export default function GridCardList() {
  const dispatch = useDispatch();

  const { produtos } = useSelector((state: RootState) => state.apiProduto);
  const { produtos: produtosNoCarrinho } = useSelector((state: RootState) => state.carrinho); // Obtendo a lista de produtos no carrinho

  function inserirCarrinho(name: string) {
    const produto = produtos.find((p) => p.nome === name);
    if (produto) {
      const produtoNoCarrinho = produtosNoCarrinho.find((p) => p.nome === name);
      if (!produtoNoCarrinho) {
        dispatch(addProdutoNome(name));
      } else {
        // Verificar se a quantidade a ser adicionada excede o estoque disponível
        if (produtoNoCarrinho.quantidade + 1 <= produto.estoque) {
          dispatch(addProdutoNome(name));
        } else {
          window.alert("Quantidade excede o estoque disponível.");
        }
      }
    }
  }

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {produtos.map((produto) => (
        <div key={produto.id} className="col">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="placeholder-image.jpg" />
            <Card.Body>
              <Card.Title>{produto.nome}</Card.Title>
              <Card.Text>R$ {produto.preco}</Card.Text>
              <Button onClick={() => inserirCarrinho(produto.nome)}>Inserir no Carrinho</Button>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}
