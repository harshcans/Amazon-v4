// pages/index.js

import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import Footer from "../components/Footer";
import { supabase } from "../../supabase"; // make sure you have this

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

// Server-side data fetching from Supabase
export async function getServerSideProps() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false }); // optional sorting

  if (error) {
    console.error("Error fetching products:", error.message);
    return {
      props: {
        products: [],
      },
    };
  }

  return {
    props: {
      products,
    },
  };
}
