import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProdutoCarrinho {
  nome: string;
  preco: number;
  quantidade: number; // Adicionando a quantidade do produto
}

interface CarrinhoState {
  produtos: ProdutoCarrinho[];
}

const initialState: CarrinhoState = {
  produtos: [],
};

const carrinhoSlice = createSlice({
  name: "carrinho",
  initialState,
  reducers: {
    addProdutoNome: (state, action: PayloadAction<string>) => {
      const nome = action.payload;
      const produtoExistente = state.produtos.find((produto) => produto.nome === nome);

      if (produtoExistente) {
        produtoExistente.quantidade += 1; // Incrementar a quantidade caso o produto já esteja no carrinho
      } else {
        state.produtos.push({ nome, preco: 10, quantidade: 1 }); // Atribuir a quantidade inicial como 1
      }
    },
    removeProdutoNome: (state, action: PayloadAction<string>) => {
      const nome = action.payload;
      state.produtos = state.produtos.filter((produto) => produto.nome !== nome);
    },
    incrementarQuantidade: (state, action: PayloadAction<string>) => {
      const nome = action.payload;
      const produtoExistente = state.produtos.find((produto) => produto.nome === nome);

      if (produtoExistente) {
        produtoExistente.quantidade += 1;
      }
    },
    decrementarQuantidade: (state, action: PayloadAction<string>) => {
      const nome = action.payload;
      const produtoExistente = state.produtos.find((produto) => produto.nome === nome);

      if (produtoExistente && produtoExistente.quantidade > 1) {
        produtoExistente.quantidade -= 1;
      }
    },
  },
});

export const { addProdutoNome, removeProdutoNome, incrementarQuantidade, decrementarQuantidade } =
  carrinhoSlice.actions;

export default carrinhoSlice.reducer;
