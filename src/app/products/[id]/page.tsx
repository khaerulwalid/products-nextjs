"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Product } from "@/interface";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/Navbar";

const fetchProductDetail = async (id: string) => {
  const response = await fetch(`https://dummyjson.com/products/${id}`, {
    method: "get",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Fetch Error");
  }

  return data;
};

const ProductDetail = () => {
  const params = useParams();
  const id = params.id;

  const [dataProduct, setDataProduct] = useState<Product | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const loadProductDetail = async () => {
        try {
          const productData = await fetchProductDetail(id as string);

          setDataProduct({
            ...productData,
            images: Array.isArray(productData.images) ? productData.images : [],
          });
        } catch (error) {
          setError("Error loading product detail");
        }
      };

      loadProductDetail();
    }
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!dataProduct) return <div>Loading...</div>;

  return (
    <>
      <Navbar title="detail" onSortChange={null} onFilterChange={null} />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-4xl font-bold mb-4">{dataProduct.title}</h1>
        <div className="flex space-x-4">
          <div className="w-1/2">
            <div className="mb-4">
              {Array.isArray(dataProduct?.images) &&
                dataProduct.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={dataProduct.title}
                    className="w-full h-96 object-cover mb-2"
                  />
                ))}
            </div>
          </div>
          <div className="w-1/2">
            <p className="text-lg font-semibold mb-2">Description</p>
            <p className="mb-4">{dataProduct.description}</p>
            <p className="text-lg font-bold">
              Price: ${dataProduct.price.toFixed(2)}
            </p>
            <p
              className={`mt-2 text-lg ${
                dataProduct.availabilityStatus === "Low Stock"
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {dataProduct.availabilityStatus}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
