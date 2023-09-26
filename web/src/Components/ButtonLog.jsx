import * as React from "react";
export default function TransitionsModal({text}) {

  return (
    <div>
        <a href="/login">
        <button
          className="bg-blue-600 flex justify-center items-center px-2 py-1 mr-10 text-white border-blue-600 border w-[150px] rounded-[4px] font-[600] transition-[0.4s] hover:cursor-pointer h-[40px]"
        >
          {text}
        </button>
        </a>
      </div>
  );
}
