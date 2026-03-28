import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, CheckCircle2, Info, BarChart3 } from "lucide-react";
import { PredictionResponse } from "@/lib/prediction-api";
import { Progress } from "@/components/ui/progress";

interface PredictionResultProps {
  result: PredictionResponse | null;
  disease: string;
}

const PredictionResult = ({ result, disease }: PredictionResultProps) => {
  if (!result) return null;

  const isPositive = result.prediction === "positive";
  const probabilityPercent = Math.round(result.probability * 100);

  return (
    <Card
      className={`mx-auto mt-6 w-full max-w-2xl border-2 animate-fade-in ${
        isPositive ? "border-destructive/30 bg-destructive/5" : "border-accent/30 bg-accent/5"
      }`}
    >
      <CardContent className="flex flex-col gap-4 p-6">
        <div className="flex items-start gap-4">
          {isPositive ? (
            <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-destructive" />
          ) : (
            <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-accent" />
          )}
          <div className="flex-1">
            <h3 className="font-display text-lg font-semibold">
              {isPositive ? `High Risk of ${disease}` : `Low Risk of ${disease}`}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {isPositive
                ? "Based on the provided data, the model indicates a higher likelihood. Please consult a healthcare professional for proper diagnosis."
                : "Based on the provided data, the model indicates a lower likelihood. Continue maintaining a healthy lifestyle and regular check-ups."}
            </p>
          </div>
        </div>

        {/* Model Details */}
        <div className="rounded-lg border bg-background/50 p-4 space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <BarChart3 className="h-4 w-4 text-primary" />
            Model Analysis Details
          </div>
          <div className="grid gap-2 text-sm sm:grid-cols-2">
            <div>
              <span className="text-muted-foreground">Algorithm:</span>{" "}
              <span className="font-medium">{result.algorithm}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Confidence:</span>{" "}
              <span className={`font-medium capitalize ${
                result.confidence === "high" ? "text-accent" : "text-yellow-500"
              }`}>
                {result.confidence}
              </span>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Risk Probability</span>
              <span className="font-medium">{probabilityPercent}%</span>
            </div>
            <Progress
              value={probabilityPercent}
              className="h-2"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Info className="h-3.5 w-3.5" />
          {result.disclaimer || "This is a demo prediction — not a real medical diagnosis."}
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionResult;
