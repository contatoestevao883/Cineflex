import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import NavBar from "./components/NavBar/NavBar"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useState } from "react"

export default function App() {
    const [successInfo, setSuccessInfo] = useState({})

    return (
        <BrowserRouter>
            <NavBar />
            
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/sessoes/:idFilme" element={<SessionsPage />} />
                <Route path="/assentos/:idSessao" element={<SeatsPage setSuccessInfo={setSuccessInfo}/>} />
                <Route path="/sucesso" element={<SuccessPage successInfo={successInfo}/>} />
            </Routes>
        </BrowserRouter>
    )
}


