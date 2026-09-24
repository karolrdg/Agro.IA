import { useEffect, useMemo, useState } from "react";

import {
    Activity,
    Building2,
    MapPin,
    RefreshCw,
    Ruler,
    Sprout,
} from "lucide-react";
import AppLayout from "../components/AppLayout";
import {
    getRuralProperties,
    createRuralProperty,
    deleteRuralProperty,
    type RuralProperty,
} from "../services/ruralPropertyService";
import { searchOrganizations } from "../services/organizationService";

export default function RuralProperties() {

    // Guarda as propriedades recebidas da API*

    const [properties, setProperties] = useState<RuralProperty[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [areaInHectares, setAreaInHectares] = useState("");
    const [organizationId, setOrganizationId] = useState("");
    const [saving, setSaving] = useState(false);
    const [formError, setFormError] = useState("");
    const [success, setSuccess] = useState("");
    const [organizations, setOrganizations] = useState<
        { id: number; name: string }[]
    >([]);
    const [organizationsLoading, setOrganizationsLoading] = useState(false);
    const [propertyToDelete, setPropertyToDelete] = useState<number | null>(
        null
    );

    const [deleting, setDeleting] = useState(false);

    // Calcula a área total das propriedades*
    const totalArea = useMemo(() => {

        return properties.reduce(

            (total, property) => total + property.areaInHectares,

            0

        );

    }, [properties]);

    // Busca as propriedades no backend*

    async function loadProperties() {

        try {

            setLoading(true);

            setError("");

            const data = await getRuralProperties();

            setProperties(data);

        } catch (err) {

            if (

                err instanceof Error &&

                err.message === "SESSION_EXPIRED"

            ) {

                localStorage.removeItem("token");

                window.location.href = "/login";
                return;
            }

            setError(
                "Não foi possível carregar as propriedades rurais."
            );

        } finally {
            setLoading(false);
        }
    }

    // Cadastra uma nova propriedade rural*

    const handleCreate = async () => {
        setFormError("");
        setSuccess("");

        if (
            !name.trim() ||
            !location.trim() ||
            !areaInHectares ||
            !organizationId
        ) {
            setFormError("Preencha todos os campos do formulário.");
            return;
        }

        const area = Number(areaInHectares);

        const organization = Number(organizationId);

        if (area <= 0 || organization <= 0) {
            setFormError(
                "A área e a organização devem possuir valores válidos."
            );
            return;
        }

        try {
            setSaving(true);

            await createRuralProperty({
                name: name.trim(),
                location: location.trim(),
                areaInHectares: area,
                organizationId: organization,

            });

            setSuccess("Propriedade cadastrada com sucesso!");
            setName("");
            setLocation("");
            setAreaInHectares("");
            setOrganizationId("");
            await loadProperties();

        } catch (err) {

            if (

                err instanceof Error &&

                err.message === "SESSION_EXPIRED"

            ) {

                localStorage.removeItem("token");

                window.location.href = "/login";
                return;
            }

            setFormError(
                err instanceof Error
                    ? err.message
                    : "Não foi possível cadastrar a propriedade."
            );

        } finally {
            setSaving(false);
        }
    };

    const loadOrganizations = async () => {
        try {
            setOrganizationsLoading(true);

            const response = await searchOrganizations({
                page: 1,
                pageSize: 100,
            });

            setOrganizations(response.items);
        } catch (error) {
            console.error("Erro ao carregar organizações:", error);
        } finally {
            setOrganizationsLoading(false);
        }
    };

    async function handleDeleteProperty() {
        if (propertyToDelete === null) {
            return;
        }

        try {
            setDeleting(true);
            setError("");
            setSuccess("");

            await deleteRuralProperty(propertyToDelete);

            setPropertyToDelete(null);
            setSuccess("Propriedade excluída com sucesso!");

            await loadProperties();
        } catch (err) {
            if (
                err instanceof Error &&
                err.message === "SESSION_EXPIRED"
            ) {
                localStorage.removeItem("token");
                window.location.href = "/login";
                return;
            }

            setError(
                err instanceof Error
                    ? err.message
                    : "Não foi possível excluir a propriedade."
            );
        } finally {
            setDeleting(false);
        }
    }

    // Executa a busca ao abrir a página*
    useEffect(() => {
        loadProperties();
        loadOrganizations();

    }, []);

    return (

        <AppLayout
            eyebrow="Gestão rural"
            title="Propriedades rurais"
        >

            <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                {/** Banner principal **/}
                <section
                    className="relative isolate overflow-hidden rounded-[2rem] bg-cover bg-center p-6 text-white shadow-xl sm:p-10"
                    style={{
                        backgroundImage:
                            "linear-gradient(90deg, rgba(4, 67, 45, 0.97) 0%, rgba(4, 67, 45, 0.82) 45%, rgba(4, 67, 45, 0.35) 100%), url('/bg-dashboard.png')",
                    }}
                >

                    {/** Elementos decorativos **/}

                    <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-emerald-200/10" />
                    <div className="pointer-events-none absolute -bottom-32 right-24 h-64 w-64 rounded-full bg-emerald-200/10" />
                    <div className="relative z-10 max-w-2xl">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200/25 bg-white/10 px-4 py-2 text-xs font-semibold text-emerald-50 backdrop-blur-sm">
                            <Sprout size={16} />
                            Gestão de propriedades
                        </div>

                        <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                            Suas propriedades rurais
                        </h2>

                        <p className="mt-4 max-w-xl text-sm leading-6 text-emerald-50 sm:text-base">
                            Centralize as informações das suas propriedades,
                            acompanhe suas áreas e organize os dados da operação
                            agrícola em um só lugar.
                        </p>

                        <div className="mt-7 flex flex-wrap items-center gap-3">

                            <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm text-emerald-50 backdrop-blur-sm">

                                <Activity size={17} />
                                Dados conectados à API
                            </div>

                            <button
                                type="button"
                                onClick={loadProperties}
                                disabled={loading}
                                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-[#073b2a] transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
                            >

                                <RefreshCw
                                    size={16}
                                    className={loading ? "animate-spin" : ""}
                                />
                                Atualizar
                            </button>

                        </div>

                    </div>

                </section>

                {/** Cards de resumo **/}

                <section className="grid gap-5 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                        <div className="flex items-start justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                                <Sprout
                                    size={24}
                                    className="text-emerald-700"
                                />
                            </div>

                            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                                Cadastro
                            </span>

                        </div>

                        <p className="mt-6 text-sm font-medium text-slate-500">
                            Total de propriedades
                        </p>

                        <p className="mt-1 text-4xl font-bold tracking-tight text-slate-900">
                            {properties.length}
                        </p>

                        <p className="mt-2 text-sm text-slate-500">
                            Propriedades cadastradas na plataforma.
                        </p>

                    </div>

                    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                        <div className="flex items-start justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
                                <Ruler
                                    size={24}
                                    className="text-blue-700"
                                />

                            </div>

                            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                                Área total
                            </span>

                        </div>

                        <p className="mt-6 text-sm font-medium text-slate-500">
                            Área cadastrada
                        </p>

                        <p className="mt-1 text-4xl font-bold tracking-tight text-slate-900">
                            {totalArea.toLocaleString("pt-BR", {
                                maximumFractionDigits: 2,
                            })}

                        </p>

                        <p className="mt-2 text-sm text-slate-500">
                            Hectares registrados nas propriedades.
                        </p>

                    </div>

                </section>

                {/* Formulário de cadastro */}

                <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
                    <div className="mb-6 ">

                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                            Novo cadastro
                        </p>

                        <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                            Cadastrar propriedade rural
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                            Adicione uma propriedade e vincule-a a uma organização.
                        </p>

                    </div>

                    <form

                        onSubmit={(event) => {
                            event.preventDefault();
                            handleCreate();
                        }}
                        className="grid gap-5 md:grid-cols-2"

                    >



                        <div>
                            <label
                                htmlFor="property-name"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Nome da propriedade
                            </label>
                            <input
                                id="property-name"
                                type="text"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                placeholder="Ex.: Fazenda Exemplo"
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                            />

                        </div>

                        <div>
                            <label
                                htmlFor="property-location"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Localização
                            </label>

                            <input
                                id="property-location"
                                type="text"
                                value={location}
                                onChange={(event) => setLocation(event.target.value)}
                                placeholder="Ex.: Rio Grande do Sul"
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                            />

                        </div>



                        <div>
                            <label
                                htmlFor="property-area"
                                className="mb-2 block text-sm font-semibold text-slate-700"

                            >
                                Área em hectares
                            </label>

                            <input
                                id="property-area"
                                type="number"
                                min="0.01"
                                step="0.01"
                                value={areaInHectares}
                                onChange={(event) =>
                                    setAreaInHectares(event.target.value)
                                }

                                placeholder="Ex.: 150"

                                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"

                            />

                        </div>

                        {/* Organização */}

                        <div>
                            <label
                                htmlFor="property-organization"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Organização
                            </label>

                            <select
                                id="property-organization"
                                value={organizationId}
                                onChange={(event) => setOrganizationId(event.target.value)}
                                disabled={organizationsLoading}
                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:bg-slate-100"
                            >
                                <option value="">
                                    {organizationsLoading
                                        ? "Carregando organizações..."
                                        : "Selecione uma organização"}
                                </option>

                                {organizations.map((organization) => (
                                    <option key={organization.id} value={organization.id}>
                                        {organization.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Mensagem de erro */}

                        {formError && (

                            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 md:col-span-2">
                                {formError}
                            </div>

                        )}


                        {/* Botão */}

                        <div className="md:col-span-2">

                            <button
                                type="submit"
                                disabled={saving}
                                className="rounded-xl cursor-pointer bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {saving ? "Cadastrando..." : "Cadastrar propriedade"}

                            </button>

                        </div>

                    </form>

                </section>

                {/* Cabeçalho da lista */}

                <section>

                    <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

                        <div>

                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                                Base cadastral
                            </p>

                            <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                                Propriedades cadastradas
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                                Consulte os dados das propriedades vinculadas à plataforma.
                            </p>

                        </div>

                        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">
                            <Building2 size={14} />
                            {properties.length} registros

                        </div>

                    </div>

                    {/* Mensagem de erro */}

                    {error && (

                        <div className="mb-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">

                            <Activity size={18} className="mt-0.5 shrink-0" />

                            <div>
                                <p className="font-semibold">
                                    Não foi possível carregar os dados
                                </p>

                                <p className="mt-1">{error}</p>
                                <button
                                    type="button"
                                    onClick={loadProperties}
                                    className="mt-3 font-semibold underline underline-offset-4"
                                >
                                    Tentar novamente
                                </button>
                            </div>

                        </div>

                    )}

                    {/* Estado de carregamento */}

                    {loading && (

                        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                            {[1, 2, 3].map((item) => (

                                <div

                                    key={item}

                                    className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"

                                >

                                    <div className="h-5 w-2/3 rounded bg-slate-200" />
                                    <div className="mt-3 h-4 w-1/3 rounded bg-slate-100" />
                                    <div className="mt-8 space-y-4">
                                        <div className="h-4 rounded bg-slate-100" />
                                        <div className="h-4 rounded bg-slate-100" />
                                        <div className="h-4 rounded bg-slate-100" />
                                    </div>
                                </div>

                            ))}

                        </div>

                    )}
                    {success && (
                        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                            {success}
                        </div>
                    )}

                    {/* Lista de propriedades */}

                    {!loading && !error && properties.length > 0 && (

                        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                            {properties.map((property) => (
                                <article
                                    key={property.id}
                                    className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
                                >
                                    {/* Cabeçalho do card */}
                                    <div className="border-b border-slate-100 bg-gradient-to-br from-emerald-50 to-white p-5">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100">
                                                <Sprout
                                                    size={22}
                                                    className="text-emerald-700"
                                                />

                                            </div>

                                            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500 shadow-sm">
                                                #{property.id}
                                            </span>

                                        </div>

                                        <h4 className="mt-5 truncate text-xl font-bold text-slate-800">

                                            {property.name}

                                        </h4>

                                        <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">

                                            <MapPin size={15} className="shrink-0" />
                                            <span className="truncate">
                                                {property.location}
                                            </span>

                                        </div>

                                    </div>

                                    {/* Informações do card */}

                                    <div className="space-y-4 p-5">
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                                <Ruler size={17} />
                                                Área
                                            </div>

                                            <span className="text-sm font-semibold text-slate-800">
                                                {property.areaInHectares.toLocaleString("pt-BR", {
                                                    maximumFractionDigits: 2,

                                                })}{" "}

                                                ha

                                            </span>

                                        </div>

                                        <div className="flex items-center justify-between gap-3">

                                            <div className="flex items-center gap-2 text-sm text-slate-500">

                                                <Building2 size={17} />

                                                Organização

                                            </div>

                                            <span className="text-sm font-semibold text-slate-800">

                                                #{property.organizationId}

                                            </span>

                                        </div>

                                        <div className="border-t border-slate-100 pt-4">
                                            <span className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700">
                                                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                                Cadastro ativo
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setPropertyToDelete(property.id)}
                                            disabled={deleting}
                                            className="mt-4 cursor-pointer w-full rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            Excluir propriedade
                                        </button>
                                    </div>

                                </article>

                            ))}

                        </div>

                    )}

                    {/* Estado vazio */}

                    {!loading && !error && properties.length === 0 && (

                        <div className="rounded-3xl border border-dashed border-emerald-200 bg-gradient-to-br from-emerald-50 to-white px-6 py-14 text-center">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">
                                <Sprout
                                    size={30}
                                    className="text-emerald-700"
                                />
                            </div>

                            <h4 className="mt-5 text-xl font-bold text-slate-800">
                                Nenhuma propriedade cadastrada
                            </h4>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                                Quando você cadastrar uma propriedade rural,
                                ela aparecerá nesta área.
                            </p>

                        </div>

                    )}
                </section>

            </div>
            {propertyToDelete !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <h3 className="text-xl font-bold text-slate-800">
                            Excluir propriedade?
                        </h3>

                        <p className="mt-3 text-sm text-slate-500">
                            Tem certeza de que deseja excluir esta propriedade rural?
                            Essa ação não poderá ser desfeita.
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setPropertyToDelete(null)}
                                disabled={deleting}
                                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                            >
                                Cancelar
                            </button>

                            <button
                                type="button"
                                onClick={handleDeleteProperty}
                                disabled={deleting}
                                className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
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
