import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "./ui/button";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { loadLatestReadingsOpts } from "~/funcs/readings_load_latest";
import { addNewReadings } from "~/funcs/readings_add_new";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";

export function ReadingsNewCard({ onClose }: { onClose: () => void }) {
  const { data } = useSuspenseQuery(loadLatestReadingsOpts());
  const queryClient = useQueryClient()

  const addNewReadingMutation = useMutation({
    mutationFn: useServerFn(addNewReadings),
    onSuccess: () => {
      toast.success(
        <span>
          Reading added successfully. <Link to="/readings" search={{ limit: 10, offset: 0, sortOrder: 'desc', sortKey: 'created_at' }} className="underline">See all</Link>
        </span>
      );
      queryClient.invalidateQueries({ queryKey: ["loadLatestReadings"] })
    }
  });

  const defaultElectricity = data.electricity || 0;
  const defaultGas = data.gas || 0;

  const form = useForm({
    defaultValues: {
      electricity: defaultElectricity,
      gas: defaultGas,
    },
    onSubmit: async ({ value }) => {
      await addNewReadingMutation.mutateAsync({ data: value });
      onClose();
    },
  });

  return (
    <div className="bg-background">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <DialogHeader>
          <DialogTitle>Energy Prices</DialogTitle>
          <DialogDescription>
            Add a new reading for your energy usage.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
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

        <DialogFooter>
          <form.Subscribe selector={(formState) => [formState.canSubmit, formState.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <Button className="mt-4 bg-primary text-background" variant="outline" type="submit" disabled={!canSubmit}>
                Save Changes
              </Button>
            )}
          </form.Subscribe>
        </DialogFooter>
      </form>
    </div>
  );
}
