"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Product } from "@/interface";
import { useParams } from "next/navigation";

const fetchProductDetail = async (id) => {
    console.log("<<Masuk Fetch");
    
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products/${id}`, {
    method: "get",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Fetch Error");
  }

  return data;
};

const ProductDetail = () => {
  const router = useParams();
  const id = router.id; // Gunakan router.query untuk mendapatkan ID dari URL
  console.log(id, "<<Id");

  const [dataProduct, setDataProduct] = useState<Product | null>(null); // Inisialisasi sebagai null

  useEffect(() => {
    
    if (id) {
      const loadProductDetail = async () => {
        try {
          const productData = await fetchProductDetail(id);
          console.log(productData, "<<productData");
          setDataProduct(productData);
        } catch (error) {
          console.error("Error loading product detail:", error);
        }
      };

      loadProductDetail();
    }
  }, [id]);

  if (!dataProduct) return <div>Loading...</div>; // Menunggu data sebelum rendering

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold mb-4">{dataProduct.title}</h1>
      <div className="flex space-x-4">
        <div className="w-1/2">
          {/* Carousel Placeholder */}
          <div className="mb-4">
            {dataProduct?.images?.map((image, index) => (
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
          <p className="text-lg font-bold">Price: ${dataProduct.price.toFixed(2)}</p>
          <p className={`mt-2 text-lg ${dataProduct.availabilityStatus === "Low Stock" ? "text-red-500" : "text-green-500"}`}>
            {dataProduct.availabilityStatus}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
