import banner from "../../assets/images/company_logo.jpg";

import "./style.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import user1 from "../../assets/images/user1.png";
import user2 from "../../assets/images/user2.png";
import { api } from "../../api/api";

export function Home() {
  const [users, setUsers] = useState([]);

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
      <div id="bodyHome">
        <div id="tituloCreateHome"></div>
        <div>
          <Link id="createPlay" to="/create" className="btn btn-primary"></Link>
        </div>
        <div id="home">
          {users.map((currentUser) => {
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
