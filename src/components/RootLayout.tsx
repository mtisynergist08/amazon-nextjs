import React from "react";
import Header from "@/components/header/Header";
import BottomHeader from "@/components/header/BottomHeader";
import Footer from "@/components/Footer";

interface Props {
  children: React.ReactElement;
}

const RootLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <BottomHeader />
      {children}
      <Footer />
    </>
  );
};
export default RootLayout;
