// components/Navbar.tsx
import React, { useEffect, useState } from "react";

interface Category {
  name: string;
  slug: string;
  url: string;
}

interface NavbarProps {
  onSortChange: (sortBy: string, order: string) => void;
  onFilterChange: (category: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSortChange, onFilterChange }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("https://dummyjson.com/products/categories");
      const data: Category[] = await response.json();
      setCategories(data); // Menyimpan data kategori dari API
    };

    fetchCategories();
  }, []);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [sortBy, order] = event.target.value.split(",");
    onSortChange(sortBy, order);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;

    onFilterChange(category);
  };

  return (
    <nav className="bg-white shadow mb-6">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Product List</h1>

        <div className="flex items-center space-x-4">
          <select onChange={handleFilterChange} className="border rounded p-2">
            <option value="All">All Categories</option>{" "}
            {/* Opsi untuk semua kategori */}
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>

          <select onChange={handleSortChange} className="border rounded p-2">
            <option value="title,asc">Sort by Title (A-Z)</option>
            <option value="title,desc">Sort by Title (Z-A)</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
