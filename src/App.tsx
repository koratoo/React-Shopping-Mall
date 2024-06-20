import { useState } from "react";

//App.tsx
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
    explanation: '2025년 새로 출시될 갤럭시 폴더블 폰 X10을 미리 만나보실 수 있습니다.',
    price: 2010000,
  },
]);

  console.log(products);

  return (
    <>
      <form onSubmit={(event) => {
        event.preventDefault();
        console.log("제출")
        }}
      >
        <input type="text" placeholder="상품 이름" />
        <input type="text" placeholder="상품 설명" />
        <input type="number" placeholder="상품 가격" />
        <input type="submit" placeholder="상품 만들기" />
      </form>

      {products.map((product) => (
      <div key={product.id}>
        <div>{product.id}</div>
        <div>{product.name}</div>
        <div>{product.price}</div>
        <div>{product.explanation}</div>
      </div>
      ))}
    </>
  );
}

export default App;
