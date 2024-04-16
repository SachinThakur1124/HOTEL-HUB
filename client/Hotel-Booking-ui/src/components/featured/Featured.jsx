import useFetch from "../../hooks/useFetch";
import Loader from "../loader/Loader";
import "./featured.css";

const Featured = () => {
  const { data, loading, error } = useFetch("/hotels/countByCity?cities=mumbai,delhi,karnataka");

  return (
    <div className="featured">
      {loading ? (
        (<Loader/>)
      ) : (
        <>
          <div className="featuredItem">
          <img src="https://foodfindsasia.com/wp-content/uploads/2018/06/mumbai-attractions.jpg" alt="" className="featuredImg" />
            <div className="featuredTitles">
            <img src="/flag.png" alt="" className="flag" />
              <h1>Mumbai</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
          <img src="https://www.holidify.com/images/cmsuploads/compressed/5621259188_e74b389db5_k_20200414113725.jpg" alt="" className="featuredImg" />
            <div className="featuredTitles">
            <img src="/flag.png" alt="" className="flag2" />
              <h1>Delhi</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
          <img src="https://www.worldatlas.com/r/w1200/upload/7a/77/51/8649808366-054628c962-k.jpg" alt="" className="featuredImg" />
            <div className="featuredTitles">
            <img src="/flag.png" alt="" className="flag3" />
              <h1>Karnataka</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;