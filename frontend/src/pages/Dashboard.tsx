import { useEffect, useState } from "react";
import { LogOut, Sprout, User } from "lucide-react";
import { getProtectedData } from "../services/userService";
import { clearSession } from "../services/authStorage";

export default function Dashboard() {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadProtectedData() {
            try {
                // Solicita os dados ao serviço
                const data = await getProtectedData();

                // Guarda a mensagem retornada pela API
                setMessage(data.message);

                // Recupera o nome salvo no login
                const savedName = localStorage.getItem("name");

                if (savedName) {
                    setName(savedName);
                }
            } catch (error: unknown) {
                // Verifica se a sessão expirou ou se o token é inválido
                if (
                    error instanceof Error &&
                    error.message === "SESSION_EXPIRED"
                ) {
                    // Remove os dados de autenticação
                    clearSession();

                    // Redireciona para a tela de login
                    window.location.href = "/login";

                    return;
                }

                // Trata outros erros
                console.error(
                    "Erro ao carregar o Dashboard:",
                    error
                );

                setError("Não foi possível carregar os dados.");
            } finally {
                // Finaliza o estado de carregamento
                setLoading(false);
            }
        }

        // Executa a função quando o Dashboard é carregado
        loadProtectedData();
    }, []);

    const handleLogout = () => {
        // Limpa todos os dados da sessão
        clearSession();

        // Redireciona para o login
        window.location.href = "/login";
    };

    return (
        <main className="min-h-screen bg-slate-100 text-slate-900">
            {/* Barra superior */}
            <header className="flex items-center justify-between bg-emerald-900 px-6 py-4 text-white shadow-md">
                <div className="flex items-center gap-3">
                    <Sprout size={28} />

                    <h1 className="text-xl font-bold">
                        AgroIA
                    </h1>
                </div>

                <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition hover:bg-emerald-800"
                >
                    <LogOut size={18} />

                    Sair
                </button>
            </header>

            {/* Conteúdo principal */}
            <section className="mx-auto max-w-7xl px-6 py-10">
                <div className="mb-8">
                    <p className="text-sm font-medium text-emerald-700">
                        Painel principal
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        Olá, {name || "usuária"}! 👋
                    </h2>

                    <p className="mt-2 text-slate-500">
                        Bem-vinda ao painel inteligente do AgroIA.
                    </p>
                </div>

                {loading && (
                    <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
                        <p className="text-slate-500">
                            Carregando dados da API...
                        </p>
                    </div>
                )}

                {error && (
                    <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-6">
                        <p className="text-red-600">
                            {error}
                        </p>
                    </div>
                )}

                {message && (
                    <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
                        <h3 className="font-semibold text-emerald-800">
                            API autenticada
                        </h3>

                        <p className="mt-2 text-emerald-700">
                            {message}
                        </p>
                    </div>
                )}

                {/* Cards de resumo */}
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                        <Sprout
                            size={28}
                            className="text-emerald-700"
                        />

                        <h3 className="mt-4 text-lg font-semibold">
                            Propriedades
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                            Gerencie suas propriedades rurais.
                        </p>

                        <p className="mt-4 text-3xl font-bold text-emerald-700">
                            0
                        </p>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                        <User
                            size={28}
                            className="text-emerald-700"
                        />

                        <h3 className="mt-4 text-lg font-semibold">
                            Organização
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                            Consulte os dados da organização.
                        </p>

                        <p className="mt-4 text-3xl font-bold text-emerald-700">
                            0
                        </p>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                        <Sprout
                            size={28}
                            className="text-emerald-700"
                        />

                        <h3 className="mt-4 text-lg font-semibold">
                            Análises de IA
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                            Acompanhe suas análises inteligentes.
                        </p>

                        <p className="mt-4 text-3xl font-bold text-emerald-700">
                            0
                        </p>
                    </div>
                </div>

                {/* Área de boas-vindas */}
                <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                    <h3 className="text-xl font-bold">
                        Comece sua jornada
                    </h3>

                    <p className="mt-3 max-w-2xl text-slate-500">
                        Este espaço será utilizado para apresentar
                        indicadores, informações e recursos inteligentes
                        da plataforma AgroIA.
                    </p>
                </div>
            </section>
        </main>
    );
}