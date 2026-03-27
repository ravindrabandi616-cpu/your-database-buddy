import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";

interface PredictionResultProps {
  result: "positive" | "negative" | null;
  disease: string;
}

const PredictionResult = ({ result, disease }: PredictionResultProps) => {
  if (!result) return null;

  const isPositive = result === "positive";

  return (
    <Card
      className={`mx-auto mt-6 w-full max-w-2xl border-2 animate-fade-in ${
        isPositive ? "border-destructive/30 bg-destructive/5" : "border-accent/30 bg-accent/5"
      }`}
    >
      <CardContent className="flex items-start gap-4 p-6">
        {isPositive ? (
          <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-destructive" />
        ) : (
          <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-accent" />
        )}
        <div>
          <h3 className="font-display text-lg font-semibold">
            {isPositive ? `High Risk of ${disease}` : `Low Risk of ${disease}`}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {isPositive
              ? "Based on the provided data, the model indicates a higher likelihood. Please consult a healthcare professional for proper diagnosis."
              : "Based on the provided data, the model indicates a lower likelihood. Continue maintaining a healthy lifestyle and regular check-ups."}
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <Info className="h-3.5 w-3.5" />
            This is a demo prediction — not a real medical diagnosis.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionResult;
