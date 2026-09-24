import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    BrainCircuit,
    CalendarDays,
    Leaf,
    LoaderCircle,
    Send,
} from "lucide-react";

import {
    getCropSeasons,
    type CropSeason,
} from "../services/cropSeasonService";

import {
    getAIAnalyses,
    createAIAnalysis,
    type AIAnalysis,
} from "../services/aiAnalysisService";

import { clearSession } from "../services/authStorage";

export default function CropSeasonDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [cropSeason, setCropSeason] = useState<CropSeason | null>(null);
    const [analyses, setAnalyses] = useState<AIAnalysis[]>([]);

    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    async function loadData() {
        try {
            setLoading(true);
            setErrorMessage("");

            const [cropSeasons, allAnalyses] = await Promise.all([
                getCropSeasons(),
                getAIAnalyses(),
            ]);

            const selectedSeason = cropSeasons.find(
                (season) => season.id === Number(id)
            );

            if (!selectedSeason) {
                setErrorMessage("Safra não encontrada.");
                return;
            }

            setCropSeason(selectedSeason);

            const seasonAnalyses = allAnalyses.filter(
                (analysis) => analysis.cropSeasonId === selectedSeason.id
            );

            setAnalyses(seasonAnalyses);
        } catch (error) {
            if (
                error instanceof Error &&
                error.message === "SESSION_EXPIRED"
            ) {
                clearSession();
                navigate("/login");
                return;
            }

            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "Não foi possível carregar os dados."
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, [id]);

    async function handleSubmitAnalysis(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        if (!cropSeason || !prompt.trim()) {
            return;
        }

        try {
            setSending(true);
            setErrorMessage("");
            setSuccessMessage("");

            const newAnalysis = await createAIAnalysis({
                cropSeasonId: cropSeason.id,
                prompt: prompt.trim(),
            });

            setAnalyses((currentAnalyses) => [
                newAnalysis,
                ...currentAnalyses,
            ]);

            setPrompt("");
            setSuccessMessage("Análise criada com sucesso!");
        } catch (error) {
            if (
                error instanceof Error &&
                error.message === "SESSION_EXPIRED"
            ) {
                clearSession();
                navigate("/login");
                return;
            }

            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "Não foi possível criar a análise."
            );
        } finally {
            setSending(false);
        }
    }

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <LoaderCircle className="animate-spin text-emerald-600" />
            </div>
        );
    }

    if (!cropSeason) {
        return (
            <div className="mx-auto max-w-4xl px-4 py-10">
                <p className="text-red-600">
                    {errorMessage || "Safra não encontrada."}
                </p>

                <button
                    type="button"
                    onClick={() => navigate("/crop-seasons")}
                    className="mt-4 rounded-xl bg-emerald-600 px-4 py-2 text-white"
                >
                    Voltar para safras
                </button>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
            {/* Cabeçalho */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                    type="button"
                    onClick={() => navigate("/crop-seasons")}
                    className="flex w-fit items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-emerald-700"
                >
                    <ArrowLeft size={18} />
                    Voltar para safras
                </button>
            </div>

            {/* Informações da safra */}
            <section className="rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 p-6 text-white shadow-xl sm:p-8">
                <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-white/10 p-3">
                        <Leaf size={28} />
                    </div>

                    <div>
                        <p className="text-sm font-medium text-emerald-200">
                            Detalhes da safra
                        </p>

                        <h1 className="mt-1 text-3xl font-bold">
                            {cropSeason.name}
                        </h1>

                        <div className="mt-4 flex flex-wrap gap-4 text-sm text-emerald-100">
                            <span className="flex items-center gap-2">
                                <CalendarDays size={16} />
                                Ano: {cropSeason.year}
                            </span>

                            <span>
                                Propriedade ID: {cropSeason.ruralPropertyId}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Formulário de análise */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-5 flex items-center gap-3">
                    <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700">
                        <BrainCircuit size={24} />
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-slate-900">
                            Nova análise de IA
                        </h2>

                        <p className="text-sm text-slate-500">
                            Faça uma pergunta sobre esta safra.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmitAnalysis} className="space-y-4">
                    <textarea
                        value={prompt}
                        onChange={(event) => setPrompt(event.target.value)}
                        placeholder="Ex.: Quais cuidados devo ter com possíveis pragas nesta safra?"
                        rows={4}
                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />

                    {errorMessage && (
                        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                            {errorMessage}
                        </p>
                    )}

                    {successMessage && (
                        <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                            {successMessage}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={sending || !prompt.trim()}
                        className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {sending ? (
                            <>
                                <LoaderCircle
                                    size={18}
                                    className="animate-spin"
                                />
                                Analisando...
                            </>
                        ) : (
                            <>
                                <Send size={18} />
                                Gerar análise
                            </>
                        )}
                    </button>
                </form>
            </section>

            {/* Histórico */}
            <section className="space-y-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                        Histórico de análises
                    </h2>

                    <p className="text-sm text-slate-500">
                        Consultas realizadas para esta safra.
                    </p>
                </div>

                {analyses.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-slate-300 p-8 text-center">
                        <BrainCircuit
                            size={36}
                            className="mx-auto text-slate-400"
                        />

                        <p className="mt-3 text-sm text-slate-500">
                            Ainda não existem análises para esta safra.
                        </p>
                    </div>
                ) : (
                    analyses.map((analysis) => (
                        <article
                            key={analysis.id}
                            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                        >
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                                    {analysis.provider}
                                </span>

                                <span className="text-xs text-slate-400">
                                    {new Date(
                                        analysis.createdAt
                                    ).toLocaleString("pt-BR")}
                                </span>
                            </div>

                            <div className="mt-5">
                                <h3 className="text-sm font-bold text-slate-900">
                                    Pergunta
                                </h3>

                                <p className="mt-2 text-sm text-slate-600">
                                    {analysis.prompt}
                                </p>
                            </div>

                            <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                                <h3 className="text-sm font-bold text-slate-900">
                                    Resultado
                                </h3>

                                <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600">
                                    {analysis.result}
                                </p>
                            </div>
                        </article>
                    ))
                )}
            </section>
        </div>
    );
}