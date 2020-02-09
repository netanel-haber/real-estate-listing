import React, { useContext } from 'react';
import '../../styles/components/MiniItem.scss';
import ImageColumn from './ImageColumn';
import StatsColumn from './StatsColumn';
import PriceColumn from './PriceColumn';
import AddressColumn from './AddressColumn';
import Thumbnail from './../Thumbnail';



const MiniItem = ({ aptData, listData }) => {
    const { updatedAt, listingId, listerId } = listData;
    const {
        rooms, floor, sqMeters,
        address, type,
        price, mitigator
    } = aptData;
    return (
        <div className="MiniItem__container">
            <ImageColumn />
            <AddressColumn address={address} type={type} />
            <StatsColumn rooms={rooms} floor={floor} sqMeters={sqMeters} />
            <PriceColumn price={price} mitigator={mitigator} updatedAt={updatedAt} />
        </div>
    );
}

export default MiniItem;
