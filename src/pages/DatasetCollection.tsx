import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Droplets,
  Heart,
  Activity,
  Stethoscope,
  Download,
  Database,
  FileSpreadsheet,
  ExternalLink,
  LucideIcon,
} from "lucide-react";

interface DatasetInfo {
  id: string;
  disease: string;
  icon: LucideIcon;
  source: string;
  sourceUrl: string;
  rows: number;
  features: number;
  format: string;
  size: string;
  description: string;
  columns: string[];
  license: string;
}

const datasets: DatasetInfo[] = [
  {
    id: "diabetes",
    disease: "Diabetes",
    icon: Droplets,
    source: "Pima Indians Diabetes — UCI / Kaggle",
    sourceUrl: "https://www.kaggle.com/datasets/uciml/pima-indians-diabetes-database",
    rows: 768,
    features: 8,
    format: "CSV",
    size: "24 KB",
    description:
      "Originally from the National Institute of Diabetes and Digestive and Kidney Diseases. The objective is to predict whether a patient has diabetes based on diagnostic measurements.",
    columns: [
      "Pregnancies",
      "Glucose",
      "BloodPressure",
      "SkinThickness",
      "Insulin",
      "BMI",
      "DiabetesPedigreeFunction",
      "Age",
    ],
    license: "CC0: Public Domain",
  },
  {
    id: "heart",
    disease: "Heart Disease",
    icon: Heart,
    source: "Cleveland Heart Disease — UCI",
    sourceUrl: "https://archive.ics.uci.edu/dataset/45/heart+disease",
    rows: 303,
    features: 13,
    format: "CSV",
    size: "12 KB",
    description:
      "Contains 76 attributes, but published experiments refer to a subset of 14. The 'target' field refers to the presence of heart disease in the patient.",
    columns: [
      "Age",
      "Sex",
      "ChestPainType",
      "RestingBP",
      "Cholesterol",
      "FastingBS",
      "RestECG",
      "MaxHR",
      "ExerciseAngina",
      "Oldpeak",
      "ST_Slope",
      "MajorVessels",
      "Thal",
    ],
    license: "CC BY 4.0",
  },
  {
    id: "kidney",
    disease: "Kidney Disease",
    icon: Activity,
    source: "Chronic Kidney Disease — UCI",
    sourceUrl: "https://archive.ics.uci.edu/dataset/336/chronic+kidney+disease",
    rows: 400,
    features: 24,
    format: "CSV",
    size: "28 KB",
    description:
      "Dataset collected over a 2-month period from a hospital in India. It contains 24 features used to predict chronic kidney disease.",
    columns: [
      "Age",
      "BloodPressure",
      "SpecificGravity",
      "Albumin",
      "Sugar",
      "BloodGlucoseRandom",
      "BloodUrea",
      "SerumCreatinine",
      "Sodium",
      "Potassium",
      "Hemoglobin",
      "WhiteBloodCellCount",
    ],
    license: "CC BY 4.0",
  },
  {
    id: "liver",
    disease: "Liver Disease",
    icon: Stethoscope,
    source: "Indian Liver Patient — UCI / Kaggle",
    sourceUrl: "https://www.kaggle.com/datasets/uciml/indian-liver-patient-records",
    rows: 583,
    features: 10,
    format: "CSV",
    size: "18 KB",
    description:
      "Collected from patients in Andhra Pradesh, India. Contains liver patient records and non-liver patient records. The dataset is used to evaluate prediction algorithms.",
    columns: [
      "Age",
      "Gender",
      "TotalBilirubin",
      "DirectBilirubin",
      "AlkalinePhosphatase",
      "SGPT",
      "SGOT",
      "TotalProteins",
      "Albumin",
      "A/G Ratio",
    ],
    license: "CC0: Public Domain",
  },
];

const DatasetCollection = () => (
  <Layout>
    <section className="container py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          <Database className="h-3.5 w-3.5" />
          Open Source
        </div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
          Dataset Collection
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Browse the curated datasets powering each prediction model. All datasets are sourced from
          reputable public repositories and are freely available for research and educational use.
        </p>
      </div>

      {/* Summary cards */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {datasets.map((ds) => (
          <Card key={ds.id} className="border-transparent transition-all hover:border-primary/20 hover:shadow-md">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <ds.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-semibold text-foreground">{ds.disease}</p>
                <p className="text-xs text-muted-foreground">
                  {ds.rows.toLocaleString()} rows · {ds.features} features
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed cards */}
      <div className="space-y-8">
        {datasets.map((ds) => (
          <Card key={ds.id} id={ds.id} className="overflow-hidden">
            <CardHeader className="border-b bg-muted/30">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <ds.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-display text-lg">{ds.disease} Dataset</CardTitle>
                    <CardDescription className="mt-1">{ds.source}</CardDescription>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="gap-1 text-xs">
                    <FileSpreadsheet className="h-3 w-3" /> {ds.format}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">{ds.size}</Badge>
                  <Badge variant="outline" className="text-xs">{ds.license}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <p className="mb-4 text-sm text-muted-foreground">{ds.description}</p>

              <div className="mb-4 grid gap-4 text-sm sm:grid-cols-3">
                <div className="rounded-lg border bg-muted/20 p-3 text-center">
                  <p className="font-display text-xl font-bold text-foreground">{ds.rows.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Samples</p>
                </div>
                <div className="rounded-lg border bg-muted/20 p-3 text-center">
                  <p className="font-display text-xl font-bold text-foreground">{ds.features}</p>
                  <p className="text-xs text-muted-foreground">Features</p>
                </div>
                <div className="rounded-lg border bg-muted/20 p-3 text-center">
                  <p className="font-display text-xl font-bold text-foreground">1</p>
                  <p className="text-xs text-muted-foreground">Target</p>
                </div>
              </div>

              {/* Columns preview */}
              <div className="mb-5 rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-8">#</TableHead>
                      <TableHead>Feature / Column Name</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ds.columns.map((col, i) => (
                      <TableRow key={col}>
                        <TableCell className="font-mono text-xs text-muted-foreground">{i + 1}</TableCell>
                        <TableCell className="font-medium">{col}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex flex-wrap gap-3">
                <a href={ds.sourceUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    View Source
                  </Button>
                </a>
                <a href={ds.sourceUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="gap-2">
                    <Download className="h-4 w-4" />
                    Download Dataset
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  </Layout>
);

export default DatasetCollection;
