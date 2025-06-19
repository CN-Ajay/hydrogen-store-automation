import { Metadata } from 'next';
import StoreCreatorForm from '@/components/store-creator/StoreCreatorForm';
import { logoutExistingSession } from '@/lib/shopify/script';

export const metadata: Metadata = {
  title: 'Shopify Store Creator',
  description: 'Create customized Shopify Hydrogen storefronts quickly and easily',
};

export default function StoreCreator() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Shopify Store Creator</h1>
      <p className="text-lg mb-8 text-center max-w-3xl mx-auto">
        Create customized Shopify Hydrogen storefronts in minutes through this intuitive form interface.
      </p>
      <button onClick={logoutExistingSession}></button>
      {/* <StoreCreatorForm /> */}
    </div>
  );
}