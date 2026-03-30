import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, BookOpen, Database, Brain, Code, FileText } from "lucide-react";

interface Reference {
  id: number;
  category: string;
  title: string;
  authors: string;
  source: string;
  year: string;
  url?: string;
  description: string;
}

const references: Reference[] = [
  {
    id: 1,
    category: "Dataset",
    title: "Pima Indians Diabetes Database",
    authors: "Smith, J.W., Everhart, J.E., Dickson, W.C., Knowler, W.C., & Johannes, R.S.",
    source: "UCI Machine Learning Repository / Kaggle",
    year: "1988",
    url: "https://www.kaggle.com/datasets/uciml/pima-indians-diabetes-database",
    description: "Originally from the National Institute of Diabetes and Digestive and Kidney Diseases. Contains 768 samples with 8 diagnostic measurements for diabetes prediction.",
  },
  {
    id: 2,
    category: "Dataset",
    title: "Cleveland Heart Disease Dataset",
    authors: "Janosi, A., Steinbrunn, W., Pfisterer, M., & Detrano, R.",
    source: "UCI Machine Learning Repository",
    year: "1988",
    url: "https://archive.ics.uci.edu/dataset/45/heart+disease",
    description: "Contains 303 instances with 14 attributes from the Cleveland Clinic Foundation for heart disease diagnosis prediction.",
  },
  {
    id: 3,
    category: "Dataset",
    title: "Chronic Kidney Disease Dataset",
    authors: "Soundarapandian, P. & Rubini, L.",
    source: "UCI Machine Learning Repository",
    year: "2015",
    url: "https://archive.ics.uci.edu/dataset/336/chronic+kidney+disease",
    description: "Dataset of 400 samples with 24 features collected from a hospital in India over a 2-month period for chronic kidney disease prediction.",
  },
  {
    id: 4,
    category: "Dataset",
    title: "Indian Liver Patient Dataset (ILPD)",
    authors: "Ramana, B.V., Babu, M.S.P., & Venkateswarlu, N.B.",
    source: "UCI Machine Learning Repository / Kaggle",
    year: "2012",
    url: "https://www.kaggle.com/datasets/uciml/indian-liver-patient-records",
    description: "Contains 583 liver patient records collected from Andhra Pradesh, India, with 10 features for liver disease prediction.",
  },
  {
    id: 5,
    category: "Algorithm",
    title: "Random Forests",
    authors: "Breiman, L.",
    source: "Machine Learning, 45(1), 5–32",
    year: "2001",
    url: "https://doi.org/10.1023/A:1010933404324",
    description: "Foundational paper introducing the Random Forest algorithm — an ensemble method that constructs multiple decision trees and outputs the mode of their predictions.",
  },
  {
    id: 6,
    category: "Algorithm",
    title: "Classification and Regression Trees (CART)",
    authors: "Breiman, L., Friedman, J., Stone, C.J., & Olshen, R.A.",
    source: "Chapman and Hall/CRC",
    year: "1984",
    description: "Seminal work on decision tree algorithms that form the basis of each tree in the Random Forest ensemble used in MediPredict.",
  },
  {
    id: 7,
    category: "Research",
    title: "A Comparative Study of Machine Learning Algorithms for Disease Prediction",
    authors: "Uddin, S., Khan, A., Hossain, M.E., & Moni, M.A.",
    source: "BMC Medical Informatics and Decision Making, 19(1), 281",
    year: "2019",
    url: "https://doi.org/10.1186/s12911-019-1004-8",
    description: "Comprehensive comparison of ML algorithms for disease prediction, demonstrating the effectiveness of Random Forest on medical datasets.",
  },
  {
    id: 8,
    category: "Research",
    title: "Machine Learning Approaches for Chronic Kidney Disease Detection",
    authors: "Aljaaf, A.J., Al-Jumeily, D., Hussain, A.J., et al.",
    source: "Journal of Medical Systems, 42(4), 61",
    year: "2018",
    url: "https://doi.org/10.1007/s10916-018-0921-x",
    description: "Study evaluating machine learning techniques including Random Forest for early detection of chronic kidney disease.",
  },
  {
    id: 9,
    category: "Research",
    title: "Prediction of Heart Disease Using Random Forest and Feature Importance",
    authors: "Mohan, S., Thirumalai, C., & Srivastava, G.",
    source: "International Journal of Interactive Multimedia and Artificial Intelligence, 6(2), 11–21",
    year: "2019",
    url: "https://doi.org/10.9781/ijimai.2019.01.003",
    description: "Research on heart disease prediction using Random Forest with hybrid feature selection techniques.",
  },
  {
    id: 10,
    category: "Technology",
    title: "React: A JavaScript Library for Building User Interfaces",
    authors: "Meta Platforms, Inc.",
    source: "https://react.dev",
    year: "2024",
    url: "https://react.dev",
    description: "The frontend JavaScript library used to build the MediPredict user interface with a component-based architecture.",
  },
  {
    id: 11,
    category: "Technology",
    title: "Supabase: The Open-Source Firebase Alternative",
    authors: "Supabase, Inc.",
    source: "https://supabase.com",
    year: "2024",
    url: "https://supabase.com",
    description: "Backend-as-a-service platform providing the database, authentication, and edge functions powering MediPredict's prediction API.",
  },
  {
    id: 12,
    category: "Technology",
    title: "Tailwind CSS: A Utility-First CSS Framework",
    authors: "Tailwind Labs",
    source: "https://tailwindcss.com",
    year: "2024",
    url: "https://tailwindcss.com",
    description: "Utility-first CSS framework used for building the responsive and accessible design system of MediPredict.",
  },
  {
    id: 13,
    category: "Research",
    title: "Liver Disease Prediction Using Machine Learning Algorithms",
    authors: "Singh, J., Bagga, S., & Kaur, R.",
    source: "International Journal of Computer Applications, 164(7), 33–37",
    year: "2017",
    description: "Comparative study of machine learning algorithms for liver disease prediction using the Indian Liver Patient Dataset.",
  },
  {
    id: 14,
    category: "Research",
    title: "Diabetes Prediction Using Ensemble Machine Learning Techniques",
    authors: "Zou, Q., Qu, K., Luo, Y., Yin, D., Ju, Y., & Tang, H.",
    source: "BMC Bioinformatics, 19(1), 338",
    year: "2018",
    url: "https://doi.org/10.1186/s12859-018-2447-x",
    description: "Study demonstrating the superiority of ensemble methods including Random Forest for diabetes prediction using clinical data.",
  },
];

const categoryIcons: Record<string, React.ElementType> = {
  Dataset: Database,
  Algorithm: Brain,
  Research: BookOpen,
  Technology: Code,
};

const categoryColors: Record<string, string> = {
  Dataset: "bg-primary/10 text-primary border-primary/20",
  Algorithm: "bg-accent/10 text-accent border-accent/20",
  Research: "bg-secondary text-secondary-foreground border-secondary",
  Technology: "bg-muted text-muted-foreground border-muted",
};

const References = () => {
  const categories = ["Dataset", "Algorithm", "Research", "Technology"];

  return (
    <Layout>
      <section className="container py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <FileText className="h-3.5 w-3.5" />
            Academic References
          </div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            References
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Datasets, research papers, algorithms, and technologies referenced in the MediPredict multi-disease prediction system.
          </p>
        </div>

        {/* Summary */}
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat];
            const count = references.filter((r) => r.category === cat).length;
            return (
              <Card key={cat} className="text-center">
                <CardContent className="pt-6">
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <p className="font-display text-sm font-semibold text-foreground">{cat}</p>
                  <p className="mt-1 text-2xl font-bold text-primary">{count}</p>
                  <p className="text-xs text-muted-foreground">references</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* References by category */}
        <div className="space-y-10">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat];
            const items = references.filter((r) => r.category === cat);
            return (
              <div key={cat}>
                <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold text-foreground">
                  <Icon className="h-5 w-5 text-primary" />
                  {cat === "Algorithm" ? "Algorithms" : cat === "Research" ? "Research Papers" : cat === "Technology" ? "Technologies" : "Datasets"}
                </h2>
                <div className="space-y-4">
                  {items.map((ref) => (
                    <Card key={ref.id} className="transition-all hover:shadow-md">
                      <CardContent className="p-5">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0 flex-1">
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                              <Badge variant="outline" className={categoryColors[ref.category]}>
                                {ref.category}
                              </Badge>
                              <span className="text-xs text-muted-foreground">[{ref.id}]</span>
                            </div>
                            <h3 className="font-display text-base font-semibold text-foreground">
                              {ref.title}
                            </h3>
                            <p className="mt-1 text-sm text-muted-foreground">{ref.authors}</p>
                            <p className="mt-0.5 text-sm italic text-muted-foreground">
                              {ref.source}, {ref.year}
                            </p>
                            <p className="mt-2 text-sm text-muted-foreground">{ref.description}</p>
                          </div>
                          {ref.url && (
                            <a
                              href={ref.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex shrink-0 items-center gap-1 rounded-md border bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
                            >
                              <ExternalLink className="h-3 w-3" />
                              View Source
                            </a>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Citation note */}
        <div className="mt-12 rounded-2xl border bg-card p-6 text-center">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Citation Format:</strong> References follow APA style. All datasets and research papers are publicly available for academic and educational use.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default References;
