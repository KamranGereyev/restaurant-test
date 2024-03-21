import { Link, useParams } from "react-router-dom";
import { allRestaurant } from "../Menu/restaurants.data.js";
import { useEffect, useState } from "react";

const Restaurant = ({ restaurant: propRestaurant, openModal }) => {
    const [restaurant, setRestaurant] = useState(propRestaurant);
    const { id } = useParams();

    useEffect(() => {
        if (!restaurant) {
            const restaurantFromServer = allRestaurant.find(res => res.id === parseInt(id));
            setRestaurant(restaurantFromServer);
        }
    }, [restaurant, id]);

    if (!restaurant) {
        return <div>Loading...</div>;
    }
    return (
        <div key={restaurant.id} className="wrapper-body-item">
            <div className="wrapper-body-item-image">
                <Link to={`/restaurant-item/${restaurant.id}`} className="wrapper-body-item-image-wrap">
                    <img className="wrapper-body-item-image-img" src={restaurant.img} alt={restaurant.name} />
                </Link>
            </div>
            <div className="wrapper-body-item-footer">
                <Link to={`/restaurant-item/${restaurant.id}`} className="wrapper-body-item-footer-link">{restaurant.name}</Link>
                <button onClick={() => openModal(restaurant)}>Add Reserve</button>
            </div>
        </div>
    );
};
export default Restaurant;
