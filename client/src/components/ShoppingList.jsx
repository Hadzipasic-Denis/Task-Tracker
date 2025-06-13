import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";

export default function ShoppingList() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editItemId, setEditItemId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [quantity, setQuantity] = useState("");

  const STORAGE_KEY = "shopping_list_items";

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setItems(stored);
  }, []);

  const saveItems = (updated) => {
    setItems(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleAdd = () => {
    if (!inputValue.trim()) return;
    const newItem = {
      id: Date.now(),
      name: inputValue.trim(),
      quantity: quantity.trim() || "1",
      purchased: false,
    };
    saveItems([...items, newItem]);
    setInputValue("");
    setQuantity("");
  };

  const handleDelete = (id) => {
    saveItems(items.filter((item) => item.id !== id));
    toast.success("Item deleted!");
  };

  const togglePurchased = (id) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, purchased: !item.purchased } : item
    );
    saveItems(updated);
  };

  const startEdit = (id, name) => {
    setEditItemId(id);
    setEditValue(name);
  };

  const saveEdit = (id) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, name: editValue } : item
    );
    saveItems(updated);
    setEditItemId(null);
    setEditValue("");
    toast.success("Item updated!");

  };

  const handleDeleteChecked = () => {
    const updated = items.filter((item) => !item.purchased);
    saveItems(updated);
    toast.success("Checked items deleted!");
  };

  const total = items.length;
  const purchasedCount = items.filter((item) => item.purchased).length;

  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="flex flex-col gap-4 w-full max-w-5xl mx-auto py-6 px-4 overflow-y-auto h-[100vh]">
        <div className="bg-white shadow-md rounded-lg p-4 max-w-xl mx-auto w-full ">
          <h2 className="text-xl font-bold mb-2">Add Grocery Item</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAdd();
            }}
            className="flex flex-col md:flex-row gap-2"
          >
            <div className="flex flex-grow gap-2">
              <input
                type="text"
                placeholder="Enter item name..."
                className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <input
                type="number"
                placeholder="Qty"
                className="w-24 border border-gray-300 rounded px-3 py-2 focus:outline-none"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
              />
            </div>

            <button
              type="submit"
              className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </form>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Shopping List:</h2>
            <div className="flex gap-2 items-center">
              <span className="text-sm text-gray-600">
                {purchasedCount} / {total} purchased
              </span>
              {purchasedCount > 0 && (
                <button
                  onClick={handleDeleteChecked}
                  className="bg-red-500 text-white px-3 py-2 rounded text-sm hover:bg-red-600"
                >
                  Delete Checked
                </button>
              )}
            </div>
          </div>

          {total === 0 ? (
            <p className="text-gray-500 italic">No items added yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg p-4 flex justify-between items-start shadow-sm group"
                >
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      checked={item.purchased}
                      onChange={() => togglePurchased(item.id)}
                      className="h-4 w-4 text-teal-600 mt-1 hover:cursor-pointer"
                    />
                    <div className="ml-3">
                      {editItemId === item.id ? (
                        <input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={(e) =>
                            e.key === "Enter" && saveEdit(item.id)
                          }
                          className="w-full px-2 py-1 border rounded"
                        />
                      ) : (
                        <p
                          className={`text-base ${
                            item.purchased ? "line-through text-gray-400" : ""
                          }`}
                        >
                          {item.name}{" "}
                          {item.quantity > 1 && `(${item.quantity})`}
                        </p>
                      )}
                    </div>
                  </div>
                  <div
                    className={`gap-1 ml-4 ${
                      editItemId === item.id
                        ? "flex"
                        : "hidden group-hover:flex"
                    }`}
                  >
                    {editItemId === item.id ? (
                      <button
                        onClick={() => saveEdit(item.id)}
                        title="Save"
                        className="text-green-600 hover:text-green-800"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          viewBox="0 0 32 32"
                        >
                          <path
                            fill="currentColor"
                            d="m14 21.414l-5-5.001L10.413 15L14 18.586L21.585 11L23 12.415z"
                          ></path>
                          <path
                            fill="currentColor"
                            d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m0 26a12 12 0 1 1 12-12a12 12 0 0 1-12 12"
                          ></path>
                        </svg>
                      </button>
                    ) : (
                      <button
                        onClick={() => startEdit(item.id, item.name)}
                        title="Edit"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          viewBox="0 0 2048 2048"
                        >
                          <path
                            fill="currentColor"
                            d="M2048 335q0 66-25 128t-73 110L633 1890L0 2048l158-633L1475 98q48-48 110-73t128-25q69 0 130 26t106 72t72 107t27 130M326 1428q106 35 182 111t112 183L1701 640l-293-293zm-150 444l329-82q-10-46-32-87t-55-73t-73-54t-87-33zM1792 549q25-25 48-47t41-46t28-53t11-67q0-43-16-80t-45-66t-66-45t-81-17q-38 0-66 10t-53 29t-47 41t-47 48z"
                          ></path>
                        </svg>
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(item.id)}
                      title="Delete"
                      className="text-red-600 hover:text-red-800"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={20}
                        height={20}
                        viewBox="0 0 28 28"
                      >
                        <path
                          fill="currentColor"
                          d="M11.5 6h5a2.5 2.5 0 0 0-5 0M10 6a4 4 0 0 1 8 0h6.25a.75.75 0 0 1 0 1.5h-1.31l-1.217 14.603A4.25 4.25 0 0 1 17.488 26h-6.976a4.25 4.25 0 0 1-4.235-3.897L5.06 7.5H3.75a.75.75 0 0 1 0-1.5zM7.772 21.978a2.75 2.75 0 0 0 2.74 2.522h6.976a2.75 2.75 0 0 0 2.74-2.522L21.436 7.5H6.565zM11.75 11a.75.75 0 0 1 .75.75v8.5a.75.75 0 0 1-1.5 0v-8.5a.75.75 0 0 1 .75-.75m5.25.75a.75.75 0 0 0-1.5 0v8.5a.75.75 0 0 0 1.5 0z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
