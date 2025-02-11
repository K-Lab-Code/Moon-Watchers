//add imports based on functionality needed
import SavedEvents from "../components/SavedSearches";


const Saved = () => {

  const token = localStorage.getItem('token') || '';

  return (
    <div>
      <h1>Saved</h1>
      {/* add the logged in User's previouse saved searches  */}
      <SavedEvents token={token} />
    </div>
  )
}




export default Saved;