import React, { useRef } from "react";

import * as yup from "yup";
import { ShowAlert } from "../../features/alert";
import { MdMarkEmailRead } from "react-icons/md";

interface ISearchUserTimelineProps {
  value: string;
  name?: string;
  id?: string;
  placeholder?: string;
  handleSearch: (searchTerm: string) => void;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Please enter an email"),
});

const SearchUserTimeline: React.FC<ISearchUserTimelineProps> = ({
  name = "search",
  id = "search",
  placeholder = "Search here",
  handleSearch,
  value,
}) => {
  const searchRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (searchRef.current) {
      schema
        .validate({ email: searchRef.current.value })
        .then((data) => {
          handleSearch(data.email);
        })
        .catch((error) => {
          ShowAlert({
            message: error.errors[0],
            status: "error",
          });
        });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="max-w-6xl mb-6 bg-gray-50/80 py-14 px-2 flex flex-col shadow-sm  gap-4 items-center justify-center"
    >
      <div className="flex relative items-center shadow-lg  shadow-secondary/20 rounded-md  py-2 px-2 justify-between bg-white max-w-sm w-full">
        <MdMarkEmailRead
          fontSize={"1.5rem"}
          className="mr-auto z-10 opacity-0 md:opacity-100"
        />

        <input
          className="w-full px-2 text-base font-bold text-gray-600 md:px-0 md:w-4/5 mx-auto outline-none absolute inset-0 "
          type="text"
          name={name}
          id={id}
          placeholder={placeholder}
          defaultValue={value}
          ref={searchRef}
        />
        <button
          className="ml-auto z-10 bg-secondary/90 outline-none text-white px-3 text-sm py-1 rounded-full hover:bg-secondary transition "
          type="submit"
        >
          Search
        </button>
      </div>
      <div className="font-bold text-secondary">
        Use email search for timeline
      </div>
    </form>
  );
};

export default SearchUserTimeline;
