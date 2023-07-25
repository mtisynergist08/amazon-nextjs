import { nextActions } from "@/store/nextSlice";
import { useDispatch } from "react-redux";

const ResetFavoriteItem = () => {
  const dispatch = useDispatch();
  const handleResetCart = () => {
    const confirmReset = window.confirm("Are you sure to reset your cart?");
    if (confirmReset) {
      dispatch(nextActions.resetFavoriteData());
    }
  };
  return (
    <button
      onClick={handleResetCart}
      className={
        "w-44 h-10 font-semibold bg-gray-200 rounded-lg hover:bg-red-600 hove:text-white duration-300"
      }
    >
      reset favorite
    </button>
  );
};

export default ResetFavoriteItem;
