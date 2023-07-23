import { HashRouter as Router, Route, RouterProps, Routes, useLocation } from "react-router-dom";
import Login from "../routes/Login";
import Main from "../routes/Main";

const AppRouter: React.FC<{}> = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />]
        <Route index path="*" element={<Main />} />
      </Routes>
    </Router>
  )
}

export default AppRouter;