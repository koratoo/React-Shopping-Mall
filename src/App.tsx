import { useRef, useState } from "react";
import "./App.css";

interface ProductType {
  id: number;
  name: string;
  explanation: string;
  price: number;
}

interface ProductItemProps {
  product: ProductType;
  onDelete: (id: number) => void;
  onUpdate: (product: ProductType) => void;
}

const ProductItem = ({ product, onDelete, onUpdate }: ProductItemProps) =>{
  const {id, name, price, explanation} = product;
  const [isEditMode, setIsEditMode] = useState(false);
  const [editName, setEditName] = useState(product.name);
  const [explanation, setEditExplanation] = useState(product.explanation);
  const [editPrice, setEditPrice] = useState(product.price);

  return (
    <div>
      <div>{id}</div>
      <div>{name}</div>
      <div>{price}</div>
      <div>{explanation}</div>

      <button type="button" onClick={() => onDelete(id)}>
        삭제하기
      </button>

      <button type="button" onClick={() => setIsEditMode((prev) => !prev)}>
        수정하기
      </button>

      {isEditMode && (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onUpdate({
              id,
              name: editName,
              price: editPrice,
              explanation: setEditExplanation,
            });
          }}
      >

        
      </form>
    </div>
  )
      
}

function App() {
  const [products, setProducts] = useState<ProductType[]>([
    {
      id: 0,
      name: "Galaxy Folder Phone X10",
      explanation:
        "2025년 새로 출시될 갤럭시 폴더블 폰 X10을 미리 만나보실 수 있습니다.",
      price: 2010000,
    },
  ]);

  const [name, setName] = useState("");
  const [explanation, setExplanation] = useState("");
  const [price, setPrice] = useState(0);

  const fakeId = useRef(0); // 초기값을 1로 변경합니다.

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
        {products.map(({ id, name, price, explanation }) => (
          <div key={id} className="product-item">
            <div className="product-id">ID: {id}</div>
            <div className="product-name">이름: {name}</div>
            <div className="product-price">가격: {price}원</div>
            <div className="product-explanation">설명: {explanation}</div>
            <button
              type="button"
              onClick={() => {
                setProducts(products.filter((product) => product.id !== id));
              }}
            >
              삭제하기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
