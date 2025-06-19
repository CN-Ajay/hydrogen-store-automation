'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import StoreBasics from './steps/StoreBasics';
import StoreConfiguration from './steps/StoreConfiguration';
import CheckoutConfig from './steps/CheckoutConfig';
import ReviewSubmit from './steps/ReviewSubmit';
import StepIndicator from './StepIndicator';

// Define the Zod schema for form validation
const storeFormSchema = z.object({
  // Store Basics
  storeName: z.string().min(1, 'Store name is required'),
  subDomain: z.string().min(1, 'Sub Domain is required'),
  shopifyStoreName: z.string().min(1, 'Shopify Store name is required'),
  shopifyStoreEmail: z.string().email('Please enter a valid Shopify email address'),
  shopifyStoreMobile: z.string().min(1, 'Please enter a valid Shopify Mobile Number'),
  hydrogenTemplateStatus: z.boolean().default(false),
  templateCustomizer: z.boolean().default(false),
  
  // Shopify Store Admin Access Token
  storeAccessToken: z.string().min(1, 'Shopify Store Access Token is required'),
  
  // Checkout Configuration
  affiliateId: z.string().min(1, 'Affiliate ID is required'),
  checkoutLanguage: z.enum(['en', 'fr']),
});

// Define the form data type
export type StoreFormData = z.infer<typeof storeFormSchema>;

// Initial form data
const initialFormData: Partial<StoreFormData> = {
  // Store Basics
  storeName: '',
  subDomain: '',
  shopifyStoreName: '',
  shopifyStoreEmail: '',
  shopifyStoreMobile: '',
  hydrogenTemplateStatus: false,
  templateCustomizer: false,
  
  // Store Configuration
  storeAccessToken: '',
  
  // Checkout Configuration
  affiliateId: '',
  checkoutLanguage: 'en' as const,
};

// Define the steps
const steps = [
  { id: 'basics', name: 'Store Basics' },
  { id: 'configuration', name: 'Store Configuration' },
  { id: 'checkout', name: 'Checkout Configuration' },
  { id: 'review', name: 'Review & Submit' },
];

export default function StoreCreatorForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [storeUrl, setStoreUrl] = useState<string | null>(null);
  const [stepCompletionStatus, setStepCompletionStatus] = useState<boolean[]>([false, false, false, false]);
  const [stepValidationStatus, setStepValidationStatus] = useState<boolean[]>([false, false, false, false]);

  // Initialize React Hook Form
  const form = useForm<StoreFormData>({
    //resolver: zodResolver(storeFormSchema),
    defaultValues: initialFormData,
    mode: 'onChange',
  });

  const { trigger, getValues, formState, watch } = form;



  // Watch form changes to update validation status
  useEffect(() => {
    const subscription = watch(() => {
      updateValidationStatus();
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // Initial validation check
  useEffect(() => {
    updateValidationStatus();
  }, []);

  // Navigate to next step with validation
  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await trigger(fieldsToValidate);
    
    // Mark current step as completed
    const newCompletionStatus = [...stepCompletionStatus];
    newCompletionStatus[currentStep] = true;
    setStepCompletionStatus(newCompletionStatus);
    
    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
    
    // Update validation status
    setTimeout(() => updateValidationStatus(), 100);
  };

  // Navigate to previous step
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  // Check if a step is valid
  const checkStepValidation = async (stepIndex: number): Promise<boolean> => {
    const fieldsToValidate = getFieldsForStep(stepIndex);
    if (fieldsToValidate.length === 0) return true;
    
    const values = getValues();
    const errors = formState.errors;
    
    // Check if all required fields for this step have values and no errors
    for (const field of fieldsToValidate) {
      const value = values[field];
      const hasError = errors[field];
      
      // For required fields, check if they have values
      if (field === 'storeName' || field === 'subDomain' || field === 'shopifyStoreName' ||
          field === 'shopifyStoreEmail' || field === 'shopifyStoreMobile' || field === 'storeAccessToken' ||
          field === 'affiliateId' || field === 'checkoutLanguage') {
        if (!value || hasError) {
          return false;
        }
      }
      
      // For boolean fields, they are always valid (have default values)
      if (field === 'hydrogenTemplateStatus' || field === 'templateCustomizer') {
        // Boolean fields are always valid as they have default values
        continue;
      }
    }
    
    return true;
  };

  // Update validation status for all steps
  const updateValidationStatus = async () => {
    const newValidationStatus = await Promise.all(
      steps.map((_, index) => checkStepValidation(index))
    );
    setStepValidationStatus(newValidationStatus);
  };

  // Jump to a specific step
  const goToStep = (stepIndex: number) => {
    console.log("goToStep :",currentStep,stepIndex)
    if (stepIndex >= 0 && stepIndex < steps.length) {
      // Mark current step as completed when leaving it
      if (currentStep !== stepIndex) {
        const newCompletionStatus = [...stepCompletionStatus];
        newCompletionStatus[currentStep] = true;
        setStepCompletionStatus(newCompletionStatus);
      }
      
      setCurrentStep(stepIndex);
      window.scrollTo(0, 0);
      
      // Update validation status
      setTimeout(() => updateValidationStatus(), 100);
    }
  };

  // Get fields to validate for each step
  const getFieldsForStep = (step: number): (keyof StoreFormData)[] => {
    switch (step) {
      case 0: return ['storeName', 'subDomain', 'shopifyStoreName', 'shopifyStoreEmail', 'shopifyStoreMobile'];
      case 1: return ['storeAccessToken', 'hydrogenTemplateStatus', 'templateCustomizer'];
      case 2: return ['affiliateId', 'checkoutLanguage'];
      default: return [];
    }
  };

  // Handle form submission
  const handleSubmit = async (data: StoreFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    nextStep(3);
    
    try {
      // Call the API to create the store
      console.log("responseData :",data)

      
      // Set success state
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError((error as Error).message || 'There was an error creating your store. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset the form
  const resetForm = () => {
    form.reset(initialFormData);
    setCurrentStep(0);
    setIsSubmitting(false);
    setSubmitError(null);
    setSubmitSuccess(false);
    setStoreUrl(null);
    setStepCompletionStatus([false, false, false, false]);
    setStepValidationStatus([false, false, false, false]);
  };

  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StoreBasics form={form} nextStep={nextStep}  />;
      case 1:
        return <StoreConfiguration form={form} nextStep={nextStep} prevStep={prevStep}  />;
      case 2:
        return <CheckoutConfig form={form} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return (
          <ReviewSubmit 
            form={form}
            prevStep={prevStep} 
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting} 
            submitError={submitError}
            submitSuccess={submitSuccess}
            storeUrl={storeUrl}
            resetForm={resetForm}
            nextStep={nextStep}
      
          />
        );
      default:
        return null;
    }
  };

  return (
    <Form {...form}>
      <div className="max-w-4xl mx-auto bg-white dark:bg-background rounded-lg shadow-md p-6">
        <StepIndicator 
          steps={steps} 
          currentStep={currentStep} 
          goToStep={goToStep}
          stepValidationStatus={stepValidationStatus}
          stepCompletionStatus={stepCompletionStatus}
          />
        <div className="mt-8">
          {renderStep()}
        </div>
      </div>
    </Form>
  );
}