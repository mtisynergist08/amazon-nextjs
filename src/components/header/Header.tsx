import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../images/logo.png";
import cartIcon from "../images/cartIcon.png";
import { BiCaretDown } from "react-icons/bi";
import { HiOutlineSearch } from "react-icons/hi";
import { SlLocationPin } from "react-icons/sl";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { StateProps, StoreProduct } from "../../../type";
import { useSession, signIn, signOut } from "next-auth/react";
import { nextActions } from "@/store/nextSlice";
import SearchProducts from "../SearchProducts";

const Header = () => {
  // search area
  const { data: session } = useSession();
  const [allData, setAllData] = useState([]);
  const { productData, favoriteData, userInfo, allProducts } = useSelector(
    (state: StateProps) => state.next,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    setAllData(allProducts.allProducts);
  }, [allProducts]);
  useEffect(() => {
    if (session) {
      dispatch(
        nextActions.addUser({
          name: session?.user?.name,
          email: session?.user?.email,
          image: session?.user?.image,
        }),
      );
    }
  }, [session]);

  // search area
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const filtered = allData.filter((item: StoreProduct) =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredProducts(filtered);
  }, [search]);

  return (
    <div
      className={"w-full h-20 bg-amazon_blue text-lightText sticky top-0 z-50"}
    >
      <div
        className={
          "h-full w-full mx-auto inline-flex items-center justify-between gap-1 mdl:gap-3 px-4"
        }
      >
        {/* Logo */}
        <Link
          href={"/"}
          className={
            "px-2 border border-transparent hover:border-white cursor-pointer " +
            "duration-300 flex items-center justify center h-[70%]"
          }
        >
          <Image className={"w-28 object-cover"} src={logo} alt="logo" />
        </Link>
        {/* delivery */}
        <div
          className={
            "flex px-2 border border-transparent hover:border-white cursor-pointer " +
            "duration-300 items-center justify center h-[70%] hidden-xs xl:inline-flex gap-1"
          }
        >
          <SlLocationPin />
          <div className={"text-xs"}>
            <p>Deliver to</p>
            <p className={"text-white font-bold uppercase"}>USA</p>
          </div>
        </div>

        {/* search bar*/}
        <div
          className={
            "flex-1 h-10 hidden md:inline-flex items-center justify-between relative"
          }
        >
          <input
            onChange={handleSearch}
            value={search}
            className={
              "w-full h-full rounded-md px-2 placeholder:text-sm text-base text-black border-[3px] border-transparent outline-none focus-visible:border-amazon_yellow"
            }
            type={"text"}
            placeholder={"search products"}
          />
          <span
            className={
              "w-12 h-full bg-amazon_yellow text-black text-2xl flex items-center " +
              "justify-center absolute right-0 rounded-tr-md rounded-br-md"
            }
          >
            <HiOutlineSearch />
          </span>
          {/* search fill */}
          {search && (
            <div className="absolute left-0 top-12 w-full mx-auto max-h-96 bg-gray-200 rounded-lg overflow-y-scroll cursor-pointer text-black">
              {filteredProducts.length > 0 ? (
                <>
                  {search &&
                    filteredProducts.map((item: StoreProduct) => (
                      <Link
                        key={item._id}
                        className="w-full border-b-[1px] border-b-gray-400 flex items-center gap-4"
                        href={{
                          pathname: `/${item._id}`,
                          query: {
                            _id: item._id,
                            title: item.title,
                            brand: item.brand,
                            price: item.price,
                            image: item.image,
                            description: item.description,
                            oldPrice: item.oldPrice,
                            category: item.category,
                            isNew: item.isNew,
                          },
                        }}
                        onClick={() => setSearch("")}
                      >
                        <SearchProducts item={item} />
                      </Link>
                    ))}
                </>
              ) : (
                <div className="bg-gray-50 flex items-center justify-center py-10 rounded-lg shadow-lg">
                  <p className="text-xl font-semibold animate-bounce">
                    No products found!
                  </p>
                </div>
              )}
            </div>
          )}
          {/* search fill */}
        </div>
        {/* signin */}
        {userInfo ? (
          <div
            onClick={() => signIn()}
            className={
              "flex items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] gap-1"
            }
          >
            <img
              src={userInfo.image}
              alt={"userimage"}
              className={"w-8 h-8 rounded-full object-cover"}
            />
            <div
              className={"text-sm text-gray-100 flex flex-col justify-between"}
            >
              <p className={"text-white font-bold"}>{userInfo.name}</p>
              <p>{userInfo.email}</p>
            </div>
          </div>
        ) : (
          <div
            onClick={() => signIn()}
            className={
              "text-xs text-gray-100 flex flex-col justify-center px-2" +
              "border border-transparent hover:border-white cursor-pointer duration-300 h-[70%]"
            }
          >
            <p>Hello, sign in</p>
            <p className={"text-white font-bold flex items-center"}>
              Account & Lists
              <span>
                <BiCaretDown />
              </span>
            </p>
          </div>
        )}

        {/* favorite */}
        <Link
          href={"/favorite"}
          className={
            "text-xs text-gray-100 flex flex-col justify-center px-2 " +
            "border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] relative"
          }
        >
          <p>Marked</p>
          <p className={"text-white font-bold"}>& Favourite</p>
          {favoriteData.length > 0 && (
            <span
              className={
                "absolute right-2 top-2 w-4 h-4 border-[1px] border-gray-400 flex " +
                "items-center justify-center text-xs text-amazon_yellow"
              }
            >
              {favoriteData.length}
            </span>
          )}
        </Link>
        {/* cart */}
        <Link
          href={"/cart"}
          className={
            "flex items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] relative"
          }
        >
          <Image
            className={"w-auto object-cover h-8"}
            src={cartIcon}
            alt={"cartImg"}
          />
          <p className={"text-sm text-white font-bold mt-3"}>Cart</p>
          <span
            className={
              "absolute text-amazon_yellow text-sm top-2 left-[29px] font-bold"
            }
          >
            {productData ? productData.length : 0}
          </span>
        </Link>
      </div>
    </div>
  );
};
export default Header;
