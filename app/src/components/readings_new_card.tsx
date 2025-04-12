import { useForm } from "@tanstack/react-form";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { loadLatestReadingsOpts } from "~/funcs/readings_load_latest";

export function ReadingsNewCard() {
  const { data } = useSuspenseQuery(loadLatestReadingsOpts());

  const form = useForm({
    defaultValues: {
      electricity: data.electricity || 0,
      gas: data.gas || 0,
    },
    onSubmit: async ({ value }) => {
      console.log(value)
    },
  });

  return (
    <div>
      <Card>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <CardHeader>
            <CardTitle>Energy Prices</CardTitle>
            <CardDescription>
              Add a new reading for your energy usage.
            </CardDescription>
          </CardHeader>
          <CardContent className="py-6 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <form.Field
                  name="electricity"
                  children={(field) => {
                    return (
                      <>
                        <Label htmlFor={field.name}>
                          Electricity (per kWh)
                        </Label>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) =>
                            field.handleChange(+e.target.value)
                          }
                        />
                      </>
                    );
                  }}
                />
              </div>
              <div className="space-y-2">
                <form.Field
                  name="gas"
                  children={(field) => {
                    return (
                      <>
                        <Label htmlFor={field.name}>
                          Gas (per kWh)
                        </Label>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) =>
                            field.handleChange(+e.target.value)
                          }
                        />
                      </>
                    );
                  }}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="mt-4" variant="outline" type="submit">
              Save Changes
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
