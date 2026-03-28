import { useState } from "react";
import Layout from "@/components/Layout";
import PredictionForm, { FieldConfig } from "@/components/PredictionForm";
import PredictionResult from "@/components/PredictionResult";
import { Activity } from "lucide-react";
import { predictDisease, PredictionResponse } from "@/lib/prediction-api";

const fields: FieldConfig[] = [
  { name: "age", label: "Age", type: "number", placeholder: "e.g. 50", min: 1, max: 120 },
  { name: "bloodPressure", label: "Blood Pressure (mmHg)", type: "number", placeholder: "e.g. 80", min: 0, max: 200 },
  { name: "albumin", label: "Albumin (0-5)", type: "number", placeholder: "e.g. 1", min: 0, max: 5 },
  { name: "sugar", label: "Sugar (0-5)", type: "number", placeholder: "e.g. 0", min: 0, max: 5 },
  { name: "bloodUrea", label: "Blood Urea (mg/dL)", type: "number", placeholder: "e.g. 36", min: 0, max: 400 },
  { name: "creatinine", label: "Serum Creatinine (mg/dL)", type: "number", placeholder: "e.g. 1.2", min: 0, max: 20, step: 0.1 },
  { name: "hemoglobin", label: "Hemoglobin (g/dL)", type: "number", placeholder: "e.g. 15", min: 0, max: 20, step: 0.1 },
  { name: "diabetes", label: "Diabetes", type: "select", options: [{ value: "1", label: "Yes" }, { value: "0", label: "No" }] },
];

const KidneyPrediction = () => {
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async (data: Record<string, any>) => {
    try {
      setError(null);
      const features: Record<string, number> = {};
      fields.forEach((f) => (features[f.name] = Number(data[f.name])));
      const response = await predictDisease("kidney", features);
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
          title="Kidney Disease Prediction"
          description="Enter renal health parameters to assess kidney disease risk"
          icon={Activity}
          fields={fields}
          onSubmit={handlePredict}
        />
        {error && (
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-destructive">{error}</p>
        )}
        <PredictionResult result={result} disease="Kidney Disease" />
      </section>
    </Layout>
  );
};

export default KidneyPrediction;
