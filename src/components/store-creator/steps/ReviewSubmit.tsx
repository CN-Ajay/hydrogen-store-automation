'use client';

import { UseFormReturn } from 'react-hook-form';
import { StoreFormData } from '../StoreCreatorForm';
import { Button } from '@/components/ui/Button';

type ReviewSubmitProps = {
  form: UseFormReturn<StoreFormData>;
  prevStep: () => void;
  handleSubmit: (data: StoreFormData) => void;
  isSubmitting: boolean;
  submitError: string | null;
  submitSuccess: boolean;
  storeUrl: string | null;
  resetForm: () => void;
  goToStep: (step: number) => void;
  nextStep: () => void;
};

export default function ReviewSubmit({ 
  form, 
  prevStep, 
  handleSubmit, 
  isSubmitting, 
  submitError,
  submitSuccess,
  storeUrl,
  resetForm,
  nextStep, 
}: ReviewSubmitProps) {
  const formData = form.getValues();

//  console.log("formData @REview :" ,formData)
  if (submitSuccess) {
    nextStep();
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
          <svg className="w-8 h-8 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2">Store Creation Successful!</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Your Shopify Hydrogen store is being generated. 
        
        </p>
        {storeUrl && (
          <div className="mb-6 p-4 bg-gray-50 dark:bg-background rounded-md">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Store URL</h3>
            <a 
              href={storeUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline break-all"
            >
              {storeUrl}
            </a>
          </div>
        )}
        <div className="flex justify-center">
          <Button
            onClick={resetForm}
          >
            Create Another Store
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Review & Submit</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Please review your store configuration before submitting.
        </p>
      </div>


      <div className="space-y-6">
        <div className="border dark:border-gray-700 rounded-md overflow-hidden">
          <div className="bg-gray-50 dark:bg-background px-4 py-3 border-b dark:border-gray-700">
            <h3 className="text-lg font-medium">Store Basics</h3>
          </div>
          <div className="p-4 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Store Name</h4>
                <p className="mt-1">{formData.storeName}</p>
              </div>
           
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Store Sub Domain</h4>
                <p className="mt-1">{formData.subDomain}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Shopify Store Name</h4>
                <p className="mt-1">{formData.shopifyStoreName}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Shopify Store Email</h4>
                <p className="mt-1">{formData.shopifyStoreEmail}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Shopify Store Mobile Number</h4>
                <p className="mt-1">{formData.shopifyStoreMobile}</p>
              </div>
          </div>
        </div>


        <div className="bg-gray-50 dark:bg-background px-4 py-3 border-b dark:border-gray-700">
            <h3 className="text-lg font-medium">Store configuration</h3>
          </div>
          <div className="p-4 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Store Access Token</h4>
                <p className="mt-1">{formData.storeAccessToken}</p>
              </div>
           
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Store Hydrogen Template Status</h4>
                <p className="mt-1">{formData.hydrogenTemplateStatus.toString().toLocaleUpperCase()}</p>
               
                </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Store Template Customizer</h4>
                <p className="mt-1">{formData.templateCustomizer.toString().toLocaleUpperCase()}</p>
              </div>
          </div>
        </div>


        <div className="border dark:border-gray-700 rounded-md overflow-hidden">
          <div className="bg-gray-50 dark:bg-background px-4 py-3 border-b dark:border-gray-700">
            <h3 className="text-lg font-medium">Checkout Configuration</h3>
          </div>
          <div className="p-4 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Affiliate ID</h4>
                <p className="mt-1">{formData.affiliateId}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Checkout Language</h4>
                <p className="mt-1">{formData.checkoutLanguage === 'en' ? 'English' : 'French'}</p>
              </div>
            </div>
            {/* <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Checkout URL</h4>
              <p className="mt-1 text-sm break-all">
                <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                  https://client-checkout.com?affiliate_id={formData.affiliateId}&lang={formData.checkoutLanguage}
                </code>
              </p>
            </div> */}
          </div>
        </div>
      </div>

      {submitError && (
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md text-red-800 dark:text-red-300">
          <p>{submitError}</p>
        </div>
      )}

      <div className="pt-6 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={form.handleSubmit(handleSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Store...
            </>
          ) : (
            'Create Store'
          )}
        </Button>
      </div>
    </div>
    </div>

  );
}