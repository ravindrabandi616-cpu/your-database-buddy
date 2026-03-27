import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import DatasetCollection from "./pages/DatasetCollection";
import DiabetesPrediction from "./pages/DiabetesPrediction";
import HeartPrediction from "./pages/HeartPrediction";
import KidneyPrediction from "./pages/KidneyPrediction";
import LiverPrediction from "./pages/LiverPrediction";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/datasets" element={<DatasetCollection />} />
          <Route path="/predict/diabetes" element={<DiabetesPrediction />} />
          <Route path="/predict/heart" element={<HeartPrediction />} />
          <Route path="/predict/kidney" element={<KidneyPrediction />} />
          <Route path="/predict/liver" element={<LiverPrediction />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
