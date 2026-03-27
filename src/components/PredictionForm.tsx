import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LucideIcon, Loader2 } from "lucide-react";
import { useState } from "react";

export interface FieldConfig {
  name: string;
  label: string;
  type: "number" | "select";
  placeholder?: string;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
}

interface PredictionFormProps {
  title: string;
  description: string;
  icon: LucideIcon;
  fields: FieldConfig[];
  onSubmit: (data: Record<string, any>) => void;
}

const PredictionForm = ({ title, description, icon: Icon, fields, onSubmit }: PredictionFormProps) => {
  const [loading, setLoading] = useState(false);

  // Build dynamic zod schema
  const schemaShape: Record<string, z.ZodTypeAny> = {};
  fields.forEach((f) => {
    if (f.type === "number") {
      let s = z.coerce.number({ invalid_type_error: `${f.label} is required` });
      if (f.min !== undefined) s = s.min(f.min, `Min ${f.min}`);
      if (f.max !== undefined) s = s.max(f.max, `Max ${f.max}`);
      schemaShape[f.name] = s;
    } else {
      schemaShape[f.name] = z.string().min(1, `${f.label} is required`);
    }
  });
  const schema = z.object(schemaShape);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: fields.reduce((acc, f) => ({ ...acc, [f.name]: "" }), {} as Record<string, any>),
  });

  const handleSubmit = async (data: Record<string, any>) => {
    setLoading(true);
    // Simulate prediction delay
    await new Promise((r) => setTimeout(r, 1500));
    onSubmit(data);
    setLoading(false);
  };

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="font-display text-xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4 sm:grid-cols-2">
            {fields.map((fieldConfig) => (
              <FormField
                key={fieldConfig.name}
                control={form.control}
                name={fieldConfig.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{fieldConfig.label}</FormLabel>
                    <FormControl>
                      {fieldConfig.type === "select" ? (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder={fieldConfig.placeholder || "Select..."} />
                          </SelectTrigger>
                          <SelectContent>
                            {fieldConfig.options?.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          type="number"
                          step={fieldConfig.step || "any"}
                          placeholder={fieldConfig.placeholder}
                          {...field}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <div className="col-span-full pt-2">
              <Button type="submit" className="w-full gap-2" disabled={loading}>
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {loading ? "Analyzing..." : "Predict"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PredictionForm;
