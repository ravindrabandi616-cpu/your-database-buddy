import { useState } from "react";
import Layout from "@/components/Layout";
import PredictionForm, { FieldConfig } from "@/components/PredictionForm";
import PredictionResult from "@/components/PredictionResult";
import { Droplets } from "lucide-react";
import { predictDisease, PredictionResponse } from "@/lib/prediction-api";

const fields: FieldConfig[] = [
  { name: "pregnancies", label: "Pregnancies", type: "number", placeholder: "e.g. 2", min: 0, max: 20 },
  { name: "glucose", label: "Glucose (mg/dL)", type: "number", placeholder: "e.g. 120", min: 0, max: 300 },
  { name: "bloodPressure", label: "Blood Pressure (mmHg)", type: "number", placeholder: "e.g. 80", min: 0, max: 200 },
  { name: "skinThickness", label: "Skin Thickness (mm)", type: "number", placeholder: "e.g. 20", min: 0, max: 100 },
  { name: "insulin", label: "Insulin (μU/mL)", type: "number", placeholder: "e.g. 80", min: 0, max: 900 },
  { name: "bmi", label: "BMI", type: "number", placeholder: "e.g. 25.5", min: 0, max: 70, step: 0.1 },
  { name: "dpf", label: "Diabetes Pedigree Function", type: "number", placeholder: "e.g. 0.5", min: 0, max: 3, step: 0.01 },
  { name: "age", label: "Age", type: "number", placeholder: "e.g. 45", min: 1, max: 120 },
];

const DiabetesPrediction = () => {
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async (data: Record<string, any>) => {
    try {
      setError(null);
      const features: Record<string, number> = {};
      fields.forEach((f) => (features[f.name] = Number(data[f.name])));
      const response = await predictDisease("diabetes", features);
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
          title="Diabetes Prediction"
          description="Enter your health parameters to assess diabetes risk"
          icon={Droplets}
          fields={fields}
          onSubmit={handlePredict}
        />
        {error && (
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-destructive">{error}</p>
        )}
        <PredictionResult result={result} disease="Diabetes" />
      </section>
    </Layout>
  );
};

export default DiabetesPrediction;
