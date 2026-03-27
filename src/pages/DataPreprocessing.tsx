import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Droplets,
  Heart,
  Activity,
  Stethoscope,
  Database,
  Eraser,
  BarChart3,
  Filter,
  CheckCircle2,
  ArrowRight,
  LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Pipeline step definitions                                         */
/* ------------------------------------------------------------------ */

interface PipelineStep {
  title: string;
  icon: LucideIcon;
  description: string;
  details: string[];
}

const pipelineSteps: PipelineStep[] = [
  {
    title: "Data Collection",
    icon: Database,
    description: "Gathering raw medical records from reputable public repositories.",
    details: [
      "Source datasets from UCI ML Repository, Kaggle, and hospital records",
      "Verify data provenance and licensing (CC0 / CC BY 4.0)",
      "Collect demographic, clinical, and laboratory measurements",
      "Ensure adequate sample sizes for statistical significance",
    ],
  },
  {
    title: "Data Cleaning",
    icon: Eraser,
    description: "Handling missing values, duplicates, and inconsistent entries.",
    details: [
      "Identify and quantify missing values per feature",
      "Apply mean/median imputation for numerical features",
      "Use mode imputation for categorical features",
      "Remove duplicate records and fix inconsistent data types",
    ],
  },
  {
    title: "Feature Engineering",
    icon: BarChart3,
    description: "Transforming raw features into model-ready representations.",
    details: [
      "Normalize continuous variables using Min-Max or Z-score scaling",
      "Encode categorical variables with label or one-hot encoding",
      "Create interaction features where clinically relevant",
      "Bin continuous variables for interpretability when needed",
    ],
  },
  {
    title: "Feature Selection",
    icon: Filter,
    description: "Selecting the most predictive features to reduce dimensionality.",
    details: [
      "Compute correlation matrices to remove redundant features",
      "Apply chi-squared / ANOVA tests for statistical relevance",
      "Use recursive feature elimination (RFE) with cross-validation",
      "Validate selected subset on hold-out set for stability",
    ],
  },
  {
    title: "Validation & Split",
    icon: CheckCircle2,
    description: "Splitting data into train/test sets and validating quality.",
    details: [
      "Stratified 80/20 train-test split to preserve class distribution",
      "Apply k-fold cross-validation (k = 5) during model tuning",
      "Check for data leakage between train and test sets",
      "Generate summary statistics for final preprocessed dataset",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Per-disease preprocessing details                                  */
/* ------------------------------------------------------------------ */

interface DiseasePreprocessing {
  id: string;
  disease: string;
  icon: LucideIcon;
  missingStrategy: string;
  normalization: string;
  encoding: string;
  outlierHandling: string;
  selectedFeatures: number;
  totalFeatures: number;
  notes: string;
}

const diseaseDetails: DiseasePreprocessing[] = [
  {
    id: "diabetes",
    disease: "Diabetes",
    icon: Droplets,
    missingStrategy: "Zeros in Glucose, BloodPressure, BMI replaced with median values",
    normalization: "Min-Max scaling to [0, 1]",
    encoding: "No categorical features — all numeric",
    outlierHandling: "IQR-based capping for Insulin and SkinThickness",
    selectedFeatures: 8,
    totalFeatures: 8,
    notes: "Pima Indians dataset has implicit missing values encoded as 0.",
  },
  {
    id: "heart",
    disease: "Heart Disease",
    icon: Heart,
    missingStrategy: "Rows with missing 'ca' and 'thal' dropped (< 2 % of data)",
    normalization: "Standard (Z-score) scaling",
    encoding: "One-hot encoding for ChestPainType, RestECG, ST_Slope",
    outlierHandling: "Winsorization at 1st and 99th percentiles",
    selectedFeatures: 13,
    totalFeatures: 13,
    notes: "Cleveland subset (303 records) used; multi-class target binarised.",
  },
  {
    id: "kidney",
    disease: "Kidney Disease",
    icon: Activity,
    missingStrategy: "KNN imputation (k = 5) for numeric; mode for categorical",
    normalization: "Robust scaling (median & IQR)",
    encoding: "Label encoding for binary features; one-hot for nominal",
    outlierHandling: "Capped at 3 × IQR beyond Q1/Q3",
    selectedFeatures: 18,
    totalFeatures: 24,
    notes: "~35 % missing values overall — imputation is critical step.",
  },
  {
    id: "liver",
    disease: "Liver Disease",
    icon: Stethoscope,
    missingStrategy: "4 missing A/G Ratio values filled with median",
    normalization: "Log-transform on skewed enzyme levels, then Z-score",
    encoding: "Gender encoded as 0/1",
    outlierHandling: "Extreme bilirubin values capped at 99th percentile",
    selectedFeatures: 10,
    totalFeatures: 10,
    notes: "Class imbalance (1.4 : 1) addressed with SMOTE oversampling.",
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

const StepCard = ({ step, index }: { step: PipelineStep; index: number }) => (
  <div className="relative flex gap-4">
    {/* connector line */}
    {index < pipelineSteps.length - 1 && (
      <div className="absolute left-5 top-12 h-[calc(100%-1.5rem)] w-px bg-border" />
    )}
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
      <step.icon className="h-5 w-5" />
    </div>
    <div className="pb-8">
      <h3 className="font-display text-base font-semibold text-foreground">{step.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
      <ul className="mt-3 space-y-1.5">
        {step.details.map((d) => (
          <li key={d} className="flex items-start gap-2 text-sm text-muted-foreground">
            <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
            {d}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const DiseaseTab = ({ d }: { d: DiseasePreprocessing }) => (
  <div className="grid gap-4 sm:grid-cols-2">
    {[
      { label: "Missing Value Strategy", value: d.missingStrategy },
      { label: "Normalization", value: d.normalization },
      { label: "Encoding", value: d.encoding },
      { label: "Outlier Handling", value: d.outlierHandling },
    ].map((item) => (
      <Card key={item.label} className="border-transparent bg-muted/30">
        <CardContent className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">{item.label}</p>
          <p className="mt-1 text-sm text-foreground">{item.value}</p>
        </CardContent>
      </Card>
    ))}
    <Card className="border-transparent bg-muted/30 sm:col-span-2">
      <CardContent className="flex flex-wrap items-center gap-4 p-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Features Used</p>
          <p className="mt-1 text-sm text-foreground">
            {d.selectedFeatures} of {d.totalFeatures} original features
          </p>
        </div>
        <Badge variant="outline" className="ml-auto text-xs">
          {d.notes}
        </Badge>
      </CardContent>
    </Card>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

const DataPreprocessing = () => (
  <Layout>
    <section className="container py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          <BarChart3 className="h-3.5 w-3.5" />
          Pipeline
        </div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
          Data Collection &amp; Pre-processing
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Learn how raw medical data is transformed into clean, model-ready features through a
          systematic preprocessing pipeline applied to every disease dataset.
        </p>
      </div>

      {/* Pipeline steps */}
      <Card className="mb-10">
        <CardHeader>
          <CardTitle className="font-display text-lg">Preprocessing Pipeline</CardTitle>
        </CardHeader>
        <CardContent className="pl-6">
          {pipelineSteps.map((step, i) => (
            <StepCard key={step.title} step={step} index={i} />
          ))}
        </CardContent>
      </Card>

      {/* Per-disease tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Disease-Specific Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="diabetes">
            <TabsList className="mb-4 flex flex-wrap">
              {diseaseDetails.map((d) => (
                <TabsTrigger key={d.id} value={d.id} className="gap-1.5">
                  <d.icon className="h-4 w-4" />
                  {d.disease}
                </TabsTrigger>
              ))}
            </TabsList>
            {diseaseDetails.map((d) => (
              <TabsContent key={d.id} value={d.id}>
                <DiseaseTab d={d} />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </section>
  </Layout>
);

export default DataPreprocessing;
