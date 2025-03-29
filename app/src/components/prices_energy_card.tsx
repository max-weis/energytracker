import { addNewPrice, NewPriceType } from "~/funcs/prices_add_new";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm } from '@tanstack/react-form'
import { useMutation } from "@tanstack/react-query";

type Prices = {
  electricity_base_price: number;
  electricity_unit_price: number;
  gas_base_price: number;
  gas_unit_price: number;
}

type PricesEnergyCardProps = {
  price: Prices | null
}

export function PricesEnergyCard({ price }: PricesEnergyCardProps) {
  const addNewPriceMutation = useMutation<unknown, Error, NewPriceType>({
    mutationKey: ['addNewPrice'],
    mutationFn: addNewPrice,
  })

  const form = useForm({
    defaultValues: {
      electricity_base_price: price?.electricity_base_price || 0,
      electricity_unit_price: price?.electricity_unit_price || 0,
      gas_base_price: price?.gas_base_price || 0,
      gas_unit_price: price?.gas_unit_price || 0,
    },
    onSubmit: async ({ value }) => {
      await addNewPriceMutation.mutateAsync(value);
    },
  });


  return (
    <div>
      <Card>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}>
          <CardHeader>
            <CardTitle>Energy Prices</CardTitle>
            <CardDescription>Configure the prices used to calculate your energy costs</CardDescription>
          </CardHeader>
          <CardContent className="py-6 space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium">Electricity</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <form.Field
                    name="electricity_base_price"
                    children={(field) => {
                      return (
                        <>
                          <Label htmlFor={field.name}>Base Price (Fixed Monthly)</Label>
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(+e.target.value)}
                          />
                        </>
                      )
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <form.Field
                    name="electricity_unit_price"
                    children={(field) => {
                      return (
                        <>
                          <Label htmlFor={field.name}>Unit Price (per kWh)</Label>
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(+e.target.value)}
                          />
                        </>
                      )
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Gas</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <form.Field
                    name="gas_base_price"
                    children={(field) => {
                      return (
                        <>
                          <Label htmlFor={field.name}>Base Price (Fixed Monthly)</Label>
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(+e.target.value)}
                          />
                        </>
                      )
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <form.Field
                    name="gas_unit_price"
                    children={(field) => {
                      return (
                        <>
                          <Label htmlFor={field.name}>Unit Price (per kWh)</Label>
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(+e.target.value)}
                          />
                        </>
                      )
                    }}
                  />
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Button className="mt-4" variant="outline" type="submit">Save Changes</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
