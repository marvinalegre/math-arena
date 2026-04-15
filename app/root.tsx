import {
  data,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";
import "./app.css";
import Navbar from "~/components/navbar";
import { getSessionStorage } from "./session.server";

type LoaderData = {
  username: string;
  rating: number;
};

export async function loader({ request, context }: Route.LoaderArgs) {
  const { DB, SESSION_SECRET } = context.cloudflare.env;
  const { getSession, commitSession } = getSessionStorage(SESSION_SECRET);

  const cookieHeader = request.headers.get("Cookie");
  const session = await getSession(cookieHeader);

  let sessionId = session.get("sessionId") as string | undefined;

  let username: string;
  let rating: number;

  // -----------------------------------
  // 1. No session → create guest user
  // -----------------------------------
  if (!sessionId) {
    const guest = await createGuestUser(DB);
    sessionId = await createSession(DB, guest.userId);

    session.set("sessionId", sessionId);

    username = guest.username;
    rating = guest.rating;

    return data<LoaderData>(
      { username, rating },
      {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      },
    );
  }

  // -----------------------------------
  // 2. Existing session → validate
  // -----------------------------------
  const result = await DB.prepare(
    `
    SELECT users.username, users.rating
    FROM sessions
    JOIN users ON sessions.user_id = users.id
    WHERE sessions.id = ?
    `,
  )
    .bind(sessionId)
    .first<{ username: string; rating: number }>();

  // -----------------------------------
  // 3. Invalid session → cleanup + retry
  // -----------------------------------
  if (!result) {
    await DB.prepare(`DELETE FROM sessions WHERE id = ?`).bind(sessionId).run();

    session.unset("sessionId");

    return redirect(request.url, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  username = result.username;
  rating = result.rating;

  return data<LoaderData>(
    { username, rating },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    },
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Navbar />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>

      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

export const links: Route.LinksFunction = () => [
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com",
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

async function createGuestUser(DB: D1Database) {
  const username = `Guest${String(Math.floor(Math.random() * 10_000_000_000)).padStart(10, "0")}`;
  const rating = 200;

  const userResult = await DB.prepare(
    `INSERT INTO users (username, rating) VALUES (?, ?)`,
  )
    .bind(username, rating)
    .run();

  return {
    userId: userResult.meta.last_row_id,
    username,
    rating,
  };
}

async function createSession(DB: D1Database, userId: number) {
  const sessionId = crypto.randomUUID();

  await DB.prepare(`INSERT INTO sessions (id, user_id) VALUES (?, ?)`)
    .bind(sessionId, userId)
    .run();

  return sessionId;
}
