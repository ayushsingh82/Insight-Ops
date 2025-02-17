import React, { useEffect, useState } from 'react';

const Operator2 = () => {
  const [operatorAddressInput, setOperatorAddressInput] = useState('');
  const [operatorAddress, setOperatorAddress] = useState('');
  const [operatorData, setOperatorData] = useState(null);

  useEffect(() => {
    if (operatorAddress) {
      const fetchData = async () => {
        const options = {
          method: 'GET',
          headers: {
            'X-DUNE-API-KEY': 'ddZZbqTrQABnH094HfYqqgzb6TW6KpaE'
          }
        };

        try {
          const response = await fetch('https://api.dune.com/api/v1/eigenlayer/operator-metadata', options);
          if (!response.ok) {
            throw new Error('Failed to fetch operator metadata');
          }
          const data = await response.json();
          const operatorMetadata = data.result.rows.find(item => item.operator_contract_address.toLowerCase() === operatorAddress.toLowerCase());
          setOperatorData(operatorMetadata);
        } catch (error) {
          console.error('Error fetching operator metadata:', error);
        }
      };

      fetchData();
    }
  }, [operatorAddress]);

  const handleInputChange = (event) => {
    setOperatorAddressInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setOperatorAddress(operatorAddressInput);
  };

  return (
    <div className="min-h-screen bg-black flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white"><span className='text-purple-500'>Operator</span> Information</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="operatorAddress" className="sr-only">
                Enter Operator Address
              </label>
              <input
                id="operatorAddress"
                name="operatorAddress"
                type="text"
                autoComplete="operatorAddress"
                required
                className="rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm border-blue-500-500 border-2"
                placeholder="Enter Operator Address"
                value={operatorAddressInput}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white gradient-border font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-3a5 5 0 100-10 5 5 0 000 10zm1-5h5l-7 7-7-7h5V5h2v5z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Fetch Operator Data
            </button>
          </div>
        </form>
        {operatorData ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-8 gradient-border ">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-purple-500">{operatorData.operator_name}</h3>
              <p className="mt-1 max-w-2xl text-sm text-white">{operatorData.description}</p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-purple-500">Logo</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <img src={operatorData.logo} alt={operatorData.operator_name} className="h-24 w-auto" />
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-white">Twitter</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <a href={operatorData.twitter} className="text-blue-600 font-semibold hover:text-blue-800">{operatorData.twitter}</a>
                  </dd>
                  <dt className="text-sm font-medium text-white">Website</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <a href={operatorData.website} className="text-blue-600 font-semibold hover:text-blue-800">{operatorData.website}</a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        ) : (
          <p className="mt-8 text-center text-base text-gray-500">
            {operatorAddress ? 'Loading operator data...' : 'Enter an operator address above and click Fetch Operator Data'}
          </p>
        )}
      </div>
    </div>
  );
};

export default Operator2;

// 0x1b03d708aee5bdc46dbb09537ce455e1f75adc4d