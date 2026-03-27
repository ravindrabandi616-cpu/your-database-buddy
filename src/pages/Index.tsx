import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Heart, Droplets, Activity, Stethoscope, ShieldCheck, BarChart3, Brain, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: Brain, label: "ML Models", value: "4+" },
  { icon: ShieldCheck, label: "Accuracy", value: "90%+" },
  { icon: BarChart3, label: "Parameters", value: "30+" },
];

const highlights = [
  {
    icon: Droplets,
    title: "Diabetes",
    desc: "Glucose, BMI & insulin analysis",
    to: "/predict/diabetes",
  },
  {
    icon: Heart,
    title: "Heart Disease",
    desc: "Cardiac risk indicators",
    to: "/predict/heart",
  },
  {
    icon: Activity,
    title: "Kidney Disease",
    desc: "Renal health markers",
    to: "/predict/kidney",
  },
  {
    icon: Stethoscope,
    title: "Liver Disease",
    desc: "Enzyme & bilirubin levels",
    to: "/predict/liver",
  },
];

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

      <div className="container relative py-20 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Health Screening
          </div>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Multi Disease{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Prediction
            </span>{" "}
            System
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            Enter your health parameters and get instant risk assessments for multiple diseases using advanced machine learning models.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/explore">
              <Button size="lg" className="gap-2 text-base">
                Explore Models
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/predict/diabetes">
              <Button size="lg" variant="outline" className="text-base">
                Quick Predict
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-16 flex max-w-md justify-center gap-10">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1.5 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="font-display text-2xl font-bold text-foreground">{stat.value}</span>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Quick access cards */}
    <section className="border-t bg-card/50">
      <div className="container py-16">
        <div className="mb-10 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            Available Prediction Models
          </h2>
          <p className="mt-2 text-muted-foreground">
            Select a disease category to begin your health assessment
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h) => (
            <Link
              key={h.to}
              to={h.to}
              className="group flex flex-col items-center gap-3 rounded-2xl border bg-card p-6 text-center transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <h.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-sm font-semibold text-foreground">{h.title}</h3>
              <p className="text-xs text-muted-foreground">{h.desc}</p>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/explore">
            <Button variant="outline" className="gap-2">
              View All Models
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>

    {/* How it works */}
    <section className="container py-16">
      <h2 className="mb-10 text-center font-display text-2xl font-bold text-foreground md:text-3xl">
        How It Works
      </h2>
      <div className="mx-auto grid max-w-3xl gap-8 md:grid-cols-3">
        {[
          { step: "01", title: "Choose Disease", desc: "Select from our available prediction models" },
          { step: "02", title: "Enter Parameters", desc: "Fill in your health data in the form" },
          { step: "03", title: "Get Results", desc: "Receive instant AI-powered risk assessment" },
        ].map((s) => (
          <div key={s.step} className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary font-display text-lg font-bold text-primary-foreground">
              {s.step}
            </div>
            <h3 className="font-display text-base font-semibold text-foreground">{s.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  </Layout>
);

export default Index;
