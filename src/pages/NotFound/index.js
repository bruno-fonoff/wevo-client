import banner from "../../assets/images/company_logo.jpg";
import "./style.css";
import home from "../../assets/images/home.png";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <>
      <img id="bannerNotFound" src={banner} alt="banner wevo" />
      <h1 id="titleNotFound">Page Not Found!</h1>
      <Link to="/">
        <img id="homeNotFound" src={home} alt="banner wevo" />
      </Link>
    </>
  );
}
