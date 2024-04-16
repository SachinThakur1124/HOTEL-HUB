import { Link } from "react-router-dom";
import "./searchApartment.css";

const SearchApartment = ({ apartment }) => {
  return (
    <div className="searchItem">
      <img src={apartment.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{apartment.name}</h1>
        <span className="siDistance">{apartment.distance}m from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures">{apartment.desc}</span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {apartment.rating && <div className="siRating">
          <span>Excellent</span>
          <button>{apartment.rating}</button>
        </div>}
        <div className="siDetailTexts">
          <b style={{ fontSize: 22, fontWeight: 600, }}>₹ </b><span className="siPrice">{apartment.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes</span>
          <Link to={`/apartments/${apartment._id}`}>
            <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchApartment;