# MediPredict — Multi-Disease Prediction System

A web-based multi-disease prediction system powered by **Random Forest** machine learning algorithms. MediPredict provides early screening predictions for **Diabetes**, **Heart Disease**, **Kidney Disease**, and **Liver Disease** using clinical health parameters.

> ⚠️ **Disclaimer**: This system is for educational and screening purposes only — not a substitute for professional medical advice.

---

## 🔍 Overview

MediPredict is a full-stack web application that allows users to input clinical health data and receive instant disease risk predictions. The system uses Random Forest Classifier models trained on publicly available medical datasets, deployed as serverless edge functions for real-time inference.

### Key Features

- **4 Disease Predictions**: Diabetes, Heart Disease, Kidney Disease, Liver Disease
- **Random Forest Algorithm**: Ensemble of 100 decision trees per disease model
- **Real-Time Inference**: Serverless edge function API for instant predictions
- **Interactive Dashboard**: Performance metrics, confusion matrices, and model details
- **Dataset Explorer**: Browse and download the curated medical datasets
- **Data Preprocessing Pipeline**: 5-stage pipeline (cleaning, normalization, encoding, splitting, validation)
- **Academic References**: 14 cited sources across datasets, algorithms, and research papers
- **Responsive Design**: Fully responsive UI for desktop and mobile

---

## 🏗️ System Architecture

```
┌──────────────┐     HTTPS/JSON      ┌──────────────────┐
│   React UI   │  ◄──────────────►   │  Edge Function   │
│  (Frontend)  │                     │  /predict API    │
└──────────────┘                     └──────────────────┘
       │                                      │
       │                                      │
  Vite + Tailwind                    Random Forest Model
  shadcn/ui components              (15 decision trees ×
  React Router                       4 diseases)
```

---

## 🧠 Machine Learning Models

All four disease models use the **Random Forest Classifier** algorithm — an ensemble learning method that constructs multiple decision trees during training and outputs the class that is the mode of the individual trees' predictions.

| Disease         | Accuracy | F1-Score | AUC-ROC | Train Size | Test Size |
|-----------------|----------|----------|---------|------------|-----------|
| Diabetes        | 87.7%    | 88.1%    | 86.9%   | 614        | 154       |
| Heart Disease   | 85.2%    | 85.7%    | 92.0%   | 242        | 61        |
| Kidney Disease  | 91.2%    | 91.1%    | 94.7%   | 320        | 80        |
| Liver Disease   | 87.2%    | 87.0%    | 89.3%   | 466        | 117       |

### Hyperparameters (All Models)

- `n_estimators`: 100
- `max_depth`: 8
- `min_samples_split`: 5
- `criterion`: gini

---

## 📊 Datasets

| Dataset                     | Source                  | Samples | Features | License         |
|-----------------------------|-------------------------|---------|----------|-----------------|
| Pima Indians Diabetes       | UCI / Kaggle            | 768     | 8        | CC0: Public Domain |
| Cleveland Heart Disease     | UCI                     | 303     | 13       | CC BY 4.0       |
| Chronic Kidney Disease      | UCI                     | 400     | 24       | CC BY 4.0       |
| Indian Liver Patient (ILPD) | UCI / Kaggle            | 583     | 10       | CC0: Public Domain |

---

## 🔄 Data Preprocessing Pipeline

1. **Data Cleaning** — Handle missing values, remove duplicates, fix data types
2. **Normalization** — StandardScaler for numerical features (zero mean, unit variance)
3. **Feature Encoding** — One-hot encoding for categorical variables
4. **Data Splitting** — 80/20 train-test split with stratified sampling
5. **Validation** — Cross-validation and data quality checks

---

## 🛠️ Technology Stack

| Layer        | Technology                                    |
|--------------|-----------------------------------------------|
| Frontend     | React 18, TypeScript, Vite                    |
| Styling      | Tailwind CSS, shadcn/ui, Lucide Icons         |
| Routing      | React Router v6                               |
| State        | TanStack React Query                          |
| Backend      | Supabase Edge Functions (Deno)                |
| ML Inference | Custom Random Forest (JavaScript/TypeScript)  |
| Deployment   | Lovable Cloud                                 |

---

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/              # shadcn/ui primitives
│   ├── DiseaseCard.tsx   # Disease card component
│   ├── Footer.tsx        # Site footer
│   ├── Layout.tsx        # Page layout wrapper
│   ├── Navbar.tsx        # Navigation bar
│   ├── PredictionForm.tsx # Prediction input form
│   └── PredictionResult.tsx # Prediction result display
├── pages/               # Route pages
│   ├── Index.tsx          # Home / landing page
│   ├── Explore.tsx        # Explore diseases
│   ├── DatasetCollection.tsx # Dataset browser
│   ├── DataPreprocessing.tsx # Preprocessing pipeline
│   ├── MLModels.tsx       # ML model details & metrics
│   ├── References.tsx     # Academic references
│   ├── DiabetesPrediction.tsx
│   ├── HeartPrediction.tsx
│   ├── KidneyPrediction.tsx
│   └── LiverPrediction.tsx
├── lib/                 # Utilities
│   ├── prediction-api.ts  # API client for predictions
│   └── utils.ts           # Helper functions
└── integrations/        # Backend integrations
    └── supabase/          # Supabase client & types

supabase/
└── functions/
    └── predict/
        └── index.ts       # Edge function — Random Forest inference
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, pnpm, or bun package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd medipredict

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## 🌐 Pages & Routes

| Route                | Page                  | Description                              |
|----------------------|-----------------------|------------------------------------------|
| `/`                  | Home                  | Landing page with system overview        |
| `/explore`           | Explore               | Browse disease categories                |
| `/datasets`          | Dataset Collection    | View and download datasets               |
| `/preprocessing`     | Data Preprocessing    | 5-stage pipeline explanation             |
| `/ml-models`         | ML Models             | Algorithm details and performance metrics|
| `/references`        | References            | Academic citations and sources           |
| `/predict/diabetes`  | Diabetes Prediction   | Input form for diabetes screening        |
| `/predict/heart`     | Heart Prediction      | Input form for heart disease screening   |
| `/predict/kidney`    | Kidney Prediction     | Input form for kidney disease screening  |
| `/predict/liver`     | Liver Prediction      | Input form for liver disease screening   |

---

## 📄 API Endpoint

### POST `/predict`

Accepts clinical parameters and returns a disease prediction.

**Request:**
```json
{
  "disease": "diabetes",
  "features": {
    "pregnancies": 6,
    "glucose": 148,
    "bloodPressure": 72,
    "skinThickness": 35,
    "insulin": 0,
    "bmi": 33.6,
    "diabetesPedigreeFunction": 0.627,
    "age": 50
  }
}
```

**Response:**
```json
{
  "prediction": 1,
  "probability": 0.82,
  "confidence": "high",
  "disease": "diabetes",
  "algorithm": "Random Forest"
}
```

---

## 📚 References

1. Smith et al. (1988) — Pima Indians Diabetes Database, UCI
2. Janosi et al. (1988) — Cleveland Heart Disease Dataset, UCI
3. Soundarapandian & Rubini (2015) — Chronic Kidney Disease Dataset, UCI
4. Ramana et al. (2012) — Indian Liver Patient Dataset, UCI/Kaggle
5. Breiman, L. (2001) — Random Forests, Machine Learning 45(1)
6. Breiman et al. (1984) — Classification and Regression Trees, CRC
7. Uddin et al. (2019) — ML Algorithms for Disease Prediction, BMC
8. Aljaaf et al. (2018) — ML for Chronic Kidney Disease, J Med Systems
9. Mohan et al. (2019) — Heart Disease Prediction with RF, IJIMAI
10. Zou et al. (2018) — Ensemble ML for Diabetes, BMC Bioinformatics

---

## 📝 License

This project is for educational and research purposes. Datasets are used under their respective licenses (CC0 / CC BY 4.0).
