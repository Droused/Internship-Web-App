import * as React from "react";
export default function TransitionsModal() {

  return (
    <div>
      <div className="flex justify-end flex-row">
        <a href="/login">
        <button
          className="bg-blue-600 px-2 py-1 text-white border-blue-600 border w-[150px] rounded-[4px] font-[600] transition-[0.4s] hover:cursor-pointer -mt-[60px] h-[40px]"
        >
          Login
        </button>
        </a>
      </div>
    </div>
  );
}
