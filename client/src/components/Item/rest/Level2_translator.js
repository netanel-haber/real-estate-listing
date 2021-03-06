import { format, isFutureDate } from '../../../utilities/datetime';

const hebBoolean = (val) => Boolean(val) ? "כן" : "לא";
const isrDate = (utc) => isFutureDate(utc) ? format(utc) : "כניסה מיידית";


let map = {
    // general
    entrance: {
        translation: "כניסה",
    },
    entryDate: {
        translation: "תאריך כניסה",
        get: isrDate,
        def: "כניסה מיידית"
    },
    parkingSpots: {
        translation: "חניות",
        def: "ללא"
    },

    //residential
    upkeep: {
        translation: "מצב הנכס",
        def: "לא צויין"
    },

    //forsale
    sqMGarden: {
        translation: "מ\"ר גינה",
    },
    sqMBuilt: {
        translation: "מ\"ר בנוי",
    },
    numBalconies: {
        translation: "מרפסות",
        get: (val) => val || "ללא"
    },

    //rent
    homeOwnerAssociationMonthly: {
        translation: "ועד בית (חודש)",
        units: "₪",
    },
    numChecks: {
        translation: "מס' תשלומים",
        def: "גמיש"
    },
    biMonthlyArnona: {
        translation: "ארנונה לחודשיים",
        units: "₪",
    },

    //commercial
    divided: {
        translation: "מחולק",
        get: hebBoolean,
        def: "לא צויין"
    },
    rentedUntil: {
        translation: "מושכר עד תאריך",
        get: isrDate,
        def: "לא צויין"
    },
    meetingRoom: {
        translation: "חדר ישיבות",
        get: hebBoolean,
    },
    bathrooms: {
        translation: "שירותים",
        def: hebBoolean
    }

    //roommates - see "numChecks" in rent
};




const translator = ([key, value]) => {
    let k = map[key];
    return {
        get name() {
            return k?.translation || k;
        },
        get value() {
            const { get, units, def } = k;
            let finalVal = "";
            if (value) {
                if (get)
                    value = get(value);
                finalVal += value;
                if (units)
                    finalVal += ` ${units}`;
            }
            else {
                finalVal = def || 'לא צויין';
            }
            return finalVal;
        },
    }
};


export default translator;


