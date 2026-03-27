import Layout from "@/components/Layout";
import DiseaseCard from "@/components/DiseaseCard";
import { Heart, Droplets, Activity, Stethoscope, ShieldCheck, BarChart3, Brain } from "lucide-react";

const diseases = [
  {
    title: "Diabetes Prediction",
    description: "Predict diabetes risk based on glucose, BMI, insulin levels, and other health parameters.",
    icon: Droplets,
    to: "/predict/diabetes",
    color: "var(--medical-blue)",
  },
  {
    title: "Heart Disease Prediction",
    description: "Assess heart disease risk using blood pressure, cholesterol, and cardiac indicators.",
    icon: Heart,
    to: "/predict/heart",
    color: "var(--medical-red)",
  },
  {
    title: "Kidney Disease Prediction",
    description: "Evaluate kidney health risk through creatinine, blood urea, and related markers.",
    icon: Activity,
    to: "/predict/kidney",
    color: "var(--medical-green)",
  },
  {
    title: "Liver Disease Prediction",
    description: "Assess liver condition risk based on bilirubin, enzymes, and protein levels.",
    icon: Stethoscope,
    to: "/predict/liver",
    color: "var(--medical-orange)",
  },
];

const stats = [
  { icon: Brain, label: "ML Models", value: "4+" },
  { icon: ShieldCheck, label: "Accuracy", value: "90%+" },
  { icon: BarChart3, label: "Parameters", value: "30+" },
];

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="container py-16 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
          AI-Powered Health Screening
        </div>
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Multi Disease{" "}
          <span className="text-primary">Prediction</span>{" "}
          System
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Enter your health parameters and get instant risk assessments for multiple diseases using machine learning models.
        </p>
      </div>

      {/* Stats */}
      <div className="mx-auto mt-12 flex max-w-md justify-center gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-1 text-center">
            <stat.icon className="h-5 w-5 text-primary" />
            <span className="font-display text-2xl font-bold text-foreground">{stat.value}</span>
            <span className="text-xs text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>

    {/* Disease Cards */}
    <section className="container pb-16">
      <h2 className="mb-8 text-center font-display text-2xl font-bold text-foreground">
        Choose a Prediction Model
      </h2>
      <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
        {diseases.map((d) => (
          <DiseaseCard key={d.to} {...d} />
        ))}
      </div>
    </section>
  </Layout>
);

export default Index;
