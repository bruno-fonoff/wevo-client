import { useState } from "react";
import { api } from "../../api/api";
import { toast, Toaster } from "react-hot-toast";

export function SignUp() {
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
    } catch (error) {
      console.error(error);
      if (error.response.data.keyPattern.cpf === 1) {
        toast.error("CPF já cadastrado!");
      }
      if (error.response.data.keyPattern.email === 1) {
        toast.error("E-mail já cadastrado!");
      }
    }
  }
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <form onSubmit={handleSubmit}>
        <label>Nome</label>
        <input
          type="text"
          value={form.nome}
          name="nome"
          onChange={handleChange}
        />

        <label>CPF</label>
        <input
          type="text"
          value={form.cpf}
          name="cpf"
          onChange={handleChange}
        />

        <label>E-mail</label>
        <input
          type="email"
          value={form.email}
          name="email"
          onChange={handleChange}
        />

        <label>Telefone</label>
        <input
          type="number"
          value={form.fone}
          name="fone"
          onChange={handleChange}
        />

        <label>Sexo</label>
        <select
          className=""
          id=""
          type="text"
          name="sexo"
          value={form.sexo}
          onChange={handleChange}
        >
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
        </select>

        <label>Data de Nascimento</label>
        <input
          type="date"
          value={form.nascimento}
          name="nascimento"
          onChange={handleChange}
        />

        <button type="submit">Cadastrar</button>
      </form>
    </>
  );
}
