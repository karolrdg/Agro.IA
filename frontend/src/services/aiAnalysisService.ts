const API_URL = "http://localhost:5194/api";

export interface CropSeason {
    id: number;
    name: string;
    year: number;
    ruralPropertyId: number;
    createdAt: string;
}

export interface AIAnalysis {
    id: number;
    cropSeasonId: number;
    prompt: string;
    result: string;
    provider: string;
    createdAt: string;
    cropSeason: CropSeason;
}

function getAuthHeaders() {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Token não encontrado.");
    }

    return {
        Authorization: `Bearer ${token}`,
    };
}

async function handleResponse<T>(
    response: Response
): Promise<T> {
    if (response.status === 401) {
        throw new Error("SESSION_EXPIRED");
    }

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    if (!response.ok) {
        throw new Error(
            data?.message ||
            "Não foi possível carregar as análises."
        );
    }

    return data as T;
}

export async function getAIAnalyses(): Promise<AIAnalysis[]> {
    const response = await fetch(
        `${API_URL}/AIAnalyses`,
        {
            method: "GET",
            headers: getAuthHeaders(),
        }
    );

    return handleResponse<AIAnalysis[]>(response);
}

export interface CreateAIAnalysisRequest {
    cropSeasonId: number;
    prompt: string;
}

export async function createAIAnalysis(
    data: CreateAIAnalysisRequest
): Promise<AIAnalysis> {
    const response = await fetch(`${API_URL}/AIAnalyses`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
        },
        body: JSON.stringify(data),
    });

    return handleResponse<AIAnalysis>(response);
}