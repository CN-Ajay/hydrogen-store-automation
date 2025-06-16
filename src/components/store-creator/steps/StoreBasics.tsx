'use client';

import { UseFormReturn } from 'react-hook-form';
import { StoreFormData } from '../StoreCreatorForm';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Button } from '@/components/ui/Button';

type StoreBasicsProps = {
  form: UseFormReturn<StoreFormData>;
  nextStep: () => void;
};

export default function StoreBasics({ form, nextStep }: StoreBasicsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Store Basics</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Let's start with the basic information about your store.
        </p>
      </div>

      <div className="space-y-4">
        <FormField
          control={form.control}
          name="storeName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Store Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="My Awesome Store" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />



        <FormField
          control={form.control}
          name="subDomain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Sub Domain <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="mystore" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="shopifyStoreName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Shopify Store Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="My Shopify Store" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="shopifyStoreEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Shopify Store Email <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input 
                  type="email" 
                  placeholder="admin@mystore.com" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="shopifyStoreMobile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Shopify Store Mobile <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input 
                  type="tel" 
                  placeholder="+1 (555) 123-4567" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="pt-4">
        <Button onClick={nextStep} className="w-full sm:w-auto">
          Continue to Theme Selection
        </Button>
      </div>
    </div>
  );
}