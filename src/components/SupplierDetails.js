import React, { useEffect, useState } from "react";
import {
  GET_COUNTRY_LIST,
  GET_STATE_LIST,
  GET_CITY_LIST,
} from "../helpers/api";

const SupplierDetails = () => {
  // state for storing the data of item obj
  const [countryData, setCountryData] = useState([]);
  const [itemData, setItemData] = useState({
    supplierName: "",
    companyName: "",
    country: null,
    state: null,
    city: "",
    email: "",
  });

  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);

  //   funciton for data binding with state
  const handleChange = (e) => {
    setItemData({
      ...itemData,
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
      `${GET_STATE_LIST}?countryId=${itemData?.country}`
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
      `${GET_CITY_LIST}?countryId=${itemData?.country}&stateId=${itemData?.state}`
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
    if (itemData.country !== null) {
      fetechStateONQuery();
    }

    if (itemData.state !== null) {
      fetchCityByCountryNState();
    }
  }, [itemData.country, itemData.state]);

  return (
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
                  <label className="label-form-head">supplier Name</label>
                  <input
                    name="supplierName"
                    value={itemData.supplierName}
                    onChange={handleChange}
                    type="text"
                    className="form-control py-1"
                    placeholder="Enter Supplier name"
                  />
                  <label className="label-form-highlight">
                    Max 50 charcters
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-box">
                  <label className="label-form-head">company Name</label>
                  <input
                    name="companyName"
                    value={itemData.companyName}
                    onChange={handleChange}
                    type="text"
                    className="form-control py-1"
                    placeholder="Enter company name"
                  />
                  <label className="label-form-highlight">
                    Max 50 charcters
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-box">
                  <label className="label-form-head">Country</label>
                  <select
                    className="form-select"
                    name="country"
                    value={itemData.country}
                    onChange={handleChange}
                  >
                    <option value="">USA</option>
                    {countryData && countryData.length > 0 ? (
                      countryData.map((data, index) => {
                        return (
                          <option value={data?.countryId} key={index}>
                            {data?.name}
                          </option>
                        );
                      })
                    ) : (
                      <option value="">No Data Found</option>
                    )}
                  </select>
                  <label className="label-form-highlight">
                    Select country from the list
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-box">
                  <label className="label-form-head">State</label>
                  <select
                    className="form-select"
                    name="state"
                    value={itemData.state}
                    onChange={handleChange}
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
                  <label className="label-form-highlight">
                    Select state from the list
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-box">
                  <label className="label-form-head">City</label>
                  <select
                    className="form-select"
                    name="city"
                    value={itemData.city}
                    onChange={handleChange}
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
                  <label className="label-form-highlight">
                    Select state from the list
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-box">
                  <label className="label-form-head">Email Address</label>
                  <input
                    name="email"
                    value={itemData.email}
                    onChange={handleChange}
                    type="text"
                    className="form-control py-1"
                    placeholder="Enter email address"
                  />
                  <label className="label-form-highlight">
                    Valid email format
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetails;
