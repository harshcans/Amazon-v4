import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import { getSession } from "next-auth/react";
import Footer from "../components/Footer";

export default function Home({ products }) {
  return (
    <div className="bg-gray-200">
      <Head>
        <title>Riancci | Home</title>
      </Head>
      <Header />
      <main className="max-w-screen-2xl mx-auto">
        <Banner />
        <ProductFeed products={products} />
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const products = await fetch(
    "https://fakestoreapi.com/products"
  ).then((res) => res.json());

  return {
    props: {
      products,
      session
    }
  };
}
