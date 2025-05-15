// components/HomePage.jsx
const products = new Array(6).fill({
  name: "HP AMD Ryzen 3",
  price: "$529.99",
  image: "/path-to-image.png", // Replace with real path
});

const Home = () => {
  return (
    <main className="w-4/5 p-6">
      <div className="flex justify-end gap-2 mb-4">
        <button className="bg-yellow-400 px-4 py-2 rounded">Add category</button>
        <button className="bg-yellow-400 px-4 py-2 rounded">Add sub category</button>
        <button className="bg-yellow-400 px-4 py-2 rounded">Add product</button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {products.map((product, idx) => (
          <div key={idx} className="border rounded p-3 text-center">
            <img src={product.image} alt={product.name} className="mx-auto mb-2" />
            <h3 className="text-blue-800 font-semibold">{product.name}</h3>
            <p>{product.price}</p>
            <div className="mt-2">⭐⭐⭐⭐⭐</div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;
