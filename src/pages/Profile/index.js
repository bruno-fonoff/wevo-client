import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./style.css";
import { api } from "../../api/api";
import { Toaster, toast } from "react-hot-toast";
import home from "../../assets/images/home.png";
import banner from "../../assets/images/company_logo.jpg";

export function Profile() {
  const [info, setInfo] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function userProfile() {
      try {
        const response = await api.get(`/user/${id}`);
        setInfo(response.data);
      } catch (error) {
        console.log(error);
        navigate("/error");
      }
    }
    userProfile();
  }, []);

  async function handleDelete() {
    try {
      await api.delete(`/user/delete/${id}`);
      toast.error("Usuário Deletado!");

      setTimeout(() => {
        navigate("/");
        return;
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }

  //     .slice(0, 10).split("-").reverse().join("-")
  return (
    <>
      <Toaster />
      <div id="headerSign">
        <Link to="/">
          <img id="homeSign" src={home} alt="home wevo" />
        </Link>
        <img id="banner" src={banner} alt="banner wevo" />
      </div>
      <div id="bodyProfile">
        <div id="">
          <div id="textoDetails">
            <p className="infosDetails">
              ID : <b>{info._id}</b>
            </p>
            <p className="infosDetails">
              Nome : <b>{info.nome}</b>
            </p>
            <p className="infosDetails">
              CPF : <b>{info.cpf}</b>
            </p>
            <p className="infosDetails">
              E-mail : <b>{info.email}</b>
            </p>
            <p className="infosDetails">
              Telefone : <b>{info.fone}</b>
            </p>

            <p className="infosDetails">
              Sexo : <b>{info.sexo}</b>
            </p>
            <p className="infosDetails">
              Data de Nascimento : <b>{info.nascimento}</b>
              {/* {console.log(info.nascimento)} */}
            </p>
          </div>
        </div>
        <div id="buttonsDetails">
          <Link
            id="buttonEditarDetails"
            to={`/user/edit/${id}`}
            className="btn btn-primary"
          >
            Editar
          </Link>
          <button
            id="buttonApagarDetails"
            onClick={handleDelete}
            className="btn btn-danger"
          >
            Apagar
          </button>
        </div>
      </div>
    </>
  );
}
