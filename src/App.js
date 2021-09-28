import { BrowserRouter, Switch, Route } from "react-router-dom";
import WelcomePage from "./pages/shared/WelcomePage";
import VerificationCodeProcess from "./pages/verification-code/VerificationCodeProcess";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={VerificationCodeProcess} />
        <Route exact path="/success" component={WelcomePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
