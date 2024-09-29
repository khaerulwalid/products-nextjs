import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Category {
  name: string;
  slug: string;
  url: string;
}

interface NavbarProps {
  onSortChange: ((sortBy: string, order: string) => void) | null;
  onFilterChange: ((category: string) => void) | null;
  title: string;
}

const Navbar: React.FC<NavbarProps> = ({
  onSortChange,
  onFilterChange,
  title,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("https://dummyjson.com/products/categories");
      const data: Category[] = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [sortBy, order] = event.target.value.split(",");
    if (onSortChange) {
      onSortChange(sortBy, order);
    }
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    if (onFilterChange) {
      onFilterChange(category);
    }
  };

  return (
    <nav className="bg-white shadow mb-6">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link href="/" passHref>
            Product List
          </Link>
        </h1>

        {title === "home" && (
          <div className="flex items-center space-x-4">
            <select
              onChange={handleFilterChange}
              className="border rounded p-2"
            >
              <option value="All">All Categories</option>{" "}
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
        )}
      </div>
    </nav>
  );
};

export default Navbar;
