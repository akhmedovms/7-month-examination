import { useState } from "react";
import { Form } from "react-router-dom";
import { FormatPrice } from "./FormatPrice";

const Filters = ({ meta, handleFilterSubmit, handleReset }) => {
  const step = 1000;
  const maxPrice = 100000;

  const [selectedSearch, setSelectedSearch] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState("a-z");
  const [selectedPrice, setSelectedPrice] = useState(100000);
  const [selectedShipping, setSelectedShipping] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedFilters = {
      search: selectedSearch,
      company: selectedCompany,
      category: selectedCategory,
      shipping: selectedShipping,
      order: selectedOrder,
      price: selectedPrice,
    };

    handleFilterSubmit(selectedFilters);
  };

  const lists = ["a-z", "z-a", "high", "low"];

  return (
    <Form
      className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center"
      onSubmit={handleSubmit}
    >
      {/* SEARCH */}
      <div className="form-control">
        <label htmlFor="search" className="label">
          <span className="label-text capitalize">search product</span>
        </label>
        <input
          type="search"
          name="search"
          value={selectedSearch}
          onChange={(e) => setSelectedSearch(e.target.value)}
          className={`input input-bordered input-sm`}
        />
      </div>
      {/* CATEGORIES */}
      <div className="form-control">
        <label htmlFor="category" className="label">
          <span className="label-text capitalize">select category</span>
        </label>
        <select
          name="category"
          id="category"
          className={`select select-bordered select-sm`}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {meta &&
            meta.categories.map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
        </select>
      </div>
      {/* COMPANIES */}
      <div className="form-control">
        <label htmlFor="company" className="label">
          <span className="label-text capitalize">select company</span>
        </label>
        <select
          name="company"
          id="company"
          className={`select select-bordered select-sm`}
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
        >
          {meta &&
            meta.companies.map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
        </select>
      </div>

      {/* ORDER */}
      <div className="form-control">
        <label htmlFor="order" className="label">
          <span className="label-text capitalize">sort by</span>
        </label>
        <select
          name="order"
          id="order"
          list={lists}
          className={`select select-bordered select-sm`}
          value={selectedOrder}
          onChange={(e) => setSelectedOrder(e.target.value)}
        >
          {lists.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
      {/* PRICE */}
      <div className="form-control">
        <label htmlFor="price" className="label cursor-pointer">
          <span className="label-text capitalize">select price</span>
          <span>{FormatPrice(selectedPrice)}</span>
        </label>
        <input
          type="range"
          name="price"
          min={0}
          max={maxPrice}
          value={selectedPrice}
          onChange={(e) => setSelectedPrice(e.target.value)}
          className={`range range-primary range-sm`}
          step={step}
        />
        <div className="w-full flex justify-between text-xs px-2 mt-2">
          <span className="font-bold text-md">0</span>
          <span className="font-bold text-md">
            Max : {FormatPrice(maxPrice)}
          </span>
        </div>
      </div>

      {/* SHIPPING */}
      <div className="form-control items-center">
        <label htmlFor="shipping" className="label cursor-pointer">
          <span className="label-text capitalize">free shipping</span>
        </label>
        <input
          type="checkbox"
          name="shipping"
          checked={selectedShipping}
          onChange={() => setSelectedShipping(!selectedShipping)}
          className={`checkbox checkbox-primary checkbox-sm`}
        />
      </div>
      {/* BUTTONS */}
      <button type="submit" className="btn btn-primary btn-sm">
        search
      </button>
      <button onClick={handleReset} className="btn btn-accent btn-sm">
        reset
      </button>
    </Form>
  );
};

export default Filters;
