import React, { createContext, useReducer, useContext } from 'react';

const CartContext = createContext();
const storeContext = createContext();
const { Provider } = storeContext;
export const useCart = () => useContext(CartContext);

// utility function to check if two arrays have the same elements regardless of their order
function arraysAreEqual(arr1, arr2) {
  return arr1.length === arr2.length && arr1.sort().every((value, index) => value === arr2.sort()[index]);
}

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      let itemInCartIndex = state.cart.findIndex(item => 
        item.id === action.product.id && 
        (!item.crust || item.crust === action.product.crust) &&
        (!item.extras || !action.product.extras || arraysAreEqual(item.extras, action.product.extras))
      );

      if (itemInCartIndex !== -1) {
        const newCart = [...state.cart];  // Copy the cart array
        newCart[itemInCartIndex] = {  // Replace the item with a new object
          ...newCart[itemInCartIndex],  // Copy the existing item
          purchaseQuantity: newCart[itemInCartIndex].purchaseQuantity + 1  // Increment quantity
        };
        return {
          ...state,
          cartOpen: true,
          cart: newCart
        }
      } else {
        return {
          ...state,
          cartOpen: true,
          cart: [...state.cart, { ...action.product, purchaseQuantity: 1 }] // add purchaseQuantity property
        }
      }

    case 'REMOVE_FROM_CART':
      let newCart = state.cart.filter((item) => item.product.id !== action.product.id);
      return {
        ...state,
        cartOpen: newCart.length > 0,
        cart: newCart
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cartOpen: false,
        cart: []
      };

    default:
      return state;
  }
};

export function useCartReducer(initialState) {
  return useReducer(cartReducer, initialState)
}

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useCartReducer({
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: '',
    products: [],
    loading: false,
  });
  console.log(state);
  return <Provider value={[state, dispatch]} {...props} />;
}

const useStoreContext = () => {
  return useContext(storeContext);
}

export { StoreProvider, useStoreContext };
