import React, { createContext, useReducer, useContext } from 'react';

const CartContext = createContext();
const initialState = { items: [] };

function reducer(state, action){
  switch(action.type){
    case 'ADD_ITEM': {
      const item = action.payload;
      const exist = state.items.find(i => i.id === item.id);
      if(exist) {
        return { ...state, items: state.items.map(i => i.id === item.id ? {...i, qty: i.qty+1} : i) };
      }
      return { ...state, items: [...state.items, {...item, qty:1}] };
    }
    case 'INCREMENT':
      return { ...state, items: state.items.map(i => i.id === action.payload ? {...i, qty:i.qty+1} : i) };
    case 'DECREMENT':
      return { ...state, items: state.items.map(i => i.id === action.payload ? {...i, qty: i.qty-1} : i).filter(i => i.qty > 0) };
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    case 'CLEAR': return initialState;
    default: return state;
  }
}

export function CartProvider({children}){
  const [state, dispatch] = useReducer(reducer, initialState);
  return <CartContext.Provider value={{state, dispatch}}>{children}</CartContext.Provider>;
}
export function useCart(){ return useContext(CartContext); }
