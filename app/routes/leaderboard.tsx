import type { Route } from "./+types/leaderboard";

export async function loader() {
  const users = [
    {
      id: "1",
      username: "Alice",
      elo: 1842,
      accuracy: 0.78,
      totalQuestions: 64,
    },
    { id: "2", username: "Bob", elo: 1720, accuracy: 0.74, totalQuestions: 58 },
    {
      id: "3",
      username: "Charlie",
      elo: 1685,
      accuracy: 0.71,
      totalQuestions: 52,
    },
    {
      id: "4",
      username: "Diana",
      elo: 1590,
      accuracy: 0.69,
      totalQuestions: 49,
    },
    {
      id: "5",
      username: "Ethan",
      elo: 1512,
      accuracy: 0.66,
      totalQuestions: 45,
    },
    {
      id: "6",
      username: "Fiona",
      elo: 1498,
      accuracy: 0.64,
      totalQuestions: 43,
    },
    {
      id: "7",
      username: "George",
      elo: 1430,
      accuracy: 0.61,
      totalQuestions: 40,
    },
    {
      id: "8",
      username: "Hannah",
      elo: 1385,
      accuracy: 0.58,
      totalQuestions: 37,
    },
    {
      id: "9",
      username: "Ivan",
      elo: 1310,
      accuracy: 0.55,
      totalQuestions: 33,
    },
    {
      id: "10",
      username: "Julia",
      elo: 1255,
      accuracy: 0.52,
      totalQuestions: 30,
    },
  ];

  return { users };
}

export default function Leaderboard({ loaderData }: Route.ComponentProps) {
  const { users } = loaderData;

  const sortedUsers = [...users].sort((a, b) => b.elo - a.elo);

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="mx-auto w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-medium text-gray-900">Leaderboard</h1>
          <p className="text-sm text-gray-500">Ranked by ELO rating</p>
        </div>

        {/* List */}
        <div className="space-y-3">
          {sortedUsers.map((user, index) => (
            <div
              key={user.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm transition hover:shadow-md"
            >
              {/* Left: Rank + Name */}
              <div className="flex items-center gap-3">
                <div className="w-8 text-sm font-medium text-gray-500">
                  {index === 0
                    ? "🥇"
                    : index === 1
                      ? "🥈"
                      : index === 2
                        ? "🥉"
                        : `#${index + 1}`}
                </div>

                <div className="font-medium text-gray-900">{user.username}</div>
              </div>

              {/* Right: Stats */}
              <div className="flex items-center gap-6 text-sm">
                <div className="text-gray-500 font-mono">
                  <span className="text-gray-900">{user.elo}</span>
                </div>

                <div className="text-gray-400 font-mono hidden sm:block">
                  {user.totalQuestions} total questions
                </div>

                <div className="text-gray-400 font-mono hidden sm:block">
                  {Math.round(user.accuracy * 100)}% accuracy
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
