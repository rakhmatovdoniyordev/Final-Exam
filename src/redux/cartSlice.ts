import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface CartItem {
  id: string
  title: string
  image: string
  price: number
  quantity: number
  size: number | null
  color?: string
}

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem("cart") || '[]')
}


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      if (existingItem) {
        existingItem.quantity += action.payload.quantity
      } else {
        state.items.push(action.payload)
      }
      localStorage.setItem("cart", JSON.stringify(state.items))
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      localStorage.setItem("cart", JSON.stringify(state.items))

    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload)
      if (item) {
        item.quantity += 1
      }
      localStorage.setItem("cart", JSON.stringify(state.items)) // Barcha massivni saqlash
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload)
      if (item && item.quantity > 1) {
        item.quantity -= 1
      }
      localStorage.setItem("cart", JSON.stringify(state.items)) // Barcha massivni saqlash
    },

    clearCart: (state) => {
      state.items = []
      localStorage.setItem("cart", JSON.stringify(state.items))
    }
  },
})

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions

export default cartSlice.reducer
