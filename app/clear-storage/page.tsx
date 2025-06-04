"use client"

export default function ClearStoragePage() {
  const clearStorage = () => {
    localStorage.clear()
    console.log("All localStorage cleared")
    alert("LocalStorage cleared! Refresh the page.")
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Clear Storage</h1>
        <button 
          onClick={clearStorage}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Clear All localStorage
        </button>
      </div>
    </div>
  )
}
