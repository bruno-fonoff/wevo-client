import banner from "../../assets/images/company_logo.jpg";
import "./style.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import user1 from "../../assets/images/user1.jpg";
import user2 from "../../assets/images/user2.jpg";
import { api } from "../../api/api";
import { NavBar } from "../../components/NavBar";

export function Home() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function allUsers() {
      const usersList = await api.get("/user/all-users");
      setUsers(usersList.data);
      console.log(usersList.data);
    }
    allUsers();
  }, []);

  return (
    <>
      <NavBar search={search} setSearch={setSearch} />

      <img id="banner" src={banner} alt="banner wevo" />
      <div id="bodyHome">
        <div id="tituloCreateHome"></div>

        <div id="home">
          {users
            .filter((currentUser) => {
              return currentUser.nome
                .toLowerCase()
                .includes(search.toLowerCase());
            })
            .map((currentUser) => {
              return (
                <>
                  <div id="cardsHome">
                    <Link id="linkCard" to={`/user/${currentUser._id}`}>
                      <div>
                        <img
                          id="fotoperfil"
                          src={currentUser.sexo === "Masculino" ? user1 : user2}
                          alt="foto-perfil"
                        />

                        <div>
                          <div className="card-body-home">
                            <h4 className="card-title-home">
                              {currentUser.nome}
                            </h4>
                            <hr />
                            <p className="card-text-home">
                              {currentUser.creation
                                .slice(0, 10)
                                .split("-")
                                .reverse()
                                .join("-")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
}
