import React from 'react';

interface ProgressBarProps {
  progress: number; 
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  console.log('Progress:', progress); // Check progress updates
  return (
    <div className="relative pt-1">
      <div className="flex mb-2 items-center justify-between">
        <div className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-teal-600 bg-teal-200">
          {progress}%
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-full bg-gray-200 rounded-full">
          <div
            className="bg-teal-600 text-xs font-medium text-white text-center p-0.5 leading-none rounded-full"
            style={{
              width: `${progress}%`,
              transition: 'width 1s ease-in-out',
            }}
          >
            &nbsp;
          </div>
        </div>
      </div>
    </div>
  );
};


export default ProgressBar;