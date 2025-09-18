// src/api/mockApi.js
const productImages = {
  food1: require('../../assets/burger.jpg'),
  food2: require('../../assets/Samosa.jpg'),
  food3: require('../../assets/pizza.jpg'),
  food4: require('../../assets/chicken.jpg'),
};

function makeProduct(i){
  const keys = Object.keys(productImages);
  const imgKey = keys[i % keys.length];
  return {
    id: `${1000 + i}`,
    title: ['Yummies Special Burger','Samosa','Pizza','Chicken Lollipop'][i % 4],
    description: 'Delicious and freshly made. Hot & tasty.',
     description: ' Hot & tasty.',

    
    price: (150 + ((i % 5) * 10)),
    image: productImages[imgKey],
  };
}

export function fetchProducts(count = 30, delay = 600){
  const products = [];
  for(let i=0;i<count;i++) products.push(makeProduct(i));
  return new Promise((resolve) => setTimeout(()=>resolve(products), delay));
}
