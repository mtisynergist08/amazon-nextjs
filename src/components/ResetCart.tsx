import React from "react";
import { useDispatch } from "react-redux";
import { nextActions } from "@/store/nextSlice";

const ResetCart = () => {
  const dispatch = useDispatch();
  const handleResetCart = () => {
    const confirmReset = window.confirm("Are you sure to reset your cart?");
    if (confirmReset) {
      dispatch(nextActions.resetCart());
    }
  };
  return (
    <button
      onClick={handleResetCart}
      className={
        "w-44 h-10 font-semibold bg-gray-200 rounded-lg hover:bg-red-600 hove:text-white duration-300"
      }
    >
      reset card
    </button>
  );
};
export default ResetCart;
