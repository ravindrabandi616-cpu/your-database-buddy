import { Activity } from "lucide-react";

const Footer = () => (
  <footer className="border-t bg-card py-8">
    <div className="container flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
      <div className="flex items-center gap-2 font-display text-lg font-bold text-primary">
        <Activity className="h-5 w-5" />
        MediPredict
      </div>
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} MediPredict. For educational purposes only — not a substitute for professional medical advice.
      </p>
    </div>
  </footer>
);

export default Footer;
