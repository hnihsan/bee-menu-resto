import React from 'react';
import { HollowDotsSpinner } from 'react-epic-spinners';

export default function Loading({ text = 'please wait' }) {
  return (
    <div className="loading">
      <h3 className="text-base text-center text-gray-500">{text}</h3>
      <div className="flex justify-center mt-2">
        <HollowDotsSpinner color="#ffb72b" />
      </div>
    </div>
  );
}
