import { type ReactNode, useState } from "react";
import { NavLink } from "react-router-dom";
import {
    BrainCircuit,
    Building2,
    LayoutDashboard,
    LogOut,
    Menu,
    Settings,
    Sprout,
    UserRound,
    X,
} from "lucide-react";

import { clearSession } from "../services/authStorage";

const navigationItems = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
    },
    {
        label: "Organizações",
        icon: Building2,
        path: "/organizations",
    },
    {
        label: "Propriedades rurais",
        icon: Sprout,
    },
    {
        label: "Análises de IA",
        icon: BrainCircuit,
    },
    {
        label: "Configurações",
        icon: Settings,
    },
];

interface AppLayoutProps {
    eyebrow?: string;
    title: string;
    children: ReactNode;
}

export default function AppLayout({
    eyebrow = "Painel principal",
    title,
    children,
}: AppLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const name = localStorage.getItem("name");

    const handleLogout = () => {
        clearSession();
        window.location.href = "/login";
    };

    return (
        <main className="min-h-screen bg-[#f4f7f4] text-slate-900 lg:flex">
            {isSidebarOpen && (
                <button
                    type="button"
                    aria-label="Fechar menu"
                    className="fixed inset-0 z-30 bg-slate-950/50 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-emerald-900/20 bg-[#073b2a] text-white shadow-2xl transition-transform duration-300 lg:static lg:min-h-screen lg:translate-x-0 lg:shadow-none ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/20">
                            <Sprout
                                size={23}
                                className="text-emerald-300"
                            />
                        </div>

                        <div>
                            <h1 className="text-lg font-bold tracking-tight">
                                AgroIA
                            </h1>

                            <p className="text-xs text-emerald-200">
                                Inteligência para o campo
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        aria-label="Fechar menu"
                        onClick={() => setIsSidebarOpen(false)}
                        className="rounded-xl p-2 text-emerald-100 transition hover:bg-white/10 lg:hidden"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 px-4 py-5">
                    <div className="space-y-1">
                        {navigationItems.map((item) => {
                            const Icon = item.icon;

                            if (!item.path) {
                                return (
                                    <button
                                        key={item.label}
                                        type="button"
                                        className="flex w-full cursor-default items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium text-emerald-100/60"
                                    >
                                        <Icon size={19} />

                                        <span>{item.label}</span>
                                    </button>
                                );
                            }

                            return (
                                <NavLink
                                    key={item.label}
                                    to={item.path}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={({ isActive }) =>
                                        `flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                                            isActive
                                                ? "bg-emerald-400/20 text-white shadow-sm"
                                                : "text-emerald-100 hover:bg-white/10 hover:text-white"
                                        }`
                                    }
                                >
                                    <Icon size={19} />

                                    <span>{item.label}</span>
                                </NavLink>
                            );
                        })}
                    </div>
                </nav>

                <div className="border-t border-white/10 p-4">
                    <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/20">
                            <UserRound size={18} />
                        </div>

                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold">
                                {name || "Usuária"}
                            </p>

                            <p className="text-xs text-emerald-200">
                                Conta autenticada
                            </p>
                        </div>
                    </div>
                </div>
            </aside>

            <div className="min-w-0 flex-1">
                <header className="border-b border-emerald-900/20 bg-[#073b2a] text-white lg:bg-white lg:text-slate-900">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                aria-label="Abrir menu"
                                onClick={() => setIsSidebarOpen(true)}
                                className="rounded-xl border border-white/20 p-2 transition hover:bg-white/10 lg:hidden"
                            >
                                <Menu size={20} />
                            </button>

                            <div className="lg:hidden">
                                <h1 className="text-lg font-bold tracking-tight">
                                    AgroIA
                                </h1>

                                <p className="text-xs text-emerald-200">
                                    Inteligência para o campo
                                </p>
                            </div>

                            <div className="hidden lg:block">
                                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
                                    {eyebrow}
                                </p>

                                <h1 className="mt-1 text-xl font-bold tracking-tight">
                                    {title}
                                </h1>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="hidden items-center gap-2 rounded-xl bg-white/10 px-3 py-2 sm:flex lg:bg-emerald-50 lg:text-emerald-900">
                                <UserRound size={17} />

                                <span className="max-w-32 truncate text-sm">
                                    {name || "Usuária"}
                                </span>
                            </div>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="flex items-center gap-2 rounded-xl border border-white/20 px-3 py-2 text-sm transition hover:bg-white/10 lg:border-emerald-900/10 lg:text-emerald-900 lg:hover:bg-emerald-50"
                            >
                                <LogOut size={17} />

                                <span className="hidden sm:inline">
                                    Sair
                                </span>
                            </button>
                        </div>
                    </div>
                </header>

                {children}
            </div>
        </main>
    );
}
