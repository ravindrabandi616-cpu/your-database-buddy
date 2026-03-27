import { useState } from "react";
import Layout from "@/components/Layout";
import PredictionForm, { FieldConfig } from "@/components/PredictionForm";
import PredictionResult from "@/components/PredictionResult";
import { Droplets } from "lucide-react";

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
  const [result, setResult] = useState<"positive" | "negative" | null>(null);

  const handlePredict = (data: Record<string, any>) => {
    // Demo logic: simple threshold-based prediction
    const glucose = Number(data.glucose);
    const bmi = Number(data.bmi);
    const age = Number(data.age);
    setResult(glucose > 140 || (bmi > 30 && age > 40) ? "positive" : "negative");
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
        <PredictionResult result={result} disease="Diabetes" />
      </section>
    </Layout>
  );
};

export default DiabetesPrediction;
