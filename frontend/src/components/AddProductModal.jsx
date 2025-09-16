import React from 'react'
import { useProductStore } from '../store/useProductStore'
import { DollarSign, Plus, Package, Image, CirclePlus } from 'lucide-react'

const AddProductModal = () => {
  const { addProduct, formData, setFormData, loading } = useProductStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addProduct(e)
      // Close modal and reset form after successful submission
      document.getElementById("add_product_modal").close()
    } catch (error) {
      console.error('Failed to add product:', error)
    }
  }

  const handleCancel = () => {
    document.getElementById("add_product_modal").close()
  }

  return (
    <dialog id="add_product_modal" className="modal">
      <div className="modal-box">
        {/* Close button */}
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>

        {/* Modal header */}
        <h3 className="font-bold text-xl mb-8">
          Add New Product
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6">
            {/* Product name input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Product name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50 z-50">
                  <Package className="size-5"/>
                </div>
                <input 
                  type="text" 
                  placeholder='Enter product name'
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Product Price Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Price</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50 z-50">
                  <DollarSign className="size-5"/>
                </div>
                <input 
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder='0.00'
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Product image */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Image URL</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50 z-50">
                  <Image className="size-5"/>
                </div>
                <input 
                  type="url" 
                  placeholder='https://example.com/image.jpg'
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          {/* MODAL ACTIONS */}
          <div className="modal-action">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary min-w-[120px]"
              disabled={!formData.name || !formData.price || !formData.image || loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  <CirclePlus className="w-5 h-5 mr-2" />
                  Add Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  )
}

export default AddProductModal