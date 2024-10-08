import { MdCancel } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import Option from "./Option";
import CityComp from "./CityComp";

function Select({ data, type, stateNo, setStateNo, city, setCity, z }) {
  const [optionsView, setOptionsView] = useState(false);
  let value = "Select";

  if (type === "state") {
    if (stateNo !== null && stateNo !== undefined) {
      value = data[stateNo]?.state || "Select";
    } else {
      value = "Select State";
    }
  } else if (type === "city") {
    if (city.length !== 0) {
      value = <CityComp city={city} setCity={setCity}/>; 
    } else {
      value = "Select Cities";
    }
  }

  return (
    <div
      className={`relative w-[30vw] min-h-[9vh] bg-white border-2 rounded-md hover:border-black transition duration-300 ease-in-out flex px-4`}
      tabIndex="0"
      onBlur={() => setOptionsView(false)}
    >
      <div className="w-[75%] min-h-[9vh] flex items-center text-xl flex-wrap">
        {value}
      </div>

      <div className="w-[25%] h-[9vh] flex justify-around items-center text-2xl">
        <MdCancel
          className="text-gray-400 hover:text-red-500 duration-300 ease-in-out"
          onClick={() => {
            type==='state' ? setStateNo(null) : setCity([]);
          }}
        />
        <div className="h-[5vh] bg-gray-600 w-[2px]"></div>
        <FaChevronDown
          className={`text-gray-400 hover:text-green-500 duration-300 ease-in-out ${
            optionsView ? "rotate-180" : ""
          }`}
          onClick={() => setOptionsView((prev) => !prev)}
        />
      </div>

      {optionsView && (
        <div
          className={`absolute bg-slate-300 w-full max-h-[30vh] flex flex-col text-xl top-full left-0 mt-1 rounded-md overflow-auto duration-300 ease-in-out z-50`}
        >
          <Option
            data={data}
            type={type}
            stateNo={stateNo}
            setStateNo={type === "state" ? setStateNo : null}
            setOptionsView={setOptionsView}
            city={city}
            setCity={type === "city" ? setCity : null}
          />
        </div>
      )}
    </div>
  );
}

export default Select;
