import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type Prices = {
  electricity_base_price: number;
  electricity_unit_price: number;
  gas_base_price: number;
  gas_unit_price: number;
}

type PricesEnergyCardProps = {
  price: Prices | null
}

export function PricesEnergyCard({ price: data }: PricesEnergyCardProps) {
  return (
    <div>
      <Card>
        <form onSubmit={() => console.log("submitted")}>
          <CardHeader>
            <CardTitle>Energy Prices</CardTitle>
            <CardDescription>Configure the prices used to calculate your energy costs</CardDescription>
          </CardHeader>
          <CardContent className="py-6 space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium">Electricity</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="electricity-base">Base Price (Fixed Monthly)</Label>
                  <Input
                    id="electricity-base"
                    type="number"
                    step="1"
                    min="0"
                    value={data?.electricity_base_price}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="electricity-unit">Unit Price (per kWh)</Label>
                  <Input
                    id="electricity-unit"
                    type="number"
                    step="1"
                    min="0"
                    value={data?.electricity_unit_price}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Gas</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="gas-base">Base Price (Fixed Monthly)</Label>
                  <Input
                    id="gas-base"
                    type="number"
                    step="1"
                    min="0"
                    value={data?.gas_base_price}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gas-unit">Unit Price (per kWh)</Label>
                  <Input
                    id="gas-unit"
                    type="number"
                    step="1"
                    min="0"
                    value={data?.gas_unit_price}
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
