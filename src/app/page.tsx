"use client";
import { useEffect, useState } from "react";
import { Product } from "@/interface";
import Navbar from "./components/Navbar";
import Pagination from "./components/Pagination";
import Link from "next/link";

const fetchProducts = async (
  page: number,
  category: string,
  sortBy: string,
  order: string
) => {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/products`;

  if (category !== "All") {
    url = `${process.env.NEXT_PUBLIC_BASE_URL}/products/category/${category}`;
  }

  const response = await fetch(
    `${url}?page=${page}&sortBy=${sortBy}&order=${order}`,
    {
      method: "get",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Fetch Error");
  }

  return data;
};

export default function Home() {
  const [dataProducts, setDataProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [category, setCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("title");
  const [order, setOrder] = useState<string>("asc");

  useEffect(() => {
    const loadProducts = async () => {
      const { products, total, limit } = await fetchProducts(
        currentPage,
        category,
        sortBy,
        order
      );
      setDataProducts(products);
      setTotalPages(Math.ceil(total / limit));
    };

    loadProducts();
  }, [currentPage, category, sortBy, order]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortChange = (sortBy: string, order: string) => {
    setSortBy(sortBy);
    setOrder(order);
    setCurrentPage(1);
  };

  const handleFilterChange = (category: string) => {
    setCategory(category);
    setCurrentPage(1);
  };

  return (
    <>
      <Navbar
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
        title="home"
      />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-4xl font-bold text-center mb-8">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dataProducts.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow-lg">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover mb-4"
              />
              <h2 className="text-xl font-bold mb-2">{product.title}</h2>
              <p className="text-gray-600 mb-2">Category: {product.category}</p>
              <p className="text-gray-900 font-semibold">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-gray-500 line-through">
                ${" "}
                {(
                  product.price /
                  (1 - product.discountPercentage / 100)
                ).toFixed(2)}
              </p>
              <p className="text-green-600">
                {product.discountPercentage}% off
              </p>
              <p className="text-gray-700 mt-4">{product.description}</p>
              <div className="mt-4">
                <p className="text-gray-600">Rating: {product.rating} / 5</p>
                <p
                  className={`mt-2 text-sm ${
                    product.availabilityStatus === "Low Stock"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {product.availabilityStatus}
                </p>
              </div>
              <Link href={`/products/${product.id}`}>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                  Detail
                </button>
              </Link>
            </div>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
