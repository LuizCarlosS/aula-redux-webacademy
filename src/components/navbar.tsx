import { useDispatch, useSelector } from "react-redux";
import { Navbar, NavbarBrand } from "reactstrap";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/api.slice.login";
import { NavItem, NavLink } from "react-bootstrap";

export default function NavBarCustom() {
  const navigate = useNavigate();

  const { isAdmin } = useSelector((state: RootState) => state.apiLogin);
  const dispatch = useDispatch();
  const { produtos } = useSelector((state: RootState) => state.carrinho); // Obtendo a lista de produtos no carrinho
  const quantidadeTotalCarrinho = produtos.reduce((total, produto) => total + produto.quantidade, 0);

  function Logout() {
    dispatch(logout());
    navigate("/");
  }

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <NavbarBrand>Loja Online</NavbarBrand>

      <NavItem onClick={() => navigate("/home")}>
        <NavLink>Produtos</NavLink>
      </NavItem>

      {/* SE USUARIO ISADMIN MOSTRA OPÇÃO DO CARRINHO */}
      {!isAdmin && (
        <NavItem onClick={() => navigate("/cart")}>
          <NavLink>Carrinho <span className="badge bg-primary">{quantidadeTotalCarrinho}</span></NavLink>
        </NavItem>
      )}

      <NavItem onClick={() => Logout()}>
        <NavLink>Logout</NavLink>
      </NavItem>
    </Navbar>
  );
}
