import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Ops... Acho q ocorreu algum problema.</h1>
      <button onClick={() => navigate('/')}>Voltar para a tela de login</button>
    </div>
  )
}

export default NotFound
