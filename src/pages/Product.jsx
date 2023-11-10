import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/features/cartSlice";
import useFetch from "../hooks/useFetch";
import { FormatPrice, generateAmountOptions } from "../components/FormatPrice";
import Loading from "../components/Loading";

const Product = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const url = `https://strapi-store-server.onrender.com/api/products/${id}`;
  const { data: product, isPending, error } = useFetch(url);

  useEffect(() => {
    if (product) {
      setData(product.data.attributes || {});
    }
  }, [product]);

  const { image, title, price, company, description, colors } = data;

  const dollarsAmount = FormatPrice(price);
  const [productColor, setProductColor] = useState(
    colors && colors.length > 0 ? colors[0] : ""
  );
  const [amount, setAmount] = useState(0);

  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };

  const cartProduct = {
    cartID: data.id + productColor,
    productID: data.id,
    image,
    title,
    price,
    company,
    productColor,
    amount,
  };

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addItem({ product: cartProduct }));
  };

  return (
    <section className="mb-20">
      {isPending ? (
        <Loading />
      ) : (
        <div>
          <div className="text-md breadcrumbs">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
            </ul>
          </div>
          <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
            <img
              src={image}
              alt={title}
              className="w-96 h-96 object-cover rounded-lg lg:w-full"
            />

            <div>
              <h1 className="capitalize text-3xl font-bold">{title}</h1>
              <h4 className="text-xl text-neutral-content font-bold mt-2">
                {company}
              </h4>
              <p className="mt-3 text-xl">{dollarsAmount}</p>
              <p className="mt-6 leading-8">{description}</p>

              <div className="mt-6">
                <h4 className="text-md font-medium tracking-wider capitalize">
                  colors
                </h4>
                <div className="mt-2">
                  {colors &&
                    colors.map((color) => {
                      return (
                        <button
                          key={color}
                          type="button"
                          className={`badge w-6 h-6 mr-2 ${
                            color === productColor &&
                            "border-2 border-secondary"
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => setProductColor(color)}
                        ></button>
                      );
                    })}
                </div>
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label" htmlFor="amount">
                  <h4 className="text-md font-medium -tracking-wider capitalize">
                    amount
                  </h4>
                </label>
                <select
                  className="select select-secondary select-bordered select-md"
                  id="amount"
                  value={amount}
                  onChange={handleAmount}
                >
                  {generateAmountOptions(20)}
                </select>
              </div>

              <div className="mt-10">
                <button
                  className="btn btn-secondary btn-md"
                  onClick={addToCart}
                >
                  Add to bag
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
export default Product;
