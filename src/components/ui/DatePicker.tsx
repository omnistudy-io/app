"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/Calender";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";

export function DatePicker(props: DatePickerProps) {
  // const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            " justify-start text-left font-normal text-sm border bg-stone-100 rounded-md outline-none hover:bg-[#34354a] p-2 shadow-none h-auto text-black hover:text-white",
            !props.value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {props.value ? format(props.value, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={props.value}
          onSelect={props.onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

// Props
type DatePickerProps = {
  value: Date;
  onChange: React.Dispatch<React.SetStateAction<Date | undefined>>;
}
