import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, LucideIcon } from "lucide-react";

interface DiseaseCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  color: string;
}

const DiseaseCard = ({ title, description, icon: Icon, to, color }: DiseaseCardProps) => (
  <Card className="group overflow-hidden border-2 border-transparent transition-all hover:border-primary/20 hover:shadow-lg">
    <CardContent className="flex flex-col gap-4 p-6">
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl"
        style={{ backgroundColor: `hsl(${color} / 0.12)`, color: `hsl(${color})` }}
      >
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <Link to={to}>
        <Button variant="outline" className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground">
          Start Prediction
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </Link>
    </CardContent>
  </Card>
);

export default DiseaseCard;
