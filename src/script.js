/*
* https://frontendeval.com/questions/shopping-list
*
* Create a shopping list app with autocomplete item entry
*/

const debounce = (callback, interval) => {
  let timerId;

  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback.apply(this, args);
    }, interval);
  };
};


const IndividualComponent= ({ name ,onDelete}) => {
  const [toggleCheck,setToggleCheck] = useState(false)
  const handleDelete =()=>{
    onDelete(name)
  }
  const handleCheckToggle =()=>{
    setToggleCheck(!toggleCheck)
  }
  return (
 <div className="item-each">
  <button onClick={handleCheckToggle} style={{ backgroundColor: 'transparent', border: 'none' }}>
  <span style={{ color: !toggleCheck ? 'black' : '#999' ,fontWeight: 'bold', fontSize: '1.5em'}}>&#10003;</span>
</button>

        <h3 className={toggleCheck ? 'write-off' : ''}>{name}</h3>
      <button onClick={handleDelete} style={{ backgroundColor: 'transparent', border: 'none' }} >
         <span style={{ color: !toggleCheck ? 'black' : '#999' ,fontWeight: 'bold', fontSize: '1.5em',}}>&#x2717;</span>
      </button>
</div>
  );
}

const SuggestionComponent=({hint,addItem})=>{
  const handleSuggestionBtn =()=>{
    addItem(hint)
  }
  return (
    <button 
      className="suggestionBtn"
   onClick={handleSuggestionBtn}
    
      >{hint}</button>
)}

const ShoppingList =() =>{
  const [inputItem,setInputItem] = useState('')
  const [shoppingItem,setShoppingItem] = useState([])
  const [suggestions,setSuggestions] = useState([])
 
  const fetchData = async()=>{
    const response = await fetch(`https://api.frontendeval.com/fake/food/${inputItem}`);
   
    const data =  await response.json()
   setSuggestions(data)
    console.log(data)
  }
  const delayedFetch = debounce(fetchData,1000)
  useEffect(()=>{
    delayedFetch()
  },[inputItem])
  
  const handleInputItem = (event)=>{
    setInputItem(event.target.value)
  }
  const handleInputKeyPress = (event)=>{
    if(event.key==='Enter' && inputItem.trim()!==''){
     setShoppingItem([...shoppingItem, inputItem]);
      setInputItem('')
    }
  }
 const handleDeleteItem=(itemName)=>{
   const updatedItems = shoppingItem.filter((item)=> item!==itemName)
   setShoppingItem(updatedItems)
 }
  const addItemToShoppingList = (item)=>{
        setShoppingItem([...shoppingItem, item]);
  }
  return (
  <>
      <h1>My Shopping List</h1>
      <input type="text" value={inputItem} onChange={handleInputItem} onKeyPress={handleInputKeyPress}/>
  
      <div className="container">
         <div className="suggestions">
      {suggestions.map((suggestion) => <SuggestionComponent hint={suggestion} addItem={addItemToShoppingList}/>)}
        </div>
         <div className="list">
   {shoppingItem.map((val, index) => (
       <IndividualComponent key={index} name={val} onDelete={handleDeleteItem} />
      ))}
      </div>
         </div>
      </>
  )
}

const {useState,useEffect} = React
const App = () => {
  return <ShoppingList/>;
}

ReactDOM.render(<App />, document.getElementById('app'));