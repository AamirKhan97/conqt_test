import React, { useState, useEffect } from "react";
import "../styles/main.css";
import ItemDetails from "../components/ItemDetails";
import SupplierDetails from "../components/SupplierDetails";
import { GET_ITEMS_LIST } from "../helpers/api";
import {
  GET_COUNTRY_LIST,
  GET_STATE_LIST,
  GET_CITY_LIST,
  POST_ITEM_DETAILS_PAYLOAD,
} from "../helpers/api";

const Main = () => {
  // Particualar for item form data
  const [itemData, setItemData] = useState({
    name: "",
    quantity: null,
    price: null,
    date: "",
  });
  const [supplierData, setSupplierData] = useState({
    supplierName: "",
    companyName: "",
    country: null,
    state: null,
    city: "",
    email: "",
  });

  const [errorData, setErrorData] = useState({
    nameErr: "",
    quantityErr: "",
    priceErr: "",
    dateErr: "",
    supplierNameErr: "",
    companyNameErr: "",
    countryErr: "",
    stateErr: "",
    cityErr: "",
    emailErr: "",
  });

  //   funciton for data binding with state
  const handleChangeItem = (e) => {
    setItemData({
      ...itemData,
      [e.target.name]: e.target.value,
    });
  };
  // For storing checkbox values
  const [checkedVal, setCheckedVal] = useState("");
  const [tableData, setTableData] = useState([]);
  // Fetch table Data from API
  const fetchTableData = async () => {
    const response = await fetch(GET_ITEMS_LIST);
    const data = await response.json();
    if (data?.status === 200) {
      setTableData(data?.data?.items);
    } else {
      setTableData([]);
    }
  };
  useEffect(() => {
    fetchTableData();
  }, []);

  //   For supplier form
  const [countryData, setCountryData] = useState([]);

  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);

  //   funciton for data binding with state
  const handleChangeSupplier = (e) => {
    setSupplierData({
      ...supplierData,
      [e.target.name]: e.target.value,
    });
  };

  // Funtion for fetching cuntry list
  const fetchCountry = async () => {
    const response = await fetch(GET_COUNTRY_LIST);
    const data = await response.json();
    if (data?.status === 200) {
      setCountryData(data?.data?.countyList);
    } else {
      setCountryData([]);
    }
  };

  const fetechStateONQuery = async () => {
    const response = await fetch(
      `${GET_STATE_LIST}?countryId=${supplierData?.country}`
    );
    const data = await response.json();
    if (data?.status === 200) {
      setStateData(data?.data?.stateList);
    } else {
      setStateData([]);
    }
  };

  const fetchCityByCountryNState = async () => {
    const response = await fetch(
      `${GET_CITY_LIST}?countryId=${supplierData?.country}&stateId=${supplierData?.state}`
    );
    const data = await response.json();
    if (data?.status === 200) {
      setCityData(data?.data?.cityList);
    } else {
      setCityData([]);
    }
  };

  useEffect(() => {
    fetchCountry();
    if (supplierData.country !== null) {
      fetechStateONQuery();
    }

    if (supplierData.state !== null) {
      fetchCityByCountryNState();
    }
  }, [supplierData.country, supplierData.state]);

  // Validate All input fields
  const validateFields = () => {
    if (!itemData.name) {
      setErrorData({
        ...errorData,
        nameErr: "Name is required",
      });
    } else if (!itemData.quantity) {
      setErrorData({
        ...errorData,
        quantityErr: "Quantity is required",
      });
    } else if (!itemData.price) {
      setErrorData({
        ...errorData,
        priceErr: "Price is required",
      });
    } else if (!itemData.date) {
      setErrorData({
        ...errorData,
        dateErr: "Date is required",
      });
    } else if (!supplierData.supplierName) {
      setErrorData({
        ...errorData,
        supplierNameErr: "Supplier Name is required",
      });
    } else if (!supplierData.companyName) {
      setErrorData({
        ...errorData,
        companyNameErr: "Company Name is required",
      });
    } else if (!supplierData.country) {
      setErrorData({
        ...errorData,
        countryErr: "Country is required",
      });
    } else if (!supplierData.state) {
      setErrorData({
        ...errorData,
        stateErr: "State is required",
      });
    } else if (!supplierData.city) {
      setErrorData({
        ...errorData,
        cityErr: "City is required",
      });
    } else if (!supplierData.email) {
      setErrorData({
        ...errorData,
        emailErr: "Email is required",
      });
    }
  };
  // Submit form payload data
  const submitFormPayload = async (e) => {
    e.preventDefault();

    let finalObj = {
      itemDetails: itemData,
      supplier: supplierData,
    };
    if (validateFields()) {
      const response = await fetch(POST_ITEM_DETAILS_PAYLOAD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalObj),
      });
      const data = await response.json();
      if (data?.status === 200) {
        console.log(data);
      }
    }
  };

  return (
    <div id="main-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="check-Boxes-Flex">
              <div className="form-group mx-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="itemCheckbox"
                  onChange={(e) => setCheckedVal(e.target.value)}
                  value="Item"
                />
                <label htmlFor="itemCheckbox" className="text-gray">
                  Item
                </label>
              </div>
              <div className="form-group">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="supplyCheckbox"
                  onChange={(e) => setCheckedVal(e.target.value)}
                  value="Supplier"
                />
                <label htmlFor="supplyCheckbox" className="text-gray">
                  Supplier
                </label>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <form onSubmit={submitFormPayload}>
              {checkedVal === "Item" || checkedVal === "" ? (
                // Item Card
                <div className="item-card">
                  <div className="row">
                    <div className="col-lg-12 headingBox">
                      <h1>Item Details</h1>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-card">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-box">
                              <label className="label-form-head">
                                Item Name
                              </label>
                              <input
                                name="name"
                                value={itemData.name}
                                onChange={handleChangeItem}
                                type="text"
                                className="form-control py-1"
                                placeholder="Enter item name"
                              />
                              {errorData.nameErr ? (
                                <label className="text-danger">
                                  {errorData.nameErr}
                                </label>
                              ) : (
                                <label className="label-form-highlight">
                                  Max 50 charcters
                                </label>
                              )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-box">
                              <label className="label-form-head">
                                Quantity
                              </label>
                              <input
                                name="quantity"
                                value={itemData.quantity}
                                onChange={handleChangeItem}
                                type="number"
                                maxLength={10}
                                className="form-control py-1"
                                placeholder="Enter quantity"
                              />
                              {errorData.quantityErr ? (
                                <label className="text-danger">
                                  {errorData.quantityErr}
                                </label>
                              ) : (
                                <label className="label-form-highlight">
                                  Numeric Value
                                </label>
                              )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-box">
                              <label className="label-form-head">
                                Unit Price
                              </label>
                              <input
                                name="price"
                                value={itemData.price}
                                onChange={handleChangeItem}
                                type="number"
                                className="form-control py-1"
                                placeholder="Enter unit price"
                              />
                              {errorData.priceErr ? (
                                <label className="text-danger">
                                  {errorData.priceErr}
                                </label>
                              ) : (
                                <label className="label-form-highlight">
                                  Numeric Value (USD)
                                </label>
                              )}
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
                                onChange={handleChangeItem}
                                type="date"
                                className="form-control py-1"
                                placeholder="Select Date"
                              />
                              {errorData.dateErr ? (
                                <label className="text-danger">
                                  {errorData.dateErr}
                                </label>
                              ) : (
                                <label className="label-form-highlight">
                                  Format MM/DD/YYY
                                </label>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="item-card">
                  <div className="row">
                    <div className="col-lg-12 headingBox">
                      <h1>Supplier Details</h1>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-card">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-box">
                              <label className="label-form-head">
                                supplier Name
                              </label>
                              <input
                                name="supplierName"
                                value={supplierData.supplierName}
                                onChange={handleChangeSupplier}
                                type="text"
                                className="form-control py-1"
                                placeholder="Enter Supplier name"
                              />
                              {errorData.supplierNameErr ? (
                                <label className="text-danger">
                                  {errorData.supplierNameErr}
                                </label>
                              ) : (
                                <label className="label-form-highlight">
                                  Max 50 charcters
                                </label>
                              )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-box">
                              <label className="label-form-head">
                                company Name
                              </label>
                              <input
                                name="companyName"
                                value={supplierData.companyName}
                                onChange={handleChangeSupplier}
                                type="text"
                                className="form-control py-1"
                                placeholder="Enter company name"
                              />
                              {errorData.companyNameErr ? (
                                <label className="text-danger">
                                  {errorData.companyNameErr}
                                </label>
                              ) : (
                                <label className="label-form-highlight">
                                  Max 50 charcters
                                </label>
                              )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-box">
                              <label className="label-form-head">Country</label>
                              <select
                                className="form-select"
                                name="country"
                                value={supplierData.country}
                                onChange={handleChangeSupplier}
                              >
                                <option value="">USA</option>
                                {countryData && countryData.length > 0 ? (
                                  countryData.map((data, index) => {
                                    return (
                                      <option
                                        value={data?.countryId}
                                        key={index}
                                      >
                                        {data?.name}
                                      </option>
                                    );
                                  })
                                ) : (
                                  <option value="">No Data Found</option>
                                )}
                              </select>
                              {errorData.countryErr ? (
                                <label className="text-danger">
                                  {errorData.countryErr}
                                </label>
                              ) : (
                                <label className="label-form-highlight">
                                  Select country from the list
                                </label>
                              )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-box">
                              <label className="label-form-head">State</label>
                              <select
                                className="form-select"
                                name="state"
                                value={supplierData.state}
                                onChange={handleChangeSupplier}
                              >
                                <option value="">Florida</option>
                                {stateData && stateData.length > 0 ? (
                                  stateData.map((data, index) => {
                                    return (
                                      <option value={data?.stateId} key={index}>
                                        {data?.name}
                                      </option>
                                    );
                                  })
                                ) : (
                                  <option value="">No Data Found</option>
                                )}
                              </select>
                              {errorData.stateErr ? (
                                <label className="text-danger">
                                  {errorData.stateErr}
                                </label>
                              ) : (
                                <label className="label-form-highlight">
                                  Select state from the list
                                </label>
                              )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-box">
                              <label className="label-form-head">City</label>
                              <select
                                className="form-select"
                                name="city"
                                value={supplierData.city}
                                onChange={handleChangeSupplier}
                              >
                                <option value="">Miami</option>
                                {cityData && cityData.length > 0 ? (
                                  cityData.map((data, index) => {
                                    return (
                                      <option value={data?.cityId} key={index}>
                                        {data?.name}
                                      </option>
                                    );
                                  })
                                ) : (
                                  <option value="">No Data Found</option>
                                )}
                              </select>
                              {errorData.cityErr ? (
                                <label className="text-danger">
                                  {errorData.cityErr}
                                </label>
                              ) : (
                                <label className="label-form-highlight">
                                  Select City from the list
                                </label>
                              )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-box">
                              <label className="label-form-head">
                                Email Address
                              </label>
                              <input
                                name="email"
                                value={supplierData.email}
                                onChange={handleChangeSupplier}
                                type="text"
                                className="form-control py-1"
                                placeholder="Enter email address"
                              />
                              {errorData.emailErr ? (
                                <label className="text-danger">
                                  {errorData.emailErr}
                                </label>
                              ) : (
                                <label className="label-form-highlight">
                                  Valid email format
                                </label>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="submittion-box">
                <h1>Submit Data</h1>
                {/* <button className="btn btn-primary">Save Changes</button> */}
                <input
                  type="submit"
                  value="Save Changes"
                  className="btn btn-primary"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="table-box">
          <div className="headin-area">
            <h4>Uploaded Data</h4>
            <button>Clear All</button>
          </div>
          <table className="dataTable table table-hover table-striped">
            <thead>
              <tr>
                <th>
                  <div className="form-group">
                    <input type="checkbox" className="form-check-input" />
                    <label className="">Supplier</label>
                  </div>
                </th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>City</th>
                <th>Country</th>
                <th>Email</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {tableData && tableData.length > 0 ? (
                tableData.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div className="form-group">
                          <input type="checkbox" className="form-check-input" />
                          <label className="">
                            {data?.Supplier?.supplierName}
                          </label>
                        </div>
                      </td>
                      <td>{data?.itemName}</td>
                      <td>{data?.quantity}</td>
                      <td>{data?.Supplier?.supplierName}</td>
                      <td>{data?.Supplier?.countryName}</td>
                      <td>{data?.Supplier?.email}</td>
                      <td>{data?.Supplier?.phoneNumber}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7}>
                    <p className="text-center text-danger">No Data Found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Main;
