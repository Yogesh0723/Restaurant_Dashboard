"use client";

import { Button } from "@/components/ui/button";

interface TimeRangeSelectorProps {
  selectedRange: string;
  onRangeChange: (range: string) => void;
}

export function TimeRangeSelector({ selectedRange, onRangeChange }: TimeRangeSelectorProps) {
  const ranges = [
    { label: "12 Months", value: "12m" },
    { label: "6 Months", value: "6m" },
    { label: "30 Days", value: "30d" },
    { label: "7 Days", value: "7d" },
  ];

  return (
    <div className="flex gap-2">
      {ranges.map((range) => (
        <Button
          key={range.value}
          variant={selectedRange === range.value ? "default" : "outline"}
          onClick={() => onRangeChange(range.value)}
          size="sm"
        >
          {range.label}
        </Button>
      ))}
    </div>
  );
}