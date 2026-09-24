import { useEffect, useMemo, useState } from "react";
import {
    Building2,
    ChevronLeft,
    ChevronRight,
    Filter,
    Plus,
    Search,
    Sprout,
} from "lucide-react";

import AppLayout from "../components/AppLayout";
import { clearSession } from "../services/authStorage";
import {
    createOrganization,
    deleteOrganization,
    type Organization,
    searchOrganizations,
} from "../services/organizationService";

export default function Organizations() {
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [nameFilter, setNameFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [organizationToDelete, setOrganizationToDelete] = useState<number | null>(null);
    const [deleting, setDeleting] = useState(false);
    const hasPreviousPage = page > 1;
    const hasNextPage = page < totalPages;

    const visibleRange = useMemo(() => {
        if (totalItems === 0) {
            return "0 registros";
        }

        const start = (page - 1) * 10 + 1;
        const end = Math.min(page * 10, totalItems);

        return `${start}-${end} de ${totalItems}`;
    }, [page, totalItems]);

    async function loadOrganizations(currentPage = page) {
        setLoading(true);
        setError("");

        try {
            const data = await searchOrganizations({
                name: nameFilter.trim(),
                type: typeFilter.trim(),
                page: currentPage,
                pageSize: 10,
            });

            setOrganizations(data.items);
            setPage(data.page);
            setTotalPages(data.totalPages || 1);
            setTotalItems(data.totalItems);
        } catch (error: unknown) {
            if (
                error instanceof Error &&
                error.message === "SESSION_EXPIRED"
            ) {
                clearSession();
                window.location.href = "/login";

                return;
            }

            console.error("Erro ao carregar organizações:", error);
            setError("Não foi possível carregar as organizações.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        void Promise.resolve().then(() => loadOrganizations(1));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        loadOrganizations(1);
    };

    const handleCreate = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        setSaving(true);
        setError("");
        setSuccess("");

        try {
            await createOrganization({
                name: name.trim(),
                type: type.trim(),
            });

            setName("");
            setType("");
            setSuccess("Organização cadastrada com sucesso.");
            await loadOrganizations(1);
        } catch (error: unknown) {
            if (
                error instanceof Error &&
                error.message === "SESSION_EXPIRED"
            ) {
                clearSession();
                window.location.href = "/login";

                return;
            }

            console.error("Erro ao cadastrar organização:", error);
            setError(
                error instanceof Error
                    ? error.message
                    : "Não foi possível cadastrar a organização."
            );
        } finally {
            setSaving(false);
        }
    };
    async function handleDeleteOrganization() {
        if (organizationToDelete === null) {
            return;
        }

        try {
            setDeleting(true);
            setError("");
            setSuccess("");

            await deleteOrganization(organizationToDelete);

            setOrganizationToDelete(null);
            setSuccess("Organização excluída com sucesso!");

            await loadOrganizations(page);
        } catch (error: unknown) {
            if (
                error instanceof Error &&
                error.message === "SESSION_EXPIRED"
            ) {
                clearSession();
                window.location.href = "/login";
                return;
            }

            setError(
                error instanceof Error
                    ? error.message
                    : "Não foi possível excluir a organização."
            );
        } finally {
            setDeleting(false);
        }
    }
    return (
        <AppLayout
            eyebrow="Gestão de dados"
            title="Organizações"
        >
            <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
                <div className="mb-8 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
                    <div
                        className="relative overflow-hidden rounded-3xl bg-[#073b2a] bg-cover bg-center p-6 text-white shadow-xl sm:p-8"
                        style={{
                            backgroundImage: "url('/imagem-agro.organizacao.png')"
                        }}
                    >

                    </div>

                    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100">
                                <Sprout
                                    size={22}
                                    className="text-emerald-700"
                                />
                            </div>

                            <div>
                                <p className="text-sm text-slate-500">
                                    Total cadastrado
                                </p>

                                <p className="text-3xl font-bold tracking-tight text-slate-900">
                                    {totalItems}
                                </p>
                            </div>
                        </div>

                        <p className="mt-5 text-sm leading-6 text-slate-500">
                            Os dados aparecem em tempo real conforme a API
                            responde às buscas.
                        </p>
                    </div>
                </div>

                <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
                    <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
                        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
                                    Consulta
                                </p>

                                <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                                    Lista de organizações
                                </h3>
                            </div>

                            <span className="text-xs font-medium text-slate-400">
                                {visibleRange}
                            </span>
                        </div>

                        <form
                            onSubmit={handleSearch}
                            className="mb-5 grid gap-3 md:grid-cols-[1fr_220px_auto]"
                        >
                            <div className="relative">
                                <Search
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    value={nameFilter}
                                    onChange={(event) =>
                                        setNameFilter(event.target.value)
                                    }
                                    placeholder="Buscar por nome"
                                    className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                />
                            </div>

                            <div className="relative">
                                <Filter
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    value={typeFilter}
                                    onChange={(event) =>
                                        setTypeFilter(event.target.value)
                                    }
                                    placeholder="Filtrar por tipo"
                                    className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                />
                            </div>

                            <button
                                type="submit"
                                className="rounded-2xl cursor-pointer bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
                            >
                                Buscar
                            </button>
                        </form>

                        {error && (
                            <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
                                {success}
                            </div>
                        )}

                        <div className="overflow-hidden rounded-2xl border border-slate-200">
                            <div className="hidden grid-cols-[1fr_180px_150px] bg-slate-50 px-5 py-3 text-xs font-semibold uppercase tracking-widest text-slate-500 md:grid">
                                <span>Nome</span>
                                <span>Tipo</span>
                                <span>Criada em</span>
                            </div>

                            {loading ? (
                                <div className="p-5 text-sm text-slate-500">
                                    Carregando organizações...
                                </div>
                            ) : organizations.length === 0 ? (
                                <div className="p-8 text-center">
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                                        <Building2
                                            size={24}
                                            className="text-emerald-700"
                                        />
                                    </div>

                                    <p className="mt-4 font-semibold text-slate-800">
                                        Nenhuma organização encontrada.
                                    </p>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Ajuste os filtros ou cadastre uma nova
                                        organização.
                                    </p>
                                </div>
                            ) : (
                                <div className="divide-y divide-slate-100">
                                    {organizations.map((organization) => (
                                        <div
                                            key={organization.id}
                                            className="grid gap-2 px-5 py-4 text-sm md:grid-cols-[1fr_180px_150px] md:items-center"
                                        >
                                            <div>
                                                <p className="font-semibold text-slate-900">
                                                    {organization.name}
                                                </p>

                                                <p className="mt-1 text-xs text-slate-400 md:hidden">
                                                    {organization.type}
                                                </p>
                                            </div>

                                            <span className="hidden text-slate-600 md:block">
                                                {organization.type}
                                            </span>

                                            <div className="flex flex-col gap-2">
                                                <span className="text-xs text-slate-400">
                                                    {new Date(
                                                        organization.createdAt
                                                    ).toLocaleDateString("pt-BR")}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() => setOrganizationToDelete(organization.id)}
                                                    disabled={deleting}
                                                    className="w-fit cursor-pointer  rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                                                >
                                                    Excluir
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="mt-5 flex items-center justify-between">
                            <button
                                type="button"
                                disabled={!hasPreviousPage || loading}
                                onClick={() => loadOrganizations(page - 1)}
                                className="flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <ChevronLeft size={17} />

                                Anterior
                            </button>

                            <span className="text-sm text-slate-500">
                                Página {page} de {totalPages}
                            </span>

                            <button
                                type="button"
                                disabled={!hasNextPage || loading}
                                onClick={() => loadOrganizations(page + 1)}
                                className="flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Próxima

                                <ChevronRight size={17} />
                            </button>
                        </div>
                    </div>

                    <aside className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100">
                                <Plus
                                    size={22}
                                    className="text-emerald-700"
                                />
                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
                                    Novo registro
                                </p>

                                <h3 className="font-bold text-slate-900">
                                    Cadastrar organização
                                </h3>
                            </div>
                        </div>

                        <form
                            onSubmit={handleCreate}
                            className="space-y-4"
                        >
                            <div>
                                <label
                                    htmlFor="organization-name"
                                    className="mb-2 block text-sm font-medium text-slate-700"
                                >
                                    Nome
                                </label>

                                <input
                                    id="organization-name"
                                    value={name}
                                    onChange={(event) =>
                                        setName(event.target.value)
                                    }
                                    minLength={3}
                                    maxLength={100}
                                    required
                                    placeholder="Ex.: Cooperativa Verde"
                                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="organization-type"
                                    className="mb-2 block text-sm font-medium text-slate-700"
                                >
                                    Tipo
                                </label>

                                <input
                                    id="organization-type"
                                    value={type}
                                    onChange={(event) =>
                                        setType(event.target.value)
                                    }
                                    maxLength={50}
                                    required
                                    placeholder="Ex.: Cooperativa"
                                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={saving}
                                className="flex cursor-pointer w-full items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <Plus size={18} />

                                {saving ? "Salvando..." : "Cadastrar"}
                            </button>
                        </form>
                    </aside>
                </div>
            </section>
            {organizationToDelete !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <h3 className="text-xl font-bold text-slate-800">
                            Excluir organização?
                        </h3>

                        <p className="mt-3 text-sm text-slate-500">
                            Tem certeza de que deseja excluir esta organização?
                            Essa ação não poderá ser desfeita.
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setOrganizationToDelete(null)}
                                disabled={deleting}
                                className="rounded-xl cursor-pointer border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                            >
                                Cancelar
                            </button>

                            <button
                                type="button"
                                onClick={handleDeleteOrganization}
                                disabled={deleting}
                                className="rounded-xl cursor-pointer bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {deleting ? "Excluindo..." : "Confirmar exclusão"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
