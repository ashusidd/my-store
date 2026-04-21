import React, { useState, useEffect } from 'react'

function App() {
  const [products, SetProducts] = useState(() => {
    const localData = localStorage.getItem("productsList");
    return localData ? JSON.parse(localData) : [
      { id: 1, name: "Pen", price: 20, img: "/images/pen.jpg" },
      { id: 2, name: "Eraser", price: 10, img: "/images/eraser.jpg" },
      { id: 3, name: "Sharpener", price: 10, img: "/images/sharpener.jpg" }
    ];
  });
  useEffect(() => {
    localStorage.setItem("productsList", JSON.stringify(products));
  }, [products]);
  const [nameInput, SetNameInput] = useState("");
  const [priceInput, SetPriceInput] = useState("");
  const [image, setImage] = useState(null);

  const addProduct = (e) => {
    e.preventDefault();
    if (!nameInput || !priceInput) return;
    const newProduct = {
      id: Date.now(), name: nameInput, price: priceInput, img: image ? URL.createObjectURL(image) : null
    };
    SetProducts([...products, newProduct]);
    SetNameInput("");
    SetPriceInput("");
    setImage(null);
  }
  const deleteProduct = (id) => {
    SetProducts(products.filter((item) => item.id !== id))
  }
  return (
    <div className="min-h-screen bg-slate-500 p-6 md:p-12">
      <div>
        <form onSubmit={addProduct} className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-xl shadow-slate-200 flex flex-col gap-4 mb-10">
          <h3 className="text-1xl text-center font-black text-slate-800 mb-8 pl-4">Add product here!</h3>
          <input className="w-full border-2 border-slate-100 p-3 rounded-xl outline-none focus:border-blue-400 transition-all placeholder:text-slate-400"
            type='text'
            value={nameInput}
            placeholder='Product Name'
            onChange={(e) => SetNameInput(e.target.value)} />
          <input className="w-full border-2 border-slate-100 p-3 rounded-xl outline-none focus:border-blue-400 transition-all placeholder:text-slate-400"
            type='number'
            value={priceInput}
            placeholder='Price'
            onChange={(e) => SetPriceInput(e.target.value)} />
          <input className="w-full border-2 border-slate-100 p-3 rounded-xl outline-none focus:border-blue-400 transition-all placeholder:text-slate-400"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])} />
          <button className="bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 active:scale-95 transition-transform shadow-lg shadow-blue-100">Add</button>
        </form>
      </div>
      <h1 className="text-2xl font-black text-slate-800 mb-8 border-l-4 border-blue-600 pl-4">
        OUR PRODUCTS
      </h1>
      {products.length === 0 && (
        <div className="flex flex-col items-center justify-center p-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
          <span className="text-6xl mb-4">🛒</span>
          <p className="text-xl text-slate-400 font-bold italic text-center">
            Inventory is empty! <br /> Add some cool products above.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center group hover:shadow-xl transition-all duration-300">

            {/* Image Handling */}
            <div className="relative mb-4">
              {p.img ? (
                <img src={p.img} alt={p.name} className="w-40 h-40 object-cover rounded-2xl shadow-md" />
              ) : (
                <div className="w-40 h-40 bg-slate-100 rounded-2xl flex flex-col items-center justify-center text-slate-400">
                  <span className="text-3xl">📦</span>
                  <p className="text-xs mt-2 font-medium">No Image</p>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="text-center w-full">
              <h2 className="text-lg font-extrabold text-slate-800 truncate">{p.name}</h2>
              <h3 className="text-blue-600 font-bold text-xl mt-1 mb-4">₹{p.price}</h3>

              <button
                onClick={() => deleteProduct(p.id)}
                className="w-full bg-slate-50 text-red-500 hover:bg-red-500 hover:text-white py-2 rounded-xl font-bold transition-all active:scale-95"
              >
                REMOVE PRODUCT
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default App