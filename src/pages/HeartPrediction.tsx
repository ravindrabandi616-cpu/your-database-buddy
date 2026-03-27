import { useState } from "react";
import Layout from "@/components/Layout";
import PredictionForm, { FieldConfig } from "@/components/PredictionForm";
import PredictionResult from "@/components/PredictionResult";
import { Heart } from "lucide-react";

const fields: FieldConfig[] = [
  { name: "age", label: "Age", type: "number", placeholder: "e.g. 55", min: 1, max: 120 },
  { name: "sex", label: "Sex", type: "select", options: [{ value: "1", label: "Male" }, { value: "0", label: "Female" }] },
  { name: "chestPain", label: "Chest Pain Type", type: "select", options: [{ value: "0", label: "Typical Angina" }, { value: "1", label: "Atypical Angina" }, { value: "2", label: "Non-anginal" }, { value: "3", label: "Asymptomatic" }] },
  { name: "restBP", label: "Resting BP (mmHg)", type: "number", placeholder: "e.g. 130", min: 0, max: 250 },
  { name: "cholesterol", label: "Cholesterol (mg/dL)", type: "number", placeholder: "e.g. 240", min: 0, max: 600 },
  { name: "fastingBS", label: "Fasting Blood Sugar > 120", type: "select", options: [{ value: "1", label: "Yes" }, { value: "0", label: "No" }] },
  { name: "maxHR", label: "Max Heart Rate", type: "number", placeholder: "e.g. 150", min: 50, max: 250 },
  { name: "exerciseAngina", label: "Exercise Induced Angina", type: "select", options: [{ value: "1", label: "Yes" }, { value: "0", label: "No" }] },
];

const HeartPrediction = () => {
  const [result, setResult] = useState<"positive" | "negative" | null>(null);

  const handlePredict = (data: Record<string, any>) => {
    const chol = Number(data.cholesterol);
    const age = Number(data.age);
    const bp = Number(data.restBP);
    setResult(chol > 250 || (age > 55 && bp > 140) ? "positive" : "negative");
  };

  return (
    <Layout>
      <section className="container py-12">
        <PredictionForm
          title="Heart Disease Prediction"
          description="Enter cardiac health parameters to assess heart disease risk"
          icon={Heart}
          fields={fields}
          onSubmit={handlePredict}
        />
        <PredictionResult result={result} disease="Heart Disease" />
      </section>
    </Layout>
  );
};

export default HeartPrediction;
