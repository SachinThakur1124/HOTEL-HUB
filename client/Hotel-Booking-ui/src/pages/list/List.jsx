import React, { useState } from "react";
import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import SearchApartment from "../../components/searchApartment/SearchApartment";
import SearchVilla from "../../components/searchVilla/SearchVilla";
import SearchCabin from "../../components/searchCabin/SearchCabin";
import Loader from "../../components/loader/Loader";

function List() {
  const location = useLocation();
  const [openDate, setOpenDate] = useState(false);
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [adults, setAdults] = useState(undefined);
  const [children, setChildren] = useState(undefined);
  const [rooms, setRooms] = useState(undefined);

  const { data: hotelsData, loading: hotelsLoading, error: hotelsError, reFetch: fetchHotels } = useFetch(`/hotels?city=${destination}&min=${min || 0}&max=${max || 8000}&limit=${6}`);
  const { data: apartmentsData, loading: apartmentsLoading, error: apartmentsError, reFetch: fetchApartments } = useFetch(`/apartments?city=${destination}&min=${min || 0}&max=${max || 8000}&limit=${6}`);
  const { data: villasData, loading: villasLoading, error: villasError, reFetch: fetchVillas } = useFetch(`/villas?city=${destination}&min=${min || 0}&max=${max || 28000}&limit=${6}`);
  const { data: cabinsData, loading: cabinsLoading, error: cabinsError, reFetch: fetchCabins } = useFetch(`/cabins?city=${destination}&min=${min || 0}&max=${max || 8000}&limit=${6}`);
  const { data: resortsData, loading: resortsLoading, error: resortsError, reFetch: fetchResorts } = useFetch(`/resorts?city=${destination}&min=${min || 0}&max=${max || 18000}&limit=${6}`);

  const handleClick = () => {
    fetchHotels();
    fetchApartments();
    fetchVillas();
    fetchCabins();
    fetchResorts();
  };

  return (
    <div>
      <Navbar className="backround"/>
      {/* <Header type="list" /> */}
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input type="text" placeholder={destination} onChange={(e) => setDestination(e.target.value)} />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">Min price <small>(per night)</small></span>
                  <input type="number" onChange={(e) => setMin(e.target.value)} className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Max price <small>(per night)</small></span>
                  <input type="number" onChange={(e) => setMax(e.target.value)} className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adults</span>
                  <input type="number" min={1} onChange={(e) => setAdults(e.target.value)} className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input type="number" min={0} onChange={(e) => setChildren(e.target.value)} className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Rooms</span>
                  <input type="number" min={1} onChange={(e) => setRooms(e.target.value)} className="lsOptionInput" />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {(hotelsLoading || apartmentsLoading || villasLoading || cabinsLoading || resortsLoading) && (<Loader />)}
            {!hotelsLoading && hotelsData && hotelsData.map((item) => <SearchItem item={item} key={item._id} />)}
            {!apartmentsLoading && apartmentsData && apartmentsData.map((apartment) => <SearchApartment apartment={apartment} key={apartment._id} />)}
            {!villasLoading && villasData && villasData.map((villa) => <SearchVilla item={villa} key={villa._id} />)}
            {!cabinsLoading && cabinsData && cabinsData.map((cabin) => <SearchCabin item={cabin} key={cabin._id} />)}
            {!resortsLoading && resortsData && resortsData.map((resort) => <SearchItem item={resort} key={resort._id} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
