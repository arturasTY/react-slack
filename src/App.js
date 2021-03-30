import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Modal from "./components/Modal";
import { useSelector } from "react-redux";
import { selectAddChannelIsOpen } from "./redux/ChannelSlice";
import Chat from "./components/Chat";
import { useAuthState } from "react-firebase-hooks/auth";
import { authentication } from "./firebase";
import Login from "./components/Login";

function App() {
  const addChannelIsOpen = useSelector(selectAddChannelIsOpen);
  const [user, loading] = useAuthState(authentication);
  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <div className="appContainer">
              <Sidebar />
              <Switch>
                <Route path="/" exact>
                  <Chat />
                </Route>
              </Switch>
            </div>

            {addChannelIsOpen && <Modal />}
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
