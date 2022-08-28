<div id="form">
  <label className="form-label">Nome</label>
  <input
    required="true"
    className="input-group mb-3"
    type="text"
    value={form.nome}
    name="nome"
    onChange={handleChange}
  />
  <div class="form-floating mb-3">
    <label htmlFor="cpf" className="form-label">
      CPF
    </label>
    <input
      required="true"
      class="form-control"
      id="cpf"
      placeholder="000.000.000-00"
      type="text"
      value={form.cpf}
      name="cpf"
      onChange={handleChange}
    />
  </div>

  <label className="form-label">E-mail</label>
  <input
    class="input-group mb-3"
    required="true"
    type="email"
    value={form.email}
    name="email"
    onChange={handleChange}
  />

  <label className="form-label">Telefone</label>
  <input
    required="true"
    class="input-group mb-3"
    type="number"
    value={form.fone}
    name="fone"
    onChange={handleChange}
  />

  <label className="form-label">Sexo</label>
  <select
    required="true"
    class="form-select"
    aria-label="Default select example"
    id=""
    type="text"
    name="sexo"
    value={form.sexo}
    onChange={handleChange}
  >
    <option value="Masculino">Masculino</option>
    <option value="Feminino">Feminino</option>
  </select>

  <label className="form-label">Data de Nascimento</label>
  <input
    required="true"
    class="input-group mb-3"
    type="date"
    value={form.nascimento}
    name="nascimento"
    onChange={handleChange}
  />

  <button className="btn btn-outline-primary" type="submit">
    Cadastrar
  </button>
</div>;
