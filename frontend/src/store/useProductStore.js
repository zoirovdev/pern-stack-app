import { create } from "zustand"
import axios from "axios"
import toast from "react-hot-toast"


// base url will be dynamic depend on the environment
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";


export const useProductStore = create((set, get) => ({
    // products state
    products: [],
    loading: false,
    error: null,
    currentProduct: null,

    // form state
    formData: {
        name:"",
        price:"",
        image:""
    },

    setFormData: (formData) => set({ formData }),
    resetForm: () => set({ formData: { name:"", price:"", image:"" }}),

    addProduct: async (e) => {
        e.preventDefault()
        set({ loading: true })

        try {
            const { formData } = get()
            await axios.post(`${BASE_URL}/api/products`, formData)
            await get().fetchProducts()
            get().resetForm()
            toast.success("Product added successfully")
            // to do: close modal 
        } catch (error) {
            console.log("Error in addProduct function", error)
            toast.error("Something went wrong")
        } finally {
            set({ loading: false })
        }
    },

    fetchProducts: async () => {
        set({loading:true})

        try {
            const response = await axios.get(`${BASE_URL}/api/products`)
            set({products: response.data.data, error:null})
        } catch (err){
            if(err.status === 429) set({ error: "Rate limit exceeded", products: [] })
            else set({ error: "something went wrong", products: [] })
        } finally {
            set({loading:false})
        }
    },

    deleteProduct: async (id) => {
        set({loading: true})
        try {
            await axios.delete(`${BASE_URL}/api/products/${id}`)
            set(prev => ({products: prev.products.filter(product => product.id !== id)}))
            toast.success("Product deleted successfully")
        } catch (error){
            console.log("Error in deleteProduct function", error)
            toast.error("Something went wrong")
        } finally {
            set({loading: false})
        }
    },

    fetchProduct: async (id) => {
        set({ loading: true})
        try {
            const response = await axios.get(`${BASE_URL}/api/products/${id}`)
            set({ currentProduct: response.data.data,
                formData: response.data.data,
                error: null
             })
        } catch (error) {
            console.log("Error in fetch product function", error)
            set({ error: "Something went wrong", currentProduct: null })
        } finally {
            set({ loading: false })
        }
    },

    updateProduct: async (id) => {
        set({ loading: true })
        try {
            const { formData } = get()
            const response = await axios.put(`${BASE_URL}/api/products/${id}`, formData)
            console.log("Update")
            set({ currentProduct: response.data.data })
            toast.success("Product updated successfully")
        } catch (error) {
            toast.error("Something went wrong")
            console.log("Error in updateProduct function", error)
        } finally {
            set({ loading: false })
        }
    }
}))