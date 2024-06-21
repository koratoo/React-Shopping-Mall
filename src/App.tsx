import { useRef, useState } from "react";
import "./App.css";


interface ProductType {
  id: number;
  name: string;
  explanation: string;
  price: number;
}

function App() {
  const [products, setProducts] = useState<ProductType[]>([
    {
      id: 0,
      name: "Galaxy Folder Phone X10",
      explanation: "2025년 새로 출시될 갤럭시 폴더블 폰 X10을 미리 만나보실 수 있습니다.",
      price: 2010000,
    },
  ]);

  const [name, setName] = useState("");
  const [explanation, setExplanation] = useState("");
  const [price, setPrice] = useState(0);

  const fakeId = useRef(1); // 초기값을 1로 변경합니다.

  const handleCreate = (newProduct: Omit<ProductType, "id">) => {
    fakeId.current += 1;
    const product = { id: fakeId.current, ...newProduct };
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  return (
    <div className="app-container">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleCreate({
            name,
            explanation,
            price,
          });
        }}
        className="product-form"
      >
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          type="text"
          placeholder="상품 이름"
          className="input-field"
        />
        <input
          value={explanation}
          onChange={(event) => setExplanation(event.target.value)}
          type="text"
          placeholder="상품 설명"
          className="input-field"
        />
        <input
          value={price}
          onChange={(event) => setPrice(Number(event.target.value))}
          type="number"
          placeholder="상품 가격"
          className="input-field"
        />
        <input type="submit" value="상품 만들기" className="submit-button" />
      </form>

      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <div className="product-id">ID: {product.id}</div>
            <div className="product-name">이름: {product.name}</div>
            <div className="product-price">가격: {product.price}원</div>
            <div className="product-explanation">설명: {product.explanation}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

