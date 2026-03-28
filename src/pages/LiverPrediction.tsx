import { useState } from "react";
import Layout from "@/components/Layout";
import PredictionForm, { FieldConfig } from "@/components/PredictionForm";
import PredictionResult from "@/components/PredictionResult";
import { Stethoscope } from "lucide-react";
import { predictDisease, PredictionResponse } from "@/lib/prediction-api";

const fields: FieldConfig[] = [
  { name: "age", label: "Age", type: "number", placeholder: "e.g. 45", min: 1, max: 120 },
  { name: "gender", label: "Gender", type: "select", options: [{ value: "1", label: "Male" }, { value: "0", label: "Female" }] },
  { name: "totalBilirubin", label: "Total Bilirubin (mg/dL)", type: "number", placeholder: "e.g. 1.0", min: 0, max: 80, step: 0.1 },
  { name: "directBilirubin", label: "Direct Bilirubin (mg/dL)", type: "number", placeholder: "e.g. 0.3", min: 0, max: 20, step: 0.1 },
  { name: "alkalinePhosphatase", label: "Alkaline Phosphatase (IU/L)", type: "number", placeholder: "e.g. 200", min: 0, max: 2000 },
  { name: "sgpt", label: "SGPT (ALT) (IU/L)", type: "number", placeholder: "e.g. 25", min: 0, max: 2000 },
  { name: "sgot", label: "SGOT (AST) (IU/L)", type: "number", placeholder: "e.g. 30", min: 0, max: 5000 },
  { name: "totalProteins", label: "Total Proteins (g/dL)", type: "number", placeholder: "e.g. 6.5", min: 0, max: 10, step: 0.1 },
];

const LiverPrediction = () => {
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async (data: Record<string, any>) => {
    try {
      setError(null);
      const features: Record<string, number> = {};
      fields.forEach((f) => (features[f.name] = Number(data[f.name])));
      const response = await predictDisease("liver", features);
      setResult(response);
    } catch (err: any) {
      setError(err.message);
      setResult(null);
    }
  };

  return (
    <Layout>
      <section className="container py-12">
        <PredictionForm
          title="Liver Disease Prediction"
          description="Enter liver health parameters to assess liver disease risk"
          icon={Stethoscope}
          fields={fields}
          onSubmit={handlePredict}
        />
        {error && (
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-destructive">{error}</p>
        )}
        <PredictionResult result={result} disease="Liver Disease" />
      </section>
    </Layout>
  );
};

export default LiverPrediction;
