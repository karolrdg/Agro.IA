import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function Login() {
    const logoRef = useRef<HTMLImageElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const animation = gsap.timeline({
            defaults: {
                ease: "power3.out",
            },
        });

        animation
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

    return (
        <main className="min-h-screen bg-[#061f17] px-4 py-8 text-white">
            <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
                <section className="grid w-full overflow-hidden rounded-3xl border border-emerald-900/50 bg-[#0b2b20] shadow-2xl md:grid-cols-2">

                    {/* Painel visual */}
                    <div className="relative hidden min-h-[620px] flex-col justify-between overflow-hidden bg-gradient-to-br from-emerald-900 via-[#0b3828] to-[#061f17] p-10 md:flex">
                        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />
                        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-lime-300/10 blur-3xl" />

                        <div className="relative">
                            <img
                                src="/logo-agroia.png"
                                alt="Logo AgroIA"
                                className="h-20 w-auto"
                            />
                        </div>

                        <div className="relative max-w-md">
                            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
                                Tecnologia que faz crescer
                            </p>

                            <h2 className="text-4xl font-bold leading-tight text-white">
                                Inteligência para transformar o campo.
                            </h2>

                            <p className="mt-5 text-base leading-7 text-emerald-100/70">
                                Organize informações, acompanhe resultados e utilize
                                tecnologia para tomar decisões mais inteligentes.
                            </p>
                        </div>

                        <p className="relative text-sm text-emerald-200/50">
                            AgroIA · Plataforma inteligente
                        </p>
                    </div>

                    {/* Formulário */}
                    <div
                        ref={cardRef}
                        className="flex min-h-[620px] flex-col justify-center bg-[#f6f8f4] p-6 text-slate-900 sm:p-10"
                    >
                        <div className="mb-8 md:hidden">
                            <img
                                src="/logo-agroia.png"
                                alt="Logo AgroIA"
                                className="mx-auto h-24 w-24 object-contain"
                            />
                        </div>

                        <div className="mx-auto w-full max-w-md">
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

                            <form ref={formRef} className="mt-8 space-y-5">
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
                                            required
                                            className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                        />
                                    </div>
                                </div>

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
                                            required
                                            className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-700 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
                                >
                                    Entrar

                                    <ArrowRight
                                        size={19}
                                        className="transition-transform group-hover:translate-x-1"
                                    />
                                </button>
                            </form>

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