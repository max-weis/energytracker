import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { ChevronsUpDown } from "lucide-react";

const attributes = {
  gas_prices: ["base_price", "unit_price"],
  electricity_prices: ["base_price", "unit_price"],
  gas_readings: ["kwh", "kwh_difference", "kwh_difference_percentage", "price"],
  electricity_readings: [
    "kwh",
    "kwh_difference",
    "kwh_difference_percentage",
    "price",
  ],
};

function humanize(str: string): string {
 const withSpaces = str.replace(/_/g, " ");
 return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
}

export function ReportsWidgetSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAttribute, setSelectedAttribute] = useState<string | null>(null);

  return (
    <div>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-[200px] justify-between"
          >
            Select a attribute
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0 bg-background">
          <Command>
            <CommandInput placeholder="Select a attribute" />
            <CommandList>
              {Object.keys(attributes).map((key) => (
                <CommandGroup key={key} heading={key}>
                  {attributes[key].map((value: string) => (
                    <CommandItem key={value} value={value} className="hover:bg-gray-100 cursor-pointer"  onSelect={() => setSelectedAttribute(value)}>
                      {humanize(value)}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
