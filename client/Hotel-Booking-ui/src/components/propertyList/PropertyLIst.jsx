import useFetch from "../../hooks/useFetch";
import Loader from "../loader/Loader";
import "./propertyList.css";

const PropertyList = () => {
  const { data: hotelData, loading: hotelLoading, error: hotelError } = useFetch("/hotels/countByType");
  const { data: apartmentData, loading: apartmentLoading, error: apartmentError } = useFetch("/apartments/countByType");
  const { data: villaData, loading: villaLoading, error: villaError } = useFetch("/villas/countByType");
  const { data: cabinData, loading: cabinLoading, error: cabinError } = useFetch("/cabins/countByType");
  const { data: resortData, loading: resortLoading, error: resortError } = useFetch("/resorts/countByType");

  const images = [
    "https://images.pexels.com/photos/1375383/pexels-photo-1375383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/881727/pexels-photo-881727.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/290518/pexels-photo-290518.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
    "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  return (
    <div className="pList">
      {(hotelLoading || apartmentLoading) ? (
        (<Loader/>)
      ) : (
        <>
          {hotelData && hotelData.map((hotel, index) => (
            <div className="pListItem" key={`hotel_${index}`}>
              <img src={images[index]} alt="" className="pListImg" />
              <div className="pListTitles">
                <h1>{hotel.type}</h1>
                <h2>{hotel.count} {hotel.type}</h2>
              </div>
            </div>
          ))}
          {apartmentData && apartmentData.map((apartment, index) => (
            <div className="pListItem" key={`apartment_${index}`}>
              <img src={images[index + 1]} alt="" className="pListImg" />
              <div className="pListTitles">
                <h1>{apartment.type}</h1>
                <h2>{apartment.count} {apartment.type}</h2>
              </div>
            </div>
          ))}
          {villaData && villaData.map((villa, index) => (
            <div className="pListItem" key={`villa_${index}`}>
              <img src={images[index + 3]} alt="" className="pListImg" />
              <div className="pListTitles">
                <h1>{villa.type}</h1>
                <h2>{villa.count} {villa.type}</h2>
              </div>
            </div>
          ))}
          {cabinData && cabinData.map((cabin, index) => (
            <div className="pListItem" key={`cabin_${index}`}>
              <img src={images[index + 2]} alt="" className="pListImg" />
              <div className="pListTitles">
                <h1>{cabin.type}</h1>
                <h2>{cabin.count} {cabin.type}</h2>
              </div>
            </div>
          ))}
          {resortData && resortData.map((resort, index) => (
            <div className="pListItem" key={`resort_${index}`}>
              <img src={images[index + 4]} alt="" className="pListImg" />
              <div className="pListTitles">
                <h1>{resort.type}</h1>
                <h2>{resort.count} {resort.type}</h2>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;
