import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import "./style.css";

export default function() {
  return <Layout />;
}

function Layout() {
  return <Header />;
}
function Header() {
  function loggedIn() {
    if (window.localStorage.getItem("isLogged") === "true") {
      return true;
    } else return false;
  }
  function logOut() {
    window.localStorage.setItem("isLogged", "false");
    window.location.reload();
  }
  return (
    <Router>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/sign-in">Sign in</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        {loggedIn() ? (
          <button
            style={{ position: "absolute", right: 0 }}
            onClick={() => logOut()}
          >
            Выход
          </button>
        ) : null}
      </ul>

      <hr />
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route path="/sign-in">
          <SignInPage />
        </Route>
        <Route path="/profile">
          <ProfilePage />
        </Route>
      </Switch>
    </Router>
  );
}
function MainPage() {
  return (
    <div>
      <h2>Главная</h2>
      Это главная страница этого небольшого "приложения".
    </div>
  );
}

function SignInPage() {
  function store() {
    var name = document.getElementById("name");
    var pw = document.getElementById("pw");

    window.localStorage.setItem("name", name.value);
    window.localStorage.setItem("password", pw.value);
    window.localStorage.setItem("isLogged", "false");
    alert("Пользователь с ником " + name.value + " успешно зарегистрирован!");
  }

  function check() {
    var storedName = window.localStorage.getItem("name");
    var storedPw = window.localStorage.getItem("password");

    var userName = document.getElementById("userName").value;
    var userPw = document.getElementById("userPw").value;
    if (window.localStorage.getItem("isLogged") === "true") {
      alert("Вы уже залогинены");
    } else if (userName === storedName && userPw === storedPw) {
      window.localStorage.setItem("isLogged", "true");
      alert("Вы залогинились");
    } else {
      alert("Введены не корректные данные");
    }
  }
  return (
    <div>
      <h3>Регистрация нового пользователя:</h3>
      <form id="register-form">
        <input id="name" type="text" placeholder="Username" />
        <input id="pw" type="password" placeholder="Password" />
        <input
          id="rgstr_btn"
          type="submit"
          value="get Account"
          onClick={() => store()}
        />
      </form>
      <h3>Уже зарегистрированы? Войдите:</h3>
      <form id="login-form">
        <input id="userName" type="text" placeholder="Enter Username" />
        <input id="userPw" type="password" placeholder="Enter Password" />
        <input
          id="login_btn"
          type="submit"
          value="Login"
          onClick={() => check()}
        />
      </form>
    </div>
  );
}

function ProfilePage() {
  function loggedIn() {
    if (window.localStorage.getItem("isLogged") === "true") {
      return false;
    } else return true;
  }

  return (
    <div>
      {loggedIn() ? <Redirect to="/" /> : null}

      <h2>Ваш профиль:</h2>
      <h3>Логин: {window.localStorage.getItem("name")}</h3>
    </div>
  );
}
