import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Modal from "./components/Modal";
import { useSelector } from "react-redux";
import { selectAddChannelIsOpen } from "./redux/ChannelSlice";
import Chat from "./components/Chat";

function App() {
  const addChannelIsOpen = useSelector(selectAddChannelIsOpen);
  return (
    <div className="app">
      <Router>
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
      </Router>
    </div>
  );
}

export default App;
