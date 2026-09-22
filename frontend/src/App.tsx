import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Organizations from "./pages/Organizations";
import RuralProperties from "./pages/RuralProperties";
function ProtectedRoute({
    children,
}: {
    children: React.ReactNode;
}) {
    // Verifica se existe um token salvo no navegador.
    const token = localStorage.getItem("token");

    // Sem token, a pessoa retorna para o login.
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Com token, permite acessar a página.
    return children;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Página de login */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* Dashboard protegido */}
                <Route
                    path="/rural-properties"
                    element={
                        <ProtectedRoute>
                            <RuralProperties />
                        </ProtectedRoute>
                    }
                />

                {/* Organizações protegidas */}
                <Route
                    path="/organizations"
                    element={
                        <ProtectedRoute>
                            <Organizations />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Rota inicial */}
                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/login"
                            replace
                        />
                    }
                />


            </Routes>
        </BrowserRouter>
    );
}

export default App;
