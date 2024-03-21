import {useParams} from "react-router-dom";
import { allRestaurant } from "../Menu/restaurants.data.js";
import './index.css';

const RestaurantItem = () => {
    const { id } = useParams();
    const filteredRestaurant = allRestaurant.filter(restaurant => restaurant.id === parseInt(id));

    const storedBookings = localStorage.getItem("bookings");
    const bookingsSave = storedBookings ? Object.values(JSON.parse(storedBookings)).flat() : [];
    return (
        <div className="restaurant-item">
            <div className="restaurant-item-wrap">
                {filteredRestaurant.map((item, id) => {
                        return (
                            <div key={id} className="restaurant-item-wrap-left">
                               <div className="restaurant-item-wrap-left-name">{item.name}</div>
                               <div className="restaurant-item-wrap-left-img-wrap">
                                   <img className="restaurant-item-wrap-left-img-wrap-image" src={item.img}/>
                               </div>
                                <div>Information about restaurant</div>
                            </div>
                        )
                    })
                }
            </div>
            {bookingsSave.length > 0 && (
                <div className="restaurant-item-booking-save">
                    <span className="restaurant-item-booking-save-about">Information About Reserve</span>
                    {bookingsSave.map((booking, index) => {
                        if (booking.id === parseInt(id)) {
                            return (
                                <div key={index} className="restaurant-item-booking-save-brom">
                                    <p>Date: {booking.date}</p>
                                    <p>Time: {booking.time}</p>
                                    <p>People: {booking.people}</p>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            )}
        </div>
    );
};

export default RestaurantItem;
