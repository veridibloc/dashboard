import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { InfoIcon } from 'lucide-react';

interface FieldLegendProps {
  text: string;
  tooltip?: string;
}

export function FieldLegend({tooltip, text}: FieldLegendProps) {
  return (
    <legend className="flex flex-row items-center mb-1">
      {text}
      {tooltip &&
      <Tooltip>
        <TooltipTrigger asChild>
          <InfoIcon
            height={20}
            width={20}
            className="ml-1 text-gray-300 cursor-help"
          />
        </TooltipTrigger>
        <TooltipContent className="max-w-md text-sm text-gray-500">
          {tooltip}
        </TooltipContent>
      </Tooltip>
      }
    </legend>
  );
}
