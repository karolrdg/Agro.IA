const API_URL = "http://localhost:5194/api";

export interface Organization {
    id: number;
    name: string;
    type: string;
    createdAt: string;
}

export interface CreateOrganizationRequest {
    name: string;
    type: string;
}

export interface PaginatedOrganizationsResponse {
    items: Organization[];
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
}

function getAuthHeaders() {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Token não encontrado.");
    }

    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

async function handleResponse<T>(response: Response): Promise<T> {
    if (response.status === 401) {
        throw new Error("SESSION_EXPIRED");
    }

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    if (!response.ok) {
        throw new Error(
            data?.message || "Não foi possível concluir a operação."
        );
    }

    return data as T;
}

export async function searchOrganizations({
    name,
    type,
    page = 1,
    pageSize = 10,
}: {
    name?: string;
    type?: string;
    page?: number;
    pageSize?: number;
}): Promise<PaginatedOrganizationsResponse> {
    const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
    });

    if (name) {
        params.set("name", name);
    }

    if (type) {
        params.set("type", type);
    }

    const response = await fetch(
        `${API_URL}/Organizations/search?${params.toString()}`,
        {
            method: "GET",
            headers: getAuthHeaders(),
        }
    );

    return handleResponse<PaginatedOrganizationsResponse>(response);
}

export async function createOrganization(
    data: CreateOrganizationRequest
): Promise<Organization> {
    const response = await fetch(`${API_URL}/Organizations`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
    });

    return handleResponse<Organization>(response);
}
