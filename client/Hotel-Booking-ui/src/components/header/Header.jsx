import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { faBed, faPerson } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { DateRange } from 'react-date-range';
import { useContext, useState } from "react";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { SearchContext } from "../../context/Context";


export default function Header({ type }) {

    const [openDate, setOpendate] = useState(false);
    const [destination, setDestination] = useState("");

    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const [openOptions, setOpenOptions] = useState(false);
    const [Options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    });

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);


    const handleOption = (name, operation) => {
        setOptions((prev) => {
            return {
                ...prev, [name]: operation === "i" ? Options[name] + 1 : Options[name] - 1
            }
        })
    };

    const { dispatch } = useContext(SearchContext);

    const handleSearch = () => {
        dispatch({ type: "NEW_SEARCH", payload: { destination, dates, Options } });
        navigate("/list", { state: { destination, dates, Options } });
    };

    return (
        <div className="header">
            <video src="beach.mp4" autoPlay loop muted />

            <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>

                {type !== "list" &&
                    <>
                        <h1 className="headerTitle">Discover Your Perfect Stay with Our Premier Hotel Collection.</h1>
                        <p className="headerDesc">Indulge in Your Travels - Enjoy Instant Discounts of 10% or More with a Complimentary HotelHub Account.</p>
                        {!user && (
                            <Link to="/register">
                                <button className="headerBtn">Log in / Register</button>
                            </Link>)
                        }
                        <div className="headerSearch">
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                                <input type="text" placeholder="Where are you going?" className="headerSearchInput" onChange={e => setDestination(e.target.value)} />
                            </div>
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                                <span onClick={() => setOpendate(!openDate)} className="headerSearchText">{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                                {openDate && (<DateRange
                                    editableDateInputs={true}
                                    onChange={item => setDates([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={dates}
                                    minDate={new Date()}
                                    className="date"
                                />)}
                            </div>
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                                <span className="headerSearchText" onClick={() => setOpenOptions(!openOptions)}>{`${Options.adult} adult . ${Options.children} children . ${Options.room} room`}</span>
                                {openOptions && <div className="options">
                                    <div className="optionItem">
                                        <span className="optionText">Adult</span>
                                        <div className="optionCounter">
                                            <button className="optionCounterBtn" onClick={() => handleOption("adult", "d")} disabled={Options.adult <= 1}>-</button>
                                            <span className="optionCounterNumber">{Options.adult}</span>
                                            <button className="optionCounterBtn" onClick={() => handleOption("adult", "i")}>+</button>
                                        </div>
                                    </div>
                                    <div className="optionItem">
                                        <span className="optionText">Children</span>
                                        <div className="optionCounter">
                                            <button className="optionCounterBtn" onClick={() => handleOption("children", "d")} disabled={Options.children <= 0}>-</button>
                                            <span className="optionCounterNumber">{Options.children}</span>
                                            <button className="optionCounterBtn" onClick={() => handleOption("children", "i")}>+</button>
                                        </div>
                                    </div>
                                    <div className="optionItem">
                                        <span className="optionText">Room</span>
                                        <div className="optionCounter">
                                            <button className="optionCounterBtn" onClick={() => handleOption("room", "d")} disabled={Options.room <= 1}>-</button>
                                            <span className="optionCounterNumber">{Options.room}</span>
                                            <button className="optionCounterBtn" onClick={() => handleOption("room", "i")}>+</button>
                                        </div>
                                    </div>
                                </div>}
                            </div>
                            <div className="headerSearchItem">
                                <button className="headerBtn2" onClick={handleSearch}>Search</button>
                            </div>
                        </div></>}
            </div>
        </div>
    )
}
