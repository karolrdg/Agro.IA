
import { useEffect, useState } from "react";
import {
    BrainCircuit,
    CalendarDays,
    Sprout,
    Sparkles,
    Activity,
} from "lucide-react";

import AppLayout from "../components/AppLayout";
import { clearSession } from "../utils/session";
import {
    getAIAnalyses,
    type AIAnalysis,
} from "../services/aiAnalysisService";

export default function AIAnalyses() {
    const [analyses, setAnalyses] = useState<AIAnalysis[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadAnalyses() {
        try {
            setLoading(true);
            setError("");

            const data = await getAIAnalyses();

            setAnalyses(data);
        } catch (err) {
            if (
                err instanceof Error &&
                err.message === "SESSION_EXPIRED"
            ) {
                clearSession();
                window.location.href = "/login";
                return;
            }

            setError(
                err instanceof Error
                    ? err.message
                    : "Não foi possível carregar as análises."
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadAnalyses();
    }, []);

    return (
        <AppLayout
            eyebrow="Inteligência agrícola"
            title="Análises de IA"
        >
            <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

                {/* Banner principal */}
                <section className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0b5b3d] via-[#0b4933] to-[#073b2a] p-6 text-white shadow-xl sm:p-10">

                    <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-emerald-200/10" />

                    <div className="pointer-events-none absolute -bottom-32 right-24 h-64 w-64 rounded-full bg-emerald-200/10" />

                    <div className="relative z-10 max-w-2xl">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200/25 bg-white/10 px-4 py-2 text-xs font-semibold text-emerald-50 backdrop-blur-sm">
                            <Sparkles size={16} />
                            Análise inteligente
                        </div>

                        <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                            Conheça o histórico das suas análises.
                        </h2>

                        <p className="mt-4 max-w-xl text-sm leading-6 text-emerald-100 sm:text-base">
                            Consulte as análises agrícolas registradas
                            no AgroIA e acompanhe as solicitações
                            realizadas para suas safras.
                        </p>

                        <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm text-emerald-50">
                            <Activity size={17} />
                            {analyses.length} análises registradas
                        </div>
                    </div>
                </section>

                {/* Título da lista */}
                <section>
                    <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                                Histórico
                            </p>

                            <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                                Análises realizadas
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                                Consulte os resultados gerados pelo serviço
                                de análise do AgroIA.
                            </p>
                        </div>

                        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">
                            <BrainCircuit size={14} />
                            {analyses.length} registros
                        </div>
                    </div>

                    {/* Mensagem de erro */}
                    {error && (
                        <div className="mb-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
                            <Activity
                                size={18}
                                className="mt-0.5 shrink-0"
                            />

                            {error}
                        </div>
                    )}

                    {/* Carregamento */}
                    {loading && (
                        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-sm">
                            Carregando análises...
                        </div>
                    )}

                    {/* Estado vazio */}
                    {!loading && !error && analyses.length === 0 && (
                        <div className="rounded-3xl border border-dashed border-emerald-200 bg-gradient-to-br from-emerald-50 to-white px-6 py-14 text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">
                                <BrainCircuit
                                    size={30}
                                    className="text-emerald-700"
                                />
                            </div>

                            <h4 className="mt-5 text-xl font-bold text-slate-800">
                                Nenhuma análise encontrada
                            </h4>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                                As análises realizadas aparecerão nesta
                                página.
                            </p>
                        </div>
                    )}

                    {/* Lista de análises */}
                    {!loading && analyses.length > 0 && (
                        <div className="grid gap-5 lg:grid-cols-2">
                            {analyses.map((analysis) => (
                                <article
                                    key={analysis.id}
                                    className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                                            <Sprout
                                                size={24}
                                                className="text-emerald-700"
                                            />
                                        </div>

                                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                                            {analysis.provider}
                                        </span>
                                    </div>

                                    <div className="mt-5">
                                        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-700">
                                            Safra analisada
                                        </p>

                                        <h4 className="mt-1 text-xl font-bold text-slate-900">
                                            {analysis.cropSeason.name}
                                        </h4>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Ano da safra:{" "}
                                            {analysis.cropSeason.year}
                                        </p>
                                    </div>

                                    <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Solicitação
                                        </p>

                                        <p className="mt-2 text-sm leading-6 text-slate-700">
                                            {analysis.prompt}
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Resultado da análise
                                        </p>

                                        <p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-600">
                                            {analysis.result}
                                        </p>
                                    </div>

                                    <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs font-medium text-slate-500">
                                        <CalendarDays size={15} />

                                        {new Date(
                                            analysis.createdAt
                                        ).toLocaleString("pt-BR")}
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </AppLayout>
    );
}
