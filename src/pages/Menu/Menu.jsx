import { useState, useEffect } from "react";
import "./index.css";
import CustomModal from "../../components/CustomModal/CustomModal.jsx";
import Search from "../../components/Search/Search.jsx";
import { allRestaurant } from "./restaurants.data.js";
import Restaurant from "../Restaurant/Restaurant.jsx";
import slugify from "slugify";

const Menu = () => {
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    // const [bookings, setBookings] = useState({});
    const [showReserve, setShowReserve] = useState(false)

    const [bookings, setBookings] = useState(() => {
        const storedBookings = localStorage.getItem("bookings");
        return storedBookings ? JSON.parse(storedBookings) : {};
    });

    useEffect(() => {
        localStorage.setItem("bookings", JSON.stringify(bookings));
    }, [bookings]);

    const handleSearch = e => {
        setLoading(true);
        const value = slugify(e.target.value, {
            trim: true,
            lower: true,
        });
        setSearchText(value);

        setTimeout(() => {
            setLoading(false);
        }, 350);
    };

    const openModal = restaurant => {
        setSelectedRestaurant(restaurant);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const bookingData = {
            id: selectedRestaurant.id,
            date: formData.get("date"),
            time: formData.get("time"),
            people: formData.get("people"),
        };

        const existingBookings = bookings[selectedRestaurant.id] || [];
        const conflictingBooking = existingBookings.find(
            booking => booking.date === bookingData.date && booking.time === bookingData.time,
        );

        if (conflictingBooking) {
            alert(`Sorry, the selected time (${bookingData.time}) for ${selectedRestaurant.name} is already booked.`);
            return;
        }

        const updatedBookings = {
            ...bookings,
            [selectedRestaurant.id]: [...existingBookings, bookingData],
        };
        setBookings(updatedBookings);

        alert(
            `Your booking for ${selectedRestaurant.name} at ${bookingData.time} on ${bookingData.date} has been successfully made.`,
        );

        closeModal();
    };

    const filteredRestaurants = allRestaurant.filter(item =>
        slugify(item.name, {
            lower: true,
            trim: true,
        }).includes(searchText),
    );
    const showAllBookings = () => {
        setShowReserve(true)
    };
    return (
        <div className="wrapper">
            <div className="wrapper-search">
                <Search placeholder="Restaurant name" value={searchText} onChange={handleSearch}/>
                <div className="wrapper-search-reserv-info" onClick={showAllBookings}>
                    <span>Reservations</span>
                </div>
            </div>
            <div className="wrapper-body">
                {loading ? (
                    <div className="loader">Loading...</div>
                ) : (
                    filteredRestaurants.map((restaurant, id) => (
                        <Restaurant key={id} restaurant={restaurant} openModal={openModal} bookings={bookings} />
                    ))
                )}
                {!loading && filteredRestaurants.length === 0 && <div className="no-results">No restaurants found</div>}
            </div>
            {modalOpen && selectedRestaurant && (
                <CustomModal active={modalOpen} setActive={setModalOpen}>
                    <div className="modal-body">
                        <div className="modal-body-wrap">
                            <div className="modal-body-name">Booking Form for {selectedRestaurant.name}</div>
                            <span className="close" onClick={closeModal}>
                                &times;
                            </span>
                        </div>
                        <form onSubmit={handleSubmit} className="form">
                            <input type="hidden" id="id" name="id" value={selectedRestaurant.id}/>
                            <label htmlFor="date">Date:</label>
                            <input type="date" id="date" name="date" required/>
                            <label htmlFor="time">Time:</label>
                            <input type="time" id="time" name="time" required/>
                            <label htmlFor="people">Number of People:</label>
                            <input type="number" id="people" name="people" min="1" required/>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </CustomModal>
            )}
            {showReserve && (
                <CustomModal active={true} setActive={setShowReserve}>
                    <div className="modal-body">
                        <div className="modal-body-head">
                            <div className="modal-body-name">All Bookings</div>
                            <span className="close" onClick={() => setShowReserve(false)}>
                                &times;
                            </span>
                        </div>
                        <div className="booking-info">
                            {Object.keys(bookings).length === 0 ? (
                                <div className="no-bookings">No bookings available</div>
                            ) : (
                                Object.keys(bookings).map((restaurantId) => {
                                    const restaurantName = allRestaurant.find(
                                        (restaurant) => restaurant.id === parseInt(restaurantId)
                                    ).name;
                                    return (
                                        <div key={restaurantId} className="booking-info-wrap">
                                            <h3 className="booking-info-wrap-name">{restaurantName}</h3>
                                            <ul>
                                                {bookings[restaurantId].map((booking, index) => (
                                                    <li className="booking-info-wrap-item" key={index}>
                                                        Date: {booking.date}, Time: {booking.time}, People: {booking.people}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </CustomModal>
            )}
        </div>
    );
};

export default Menu;
