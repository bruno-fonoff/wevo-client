import { useState, useEffect } from "react";
import { api } from "../../api/api";
import { toast, Toaster } from "react-hot-toast";
import "./style.css";
import banner from "../../assets/images/company_logo.jpg";
import home from "../../assets/images/home.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import InputMask from "react-input-mask";

export function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    email: "",
    fone: "",
    sexo: "",
    nascimento: "",
  });

  useEffect(() => {
    async function editUser() {
      try {
        const response = await api.get(`/user/${id}`);
        setForm(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    editUser();
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const clone = { ...form };
      delete clone._id;
      await api.patch(`/user/edit/${id}`, clone);
      toast.success("Alterações Atualizadas");
      setTimeout(() => {
        navigate(`/user/${id}`);
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
          Salvar
        </button>
      </form>
    </>
  );
}
