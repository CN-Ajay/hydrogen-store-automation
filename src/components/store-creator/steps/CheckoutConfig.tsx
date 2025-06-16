'use client';

import { UseFormReturn } from 'react-hook-form';
import { StoreFormData } from '../StoreCreatorForm';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/label';

type CheckoutConfigProps = {
  form: UseFormReturn<StoreFormData>;
  nextStep: () => void;
  prevStep: () => void;
};

export default function CheckoutConfig({ form, nextStep, prevStep }: CheckoutConfigProps) {

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Checkout Configuration</h2>
        <p className="text-gray-600">Configure your store&apos;s checkout settings</p>
      </div>

      <div className="space-y-6">
        <FormField
          control={form.control}
          name="affiliateId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Affiliate ID *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter your affiliate ID"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="checkoutLanguage"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Checkout Language</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="en" id="en" />
                    <Label htmlFor="en">English</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fr" id="fr" />
                    <Label htmlFor="fr">French</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={prevStep}>
            Previous
          </Button>
          <Button type="button" onClick={nextStep}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}