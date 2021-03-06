import isEmail from 'validator/es/lib/isEmail';
import isEmpty from 'validator/es/lib/isEmpty';
import isMobilePhone from 'validator/es/lib/isMobilePhone';
import combineMessages from '../../validation/combineMessages';
import { valPass, isHebrewName } from '../../validation/signup';
import translator2 from '../Item/rest/Level2_translator';
import translator3 from '../Item/rest/Level3_translator';
import { errHebrew } from './heb';
import { isValidDate, isFutureDate } from '../../utilities/datetime';
import genSuccessiveArr from './../../utilities/genSuccesiveArr';

const { HEB_TO_CANNOT_BE_LARGER_THAN_FROM, HEB_ONLY_POSITIVE_INTEGERS, HEB_INVALID_MIME_TYPE, HEB_INVALID_PLACE, HEB_MAXIMUM, HEB_MINIMUM, HEB_INVALID_SINGLE_SIZE, HEB_INVALID_TOTAL_SIZE, HEB_INVALID_EMAIL, HEB_INVALID_DATE, HEB_INVALID_PRICE, HEB_INVALID_CITY, HEB_INVALID_STREET, HEB_FIELD_IS_REQUIRED, HEB_PASS_DOESNT_MATCH, HEB_PHONE_ISNT_VALID, HEB_NAME_INVALID, passwordErrMessages } = errHebrew;

const required = { required: HEB_FIELD_IS_REQUIRED };
const minPrice = 100000;
const singleSizeLimitMb = 2;
const totalSizeLimitMb = 10;
const isNumber = val => val !== "" && !isNaN(Number(val));
const numberValidation = ({ min = 0, max }, req = false) => ({
    validate: (val) => {
        if (isEmpty(val))
            return !req || HEB_FIELD_IS_REQUIRED;
        if (isNaN(Number(val)))
            return HEB_ONLY_POSITIVE_INTEGERS;
        if (val < min)
            return HEB_MINIMUM(min);
        if (val > max)
            return HEB_MAXIMUM(max);
        return true;
    }
});



const fieldValidationGenerators = {
    required,
    email: (justRequired = false) => ({
        ...required,
        ...justRequired || { validate: value => isEmail(value) || HEB_INVALID_EMAIL }
    }),
    password: (justRequired = false) => ({
        ...required,
        ...justRequired || { validate: (val) => combineMessages(valPass(val), passwordErrMessages, "על הסיסמה: ") }
    }),
    reEnter: (ref) => ({
        ...required,
        validate: (val) => (val === ref.current) || HEB_PASS_DOESNT_MATCH
    }),
    emailNotRequired: {
        validate: val => isEmpty(val) || (isEmail(val) || HEB_INVALID_EMAIL)
    },
    numberInput: numberValidation,
    range: (to, { min, max } = {}, req) => {
        return {
            validate: (from) => {
                const isValidNumber = numberValidation({ min, max }, req).validate(from);
                if (isValidNumber !== true)
                    return isValidNumber;
                if (isNumber(from) && isNumber(to) && Number(from) > Number(to)) 
                    return HEB_TO_CANNOT_BE_LARGER_THAN_FROM;
                return true;
            }
        }
    },
    phoneNumber: {
        validate: val => (isEmpty(val) || isMobilePhone(val, "he-IL")) || HEB_PHONE_ISNT_VALID
    },
    name: {
        validate: val => isEmpty(val) || (isHebrewName.test(val) || HEB_NAME_INVALID)
    },
    municipality: (municipalities) => ({
        ...required,
        validate: (val) => municipalities.includes(val) || HEB_INVALID_CITY
    }),
    streets: (streets) => ({
        ...required,
        validate: (val) => streets.includes(val) || HEB_INVALID_STREET
    }),
    place: (places) => {
        return ({
            validate: (place) => (places.includes(place) || (place === "")) || HEB_INVALID_PLACE
        })
    },
    price: {
        validate: (val) => isEmpty(val) || (Number(val) > minPrice) || HEB_INVALID_PRICE(minPrice)
    },
    date: {
        validate: (val = "") => {
            return isEmpty(val) || ((isValidDate(val) && isFutureDate(val)) || HEB_INVALID_DATE)
        }
    },
    pictures: {
        validate: (files) => {
            const fileArr = Array.from(files);
            const checks = {
                isLessThanTotal: (fileArr.reduce((acc, { size }) => acc + size, 0) / 1000000) <= totalSizeLimitMb,
                isEachLessThanSingleLimit: fileArr.every(({ size }) => size / 1000000 <= singleSizeLimitMb),
                isEachImageType: fileArr.every(({ type }) => type.includes("image"))
            }
            return combineMessages(Object.keys(checks).filter(check => !Boolean(checks[check])), {
                isLessThanTotal: HEB_INVALID_TOTAL_SIZE(totalSizeLimitMb),
                isEachLessThanSingleLimit: HEB_INVALID_SINGLE_SIZE(singleSizeLimitMb),
                isEachImageType: HEB_INVALID_MIME_TYPE
            }, "תנאי העלאה שהופרו: ")
        }
    }

}


const mockNeighborhoods = ["אפקה", "גלילות, צוקי אביב ואזור שדה דב", "כוכב הצפון", "כלל רובע 1", "נוה אביבים", "נופי ים", "רמת אביב ג", "רמת-אביב", "תכנית ל", "גני צהלה ורמות צהלה", "הדר-יוסף", "המשתלה", "כלל רובע 2", "נאות אפקה א", "נאות אפקה ב", "נוה דן", "נוה שרת", "צהלה", "רביבים", "רמת החייל", "תל ברוך, תל ברוך צפון ומעוז אביב", "הצפון הישן - החלק הדרומי", "הצפון הישן - החלק הצפוני", "בבלי", "הצפון החדש - סביבת ככר המדינה", "הצפון החדש-החלק הדרומי", "כרם התימנים", "לב תל-אביב", "נוה צדק", "שם הקובץ", "גבעת הרצל, אזור המלאכה יפו", "יפו ג ונוה גולן", "יפו ד (גבעת התמרים)", "יפו העתיקה, נמל יפו", "כלל הרובע 7", "מכללת יפו-תא ודקר", "עגמי וגבעת עליה", "צהלון ושיכוני חסכון", "צפון יפו", "תל-כביר, נוה עופר,יפו ב", "נוה שאנן", "פלורנטין", "קרית שלום ופארק החורשות", "שפירא", "אורות", "ביצרון ורמת ישראל", "התקווה", "יד אליהו", "כפיר", "לבנה וידידיה", "נוה אליעזר וכפר שלם מזרח", "נוה ברבור , כפר שלם מערב", "נוה חן", "נחלת יצחק", "ניר אביב", "עזרא והארגזים", "רמת הטייסים", "תל-חיים"];
const booleanAttributes = {
    general: ["AC", "grates", "elevator", "handicappedAccesible", "mamad", "storage", "furniture"],
    rent: ["taxesIncluded", "longTerm", "forPartners", "petsAllowed"],
    commercial: ["divided", "meetingRoom", "bathrooms", "cameras", "ITRoom", "highCeiling", "loadingRamp", "underground", "kitchenette", "alarm"],
    roommates: ["taxesIncluded", "keepsKashrut", "petsAllowed"],
    forsale: []
}



const propertyTypeCommonDenominator = ["דירה", "דירת גן", "פרטי/קוטג'", "גג/פנטהאוז", "דופלקס", "דו משפחתי", "מרתף/פרטר", "טריפלקס", "יחידת דיור", "משק חקלאי/נחלה", "משק עזר", "דיור מוגן", "בניין מגורים", "סטודיו/לופט", "מחסן", "קב' רכישה/ זכות לנכס", "חניה"];
let forsale = ["מגרשים", "דירת נופש", "כללי", ...propertyTypeCommonDenominator];
let rent = [...forsale, "החלפת דירות", "סאבלט"];
let roommates = rent;
let AddressValidation = {
    propertyType: {
        forsale,
        rent,
        roommates,
        commercial: ["אולמות", "בניין משרדים", "חנויות/שטח מסחרי", "חלל עבודה משותף", "חניון", "כללי", "מבני תעשיה", "מגרשים", "מחסנים", "מרתף", "משרדים", "סטודיו", "עסקים למכירה", "קליניקות"]
    },
    upkeep: ["חדש מקבלן (לא גרו בנכס)", "חדש (גרו בנכס)", "משופץ", "במצב שמור", "דרוש שיפוץ"],
    propertyTypesWithRooms: ["דירה", "דירת גן", "פרטי/קוטג'", "גג/פנטהאוז", "דופלקס", "דירת נופש", "דו משפחתי", "מרתף/פרטר", "יחידת דיור", "דיור מוגן", "סטודיו/לופט"]
}



const watchMultipleFields = (watch, fields, defaults = {}) => {
    const watches = {};
    fields.forEach((field) => {
        watches[field] = watch(field, defaults[field]);
    })
    return watches;
}

function translation(key) {
    let { translation, picUrl } = translator3([key]);
    if (!translation)
        translation = translator2([key]).name;
    return { text: translation, picUrl }
}


const possibleRoomValues = genSuccessiveArr(12, 0.5, 0.5).filter(el => !((el > 6) && !Number.isInteger(el)));



export { fieldValidationGenerators as validationConfig, translation, mockNeighborhoods, booleanAttributes, AddressValidation, possibleRoomValues, watchMultipleFields };

