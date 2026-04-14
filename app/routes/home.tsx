import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";

const OPTIONS = [
  { label: "A", text: "x = 1, 3", correct: true },
  { label: "B", text: "x = 2, 4", correct: false },
  { label: "C", text: "x = −1, 3", correct: false },
  { label: "D", text: "x = 0, 4", correct: false },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 pt-24 pb-20">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary text-md text-muted-foreground font-mono mb-7">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          ELO-rated math practice
        </div>

        {/* Headline */}
        <h1 className="text-7xl font-medium tracking-tight leading-[1.12] max-w-xl mb-5">
          Get better at math.{" "}
          <span className="text-muted-foreground">One problem at a time.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-muted-foreground max-w-sm leading-relaxed mb-10">
          Answer questions, earn ELO, climb the ranks. MathArena matches you to
          problems at exactly your level.
        </p>

        <Button size="lg" asChild className="text-lg mb-24">
          <Link to="/play">Start playing →</Link>
        </Button>

        {/* Question preview */}
        <div className="w-full max-w-lg border border-border rounded-xl overflow-hidden bg-secondary">
          {/* Fake window bar */}
          <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border bg-background">
            <span className="h-2 w-2 rounded-full bg-red-400" />
            <span className="h-2 w-2 rounded-full bg-yellow-400" />
            <span className="h-2 w-2 rounded-full bg-green-400" />
          </div>

          <div className="p-5">
            <Badge
              variant="outline"
              className="bg-white font-mono text-xs mb-3"
            >
              1280 ELO
            </Badge>

            <p className="text-base font-medium leading-snug mb-4">
              Solve for x: 3x² − 12x + 9 = 0
            </p>

            <div className="grid grid-cols-2 gap-2">
              {OPTIONS.map(({ label, text, correct }) => (
                <div
                  key={label}
                  className={[
                    "px-3.5 py-2.5 rounded-lg border text-sm",
                    correct
                      ? "border-green-300 bg-green-50 text-green-800"
                      : "border-border bg-background text-muted-foreground",
                  ].join(" ")}
                >
                  <span className="font-mono text-[10px] opacity-50 mr-1.5">
                    {label}.
                  </span>
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
