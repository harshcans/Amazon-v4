import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import Head from "next/head";
import styles from "../../styles/Product.module.css";
import Link from "next/link";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../../slices/basketSlice";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function Id({ product }) {
  const { id, title, category, image, price, description } = product;
  console.log("loging1 ->>", product);
  const dispatch = useDispatch();

  const MAX_RATING = 5;
  const MIN_RATING = 1;

  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );
  const [hasPrime] = useState(Math.random() < 0.5);

  const addHandler = () => {
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
  const removeBasket = () => {
    dispatch(removeFromBasket({ id }));
  };
  console.log("price", price);
  return (
    <div>
      <Head>
        <title>{title} | Amazon</title>
      </Head>
      <Header />
      <div className="bg-gray-200 p-10 mb-10">
        <div className="flex max-w-screen-xl mx-auto">
          <span className="font-medium">
            <Link href="/">Home</Link>
          </span>
          &nbsp;/
          <span className="font-medium">
            <h3>Product</h3>
          </span>
          &nbsp;/ <span className="text-yellow-500">{title}</span>
        </div>
      </div>
      <main className="max-w-screen-xl mx-auto mt-5">
        <div className="flex flex-wrap">
          <div className="px-5 mb-7 w-full md:w-7/12">
            <div className="w-full mb-4">
              <Image
                className={"w-full rounded-lg " + styles.product_image}
                src={image}
                width={700}
                height={500}
                objectFit="contain"
                alt=""
              />
            </div>
          </div>

          <div className="px-5 mb-10 w-full md:w-5/12">
            <h1 className="my-2 text-3xl text-yellow-500 mb-2">{title}</h1>
            <p className="flex items-center mb-7">
              <b className="mr-1">Rating:</b>
              <div className="flex">
                {Array(rating)
                  .fill()
                  .map((_, i) => (
                    <StarIcon
                      key={id}
                      className="h-6 text-yellow-500"
                      key={i}
                    />
                  ))}
              </div>
            </p>
            <p className="text-yellow-500 text-2xl my-4">
              <Currency quantity={price} currency="USD" />
            </p>
            <p className="text-gray-600 text-base mb-5">
              {product.description}
            </p>

            {hasPrime && (
              <div className="flex items-center space-x-2 mb-6">
                <img src="https://links.papareact.com/fdw" className="w-12" />
                <p className="text-xs ml-2 text-gray-500">
                  FREE Next day Delivery
                </p>
              </div>
            )}
            <div className="flex-col flex space-y-2 my-auto justify-self-end">
              <button className="button" onClick={addHandler}>
                Add to Basket
              </button>
              <button className="button" onClick={removeBasket}>
                Remove from Basket
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default Id;

export const getStaticPaths = async () => {
  const products = await fetch(
    "https://fakestoreapi.com/products/"
  ).then((response) => response.json());

  const paths = products.map((product) => {
    return {
      params: { id: product.id.toString() }
    };
  });

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const product = await fetch(
    `https://fakestoreapi.com/products/${id}`
  ).then((response) => response.json());

  return {
    props: {
      product: {
        price: Math.round(product.price * 98),
        image: product.image,
        description: product.description,
        title: product.title
      }
    }
  };
};
