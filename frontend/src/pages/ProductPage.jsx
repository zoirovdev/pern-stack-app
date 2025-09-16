import { useEffect } from 'react'
import { useProductStore } from '../store/useProductStore'
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Save, Trash2 } from "lucide-react"



const ProductPage = () => {
  const {
    currentProduct,
    formData,
    setFormData,
    loading,
    error,
    fetchProduct,
    updateProduct,
    deleteProduct
  } = useProductStore()
  const navigate = useNavigate()
  const { id } = useParams()


  const handleDelete = async () => {
    await deleteProduct(id)
    navigate("/")
  }


  useEffect(() => {
    fetchProduct(id)
  }, [fetchProduct, id])

  if(loading){
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg"/>
      </div>
    )
  }

  if(error)
  {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">{error}</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button onClick={() => navigate("/")} className="btn btn-ghost mb-8">
        <ArrowLeft className="size-4 mr-2"/>
        Back to products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Product Image */}
        <div className="rounded-lg overflow-hidden shadow-lg bg-base-100">
          <img src={currentProduct?.image} alt={currentProduct?.name} 
            className="size-full object-cover"/>
        </div>

        {/* Product form */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6">Edit Product</h2>

            <form onSubmit={(e) => {
              e.preventDefault();
              updateProduct(id)}}
              className="space-y-6">
                {/* Product name */}
                <div className="form-control">
                  <label htmlFor="" className="label">
                    <span className="label-text text-base font-medium">Product Name</span>
                  </label>
                  <input type="text"
                    placeholder='Enter product name'
                    className="input input-bordered w-full"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}/>
                </div>

                {/* Product price */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base font-medium">Price</span>
                  </label>
                  <input 
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder='0.00'
                    className="input input-bordered w-full"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price:e.target.value })}
                    />
                </div>

                {/* Product image */}
                <div className="form-control">
                  <label htmlFor="" className="label">
                    <span className="label-text text-base font-medium">
                      Image URL
                    </span>
                  </label>
                  <input 
                    type="url"
                    placeholder='https://example.com/image.jpg'
                    className="input input-bordered w-full"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                </div>

                {/* Form actions */}
                <div className="flex justify-between mt-8">
                  <button type="button" 
                    className="btn btn-error" onClick={() => handleDelete()}>
                      <Trash2 className="size-4 mr-2"/>
                      Delete product
                  </button>

                  <button 
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading || !formData.name || !formData.price || !formData.image }>
                      {loading ? (
                        <span className="loading loading-spinner loading-sm"/>
                      ) : (
                        <>
                          <Save className="size-4 mr-2"/>
                          Save changes
                        </>
                      )
                      }
                  </button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
