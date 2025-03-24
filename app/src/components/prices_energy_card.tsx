import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function PricesEnergyCard() {
  return (
    <div>
      <Card>
        <form onSubmit={() => console.log("submitted")}>
          <CardHeader>
            <CardTitle>Energy Prices</CardTitle>
            <CardDescription>Configure the prices used to calculate your energy costs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium">Electricity</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="electricity-base">Base Price (Fixed Monthly)</Label>
                  <Input
                    id="electricity-base"
                    type="number"
                    step="0.01"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="electricity-unit">Unit Price (per kWh)</Label>
                  <Input
                    id="electricity-unit"
                    type="number"
                    step="0.001"
                    min="0"
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
                    step="0.01"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gas-unit">Unit Price (per kWh)</Label>
                  <Input
                    id="gas-unit"
                    type="number"
                    step="0.001"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="mt-8" variant="outline" type="submit">Save Changes</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
