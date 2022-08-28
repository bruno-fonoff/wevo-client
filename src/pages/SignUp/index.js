import { useState, useRef } from "react";
import { api } from "../../api/api";
import { toast, Toaster } from "react-hot-toast";
import "./style.css";
import banner from "../../assets/images/company_logo.jpg";
import home from "../../assets/images/home.png";
import { Link, useParams, useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";

export function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    email: "",
    fone: "",
    sexo: "",
    nascimento: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.post("/user/signup", form);
      console.log(response.data);
      toast.success("Cadastrado com Sucesso");
      setTimeout(() => {
        navigate("/");
        return;
      }, 3000);
    } catch (error) {
      console.error(error.response.status);
      if (error.response.data.keyPattern.cpf === 1) {
        toast.error("CPF já cadastrado!");
      }
      if (error.response.data.keyPattern.email === 1) {
        toast.error("E-mail já cadastrado!");
      }
      if (error.response.status === 500) {
        toast.error("Campo vazio ou com formato inválido");
      }
    }
  }
  const inputRef = useRef(null);
  const changeMask = () => {
    console.log("onblur");
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div id="headerSign">
        <Link to="/">
          <img id="homeSign" src={home} alt="home wevo" />
        </Link>
        <img id="banner" src={banner} alt="banner wevo" />
      </div>

      <form id="form" className="row g-3" onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            required={true}
            type="text"
            value={form.nome}
            name="nome"
            onChange={handleChange}
            className="form-control"
            id="nome"
            placeholder="Nome Completo"
          />
          <label htmlFor="nome">Nome Completo</label>
        </div>

        <div className="form-floating">
          <InputMask
            required={true}
            className="form-control"
            id="cpf"
            placeholder="000.000.000-00"
            type="text"
            value={form.cpf}
            name="cpf"
            onChange={handleChange}
            mask="999.999.999-99"
          />
          <label htmlFor="floatingPassword">CPF</label>
        </div>

        <div className="form-floating mb-3">
          <input
            required={true}
            type="email"
            value={form.email}
            name="email"
            onChange={handleChange}
            className="form-control"
            id="email"
            placeholder="name@example.com"
          />
          <label htmlFor="email">E-mail</label>
        </div>

        <div className="form-floating mb-3">
          <InputMask
            required={true}
            type="text"
            value={form.fone}
            name="fone"
            onChange={handleChange}
            className="form-control"
            id="phone"
            placeholder="(00)00000-0000"
            mask="(99) 99999-9999"
            ref={inputRef}
          />

          <label htmlFor="phone">Telefone</label>
        </div>
        <div className="form-floating">
          <select
            className="form-select"
            required={true}
            name="sexo"
            value={form.sexo}
            onChange={handleChange}
            id="sexo"
            aria-label="Floating label select example"
          >
            <option defaultValue>Selecione</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
          </select>
          <label htmlFor="sexo">Sexo</label>
        </div>

        <div className="form-floating mb-3">
          <input
            required={true}
            type="date"
            className="form-control"
            id="nascimento"
            placeholder="DD/MM/AAAA"
            value={form.nascimento}
            name="nascimento"
            onChange={handleChange}
          />
          <label htmlFor="nascimento">Data de Nascimento</label>
        </div>

        <button className="btn btn-outline-primary mb-3" type="submit">
          Cadastrar
        </button>
      </form>
    </>
  );
}
