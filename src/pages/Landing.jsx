import React from "react";
import Hero from "../components/Hero";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import { FormatPrice } from "../components/FormatPrice";
import Loading from "../components/Loading";

function Landing() {
  const {
    data: products,
    isPending,
    error,
  } = useFetch(
    "https://strapi-store-server.onrender.com/api/products?featured=true"
  );

  return (
    <div>
      {isPending ? (
        <Loading />
      ) : (
        <div>
          <Hero />
          <div className="border-b border-base-300 pb-5 pt-24">
            <h2 className="text-3xl font-medium tracking-wider capitalize">
              Featured Products
            </h2>
          </div>
          <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-20">
            {products &&
              products.data.map((product) => {
                const { title, price, image } = product.attributes;
                const dollarsAmount = FormatPrice(price);
                return (
                  <Link
                    key={product.id}
                    to={`/products/${product.id}`}
                    className="card w-full shadow-xl hover:shadow-2xl transition duration-300"
                  >
                    <figure className="px-4 pt-4">
                      <img
                        src={image}
                        alt={title}
                        className="rounded-xl h-64 md:h-48 w-full object-cover"
                      />
                    </figure>
                    <div className="card-body items-center text-center">
                      <h2 className="card-title capitalize tracking-wider">
                        {title}
                      </h2>
                      <span className="text-secondary">{`${dollarsAmount}`}</span>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Landing;
