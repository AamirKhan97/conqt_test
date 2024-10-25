import React, { useState } from "react";
import "../styles/itemCard.css";
import moment from "moment";

const ItemDetails = ({ name, quantity, price, date }) => {
  // state for storing the data of item obj
  const [itemData, setItemData] = useState({
    name: "",
    quantity: null,
    price: null,
    date: "",
  });

  //   funciton for data binding with state
  const handleChange = (e) => {
    setItemData({
      ...itemData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="item-card">
      <div className="row">
        <div className="col-lg-12 headingBox">
          <h1>Item Details</h1>
        </div>
        <div className="col-lg-12">
          <div className="form-card">
            <form>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-box">
                    <label className="label-form-head">Item Name</label>
                    <input
                      name="name"
                      value={itemData.name}
                      onChange={handleChange}
                      type="text"
                      className="form-control py-1"
                      placeholder="Enter item name"
                    />
                    <label className="label-form-highlight">
                      Max 50 charcters
                    </label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-box">
                    <label className="label-form-head">Quantity</label>
                    <input
                      name="quantity"
                      value={itemData.quantity}
                      onChange={handleChange}
                      type="number"
                      //   maxLength={10}
                      max={10}
                      className="form-control py-1"
                      placeholder="Enter quantity"
                    />
                    <label className="label-form-highlight">
                      Numeric Value
                    </label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-box">
                    <label className="label-form-head">Unit Price</label>
                    <input
                      name="price"
                      value={itemData.price}
                      onChange={handleChange}
                      type="number"
                      className="form-control py-1"
                      placeholder="Enter unit price"
                    />
                    <label className="label-form-highlight">
                      Numeric Value (USD)
                    </label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-box">
                    <label className="label-form-head">
                      Date of submission
                    </label>
                    <input
                      name="date"
                      value={itemData.date}
                      onChange={handleChange}
                      type="date"
                      className="form-control py-1"
                      placeholder="Select Date"
                    />
                    <label className="label-form-highlight">
                      Format MM/DD/YYY
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
