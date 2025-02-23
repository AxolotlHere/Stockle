
import React from "react";

const ProgressBar = () => {
    return (
      <div className="w-[400px] bg-gray-200 rounded-full h-4 ml-10">
        <div
          className="bg-emerald-500 h-full transition-all rounded-full duration-300 w-[100px]"
          style={{ width: "30%" }}
        ></div>
      </div>
    );
  };

export default ProgressBar
  