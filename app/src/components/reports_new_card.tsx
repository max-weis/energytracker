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
import { start } from "repl";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "~/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";

export function ReportsNewCard() {
  const form = useForm({
    defaultValues: {
      chartType: "line",
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
            <div className="flex space-x-6 items-end">
              <form.Field
                name="chartType"
                children={(field) => {
                  return (
                    <>
                      <Label htmlFor={field.name}>Chart Type</Label>
                      <Select
                        disabled={true}
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
                    </>
                  );
                }}
              />
              <form.Field
                name="startDate"
                children={(field) => {
                  return (
                    <>
                      <Label htmlFor={field.name}>Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[200px] pl-3 text-left font-normal",
                              !field.state.value && "text-muted-foreground",
                            )}
                          >
                            {field.state.value ? (
                              format(field.state.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
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
                    </>
                  );
                }}
              />
              <form.Field
                name="endDate"
                children={(field) => {
                  return (
                    <>
                      <Label htmlFor={field.name}>End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[200px] pl-3 text-left font-normal",
                              !field.state.value && "text-muted-foreground",
                            )}
                          >
                            {field.state.value ? (
                              format(field.state.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
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
                    </>
                  );
                }}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="mt-4 bg-primary text-background"
              variant="outline"
              type="submit"
            >
              Save Changes
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
