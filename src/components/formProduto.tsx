import { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap"; // Importando o componente Form do Bootstrap

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";
import { AppDispatch } from "../redux/store";
import { addProduto } from "../redux/slices/api.slice.produtos";

export default function FormularioProduto() {
  const dispatch = useDispatch<AppDispatch>();

  const [inputProduto, SetProduto] = useState({
    nome: "",
    preco: 0,
    estoque: 0,
  });

  const handleInput = (e: any) => {
    SetProduto({ ...inputProduto, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(addProduto(inputProduto));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h3 className="mt-3">Inserir Novo Produto</h3>
      <Form onSubmit={handleSubmit}> {/* Utilizando o componente Form do Bootstrap */}
        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3 col-form-lable">Nome</Form.Label>
          <div className="col-md-8">
            <Form.Control
              type="text"
              name="nome"
              value={inputProduto.nome}
              onChange={handleInput}
            />
          </div>
        </Form.Group>

        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3 col-form-lable">Preço</Form.Label>
          <div className="col-md-8">
            <Form.Control
              type="number"
              name="preco"
              value={inputProduto.preco}
              onChange={handleInput}
            />
          </div>
        </Form.Group>

        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3 col-form-lable">Estoque</Form.Label>
          <div className="col-md-8">
            <Form.Control
              type="number"
              name="estoque"
              value={inputProduto.estoque}
              onChange={handleInput}
            />
          </div>
        </Form.Group>

        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3 col-form-lable"></Form.Label>
          <div className="col-md-1">
            <Button type="submit" variant="primary" size="lg">
              Submit
            </Button>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
}
