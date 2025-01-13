export function createCookie(res, cookieName, value) {
    return res.cookie(cookieName, value, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None", // Required for cross-origin
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
}

export function clearCookie(res, cookieName) {
    return res.clearCookie(cookieName, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None", // Required for cross-origin
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
}
