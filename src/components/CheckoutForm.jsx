import { Form, Link } from "react-router-dom";

const CheckoutForm = () => {
  return (
    <Form className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl capitalize">Shipping Information</h4>
      <div className="form-control">
        <label htmlFor="search" className="label">
          <span className="label-text capitalize">first name</span>
        </label>
        <input
          type="search"
          name="search"
          className={`input input-bordered input-md`}
        />
      </div>
      <div className="form-control">
        <label htmlFor="search" className="label">
          <span className="label-text capitalize">address</span>
        </label>
        <input
          type="search"
          name="search"
          className={`input input-bordered input-md`}
        />
      </div>
      <div className="mt-4">
        <Link to={"/orders"} className="btn btn-primary btn-block">
          place your order
        </Link>
      </div>
    </Form>
  );
};
export default CheckoutForm;
