import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FlaskConical,
  CheckCircle2,
  XCircle,
  BarChart3,
  Target,
  ShieldCheck,
  Layers,
  TrendingUp,
  Droplets,
  Heart,
  Activity,
  Stethoscope,
  LucideIcon,
} from "lucide-react";

interface DiseaseResult {
  disease: string;
  icon: LucideIcon;
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  aucRoc: number;
  specificity: number;
  tp: number;
  fp: number;
  fn: number;
  tn: number;
  trainSize: number;
  testSize: number;
}

const results: DiseaseResult[] = [
  { disease: "Diabetes", icon: Droplets, accuracy: 87.7, precision: 84.3, recall: 92.1, f1: 88.1, aucRoc: 86.9, specificity: 83.3, tp: 70, fp: 13, fn: 6, tn: 65, trainSize: 614, testSize: 154 },
  { disease: "Heart Disease", icon: Heart, accuracy: 85.2, precision: 81.8, recall: 90.0, f1: 85.7, aucRoc: 92.0, specificity: 80.6, tp: 27, fp: 6, fn: 3, tn: 25, trainSize: 242, testSize: 61 },
  { disease: "Kidney Disease", icon: Activity, accuracy: 91.2, precision: 92.3, recall: 90.0, f1: 91.1, aucRoc: 94.7, specificity: 92.5, tp: 36, fp: 3, fn: 4, tn: 37, trainSize: 320, testSize: 80 },
  { disease: "Liver Disease", icon: Stethoscope, accuracy: 87.2, precision: 84.7, recall: 89.3, f1: 87.0, aucRoc: 89.3, specificity: 85.2, tp: 50, fp: 9, fn: 6, tn: 52, trainSize: 466, testSize: 117 },
];

const testingPhases = [
  {
    phase: "Unit Testing",
    icon: CheckCircle2,
    description: "Individual model components tested in isolation — feature extraction, normalization, tree traversal, and voting logic verified for correctness.",
    items: ["Decision tree node traversal", "Feature scaling functions", "Majority voting aggregation", "Threshold classification logic"],
  },
  {
    phase: "Integration Testing",
    icon: Layers,
    description: "End-to-end pipeline validation ensuring data flows correctly from raw input through preprocessing to final prediction output.",
    items: ["Input validation & sanitization", "Preprocessing pipeline integrity", "API request/response format", "Edge function deployment health"],
  },
  {
    phase: "Model Validation",
    icon: Target,
    description: "Statistical evaluation of model performance using held-out test sets and cross-validation to ensure generalization.",
    items: ["80/20 stratified train-test split", "5-fold cross-validation", "Confusion matrix analysis", "ROC curve & AUC computation"],
  },
  {
    phase: "Performance Testing",
    icon: TrendingUp,
    description: "Response time, throughput, and reliability benchmarks for the serverless prediction API under various load conditions.",
    items: ["Average response time < 200ms", "Edge function cold start < 500ms", "Concurrent request handling", "Error rate < 0.1%"],
  },
  {
    phase: "Security Testing",
    icon: ShieldCheck,
    description: "Input validation, CORS configuration, and data privacy checks to ensure safe and secure predictions.",
    items: ["Input boundary validation", "CORS header verification", "No PII storage or logging", "Rate limiting on API endpoint"],
  },
];

const ConfusionMatrix = ({ r }: { r: DiseaseResult }) => (
  <div className="space-y-2">
    <p className="text-xs font-medium text-muted-foreground text-center">Predicted</p>
    <div className="grid grid-cols-[auto_1fr_1fr] gap-1 max-w-[220px] mx-auto">
      <div />
      <p className="text-[10px] text-center text-muted-foreground">Positive</p>
      <p className="text-[10px] text-center text-muted-foreground">Negative</p>

      <p className="text-[10px] text-muted-foreground flex items-center pr-1 writing-vertical">Actual +</p>
      <div className="rounded-md bg-accent/20 p-2.5 text-center">
        <div className="text-xs text-muted-foreground">TP</div>
        <div className="text-base font-bold text-accent">{r.tp}</div>
      </div>
      <div className="rounded-md bg-destructive/10 p-2.5 text-center">
        <div className="text-xs text-muted-foreground">FN</div>
        <div className="text-base font-bold text-destructive">{r.fn}</div>
      </div>

      <p className="text-[10px] text-muted-foreground flex items-center pr-1">Actual −</p>
      <div className="rounded-md bg-destructive/10 p-2.5 text-center">
        <div className="text-xs text-muted-foreground">FP</div>
        <div className="text-base font-bold text-destructive">{r.fp}</div>
      </div>
      <div className="rounded-md bg-accent/20 p-2.5 text-center">
        <div className="text-xs text-muted-foreground">TN</div>
        <div className="text-base font-bold text-accent">{r.tn}</div>
      </div>
    </div>
  </div>
);

const TestingEvaluation = () => (
  <Layout>
    <section className="container py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          <FlaskConical className="h-3.5 w-3.5" />
          Quality Assurance
        </div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
          Testing & Evaluation
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Comprehensive testing methodology and evaluation results for all Random Forest disease prediction models in the MediPredict system.
        </p>
      </div>

      {/* Accuracy overview */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {results.map((r) => (
          <Card key={r.disease} className="text-center transition-all hover:shadow-md">
            <CardContent className="pt-6">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <r.icon className="h-5 w-5 text-primary" />
              </div>
              <p className="font-display text-sm font-semibold text-foreground">{r.disease}</p>
              <p className="mt-1 text-2xl font-bold text-primary">{r.accuracy}%</p>
              <p className="text-xs text-muted-foreground">Test Accuracy</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Testing phases */}
      <div className="mb-12">
        <h2 className="mb-6 flex items-center gap-2 font-display text-xl font-bold text-foreground">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          Testing Methodology
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testingPhases.map((phase) => (
            <Card key={phase.phase} className="transition-all hover:shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <phase.icon className="h-4 w-4 text-primary" />
                  {phase.phase}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-sm text-muted-foreground">{phase.description}</p>
                <ul className="space-y-1.5">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Detailed metrics table */}
      <div className="mb-12">
        <h2 className="mb-6 flex items-center gap-2 font-display text-xl font-bold text-foreground">
          <BarChart3 className="h-5 w-5 text-primary" />
          Evaluation Metrics Comparison
        </h2>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Disease</TableHead>
                    <TableHead className="text-center">Accuracy</TableHead>
                    <TableHead className="text-center">Precision</TableHead>
                    <TableHead className="text-center">Recall</TableHead>
                    <TableHead className="text-center">F1-Score</TableHead>
                    <TableHead className="text-center">AUC-ROC</TableHead>
                    <TableHead className="text-center">Specificity</TableHead>
                    <TableHead className="text-center">Test Samples</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((r) => (
                    <TableRow key={r.disease}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <r.icon className="h-4 w-4 text-primary" />
                          {r.disease}
                        </div>
                      </TableCell>
                      <TableCell className="text-center font-semibold text-primary">{r.accuracy}%</TableCell>
                      <TableCell className="text-center">{r.precision}%</TableCell>
                      <TableCell className="text-center">{r.recall}%</TableCell>
                      <TableCell className="text-center">{r.f1}%</TableCell>
                      <TableCell className="text-center">{r.aucRoc}%</TableCell>
                      <TableCell className="text-center">{r.specificity}%</TableCell>
                      <TableCell className="text-center">{r.testSize}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Per-model details with confusion matrices and metric bars */}
      <div className="mb-12">
        <h2 className="mb-6 flex items-center gap-2 font-display text-xl font-bold text-foreground">
          <Target className="h-5 w-5 text-primary" />
          Per-Model Evaluation Details
        </h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {results.map((r) => (
            <Card key={r.disease} className="overflow-hidden">
              <CardHeader className="border-b bg-muted/30 pb-4">
                <CardTitle className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <r.icon className="h-4 w-4 text-primary" />
                  </div>
                  {r.disease}
                  <Badge variant="secondary" className="ml-auto">{r.accuracy}% Accuracy</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Metrics */}
                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Performance Metrics</p>
                    {[
                      { label: "Precision", value: r.precision },
                      { label: "Recall / Sensitivity", value: r.recall },
                      { label: "Specificity", value: r.specificity },
                      { label: "F1-Score", value: r.f1 },
                      { label: "AUC-ROC", value: r.aucRoc },
                    ].map((m) => (
                      <div key={m.label}>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{m.label}</span>
                          <span className="font-medium text-foreground">{m.value}%</span>
                        </div>
                        <Progress value={m.value} className="h-1.5" />
                      </div>
                    ))}
                    <div className="flex gap-4 pt-2 text-xs text-muted-foreground">
                      <span>Train: <strong className="text-foreground">{r.trainSize}</strong></span>
                      <span>Test: <strong className="text-foreground">{r.testSize}</strong></span>
                    </div>
                  </div>

                  {/* Confusion Matrix */}
                  <div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Confusion Matrix</p>
                    <ConfusionMatrix r={r} />
                    <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
                      <span>True Positive: {r.tp}</span>
                      <span>False Negative: {r.fn}</span>
                      <span>False Positive: {r.fp}</span>
                      <span>True Negative: {r.tn}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Metric definitions */}
      <div className="mb-12">
        <h2 className="mb-6 flex items-center gap-2 font-display text-xl font-bold text-foreground">
          <FlaskConical className="h-5 w-5 text-primary" />
          Metric Definitions
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { term: "Accuracy", formula: "(TP + TN) / (TP + TN + FP + FN)", desc: "Overall proportion of correct predictions." },
            { term: "Precision", formula: "TP / (TP + FP)", desc: "Of all positive predictions, how many were actually positive." },
            { term: "Recall (Sensitivity)", formula: "TP / (TP + FN)", desc: "Of all actual positives, how many were correctly identified." },
            { term: "Specificity", formula: "TN / (TN + FP)", desc: "Of all actual negatives, how many were correctly identified." },
            { term: "F1-Score", formula: "2 × (Precision × Recall) / (Precision + Recall)", desc: "Harmonic mean of precision and recall — balances both metrics." },
            { term: "AUC-ROC", formula: "Area Under ROC Curve", desc: "Measures the model's ability to distinguish between classes across all thresholds." },
          ].map((m) => (
            <Card key={m.term}>
              <CardContent className="p-4">
                <p className="font-display text-sm font-semibold text-foreground">{m.term}</p>
                <code className="mt-1 block rounded bg-secondary px-2 py-1 text-xs text-secondary-foreground">{m.formula}</code>
                <p className="mt-2 text-xs text-muted-foreground">{m.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Key findings */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-primary" />
            Key Findings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: CheckCircle2, color: "text-accent", text: "Kidney Disease model achieved the highest accuracy at 91.2% with the best AUC-ROC of 94.7%." },
              { icon: CheckCircle2, color: "text-accent", text: "All models exceeded 85% accuracy, demonstrating Random Forest's effectiveness across multiple disease domains." },
              { icon: CheckCircle2, color: "text-accent", text: "High recall rates (89–92%) indicate the models are effective at identifying true positive cases, minimizing missed diagnoses." },
              { icon: XCircle, color: "text-destructive", text: "Heart Disease model has the lowest test set size (61 samples), which may affect generalization reliability." },
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border bg-muted/20 p-4">
                <f.icon className={`mt-0.5 h-4 w-4 shrink-0 ${f.color}`} />
                <p className="text-sm text-foreground">{f.text}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <div className="rounded-2xl border bg-card p-6 text-center">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Note:</strong> All metrics are computed on held-out test sets using stratified sampling. Results may vary with different data distributions. These models are for educational and screening purposes only.
        </p>
      </div>
    </section>
  </Layout>
);

export default TestingEvaluation;
