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


const IndividualComponent = ({ name, onDelete }) => {
  const [toggleCheck, setToggleCheck] = useState(false);
  const handleDelete = () => {
    onDelete(name);
  };
  const handleCheckToggle = () => {
    setToggleCheck(!toggleCheck);
  };
  return /*#__PURE__*/(
    React.createElement("div", { className: "item-each" }, /*#__PURE__*/
    React.createElement("button", { onClick: handleCheckToggle, style: { backgroundColor: 'transparent', border: 'none' } }, /*#__PURE__*/
    React.createElement("span", { style: { color: !toggleCheck ? 'black' : '#999', fontWeight: 'bold', fontSize: '1.5em' } }, "\u2713")), /*#__PURE__*/


    React.createElement("h3", { className: toggleCheck ? 'write-off' : '' }, name), /*#__PURE__*/
    React.createElement("button", { onClick: handleDelete, style: { backgroundColor: 'transparent', border: 'none' } }, /*#__PURE__*/
    React.createElement("span", { style: { color: !toggleCheck ? 'black' : '#999', fontWeight: 'bold', fontSize: '1.5em' } }, "\u2717"))));



};

const SuggestionComponent = ({ hint, addItem }) => {
  const handleSuggestionBtn = () => {
    addItem(hint);
  };
  return /*#__PURE__*/(
    React.createElement("button", {
      className: "suggestionBtn",
      onClick: handleSuggestionBtn },

    hint));
};

const ShoppingList = () => {
  const [inputItem, setInputItem] = useState('');
  const [shoppingItem, setShoppingItem] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const fetchData = async () => {
    const response = await fetch(`https://api.frontendeval.com/fake/food/${inputItem}`);

    const data = await response.json();
    setSuggestions(data);
    console.log(data);
  };
  const delayedFetch = debounce(fetchData, 1000);
  useEffect(() => {
    delayedFetch();
  }, [inputItem]);

  const handleInputItem = event => {
    setInputItem(event.target.value);
  };
  const handleInputKeyPress = event => {
    if (event.key === 'Enter' && inputItem.trim() !== '') {
      setShoppingItem([...shoppingItem, inputItem]);
      setInputItem('');
    }
  };
  const handleDeleteItem = itemName => {
    const updatedItems = shoppingItem.filter(item => item !== itemName);
    setShoppingItem(updatedItems);
  };
  const addItemToShoppingList = item => {
    setShoppingItem([...shoppingItem, item]);
  };
  return /*#__PURE__*/(
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("h1", null, "My Shopping List"), /*#__PURE__*/
    React.createElement("input", { type: "text", value: inputItem, onChange: handleInputItem, onKeyPress: handleInputKeyPress }), /*#__PURE__*/

    React.createElement("div", { className: "container" }, /*#__PURE__*/
    React.createElement("div", { className: "suggestions" },
    suggestions.map(suggestion => /*#__PURE__*/React.createElement(SuggestionComponent, { hint: suggestion, addItem: addItemToShoppingList }))), /*#__PURE__*/

    React.createElement("div", { className: "list" },
    shoppingItem.map((val, index) => /*#__PURE__*/
    React.createElement(IndividualComponent, { key: index, name: val, onDelete: handleDeleteItem }))))));





};

const { useState, useEffect } = React;
const App = () => {
  return /*#__PURE__*/React.createElement(ShoppingList, null);
};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('app'));