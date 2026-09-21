import { useEffect, useState } from "react";
import {
    Activity,
    ArrowUpRight,
    BrainCircuit,
    Building2,
    Leaf,
    Sprout,
} from "lucide-react";

import AppLayout from "../components/AppLayout";
import { clearSession } from "../services/authStorage";
import { getProtectedData } from "../services/userService";

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

                // Recupera o nome salvo durante o login
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
                    // Limpa os dados da sessão
                    clearSession();

                    // Redireciona para o login
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
                // Finaliza o carregamento
                setLoading(false);
            }
        }

        // Executa a função quando o Dashboard é carregado
        loadProtectedData();
    }, []);

    return (
        <AppLayout title="Dashboard">
            <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
                {/* Área de boas-vindas */}
                <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b5b3d] via-[#0b4933] to-[#073b2a] p-6 text-white shadow-xl sm:p-10">
                    {/* Elementos decorativos */}
                    <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-emerald-300/10" />

                    <div className="pointer-events-none absolute -bottom-24 right-20 h-48 w-48 rounded-full bg-emerald-300/10" />

                    <div className="relative max-w-2xl">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-emerald-100">
                            <Leaf size={14} />

                            Painel inteligente
                        </div>

                        <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                            Olá, {name || "usuária"}! 👋
                        </h2>

                        <p className="mt-4 max-w-xl text-sm leading-6 text-emerald-100 sm:text-base">
                            Bem-vinda ao AgroIA. Explore seus dados,
                            acompanhe indicadores e descubra novas
                            possibilidades para uma gestão mais inteligente.
                        </p>

                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm text-emerald-50">
                                <Activity size={17} />

                                Plataforma conectada
                            </div>

                            <div className="flex items-center gap-2 rounded-xl bg-emerald-400/15 px-4 py-2.5 text-sm text-emerald-100">
                                <Sprout size={17} />

                                Agro + Tecnologia
                            </div>
                        </div>
                    </div>
                </div>

                {/* Estado de carregamento */}
                {loading && (
                    <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="h-5 w-5 animate-pulse rounded-full bg-emerald-200" />

                            <p className="text-sm text-slate-500">
                                Carregando dados da API...
                            </p>
                        </div>
                    </div>
                )}

                {/* Estado de erro */}
                {error && (
                    <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5">
                        <p className="text-sm text-red-600">
                            {error}
                        </p>
                    </div>
                )}

                {/* Confirmação da API */}
                {message && (
                    <div className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                        <div className="mt-0.5 rounded-lg bg-emerald-100 p-2">
                            <Activity
                                size={18}
                                className="text-emerald-700"
                            />
                        </div>

                        <div>
                            <h3 className="font-semibold text-emerald-800">
                                API autenticada
                            </h3>

                            <p className="mt-1 text-sm text-emerald-700">
                                {message}
                            </p>
                        </div>
                    </div>
                )}

                {/* Título dos indicadores */}
                <div className="mb-4 flex items-end justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
                            Visão geral
                        </p>

                        <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                            Seus indicadores
                        </h3>
                    </div>

                    <span className="hidden text-xs text-slate-400 sm:inline">
                        Dados demonstrativos
                    </span>
                </div>

                {/* Cards de indicadores */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Card de propriedades */}
                    <div className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                        <div className="flex items-start justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                                <Sprout
                                    size={24}
                                    className="text-emerald-700"
                                />
                            </div>

                            <ArrowUpRight
                                size={19}
                                className="text-slate-300 transition group-hover:text-emerald-600"
                            />
                        </div>

                        <p className="mt-6 text-sm font-medium text-slate-500">
                            Propriedades
                        </p>

                        <div className="mt-1 flex items-end gap-2">
                            <span className="text-4xl font-bold tracking-tight text-slate-900">
                                0
                            </span>

                            <span className="mb-1 text-xs text-slate-400">
                                cadastradas
                            </span>
                        </div>

                        <p className="mt-3 text-sm leading-5 text-slate-500">
                            Gerencie suas propriedades rurais.
                        </p>
                    </div>

                    {/* Card de organização */}
                    <div className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                        <div className="flex items-start justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
                                <Building2
                                    size={24}
                                    className="text-blue-700"
                                />
                            </div>

                            <ArrowUpRight
                                size={19}
                                className="text-slate-300 transition group-hover:text-blue-600"
                            />
                        </div>

                        <p className="mt-6 text-sm font-medium text-slate-500">
                            Organização
                        </p>

                        <div className="mt-1 flex items-end gap-2">
                            <span className="text-4xl font-bold tracking-tight text-slate-900">
                                0
                            </span>

                            <span className="mb-1 text-xs text-slate-400">
                                registros
                            </span>
                        </div>

                        <p className="mt-3 text-sm leading-5 text-slate-500">
                            Consulte os dados da organização.
                        </p>
                    </div>

                    {/* Card de análises */}
                    <div className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                        <div className="flex items-start justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100">
                                <BrainCircuit
                                    size={24}
                                    className="text-violet-700"
                                />
                            </div>

                            <ArrowUpRight
                                size={19}
                                className="text-slate-300 transition group-hover:text-violet-600"
                            />
                        </div>

                        <p className="mt-6 text-sm font-medium text-slate-500">
                            Análises de IA
                        </p>

                        <div className="mt-1 flex items-end gap-2">
                            <span className="text-4xl font-bold tracking-tight text-slate-900">
                                0
                            </span>

                            <span className="mb-1 text-xs text-slate-400">
                                análises
                            </span>
                        </div>

                        <p className="mt-3 text-sm leading-5 text-slate-500">
                            Acompanhe suas análises inteligentes.
                        </p>
                    </div>
                </div>

                {/* Ações rápidas */}
                <div className="mt-8 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                                <Leaf
                                    size={20}
                                    className="text-emerald-700"
                                />
                            </div>

                            <div>
                                <h3 className="font-bold text-slate-900">
                                    Comece sua jornada
                                </h3>

                                <p className="text-xs text-slate-500">
                                    Explore as possibilidades da plataforma
                                </p>
                            </div>
                        </div>

                        <p className="mt-5 max-w-xl text-sm leading-6 text-slate-500">
                            Este espaço será utilizado para apresentar
                            indicadores, informações e recursos inteligentes
                            do AgroIA.
                        </p>

                        <div className="mt-6 rounded-xl bg-slate-50 p-4">
                            <div className="flex items-center gap-3">
                                <BrainCircuit
                                    size={20}
                                    className="text-emerald-700"
                                />

                                <div>
                                    <p className="text-sm font-semibold text-slate-800">
                                        Recursos inteligentes
                                    </p>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Novas funcionalidades serão adicionadas
                                        nas próximas etapas.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                                <Activity
                                    size={20}
                                    className="text-emerald-700"
                                />
                            </div>

                            <div>
                                <h3 className="font-bold text-slate-900">
                                    Status da plataforma
                                </h3>

                                <p className="text-xs text-slate-500">
                                    Acompanhamento do sistema
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-between rounded-xl bg-emerald-50 p-4">
                            <div className="flex items-center gap-2">
                                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

                                <span className="text-sm font-medium text-emerald-800">
                                    Autenticação
                                </span>
                            </div>

                            <span className="text-xs font-semibold text-emerald-700">
                                Ativa
                            </span>
                        </div>

                        <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-50 p-4">
                            <div className="flex items-center gap-2">
                                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

                                <span className="text-sm font-medium text-slate-700">
                                    API
                                </span>
                            </div>

                            <span className="text-xs font-semibold text-slate-500">
                                Conectada
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
