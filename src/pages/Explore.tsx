import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import DiseaseCard from "@/components/DiseaseCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heart, Droplets, Activity, Stethoscope, Search, SlidersHorizontal } from "lucide-react";

const categories = ["All", "Metabolic", "Cardiovascular", "Organ"] as const;

const diseases = [
  {
    title: "Diabetes Prediction",
    description: "Predict diabetes risk based on glucose, BMI, insulin levels, and other health parameters using validated ML models.",
    icon: Droplets,
    to: "/predict/diabetes",
    color: "var(--medical-blue)",
    category: "Metabolic",
    params: 8,
  },
  {
    title: "Heart Disease Prediction",
    description: "Assess heart disease risk using blood pressure, cholesterol, chest pain type, and cardiac indicators.",
    icon: Heart,
    to: "/predict/heart",
    color: "var(--medical-red)",
    category: "Cardiovascular",
    params: 8,
  },
  {
    title: "Kidney Disease Prediction",
    description: "Evaluate kidney health risk through creatinine, blood urea, albumin, hemoglobin, and related markers.",
    icon: Activity,
    to: "/predict/kidney",
    color: "var(--medical-green)",
    category: "Organ",
    params: 8,
  },
  {
    title: "Liver Disease Prediction",
    description: "Assess liver condition risk based on bilirubin, alkaline phosphatase, SGPT, SGOT, and protein levels.",
    icon: Stethoscope,
    to: "/predict/liver",
    color: "var(--medical-orange)",
    category: "Organ",
    params: 8,
  },
];

const Explore = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    return diseases.filter((d) => {
      const matchesSearch =
        d.title.toLowerCase().includes(search.toLowerCase()) ||
        d.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === "All" || d.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <Layout>
      <section className="container py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            Explore Models
          </h1>
          <p className="mt-2 text-muted-foreground">
            Browse all available disease prediction models and start your health assessment.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search diseases..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            {categories.map((cat) => (
              <Button
                key={cat}
                size="sm"
                variant={activeCategory === cat ? "default" : "outline"}
                onClick={() => setActiveCategory(cat)}
                className="text-xs"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Results */}
        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {filtered.map((d) => (
              <DiseaseCard key={d.to} {...d} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-16 text-center">
            <Search className="mb-3 h-8 w-8 text-muted-foreground/50" />
            <p className="font-display text-lg font-semibold text-foreground">No models found</p>
            <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Info */}
        <div className="mt-12 rounded-2xl border bg-card p-6 text-center">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Disclaimer:</strong> These predictions are for educational and screening purposes only.
            Always consult a qualified healthcare professional for medical advice and diagnosis.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Explore;
