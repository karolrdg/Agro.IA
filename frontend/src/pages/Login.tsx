import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { login } from "../services/authService";

export default function Login() {
    //GSAP
    const logoRef = useRef<HTMLImageElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    // Estados do formulário
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Estado de carregamento
    const [loading, setLoading] = useState(false);

    // Mensagem de erro
    const [error, setError] = useState("");

    // Executa as animações quando a tela é carregada
    useEffect(() => {
        const animation = gsap.timeline({
            defaults: {
                ease: "power3.out",
            },
        });

        animation
            // Animação do logo
            .fromTo(
                logoRef.current,
                {
                    opacity: 0,
                    scale: 0.8,
                },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                }
            )

            // Animação do card
            .fromTo(
                cardRef.current,
                {
                    opacity: 0,
                    y: 40,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                },
                "-=0.4"
            )

            // Animação do título
            .fromTo(
                titleRef.current,
                {
                    opacity: 0,
                    y: 20,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                },
                "-=0.4"
            )

            // Animação do formulário
            .fromTo(
                formRef.current,
                {
                    opacity: 0,
                    y: 20,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                },
                "-=0.2"
            );

        return () => {
            animation.kill();
        };
    }, []);

    // Envia o formulário para a API
    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        // Limpa erro anterior
        setError("");

        // Ativa o carregamento
        setLoading(true);

        try {
            // Chama o endpoint de login
            const result = await login({
                email,
                password,
            });

            // Salva os dados da sessão
            localStorage.setItem("token", result.token);
            localStorage.setItem("userId", result.userId.toString());
            localStorage.setItem("name", result.name);
            localStorage.setItem("email", result.email);

            console.log("Login realizado com sucesso:", result);

            // Redireciona para o Dashboard após o login.
            window.location.href = "/dashboard";


        } catch (error) {
            console.error("Erro no login:", error);

            setError("E-mail ou senha inválidos.");
        } finally {
            // Finaliza o carregamento
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#061f17] px-4 py-8 text-white">
            <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
                <section className="grid w-full overflow-hidden rounded-3xl border border-emerald-900/50 bg-[#0b2b20] shadow-2xl md:grid-cols-2">

                    {/* ================================
                        PAINEL VISUAL
                    ================================= */}

                    <div className="relative hidden min-h-[620px] flex-col overflow-hidden bg-gradient-to-br from-emerald-900 via-[#0b3828] to-[#061f17] p-10 md:flex">

                        {/* Efeitos de fundo */}

                        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />

                        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-lime-300/10 blur-3xl" />

                        {/* Logo centralizado */}

                        <div className="relative flex flex-1 items-center justify-center">
                            <img
                                ref={logoRef}
                                src="/logo-agroia.png"
                                alt="Logo AgroIA"
                                className="w-80 max-w-full object-contain"
                            />
                        </div>

                        {/* Texto inferior */}

                        <div className="relative max-w-md">
                            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
                                Tecnologia que faz crescer
                            </p>

                            <h2 className="text-4xl font-bold leading-tight text-white">
                                Inteligência para transformar o campo.
                            </h2>

                            <p className="mt-5 text-base leading-7 text-emerald-100/70">
                                Organize informações, acompanhe resultados e
                                utilize tecnologia para tomar decisões mais
                                inteligentes.
                            </p>
                        </div>

                        {/* Rodapé */}

                        <p className="relative mt-8 text-sm text-emerald-200/50">
                            AgroIA · Plataforma inteligente
                        </p>
                    </div>

                    {/* ================================
                        FORMULÁRIO
                    ================================= */}

                    <div
                        ref={cardRef}
                        className="flex min-h-[620px] flex-col justify-center bg-[#f6f8f4] p-6 text-slate-900 sm:p-10"
                    >

                        {/* Logo para celular */}

                        <div className="mb-8 flex justify-center md:hidden">
                            <div className="flex h-36 w-36 items-center justify-center rounded-3xl bg-white p-4 shadow-lg ring-1 ring-slate-200">
                                <img
                                    src="/logo-agroia.png"
                                    alt="Logo AgroIA"
                                    className="h-full w-full object-contain"
                                />
                            </div>
                        </div>

                        <div className="mx-auto w-full max-w-md">

                            {/* Título */}

                            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-700">
                                Bem-vinda de volta
                            </p>

                            <h1
                                ref={titleRef}
                                className="text-3xl font-bold tracking-tight text-slate-900"
                            >
                                Acesse sua conta
                            </h1>

                            <p className="mt-3 text-sm leading-6 text-slate-500">
                                Entre para continuar utilizando o AgroIA.
                            </p>

                            {/* ================================
                                FORMULÁRIO
                            ================================= */}

                            <form
                                ref={formRef}
                                className="mt-8 space-y-5"
                                onSubmit={handleSubmit}
                            >

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
                                            autoComplete="current-password"
                                            className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                        />
                                    </div>
                                </div>

                                {/* Erro */}

                                {error && (
                                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                                        {error}
                                    </div>
                                )}

                                {/* Botão */}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-700 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading ? "Entrando..." : "Entrar"}

                                    {!loading && (
                                        <ArrowRight
                                            size={19}
                                            className="transition-transform group-hover:translate-x-1"
                                        />
                                    )}
                                </button>
                            </form>

                            {/* Criar conta */}

                            <p className="mt-8 text-center text-sm text-slate-500">
                                Ainda não possui uma conta?{" "}

                                <button
                                    type="button"
                                    className="font-semibold text-emerald-700 hover:text-emerald-900"
                                >
                                    Criar conta
                                </button>
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}