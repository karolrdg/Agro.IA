import { useState } from "react";
import { Mail, Lock, User, ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../services/registerService";

export default function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {
            await registerUser({
                name,
                email,
                password,
            });

            setSuccess("Conta criada com sucesso! Redirecionando...");

            setTimeout(() => {
                navigate("/login");
            }, 1200);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Não foi possível criar a conta."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-[#061f17] px-4 py-8 text-white">
            <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
                <section className="grid w-full overflow-hidden rounded-3xl border border-emerald-900/50 bg-[#0b2b20] shadow-2xl md:grid-cols-2">

                    {/* Painel visual */}
                    <div className="relative hidden min-h-[620px] flex-col overflow-hidden bg-gradient-to-br from-emerald-900 via-[#0b3828] to-[#061f17] p-10 md:flex">

                        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />

                        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-lime-300/10 blur-3xl" />

                        <div className="relative flex flex-1 items-center justify-center">
                            <img
                                src="/logo-agroia.png"
                                alt="Logo AgroIA"
                                className="w-80 max-w-full object-contain"
                            />
                        </div>

                        <div className="relative max-w-md">
                            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
                                Tecnologia que faz crescer
                            </p>

                            <h2 className="text-4xl font-bold leading-tight text-white">
                                Comece sua jornada no AgroIA.
                            </h2>

                            <p className="mt-5 text-base leading-7 text-emerald-100/70">
                                Organize seus dados agrícolas e utilize
                                tecnologia para uma gestão mais inteligente.
                            </p>
                        </div>

                        <p className="relative mt-8 text-sm text-emerald-200/50">
                            AgroIA · Plataforma inteligente
                        </p>
                    </div>

                    {/* Formulário */}
                    <div className="flex min-h-[620px] flex-col justify-center bg-[#f6f8f4] p-6 text-slate-900 sm:p-10">
                        <div className="mx-auto w-full max-w-md">

                            <button
                                type="button"
                                onClick={() => navigate("/login")}
                                className="cursor-pointer mb-8 flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
                            >
                                <ArrowLeft size={18} />
                                Voltar para login
                            </button>

                            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-700">
                                Bem-vindo(a) ao AgroIA
                            </p>

                            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                                Criar sua conta
                            </h1>

                            <p className="mt-3 text-sm leading-6 text-slate-500">
                                Preencha seus dados para começar a utilizar o AgroIA.
                            </p>

                            <form
                                className="mt-8 space-y-5"
                                onSubmit={handleSubmit}
                            >
                                {/* Nome */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="mb-2 block text-sm font-medium text-slate-700"
                                    >
                                        Nome
                                    </label>

                                    <div className="relative">
                                        <User
                                            size={19}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="Seu nome"
                                            value={name}
                                            onChange={(event) =>
                                                setName(event.target.value)
                                            }
                                            required
                                            minLength={3}
                                            maxLength={100}
                                            autoComplete="name"
                                            className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                        />
                                    </div>
                                </div>

                                {/* E-mail */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-sm font-medium text-slate-700"
                                    >
                                        E-mail
                                    </label>

                                    <div className="relative">
                                        <Mail
                                            size={19}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="voce@email.com"
                                            value={email}
                                            onChange={(event) =>
                                                setEmail(event.target.value)
                                            }
                                            required
                                            autoComplete="email"
                                            className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                        />
                                    </div>
                                </div>

                                {/* Senha */}
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="mb-2 block text-sm font-medium text-slate-700"
                                    >
                                        Senha
                                    </label>

                                    <div className="relative">
                                        <Lock
                                            size={19}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="Digite sua senha"
                                            value={password}
                                            onChange={(event) =>
                                                setPassword(event.target.value)
                                            }
                                            required
                                            minLength={6}
                                            autoComplete="new-password"
                                            className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                        />
                                    </div>

                                    <p className="mt-2 text-xs text-slate-400">
                                        A senha deve ter pelo menos 6 caracteres.
                                    </p>
                                </div>

                                {/* Erro */}
                                {error && (
                                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                                        {error}
                                    </div>
                                )}

                                {/* Sucesso */}
                                {success && (
                                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                                        {success}
                                    </div>
                                )}

                                {/* Botão */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="cursor-pointer group flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-700 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading
                                        ? "Criando conta..."
                                        : "Criar conta"}

                                    {!loading && (
                                        <ArrowRight
                                            size={19}
                                            className="transition-transform group-hover:translate-x-1"
                                        />
                                    )}
                                </button>
                            </form>

                            <p className="mt-8 text-center text-sm text-slate-500">
                                Já possui uma conta?{" "}
                                <button
                                    type="button"
                                    onClick={() => navigate("/login")}
                                    className="cursor-pointer font-semibold text-emerald-700 hover:text-emerald-900"
                                >
                                    Entrar
                                </button>
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}