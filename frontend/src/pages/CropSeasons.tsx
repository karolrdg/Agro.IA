
import { useEffect, useState } from "react";
import { CheckCircle, X } from "lucide-react";

import {
    getCropSeasons,
    deleteCropSeason,
} from "../services/cropSeasonService";

import type { CropSeason } from "../services/cropSeasonService";

export default function CropSeasons() {
    const [cropSeasons, setCropSeasons] = useState<CropSeason[]>([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [seasonToDelete, setSeasonToDelete] = useState<number | null>(null);

    async function loadCropSeasons() {
        try {
            setLoading(true);
            setErrorMessage("");

            const data = await getCropSeasons();
            setCropSeasons(data);
        } catch (error) {
            if (
                error instanceof Error &&
                error.message === "SESSION_EXPIRED"
            ) {
                localStorage.removeItem("token");
                window.location.href = "/login";
                return;
            }

            setErrorMessage("Não foi possível carregar as safras.");
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id: number) {
        try {
            setErrorMessage("");
            setSuccessMessage("");

            await deleteCropSeason(id);

            setSuccessMessage("Safra excluída com sucesso!");
            await loadCropSeasons();
        } catch (error) {
            if (
                error instanceof Error &&
                error.message === "SESSION_EXPIRED"
            ) {
                localStorage.removeItem("token");
                window.location.href = "/login";
                return;
            }

            setErrorMessage("Não foi possível excluir a safra.");
        }
    }

    function openDeleteModal(id: number) {
        setSeasonToDelete(id);
    }

    useEffect(() => {
        loadCropSeasons();
    }, []);

    return (
        <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-emerald-700">
                        Gestão agrícola
                    </p>

                    <h1 className="text-3xl font-bold tracking-tight text-slate-800">
                        Safras
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Gerencie as safras vinculadas às propriedades rurais.
                    </p>
                </div>

                <div className="flex items-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3">
                    <span className="text-2xl font-bold text-emerald-800">
                        {cropSeasons.length}
                    </span>

                    <span className="text-sm text-emerald-700">
                        {cropSeasons.length === 1
                            ? "Safra cadastrada"
                            : "Safras cadastradas"}
                    </span>
                </div>
            </div>

            {successMessage && (
                <div className="fixed right-6 top-6 z-50 flex w-[calc(100%-3rem)] max-w-sm items-start gap-3 rounded-2xl border border-emerald-100 bg-white p-4 shadow-xl">
                    <CheckCircle
                        size={22}
                        className="mt-0.5 shrink-0 text-emerald-600"
                    />

                    <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-800">
                            Operação concluída
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                            {successMessage}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setSuccessMessage("")}
                        aria-label="Fechar notificação"
                        className="cursor-pointer rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                        <X size={18} />
                    </button>
                </div>
            )}

            {errorMessage && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
                    {errorMessage}
                </div>
            )}

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-6">
                    <h2 className="text-lg font-bold text-slate-800">
                        Safras cadastradas
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Consulte as informações das safras.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <p className="text-sm text-slate-500">
                            Carregando safras...
                        </p>
                    </div>
                ) : cropSeasons.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">
                            🌱
                        </div>

                        <h3 className="font-semibold text-slate-800">
                            Nenhuma safra cadastrada
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                            Quando você cadastrar uma safra, ela aparecerá
                            nesta área.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {cropSeasons.map((cropSeason) => (
                            <div
                                key={cropSeason.id}
                                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md"
                            >
                                <div className="mb-5 flex items-start justify-between">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-xl">
                                        🌾
                                    </div>

                                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                                        {cropSeason.year}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-slate-800">
                                    {cropSeason.name}
                                </h3>

                                <div className="mt-4 space-y-2 text-sm text-slate-500">
                                    <div className="flex items-center justify-between gap-3">
                                        <span>Identificador</span>

                                        <span className="font-medium text-slate-700">
                                            #{cropSeason.id}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between gap-3">
                                        <span>Propriedade</span>

                                        <span className="font-medium text-slate-700">
                                            #{cropSeason.ruralPropertyId}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-5 border-t border-slate-200 pt-4">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            openDeleteModal(cropSeason.id)
                                        }
                                        className="w-full cursor-pointer rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                                    >
                                        Excluir safra
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {seasonToDelete !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4">
                    <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-xl">
                            ⚠️
                        </div>

                        <h2 className="text-xl font-bold text-slate-800">
                            Excluir safra?
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Essa ação não poderá ser desfeita. Deseja
                            realmente excluir esta safra?
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setSeasonToDelete(null)}
                                className="cursor-pointer rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                            >
                                Cancelar
                            </button>

                            <button
                                type="button"
                                onClick={async () => {
                                    if (seasonToDelete === null) return;

                                    const id = seasonToDelete;

                                    setSeasonToDelete(null);

                                    await handleDelete(id);
                                }}
                                className="cursor-pointer rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                            >
                                Sim, excluir
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
