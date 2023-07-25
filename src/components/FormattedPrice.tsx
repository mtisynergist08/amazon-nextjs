import React from "react";

interface Props {
  amount: number;
}

const FormattedPrice = ({ amount }: Props) => {
  const formattedPrice = Number(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    style: "currency",
    currency: "USD",
  });
  return <span>{formattedPrice}</span>;
};
export default FormattedPrice;
