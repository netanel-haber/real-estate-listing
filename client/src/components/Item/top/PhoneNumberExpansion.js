import React, { useContext, useEffect, useState } from 'react';
import ItemContext from '../../../contexts/ItemContext';
import { getLister } from '../../../fetch/listers';
import '../../../styles/components/Item/PhoneNumberExpansion.scss';
import copyToClipBoard from '../../../utilities/copyToClipboard';
import CustomLoader from './../../CustomLoader';


const { HEB_WEBSITE, HEB_COPY_EMAIL } = {
    HEB_WEBSITE: "אתר המשרד",
    HEB_COPY_EMAIL: "העתק כתובת מייל"
}

const extractMitDetails = ({ name, phoneNumbers, website }) =>
    ([name, phoneNumbers.join?.(', '), website && (<a rel="noopener noreferrer" target="_blank" href={website}>{HEB_WEBSITE}</a>)]);
const extractRegListerDetails = ({ name, phoneNumber, email }) =>
    ([name, phoneNumber, email && (<span onClick={(e) => { e.stopPropagation(); copyToClipBoard(email); }}>{HEB_COPY_EMAIL}</span>)])


const PhoneNumberExpansion = ({ isExpanded }) => {
    const { listing: { mitigatingCompany, listerId, contact } } = useContext(ItemContext);
    const [regListerDetails, updateRegUserDetails] = useState([]);

    useEffect(() => {
        if (contact) {
            const { name, lastName, phoneNumber, email } = contact;
            updateRegUserDetails({ name: name + " " + lastName, phoneNumber, email })
        }
        else if (!mitigatingCompany) {
            getLister(listerId).then(({ name, lastName, phoneNumber, email }) => {
                updateRegUserDetails({ name: name + " " + lastName, phoneNumber, email })
            })
        }
    }, []);

    return (
        <div className="PhoneNumberExpansion" style={{ maxHeight: isExpanded ? "200px" : "0" }}>
            {(mitigatingCompany
                ? extractMitDetails(mitigatingCompany)
                : (regListerDetails.length !== 0
                    ? extractRegListerDetails(regListerDetails)
                    : [<CustomLoader active />]))
                .map((deet, index) => deet && <div key={index} className="child">{deet}</div>)
            }
        </div>
    );
};


export default PhoneNumberExpansion;
