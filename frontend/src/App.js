import { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { auth, getIdToken } from "./firebase";
import { AuthContext } from "./contexts/AuthContext";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Contact from "./pages/Contact/Contact";
import Profile from "./pages/Profile/Profile";
import NavBar from "./components/NavBar/NavBar";
import Chat from "./pages/Chat/Chat";
import Matching from "./pages/Matching/Matching";
import { postAuthInfo } from "./utils";

function App() {
  const {
    user: { info },
    dispatch,
  } = useContext(AuthContext);

  const updateAuthData = (info) => {
    dispatch({
      type: "info",
      info,
    });
  };

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await getIdToken();
        console.log(token);
        updateAuthData({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          uid: user.uid,
        });

        await postAuthInfo();
      } else {
        updateAuthData(null);
      }
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <NavBar info={info} />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/matching">
            <Matching />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route exact path="/chat">
            <Chat />
          </Route>

          <Route exact path="/me">
            <Profile me={true} />
          </Route>

          <Route path="/about">
            <About />
          </Route>

          <Route path="/contact">
            <Contact />
          </Route>

          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
