import ProductsContainer from "../components/ProductsContainer";
import Filters from "../components/Filters";
import PaginationContainer from "../components/PaginationContainer";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

const Products = () => {
  const formFilters = {
    search: "",
    company: "all",
    category: "all",
    sort: "a-z",
    price: 100000,
    shipping: false,
  };

  const [filters, setFilters] = useState(formFilters);
  const [data, setData] = useState(null);

  const url = `https://strapi-store-server.onrender.com/api/products?search=${filters.search}&category=${filters.category}&company=${filters.company}&order=${filters.sort}&price=${filters.price}&shipping=${filters.shipping}`;
  const { data: products, isPending, error } = useFetch(url);

  const handleFilterSubmit = (selectedFilters) => {
    setFilters(selectedFilters);
  };
  const handleReset = (e) => {
    e.preventDefault();
    setFilters(formFilters);
  };

  useEffect(() => {
    if (products) {
      setData(products);
    }
  }, [products]);

  return (
    <>
      {isPending ? (
        <Loading />
      ) : (
        <>
          {data && (
            <Filters
              handleFilterSubmit={handleFilterSubmit}
              handleReset={handleReset}
              meta={data.meta}
            />
          )}
          {data && <ProductsContainer data={data.meta} products={products} />}
          {data && <PaginationContainer data={data.meta} />}
        </>
      )}
    </>
  );
};

export default Products;
