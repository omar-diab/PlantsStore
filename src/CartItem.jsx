import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping, onItemRemoved }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    let totalAmount = 0;
    cart.forEach((item) => {
      const costString = item.cost.replace(/[$,]/g, '');
      const cost = parseInt(costString, 10);
      totalAmount = totalAmount + (cost * item.quantity);
    });
    return totalAmount;
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    const updatedItem = { ...item, quantity: item.quantity + 1 };
    dispatch(updateQuantity(updatedItem));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      const updatedItem = { ...item, quantity: item.quantity - 1 };
      dispatch(updateQuantity(updatedItem));
    } else {
      dispatch(removeItem(item));
      onItemRemoved(item); // Notify ProductList about the item removal
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
    onItemRemoved(item); // Notify ProductList about the item removal
  };

  const calculateTotalCost = (item) => {
    let totalAmountIt = 0;
    const costString = item.cost.replace(/[$,]/g, '');
    const cost = parseInt(costString, 10);
    totalAmountIt = totalAmountIt + (cost * item.quantity);
    return totalAmountIt;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => onContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


