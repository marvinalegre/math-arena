export default function QuestionTypesPanel() {
  const types = [
    {
      id: 1,
      title: "Addition: Basic Recall",
      operation: "addition",
      config: {
        digits: 1,
        terms: 2,
        allowCarry: false,
        maxSum: 10,
      },
      description: "Single-digit addition with instant recall.",
      generationMode: "fixed",
      difficulty: "easy",
      eloRange: [800, 950],
      eloWeight: 1.0,
      timeLimit: 10,
      tags: {
        skill: ["recall", "fluency"],
        topic: ["arithmetic"],
        constraint: ["no-carry"],
      },
      stats: {
        attempts: 64,
        accuracy: 0.78,
      },
    },

    {
      id: 2,
      title: "Addition: First Carry",
      operation: "addition",
      config: {
        digits: 2,
        terms: 2,
        allowCarry: true,
        carryFrequency: "low",
      },
      description: "Two-digit addition with light carry introduction.",
      generationMode: "random-within-constraint",
      difficulty: "easy-medium",
      eloRange: [900, 1050],
      eloWeight: 1.05,
      timeLimit: 15,
      tags: {
        skill: ["mental-math"],
        topic: ["arithmetic"],
        constraint: ["carry-intro"],
      },
      stats: {
        attempts: 52,
        accuracy: 0.71,
      },
    },

    {
      id: 3,
      title: "Addition: Full Carry",
      operation: "addition",
      config: {
        digits: 2,
        terms: 2,
        allowCarry: true,
        carryFrequency: "high",
      },
      description: "Two-digit addition with frequent carrying.",
      generationMode: "random-within-constraint",
      difficulty: "medium",
      eloRange: [1000, 1150],
      eloWeight: 1.2,
      timeLimit: 18,
      tags: {
        skill: ["mental-math", "attention"],
        topic: ["arithmetic"],
        constraint: ["carry-heavy"],
      },
      stats: {
        attempts: 47,
        accuracy: 0.63,
      },
    },

    {
      id: 4,
      title: "Addition: Multi-Term (3 numbers)",
      operation: "addition",
      config: {
        digits: 1,
        terms: 3,
        maxPerTerm: 20,
      },
      description: "Add three numbers in sequence.",
      generationMode: "chain",
      difficulty: "medium",
      eloRange: [1050, 1200],
      eloWeight: 1.25,
      timeLimit: 20,
      tags: {
        skill: ["pattern-recognition", "mental-math"],
        topic: ["arithmetic"],
        constraint: ["multi-term"],
      },
      stats: {
        attempts: 39,
        accuracy: 0.58,
      },
    },

    {
      id: 5,
      title: "Addition: Multi-Term (5 numbers)",
      operation: "addition",
      config: {
        digits: 1,
        terms: 5,
        maxPerTerm: 15,
      },
      description: "Fast summation of multiple small values.",
      generationMode: "chain",
      difficulty: "hard",
      eloRange: [1150, 1300],
      eloWeight: 1.35,
      timeLimit: 25,
      tags: {
        skill: ["speed", "chunking"],
        topic: ["arithmetic"],
        constraint: ["multi-term"],
      },
      stats: {
        attempts: 28,
        accuracy: 0.49,
      },
    },

    {
      id: 6,
      title: "Addition: Complements to 10",
      operation: "addition",
      config: {
        target: 10,
        missingOne: true,
      },
      description: "Find missing numbers that complete to 10.",
      generationMode: "complement",
      difficulty: "easy",
      eloRange: [850, 1000],
      eloWeight: 1.0,
      timeLimit: 12,
      tags: {
        skill: ["decomposition", "pattern-recognition"],
        topic: ["arithmetic"],
        constraint: ["complements"],
      },
      stats: {
        attempts: 70,
        accuracy: 0.82,
      },
    },

    {
      id: 7,
      title: "Addition: Complements to 100",
      operation: "addition",
      config: {
        target: 100,
        allowTwoStep: true,
      },
      description: "Mental strategies to reach 100 efficiently.",
      generationMode: "complement",
      difficulty: "medium",
      eloRange: [1050, 1200],
      eloWeight: 1.3,
      timeLimit: 20,
      tags: {
        skill: ["decomposition", "strategy"],
        topic: ["arithmetic"],
        constraint: ["target-sum"],
      },
      stats: {
        attempts: 33,
        accuracy: 0.55,
      },
    },

    {
      id: 8,
      title: "Addition: Mixed Flow",
      operation: "addition",
      config: {
        digits: [1, 2],
        terms: [2, 3],
        allowCarry: true,
      },
      description: "Dynamic mix of easy and medium addition problems.",
      generationMode: "adaptive",
      difficulty: "medium",
      eloRange: [1100, 1250],
      eloWeight: 1.4,
      timeLimit: 20,
      tags: {
        skill: ["adaptation", "mental-math"],
        topic: ["arithmetic"],
        constraint: ["mixed"],
      },
      stats: {
        attempts: 26,
        accuracy: 0.46,
      },
    },

    {
      id: 9,
      title: "Addition: Speed Round",
      operation: "addition",
      config: {
        digits: 2,
        terms: 2,
        allowCarry: true,
        pressure: "high",
      },
      description: "Timed addition under pressure.",
      generationMode: "timed",
      difficulty: "hard",
      eloRange: [1200, 1400],
      eloWeight: 1.5,
      timeLimit: 10,
      tags: {
        skill: ["speed", "focus"],
        topic: ["arithmetic"],
        constraint: ["timed"],
      },
      stats: {
        attempts: 19,
        accuracy: 0.41,
      },
    },

    {
      id: 10,
      title: "Addition: Endurance Mode",
      operation: "addition",
      config: {
        digits: 2,
        terms: 3,
        allowCarry: true,
        streakScaling: true,
      },
      description: "Sustained mental math with scaling difficulty.",
      generationMode: "adaptive",
      difficulty: "hard",
      eloRange: [1300, 1500],
      eloWeight: 1.7,
      timeLimit: 30,
      tags: {
        skill: ["endurance", "focus"],
        topic: ["arithmetic"],
        constraint: ["streak-based"],
      },
      stats: {
        attempts: 12,
        accuracy: 0.38,
      },
    },
  ];
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-medium text-gray-900">
            Choose a Question Type
          </h1>
          <p className="text-sm text-gray-500">
            Select a generator mode to start practicing
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {types.map((type) => (
            <div
              key={type.id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:border-gray-300 hover:shadow-md"
            >
              {/* Title */}
              <div className="text-base font-medium text-gray-900">
                {type.title}
              </div>

              {/* Difficulty + ELO */}
              <div className="mt-1 flex items-center gap-2 text-xs">
                <span className="font-mono text-gray-500">
                  {type.difficulty.toUpperCase()}
                </span>
                <span className="text-gray-300">•</span>
                <span className="font-mono text-gray-400">
                  ELO {type.eloRange[0]}–{type.eloRange[1]}
                </span>
              </div>

              {/* Config */}
              <div className="mt-2 text-xs font-mono text-gray-400">
                sum {type.config.min}–{type.config.max}
                {type.config.allowCarry ? " (carry)" : " (no carry)"}
              </div>

              {/* Description */}
              <div className="mt-2 text-sm text-gray-500">
                {type.description}
              </div>

              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-2">
                {Object.entries(type.tags).flatMap(([_, values]) =>
                  values.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
                    >
                      {tag}
                    </span>
                  )),
                )}
              </div>

              {/* Stats */}
              <div className="mt-3 text-xs text-gray-400 font-mono">
                {type.stats.attempts} attempts ·{" "}
                {Math.round(type.stats.accuracy * 100)}% accuracy
              </div>

              {/* Meta row */}
              <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                <span>⏱ {type.timeLimit}s</span>
                <span>{type.format}</span>
              </div>

              {/* Button */}
              <button className="mt-4 w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800">
                Start →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
