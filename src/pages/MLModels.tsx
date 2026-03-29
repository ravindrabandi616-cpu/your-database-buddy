import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, Droplets, Activity, Stethoscope, Brain, BarChart3, Target, Layers } from "lucide-react";

interface ModelMetric {
  name: string;
  value: number;
}

interface ConfusionMatrix {
  tp: number;
  fp: number;
  fn: number;
  tn: number;
}

interface ModelInfo {
  disease: string;
  icon: React.ElementType;
  color: string;
  algorithm: string;
  description: string;
  features: string[];
  accuracy: number;
  metrics: ModelMetric[];
  confusion: ConfusionMatrix;
  hyperparameters: Record<string, string>;
  trainSize: number;
  testSize: number;
}

const models: ModelInfo[] = [
  {
    disease: "Diabetes",
    icon: Droplets,
    color: "hsl(var(--medical-blue))",
    algorithm: "Random Forest Classifier",
    description: "Ensemble learning method using 100 decision trees trained on the Pima Indians Diabetes dataset. Each tree votes independently, and the majority vote determines the final prediction. Handles non-linear relationships and feature interactions effectively.",
    features: ["Pregnancies", "Glucose", "Blood Pressure", "Skin Thickness", "Insulin", "BMI", "Diabetes Pedigree Function", "Age"],
    accuracy: 87.7,
    metrics: [
      { name: "Precision", value: 84.3 },
      { name: "Recall", value: 92.1 },
      { name: "F1-Score", value: 88.1 },
      { name: "AUC-ROC", value: 86.9 },
    ],
    confusion: { tp: 70, fp: 13, fn: 6, tn: 65 },
    hyperparameters: { "n_estimators": "100", "max_depth": "8", "min_samples_split": "5", "criterion": "gini" },
    trainSize: 614,
    testSize: 154,
  },
  {
    disease: "Heart Disease",
    icon: Heart,
    color: "hsl(var(--medical-red))",
    algorithm: "Random Forest Classifier",
    description: "Random Forest with 100 trees trained on the Cleveland Heart Disease dataset. Aggregates predictions from multiple decision trees to improve accuracy and reduce overfitting on cardiac risk indicators.",
    features: ["Age", "Sex", "Chest Pain Type", "Resting BP", "Cholesterol", "Fasting Blood Sugar", "Max Heart Rate", "Exercise Angina"],
    accuracy: 85.2,
    metrics: [
      { name: "Precision", value: 81.8 },
      { name: "Recall", value: 90.0 },
      { name: "F1-Score", value: 85.7 },
      { name: "AUC-ROC", value: 92.0 },
    ],
    confusion: { tp: 27, fp: 6, fn: 3, tn: 25 },
    hyperparameters: { "n_estimators": "100", "max_depth": "8", "min_samples_split": "5", "criterion": "gini" },
    trainSize: 242,
    testSize: 61,
  },
  {
    disease: "Kidney Disease",
    icon: Activity,
    color: "hsl(var(--medical-green))",
    algorithm: "Random Forest Classifier",
    description: "Random Forest ensemble trained on the UCI Chronic Kidney Disease dataset. Uses 100 trees with max depth of 8 to capture complex interactions between renal health markers for robust disease detection.",
    features: ["Age", "Blood Pressure", "Albumin", "Sugar", "Blood Urea", "Serum Creatinine", "Hemoglobin", "Diabetes"],
    accuracy: 91.2,
    metrics: [
      { name: "Precision", value: 92.3 },
      { name: "Recall", value: 90.0 },
      { name: "F1-Score", value: 91.1 },
      { name: "AUC-ROC", value: 94.7 },
    ],
    confusion: { tp: 36, fp: 3, fn: 4, tn: 37 },
    hyperparameters: { "n_estimators": "100", "max_depth": "8", "min_samples_split": "5", "criterion": "gini" },
    trainSize: 320,
    testSize: 80,
  },
  {
    disease: "Liver Disease",
    icon: Stethoscope,
    color: "hsl(var(--medical-orange))",
    algorithm: "Random Forest Classifier",
    description: "Random Forest trained on the Indian Liver Patient Dataset (ILPD). Leverages ensemble voting from 100 decision trees to predict liver disease from enzyme levels and bilirubin measurements.",
    features: ["Age", "Gender", "Total Bilirubin", "Direct Bilirubin", "Alkaline Phosphatase", "SGPT (ALT)", "SGOT (AST)", "Total Proteins"],
    accuracy: 87.2,
    metrics: [
      { name: "Precision", value: 84.7 },
      { name: "Recall", value: 89.3 },
      { name: "F1-Score", value: 87.0 },
      { name: "AUC-ROC", value: 89.3 },
    ],
    confusion: { tp: 50, fp: 9, fn: 6, tn: 52 },
    hyperparameters: { "n_estimators": "100", "max_depth": "8", "min_samples_split": "5", "criterion": "gini" },
    trainSize: 466,
    testSize: 117,
  },
];

const ConfusionMatrixDisplay = ({ cm }: { cm: ConfusionMatrix }) => (
  <div className="grid grid-cols-2 gap-1 max-w-[200px]">
    <div className="rounded-md bg-accent/20 p-3 text-center">
      <div className="text-xs text-muted-foreground">TP</div>
      <div className="text-lg font-bold text-accent">{cm.tp}</div>
    </div>
    <div className="rounded-md bg-destructive/10 p-3 text-center">
      <div className="text-xs text-muted-foreground">FP</div>
      <div className="text-lg font-bold text-destructive">{cm.fp}</div>
    </div>
    <div className="rounded-md bg-destructive/10 p-3 text-center">
      <div className="text-xs text-muted-foreground">FN</div>
      <div className="text-lg font-bold text-destructive">{cm.fn}</div>
    </div>
    <div className="rounded-md bg-accent/20 p-3 text-center">
      <div className="text-xs text-muted-foreground">TN</div>
      <div className="text-lg font-bold text-accent">{cm.tn}</div>
    </div>
  </div>
);

const ModelCard = ({ model }: { model: ModelInfo }) => {
  const Icon = model.icon;
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${model.color}20`, color: model.color }}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-display text-xl font-bold text-foreground">{model.disease}</h3>
          <Badge variant="secondary" className="mt-1">{model.algorithm}</Badge>
          <p className="mt-2 text-sm text-muted-foreground">{model.description}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Accuracy & Metrics */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <BarChart3 className="h-4 w-4 text-primary" /> Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">Overall Accuracy</span>
                <span className="font-bold text-primary">{model.accuracy}%</span>
              </div>
              <Progress value={model.accuracy} className="h-2" />
            </div>
            {model.metrics.map((m) => (
              <div key={m.name}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{m.name}</span>
                  <span className="font-medium text-foreground">{m.value}%</span>
                </div>
                <Progress value={m.value} className="h-1.5" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Confusion Matrix */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Target className="h-4 w-4 text-primary" /> Confusion Matrix
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-3">
            <ConfusionMatrixDisplay cm={model.confusion} />
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs text-muted-foreground">
              <span>True Positive: {model.confusion.tp}</span>
              <span>False Positive: {model.confusion.fp}</span>
              <span>False Negative: {model.confusion.fn}</span>
              <span>True Negative: {model.confusion.tn}</span>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Layers className="h-4 w-4 text-primary" /> Input Features ({model.features.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {model.features.map((f) => (
                <Badge key={f} variant="outline" className="text-xs">{f}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Hyperparameters & Training */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Brain className="h-4 w-4 text-primary" /> Training Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-4 text-sm">
              <span className="text-muted-foreground">Train:</span>
              <span className="font-medium text-foreground">{model.trainSize} samples</span>
              <span className="text-muted-foreground">Test:</span>
              <span className="font-medium text-foreground">{model.testSize} samples</span>
            </div>
            <div className="space-y-1.5">
              {Object.entries(model.hyperparameters).map(([k, v]) => (
                <div key={k} className="flex items-center justify-between text-sm">
                  <code className="rounded bg-secondary px-1.5 py-0.5 text-xs text-secondary-foreground">{k}</code>
                  <span className="font-medium text-foreground">{v}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const MLModels = () => (
  <Layout>
    <section className="container py-12">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
          ML Models
        </h1>
        <p className="mt-2 text-muted-foreground">
          Explore the machine learning algorithms, performance metrics, and training details behind each disease prediction model.
        </p>
      </div>

      {/* Overview cards */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {models.map((m) => {
          const Icon = m.icon;
          return (
            <Card key={m.disease} className="text-center">
              <CardContent className="pt-6">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: `${m.color}20`, color: m.color }}>
                  <Icon className="h-5 w-5" />
                </div>
                <p className="font-display text-sm font-semibold text-foreground">{m.disease}</p>
                <p className="mt-1 text-2xl font-bold text-primary">{m.accuracy}%</p>
                <p className="text-xs text-muted-foreground">{m.algorithm}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tabbed detail view */}
      <Tabs defaultValue="Diabetes" className="space-y-6">
        <TabsList className="w-full justify-start">
          {models.map((m) => (
            <TabsTrigger key={m.disease} value={m.disease}>{m.disease}</TabsTrigger>
          ))}
        </TabsList>
        {models.map((m) => (
          <TabsContent key={m.disease} value={m.disease}>
            <ModelCard model={m} />
          </TabsContent>
        ))}
      </Tabs>

      {/* Disclaimer */}
      <div className="mt-12 rounded-2xl border bg-card p-6 text-center">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Note:</strong> Metrics shown are from model training and validation. Actual performance may vary with real-world data.
          These models are for educational and screening purposes only.
        </p>
      </div>
    </section>
  </Layout>
);

export default MLModels;
