'use client';

import { useFormWizard } from '@/components/hooks/useFormWizard';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReactNode } from 'react';


export interface WizardStepProps<T, V = any> {
  step: number,
  data: T,
  updateData: (key: keyof T, value: V) => void
}

export interface WizardStep {
  title: string;
  description: string;
}

export interface WizardProps<T, V = any> {
  steps: WizardStep[],
  initialState: T,
  children: (props: WizardStepProps<T, V>) => ReactNode;
  onFinish: (formData: T) => void;
}

export function Wizard<T, V = any>({ steps, initialState, onFinish, children }: WizardProps<T, V>) {
  const { step, nextStep, previousStep, data, updateData } = useFormWizard<T, V>(initialState, steps.length);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{steps[step - 1].title}</CardTitle>
        <CardDescription>{steps[step - 1].description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            {steps.map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${i + 1 <= step ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
                >
                  {i + 1}
                </div>
                <span className="text-xs mt-1 w-[90px] text-center">{s.title}</span>
              </div>
            ))}
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>
        {children({ step, data, updateData })}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={previousStep} disabled={step === 1} variant="outline">
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button onClick={step === steps.length ? () => onFinish(data) : nextStep} disabled={step === 5}>
          {step === steps.length ? 'Finish' : 'Next'}{' '}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}