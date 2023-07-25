import Banner from "@/components/Banner";
import Products from "@/components/Products";
import { ProductProps } from "../../type";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { nextActions } from "@/store/nextSlice";

interface Props {
  productData: ProductProps;
}

export default function Home({ productData }: Props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(nextActions.setAllProducts({ allProducts: productData }));
  }, [productData]);
  return (
    <main>
      <div className={"max-w-screen-2xl mx-auto"}>
        <Banner />
        <div className={"relative md:-mt020 lgl:-mt-32 xl:-mt-60 z-20 mb-10"}>
          <Products productData={productData} />
        </div>
      </div>
    </main>
  );
}

// server side rendering fro data fetching
export const getServerSideProps = async () => {
  const response = await fetch("https://fakestoreapiserver.reactbd.com/tech");
  const productData = await response.json();
  return { props: { productData } };
};
