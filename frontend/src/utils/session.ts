export function clearSession(): void {
    // Remove o token de autenticação
    localStorage.removeItem("token");

    // Remove os dados do usuário, caso existam
    localStorage.removeItem("user");
}