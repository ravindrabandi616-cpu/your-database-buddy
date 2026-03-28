import { supabase } from "@/integrations/supabase/client";

export interface PredictionResponse {
  disease: string;
  algorithm: string;
  prediction: "positive" | "negative";
  probability: number;
  confidence: string;
  disclaimer: string;
}

export async function predictDisease(
  disease: "diabetes" | "heart" | "kidney" | "liver",
  features: Record<string, number>
): Promise<PredictionResponse> {
  const { data, error } = await supabase.functions.invoke("predict", {
    body: { disease, features },
  });

  if (error) throw new Error(error.message || "Prediction failed");
  return data as PredictionResponse;
}
