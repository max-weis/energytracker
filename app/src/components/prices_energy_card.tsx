import { useForm } from "@tanstack/react-form";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { addNewPrice } from "~/funcs/prices_add_new";
import { loadLatestPricesOpts } from "~/funcs/prices_load_latest";
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

export function PricesEnergyCard() {
  const { data: price } = useSuspenseQuery(loadLatestPricesOpts());

  const addNewPriceMutation = useMutation({
    mutationFn: useServerFn(addNewPrice),
  });

  const form = useForm({
    defaultValues: {
      newElectricityPrice: {
        base_price: price.electricityPrice?.base_price || 0,
        unit_price: price.electricityPrice?.unit_price || 0,
      },
      newGasPrice: {
        base_price: price.gasPrice?.base_price || 0,
        unit_price: price.gasPrice?.unit_price || 0,
      },
    },
    onSubmit: async ({ value }) => {
      await addNewPriceMutation.mutateAsync({ data: value });
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
              Configure the prices used to calculate your energy costs
            </CardDescription>
          </CardHeader>
          <CardContent className="py-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Electricity</h3>
                <span className="text-sm text-gray-500">
                  last updated{" "}
                  {new Date(
                    price.electricityPrice?.created_at ?? new Date()
                  ).toLocaleString()}
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <form.Field
                    name="newElectricityPrice.base_price"
                    children={(field) => {
                      return (
                        <>
                          <Label htmlFor={field.name}>
                            Base Price (Fixed Monthly)
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
                    name="newElectricityPrice.unit_price"
                    children={(field) => {
                      return (
                        <>
                          <Label htmlFor={field.name}>
                            Unit Price (per kWh)
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
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                  <h3 className="font-medium">Gas</h3>
                  <span className="text-sm text-gray-500">
                    last updated{" "}
                    {new Date(
                      price.gasPrice?.created_at ?? new Date()
                    ).toLocaleString()}
                  </span>
                </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <form.Field
                    name="newGasPrice.base_price"
                    children={(field) => {
                      return (
                        <>
                          <Label htmlFor={field.name}>
                            Base Price (Fixed Monthly)
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
                    name="newGasPrice.unit_price"
                    children={(field) => {
                      return (
                        <>
                          <Label htmlFor={field.name}>
                            Unit Price (per kWh)
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
