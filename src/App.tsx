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

const ProductItem = ({ product, onDelete, onUpdate }: ProductItemProps) => {
  const { id, name, price, explanation } = product;
  const [isEditMode, setIsEditMode] = useState(false);
  const [editName, setEditName] = useState(product.name);
  const [editExplanation, setEditExplanation] = useState(product.explanation);
  const [editPrice, setEditPrice] = useState(product.price);

  return (
    <div className="product-item">
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
              explanation: editExplanation,
            });
            setIsEditMode(false); // 수정 후 폼을 닫습니다.
          }}
        >
          <input
            type="text"
            placeholder="상품 이름"
            value={editName}
            onChange={(event) => setEditName(event.target.value)}
          />
          <input
            type="text"
            placeholder="상품 설명"
            value={editExplanation}
            onChange={(event) => setEditExplanation(event.target.value)}
          />
          <input
            type="number"
            placeholder="상품 가격"
            value={editPrice}
            onChange={(event) => setEditPrice(parseInt(event.target.value, 10))}
          />
          <input type="submit" value="상품 수정하기" />
        </form>
      )}
    </div>
  );
};

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
    setProducts([
      ...products,
      {
        ...newProduct,
        id: fakeId.current,
      },
    ]);
  };

  const handleDelete = (id: number) =>
    setProducts(products.filter((product) => product.id !== id));

  const handleUpdate = (updateProduct: {
    id: number;
    name: string;
    explanation: string;
    price: number;
  }) => {
    setProducts(
      products.map((product) =>
        product.id === updateProduct.id ? updateProduct : product
      )
    );
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
          onChange={(event) =>
            setPrice(Number(parseInt(event.target.value, 10)))
          }
          type="number"
          placeholder="상품 가격"
          className="input-field"
        />
        <input type="submit" value="상품 만들기" className="submit-button" />
      </form>
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
}

export default App;
