import { useEffect, useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";
import { useRouter } from "next/router";
import styles from "../styles/Product.module.css";
import { EyeIcon } from "@heroicons/react/outline";

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, title, category, image, price, description }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [hasPrime] = useState(Math.random() < 0.5);

  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );

  const addItemsHandler = () => {
    const products = {
      id,
      title,
      category,
      image,
      price,
      description,
      rating,
      hasPrime
    };
    dispatch(addToBasket(products));
  };
  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10 transform hover:scale-105 transition ease-out duration-300 cursor-pointer">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>

      <div
        className={`relative rounded-lg justify-center  flex ${styles.product_image_wrapper}`}
      >
        <Image
          src={image}
          width={200}
          height={200}
          objectFit="contain"
          className={"cursor-pointer "}
        />
        <div
          className={`rounded-lg cursor-pointer ${styles.product_image_overly}`}
        >
          <div
            className={`button rounded-lg ${styles.product_image_overly_button}`}
          >
            <span onClick={() => router.push("/products/" + id)}>
              View Details
            </span>
            <EyeIcon className="h-6" />
          </div>
        </div>
      </div>
      <h4 className="my-3 ">{title}</h4>
      <div className="flex ">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon key={i} className="h-5 text-yellow-500" />
          ))}
      </div>

      <p className="text-xs my-2 line-clamp-2 ">{description}</p>
      <div className="mb-5">
        <Currency quantity={price} currency="USD" />
      </div>
      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img src="https://links.papareact.com/fdw" alt="" className="w-12" />
          <p className="text-xs ml-2 text-gray-500">FREE Next day Delivery</p>
        </div>
      )}
      <button className="mt-auto button" onClick={addItemsHandler}>
        Add to basket
      </button>
    </div>
  );
}

export default Product;
