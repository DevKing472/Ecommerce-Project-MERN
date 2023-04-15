import { CartActions, Cart, CartItem, Product } from '@/types';

export function sumItems(cartItems: CartItem[]) {
  const itemCount = cartItems.reduce(
    (total, product) => total + product.quantity,
    0
  );
  const totalItems = Number(
    cartItems
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(2)
  );
  const totalDiscounts = Number(
    cartItems
      .reduce(
        (total, product) => total + product.discount * product.quantity,
        0
      )
      .toFixed(2)
  );
  const totalShippings = Number(
    cartItems
      .reduce(
        (total, product) => total + product.shippingCost * product.quantity,
        0
      )
      .toFixed(2)
  );
  const totalCart = Number(
    cartItems
      .reduce(
        (total, product) => total + product.totalPrice! * product.quantity,
        0
      )
      .toFixed(2)
  );
  return { itemCount, totalCart, totalDiscounts, totalShippings, totalItems };
}

export function CartReducer(state: Cart, action: CartActions) {
  switch (action.type) {
    case 'INIT':
      return {
        ...state,
        cartItems: [...action.payload.cartItems],
        ...sumItems([...action.payload.cartItems]),
      };

    case 'ADD_TO_CART':
      if (!state.cartItems.find((item) => item.id === action.payload!.id)) {
        state.cartItems.push({
          id: action.payload!.id,
          price: action.payload!.price,
          discount: action.payload!.discount,
          shippingCost: action.payload!.deliveryPrice,
          totalPrice: action.payload!.totalPrice,
          quantity: 1,
        });
      }

      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };

    case 'REMOVE_ITEM':
      return {
        ...state,
        ...sumItems(
          state.cartItems.filter((item) => item.id !== action.payload.id)
        ),
        cartItems: [
          ...state.cartItems.filter((item) => item.id !== action.payload.id),
        ],
      };

    case 'INCREASE':
      state.cartItems[
        state.cartItems.findIndex((item) => item.id === action.payload.id)
      ].quantity++;
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };

    case 'DECREASE':
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index >= 0) {
        state.cartItems[index].quantity > 1
          ? state.cartItems[index].quantity--
          : state.cartItems.splice(index, 1);
      }
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };

    case 'CLEAR':
      return {
        ...state,
        cartItems: [],
        ...sumItems([]),
      };

    case 'UPDATE_PRICES':
      action.payload.forEach((product: Product) => {
        state.cartItems[
          state.cartItems.findIndex((item) => item.id === product._id)
        ].price = product.price;
        state.cartItems[
          state.cartItems.findIndex((item) => item.id === product._id)
        ].discount = product.discount;
        state.cartItems[
          state.cartItems.findIndex((item) => item.id === product._id)
        ].shippingCost = product.deliveryPrice;
        state.cartItems[
          state.cartItems.findIndex((item) => item.id === product._id)
        ].totalPrice = product.totalPrice;
      });
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };

    default:
      return state;
  }
}
