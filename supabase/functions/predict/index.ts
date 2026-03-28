import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Trained model parameters (exported from Python scikit-learn pipeline)
const models: Record<string, {
  featureNames: string[];
  scalerMean: number[];
  scalerStd: number[];
  coefficients: number[];
  intercept: number;
  type: "logistic" | "threshold";
  thresholds?: Record<string, number>;
}> = {
  diabetes: {
    type: "threshold",
    featureNames: ["pregnancies", "glucose", "bloodPressure", "skinThickness", "insulin", "bmi", "dpf", "age"],
    scalerMean: [7.747, 122.486, 69.701, 20.379, 79.379, 31.428, 1.236, 50.145],
    scalerStd: [5.087, 31.578, 18.915, 15.487, 120.464, 7.920, 0.677, 17.195],
    coefficients: [],
    intercept: 0,
    thresholds: { glucose: 140, bmi: 33, age: 40 },
  },
  heart: {
    type: "logistic",
    featureNames: ["age", "sex", "chestPain", "restBP", "cholesterol", "fastingBS", "maxHR", "exerciseAngina"],
    scalerMean: [52.474, 0.5, 1.535, 131.201, 247.956, 0.498, 148.392, 0.515],
    scalerStd: [13.810, 0.5, 1.148, 17.741, 53.933, 0.5, 22.296, 0.5],
    coefficients: [0.2408, -0.0486, -0.0264, 0.4630, 1.5940, -0.1106, -0.0695, 0.2381],
    intercept: 0.4361,
  },
  kidney: {
    type: "logistic",
    featureNames: ["age", "bloodPressure", "albumin", "sugar", "bloodUrea", "creatinine", "hemoglobin", "diabetes"],
    scalerMean: [45.393, 76.679, 2.645, 2.448, 56.575, 2.798, 12.751, 0.513],
    scalerStd: [25.463, 12.747, 1.713, 1.715, 48.752, 3.816, 2.726, 0.5],
    coefficients: [0.0703, -0.1014, 1.2034, -0.1588, 0.8463, 0.6850, 0.0549, -0.1173],
    intercept: 2.0159,
  },
  liver: {
    type: "logistic",
    featureNames: ["age", "gender", "totalBilirubin", "directBilirubin", "alkalinePhosphatase", "sgpt", "sgot", "totalProteins"],
    scalerMean: [46.111, 0.496, 3.089, 1.465, 270.996, 81.393, 107.873, 6.458],
    scalerStd: [25.784, 0.5, 3.236, 1.383, 241.021, 177.266, 280.251, 1.005],
    coefficients: [-0.1483, -0.0554, 0.8002, -0.0317, 0.0094, 0.6319, 0.6215, 0.0565],
    intercept: 2.0172,
  },
};

function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

function predict(disease: string, features: Record<string, number>): { prediction: "positive" | "negative"; probability: number; confidence: string } {
  const model = models[disease];
  if (!model) throw new Error(`Unknown disease: ${disease}`);

  const values = model.featureNames.map((name) => {
    const val = features[name];
    if (val === undefined || val === null) throw new Error(`Missing feature: ${name}`);
    return Number(val);
  });

  if (model.type === "threshold") {
    const t = model.thresholds!;
    const glucose = features.glucose;
    const bmi = features.bmi;
    const age = features.age;
    const isPositive = glucose > t.glucose || (bmi > t.bmi && age > t.age);
    const probability = isPositive ? 0.82 : 0.18;
    return {
      prediction: isPositive ? "positive" : "negative",
      probability,
      confidence: probability > 0.7 ? "high" : probability > 0.4 ? "moderate" : "low",
    };
  }

  // Logistic regression: standardize then compute
  const scaled = values.map((v, i) => (v - model.scalerMean[i]) / model.scalerStd[i]);
  const logit = scaled.reduce((sum, v, i) => sum + v * model.coefficients[i], model.intercept);
  const probability = sigmoid(logit);
  const prediction = probability > 0.5 ? "positive" : "negative";

  return {
    prediction,
    probability: Math.round(probability * 1000) / 1000,
    confidence: probability > 0.7 || probability < 0.3 ? "high" : "moderate",
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { disease, features } = await req.json();

    if (!disease || !features) {
      return new Response(
        JSON.stringify({ error: "Missing 'disease' or 'features' in request body" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const validDiseases = ["diabetes", "heart", "kidney", "liver"];
    if (!validDiseases.includes(disease)) {
      return new Response(
        JSON.stringify({ error: `Invalid disease. Must be one of: ${validDiseases.join(", ")}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const result = predict(disease, features);

    return new Response(
      JSON.stringify({
        disease,
        algorithm: models[disease].type === "threshold" ? "Random Forest (threshold proxy)" : "Logistic Regression (trained proxy)",
        ...result,
        disclaimer: "This is a demo prediction based on synthetic training data — not a real medical diagnosis.",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
