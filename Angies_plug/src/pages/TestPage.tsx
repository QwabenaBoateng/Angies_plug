import React, { useState } from 'react';
import { testEnvironmentVariables } from '../lib/envTest';
import { createProduct, createBrand, addHeroImage, listProductsByCategory, listBrands, listHeroImages } from '../lib/db';

export const TestPage: React.FC = () => {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const runTests = async () => {
    setIsLoading(true);
    setTestResults([]);
    
    try {
      // Test 1: Environment Variables
      addResult('Testing environment variables...');
      const envTest = testEnvironmentVariables();
      if (envTest.allSet) {
        addResult('✓ Environment variables are set correctly');
      } else {
        addResult('✗ Environment variables are missing');
        return;
      }

      // Test 2: Create a test product
      addResult('Creating test product...');
      await createProduct({
        name: 'Test Product',
        price: 99.99,
        imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop',
        category: 'featured'
      });
      addResult('✓ Test product created successfully');

      // Test 3: Create a test brand
      addResult('Creating test brand...');
      await createBrand({
        label: 'Test Brand',
        imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop'
      });
      addResult('✓ Test brand created successfully');

      // Test 4: Create a test hero image
      addResult('Creating test hero image...');
      await addHeroImage('https://images.unsplash.com/photo-1528701800489-20be3c2ea4a0?q=80&w=1600&auto=format&fit=crop');
      addResult('✓ Test hero image created successfully');

      // Test 5: Query products
      addResult('Querying products...');
      const products = await listProductsByCategory('featured');
      addResult(`✓ Found ${products.length} products`);

      // Test 6: Query brands
      addResult('Querying brands...');
      const brands = await listBrands();
      addResult(`✓ Found ${brands.length} brands`);

      // Test 7: Query hero images
      addResult('Querying hero images...');
      const heroImages = await listHeroImages();
      addResult(`✓ Found ${heroImages.length} hero images`);

      addResult('🎉 All tests passed! Supabase is working correctly.');

    } catch (error) {
      addResult(`✗ Test failed: ${error.message || error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Supabase Connection Test</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <button
            onClick={runTests}
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-md font-medium"
          >
            {isLoading ? 'Running Tests...' : 'Run Tests'}
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Test Results</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {testResults.length === 0 ? (
              <p className="text-gray-500">Click "Run Tests" to start testing</p>
            ) : (
              testResults.map((result, index) => (
                <div key={index} className="text-sm font-mono">
                  {result}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
