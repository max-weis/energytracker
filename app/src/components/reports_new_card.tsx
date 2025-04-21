import { useForm } from "@tanstack/react-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "~/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { ReportsWidgetSelector } from "./reports_widget_selector";

export function ReportsNewCard() {
  const form = useForm({
    defaultValues: {
      chartType: "line",
      attribute: "electricity_readings.kwh_difference",
      startDate: new Date(),
      endDate: new Date(),
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <div className="bg-background">
      <Card>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <CardHeader>
            <CardTitle>New Reports</CardTitle>
            <CardDescription>
              Create a new report for your energy usage.
            </CardDescription>
          </CardHeader>

          <CardContent className="py-6">
            {/* Flex container with three columns, labels above inputs */}
            <div className="flex space-x-6 items-start">
             
              {/* Table */}
              <div className="flex flex-col space-y-1">
                <Label htmlFor="chartType">Attribute</Label>
                <form.Field
                  name="attribute"
                  children={(field) => <ReportsWidgetSelector />}
                />
              </div>

              {/* Chart Type */}
              <div className="flex flex-col space-y-1">
                <Label htmlFor="chartType">Chart Type</Label>
                <form.Field
                  name="chartType"
                  children={(field) => (
                    <Select
                      disabled
                      name={field.name}
                      onValueChange={field.handleChange}
                      defaultValue={field.state.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a chart type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="line">Line</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* Start Date */}
              <div className="flex flex-col space-y-1">
                <Label htmlFor="startDate">Start Date</Label>
                <form.Field
                  name="startDate"
                  children={(field) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-[200px] pl-3 text-left font-normal",
                            !field.state.value && "text-muted-foreground",
                          )}
                        >
                          {field.state.value
                            ? format(field.state.value, "PPP")
                            : "Pick a date"}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 bg-background"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.state.value}
                          onSelect={(date) => {
                            if (date) field.handleChange(date);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
              </div>

              {/* End Date */}
              <div className="flex flex-col space-y-1">
                <Label htmlFor="endDate">End Date</Label>
                <form.Field
                  name="endDate"
                  children={(field) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-[200px] pl-3 text-left font-normal",
                            !field.state.value && "text-muted-foreground",
                          )}
                        >
                          {field.state.value
                            ? format(field.state.value, "PPP")
                            : "Pick a date"}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 bg-background"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.state.value}
                          onSelect={(date) => {
                            if (date) field.handleChange(date);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              variant="outline"
              className="mt-4 bg-primary text-background"
            >
              Save Changes
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
