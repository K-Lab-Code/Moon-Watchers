//add imports based on functionality needed

import SavedEvents from "../components/SavedSearches";


const Saved = () => {

  const token = localStorage.getItem('token') || '';

  return (
    <nav className="bg-gradient-to-r from-gray-800 via-indigo-900 to-gray-800"> 
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-white border-3 px-6 py-5 border-gray-300 mb-4 rounded-full text-center">
        Saved Searches ✩
      </h1>
      {/* add the logged in User's previouse saved searches  */}
      <div className="text-center text-gray-300 mb-4">
        <SavedEvents token={token} />
      </div>
    </div>
    </nav>
  )
}




export default Saved;
