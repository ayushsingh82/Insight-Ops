import React from 'react';
import data from './data.json';
import { TypewriterEffectSmooth } from './ui/typewriter-effect';

const TypewriterEffectSmoothDemo = () => {
  const words = [
    { text: " All" },
    { text: "Puffer", className: "text-purple-500 dark:text-purple-500" },
    { text: " data available" },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[5rem] mt-[40px]">
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4"></div>
    </div>
  );
};


const List = () => {
  return (
    <div className='bg-black min-h-screen'>
    <div className='relative'>
    <h1 className='text-center text-xl font-bold text-white py-[20px]'>
     <TypewriterEffectSmoothDemo/>
    </h1>
    <button className='absolute top-[20px] right-[20px] border border-2 border-white text-xl text-purple-500 px-[10px] py-[4px] rounded-lg
     font-medium gradient-border'>
     <a href='/operator'>  Get data</a>
    </button>
  </div>
  
      <table className="min-w-full bg-black mt-[40px] border-2 gradient-border">
        <thead>
          <tr>
            <th className="w-1/3 py-2 text-purple-500 bg-black text-xl">Puffer Module</th>
            <th className="w-1/3 py-2 text-purple-500 bg-black text-xl">Puffer Module Address</th>
            <th className="w-1/3 py-2 text-purple-500 bg-black text-xl">Restaking Operator Address</th>
          </tr>
        </thead>
        <tbody>
          {data.modules.map((module, index) => (
            <tr key={index} className="text-white">
              <td className="border border-white px-4 py-2 text-purple-500">{module.PufferModule}</td>
              <td className="border border-white px-4 py-2">{module.PufferModuleAddress}</td>
              <td className="border border-white px-4 py-2">{module.RestakingOperatorAddress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
      
