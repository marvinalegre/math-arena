import { createCookieSessionStorage, type SessionStorage } from "react-router";

type SessionData = { userId: string };
type SessionFlashData = { error: string };

let sessionStorage: SessionStorage<SessionData, SessionFlashData>;

export function getSessionStorage(secret: string) {
  if (!sessionStorage) {
    sessionStorage = createCookieSessionStorage<SessionData, SessionFlashData>({
      cookie: {
        name: "__session",
        secrets: [secret],
        httpOnly: true,
        secure: import.meta.env.PROD,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365,
      },
    });
  }
  return sessionStorage;
}
