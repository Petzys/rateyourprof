class Tokenheader {
    static authHeader() {
        const token = localStorage.getItem("token");
        if (token) {
            return { Authorization: `Bearer ${JSON.parse(token).accessToken}`};
        } else {
            return {};
        }
    }
}