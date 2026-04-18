import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";
import { Form } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import type { Route } from "./+types/play";

export function loader({ context }: Route.LoaderArgs) {
  return "1 + 2 = \\text{?}";
}

export default function Play({ loaderData }: Route.ComponentProps) {
  const questionText = loaderData;
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-5 text-center">
        {/* Question */}
        <div className="py-2">
          <div className="text-2xl font-medium text-gray-900">
            <BlockMath math={questionText} />
          </div>
        </div>

        {/* Form */}
        <Form method="post" className="space-y-3">
          <Input
            name="answer"
            type="number"
            inputMode="numeric"
            placeholder="Answer"
            className="h-11 text-center text-base"
            autoFocus
          />

          <Button type="submit" size="lg" className="w-full">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}
