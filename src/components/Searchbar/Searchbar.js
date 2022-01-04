import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "components/Button/Button";

import s from "components/Searchbar/Searchbar.module.css";

import PropTypes from "prop-types";

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState("");
  let [searchParams, setSearchParams] = useSearchParams();
  // console.log(searchParams.get('query'));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      toast.error("Please type the query", {
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    setSearchParams({ query: query });
    onSubmit(query);
  };

  const handleQueryChange = (e) => {
    setQuery(e.currentTarget.value.toLowerCase());
  };
  return (
    <>
      <form className={s.Searchbar} onSubmit={handleSubmit}>
        <label htmlFor="inputSearch"></label>
        <input
          className={s.Searchbar__input}
          type="text"
          name="query"
          value={query}
          onChange={handleQueryChange}
          id="inputSearch"
          placeholder="Please type a movie title"
        />
        <Button text="Search" type="submit" />
      </form>
    </>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
