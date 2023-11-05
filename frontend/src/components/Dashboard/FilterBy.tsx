import React from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { useAppSelector } from "../../app/hooks";
import {
  IActivityFilter,
  optionsActivityFilter,
  useActivityActions,
} from "../../features/activity";
import { useToggle } from "../../hooks";

import { Backdrop } from "../Common";

export interface IFilterByProps {}

const FilterBy: React.FC<IFilterByProps> = (props) => {
  const [showDropDown, toggleDropdown] = useToggle(false);
  const filterBy = useAppSelector((state) => state.activity.filterBy);
  const { setActivityFilter } = useActivityActions();

  const onClickFilterButton = () => {
    toggleDropdown();
  };
  const changeFilter = (value: IActivityFilter) => {
    setActivityFilter(value);
    onClickFilterButton();
  };

  return (
    <div className="relative">
      {showDropDown && <Backdrop onClick={onClickFilterButton} />}
      <button
        onClick={onClickFilterButton}
        className="relative z-[60] px-2  flex items-center p-2 text-sm text-gray-600 border border-transparent font-bold hover:bg-gray-50 rounded-lg "
      >
        <span>Filter by</span>
        <span className="mx-1 text-secondary">{filterBy.label}</span>

        {showDropDown ? (
          <AiOutlineArrowUp className="text-secondary" />
        ) : (
          <AiOutlineArrowDown className="text-secondary" />
        )}
      </button>
      {showDropDown && (
        <div className="absolute z-[60] right-0  w-56  p-4 text-sm overflow-hidden bg-gray-50 rounded-md shadow-xl mt-1  flex flex-col">
          {optionsActivityFilter.map((option) => {
            if (option.value !== filterBy.value) {
              return (
                <label
                  onClick={() => changeFilter(option)}
                  key={option.value}
                  className=" py-1 hover:bg-secondary/10 rounded-lg text-center hover:font-bold hover:text-secondary w-full cursor-pointer  "
                >
                  {option.label}
                </label>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default FilterBy;
