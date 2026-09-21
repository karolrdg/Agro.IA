export function clearSession(): void {
    // Remove o token de autenticação
    localStorage.removeItem("token");

    localStorage.removeItem("userId");

    localStorage.removeItem("name");

    localStorage.removeItem("email");
}