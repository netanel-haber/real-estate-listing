const errHebrew = {
    HEB_INVALID_EMAIL: "כתובת המייל אינה תקינה!",
    HEB_FIELD_IS_REQUIRED: "שדה זה הינו שדה חובה",
    HEB_PASS_DOESNT_MATCH: "הסיסמאות שהזנת אינן תואמות.",
    HEB_PHONE_ISNT_VALID: "מספר הטלפון איננו תקין!",
    HEB_NAME_INVALID: "השם שהזנת איננו תקין",
    HEB_INVALID_CITY: "מקום המגורים איננו מוכר.",
    HEB_INVALID_STREET: "הרחוב איננו מוכר במקום המגורים שבחרת",
    HEB_INVALID_PRICE: (minPrice) => `המחיר המינימלי הינו ${minPrice}‎₪`,
    HEB_INVALID_DATE: "נדרש תאריך חוקי ועתידי.",
    HEB_INVALID_TOTAL_SIZE: size => `סך הגודל הקבצים איננו יכול לעלות על ${size}Mb`,
    HEB_INVALID_SINGLE_SIZE: size => `כל קובץ לבדו איננו יכול לעלות על ${size}Mb`,
    HEB_MINIMUM: (min) => `המספר המינימלי הינו ${min}`,
    HEB_MAXIMUM: (max) => `המספר המקסימלי הינו ${max}`,
    HEB_ONLY_POSITIVE_INTEGERS:"ניתן להכניס רק מספרים שלמים וחיוביים.",
    HEB_TO_CANNOT_BE_LARGER_THAN_FROM:"על הערך המינימלי לא לחרוג מהערך המקסימלי.",
    HEB_INVALID_MIME_TYPE: "על הקבצים להיות מסוג תמונה.",
    HEB_INVALID_PLACE: "מקום זה איננו חוקי.",
    passwordErrMessages: {
        min: "להיות לפחות באורך 8 תווים",
        uppercase: "להכיל אות אחת גדולה לפחות",
        lowercase: "להכיל אות אחת קטנה לפחות. ",
        symbols: "להכיל אחד מהתווים הבאים לפחות: !@#$%^&*",
        digits: "להכיל ספרה אחת לפחות",
        spaces: "להתחיל ולהסתיים בתו שאיננו רוח"
    }
}


const formHebrew = {
    HEB_EMAIL: "כתובת דוא\"ל",
    HEB_SEND: "שלח",
    HEB_PASSWORD: "סיסמה",
    HEB_REENTER_PASSWORD: "הזן שנית",
    HEB_PHONE_NUMBER: "מספר טלפון",
    HEB_NAME: "שם",
    HEB_LAST_NAME: "שם משפחה",
    HEB_EXPLANATION: "השדות המסומנים בכוכבית הינם שדות חובה. שאר השדות ישמשו בתור פרטי התקשרות בתיאור הנכס כברירת מחדל."
}

const typeStepHebrew = {
    HEB_FORSALE: "מכירה",
    HEB_RENT: "השכרה",
    HEB_ROOMMATES: "דירות שותפים",
    HEB_COMMERCIAL: "נדל\"ן מסחרי",
    HEB_CHOOSE: "בחר סוג מודעה:"
}

const addressStepHebrew = {
    HEB_TITLE: "מלא\\י כתובתך",
    HEB_TYPE_OF_PROPERTY: "סוג הנכס",
    HEB_UPKEEP: "מצב הנכס",
    HEB_MUNICIPALITY: "ישוב",
    HEB_STREET: "רחוב",
    HEB_NUMBER: "מס' בית",
    HEB_APT: "מס' דירה",
    HEB_ENTRANCE: "כניסה",
    HEB_FLOOR: "קומה",
    HEB_TOTAL_BUILDING_FLOORS: "סה\"כ קומות בבניין",
    HEB_TOTAL_PROPERTY_FLOORS: "סה\"כ קומות בנכס",
    HEB_NEIGHBORHOOD_LABEL: "שכונה",
    HEB_NEIGHBORHOOD_PLACEHOLDER: "(יתמלא אוטומטית)",
    HEB_CHOOSE_PROPERTY_TYPE: "סוג נכס",
    HEB_CHOOSE_UPKEEP: "מצב נכס",
    HEB_SEARCH_CITY: "חפש את מקום מגוריך",
    HEB_SEARCH_STREET: "חפש את רחובך"
}

const propertyDetailsStepHebrew = {
    HEB_TITLE: "פרטי הנכס",
    HEB_NUM_BALCONIES_LABEL: "מס' מרפסות",
    HEB_NUM_PARKING_SPOTS: "מס' חניות",
    HEB_RESET: "אפס",
    HEB_CHOOSE_ATTRIBUTES: "סמן מאפיינים אודות הנכס:",
    HEB_DISCLAIMER: "(שדה זה איננו חובה ושדות שלא ימולאו לא יופיעו במודעה הסופית)",
    HEB_WHATS_IMPORTANT: "מה חשוב לך שידעו על הנכס?",
    HEB_TEXT_AREA_PLACEHOLDER: "זה המקום לתאר את הפרטים הבולטים, למשל, האם נערך שיפוץ במבנה, מה שופץ, כיווני אוויר, האווירה ברחוב וכו'",
    HEB_ROOMS: "מס' חדרים",
    HEB_FURNITURE_DESCRIPTION: "תיאור הריהוט",
    HEB_FURNITURE_DESCRIPTION_PLACEHOLDER: "כמות, סוג, מצב הריהוט וכו'",
    HEB_CHAR_LIMIT: (charsLeft) => `נשארו לך ${charsLeft} תווים.`
}

const listingDetailsStepHebrew = {
    HEB_TITLE: "פרטי המכירה",
    HEB_PRICE: "מחיר",
    HEB_PRICE_PLACEHOLDER: "סכום מינימלי 100000₪",
    HEB_SQ_M: "מ\"ר רבוע נטו",
    HEB_SQ_M_PLACEHOLDER: "כמה מ\"ר רבוע יש בנכס",
    HEB_ENTRY_DATE: "תאריך כניסה",
    HEB_IMMEDIATELY: ""
}

const addPicsStepHebrew = {
    HEB_TITLE: "העלאת תמונות",
    HEB_CHOOSE_PICS: "בחר קבצים",
    HEB_CHOSEN_PICS_TITLE: "הקבצים שבחרת להעלות:",
    HEB_DISCLAIMER: (singleSizeLimit, totalSizeLimit) =>
        errHebrew.HEB_INVALID_TOTAL_SIZE(totalSizeLimit) + ".\n" +
        errHebrew.HEB_INVALID_SINGLE_SIZE(singleSizeLimit) + ".\n" +
        "הקובץ הראשון ברשימה תוצג בתור התמונה הראשונה."
}

const addListingHebrew = {
    HEB_STEP_FOOTER: (step, steps) => `שלב ${step} מתוך ${steps}`
}


const filterHebrew = {
    HEB_FILTER: "סנן",
    HEB_COLLAPSE: "צמצם",
    HEB_UNCOLLAPSE: "הראה פילטרים",
    HEB_PRICE_RANGE: "טווח המחירים",
    HEB_PROPERTY_TYPE: "סוג הנכס",
    HEB_ROOM_RANGE: "טווח חדרים",
    HEB_ENTRY_DATE: "תאריך כניסה",
    HEB_SIZE: "גודל דירה (במ\"ר)",
    HEB_SEARCH_PLACE: "חפשו אזור, עיר, שכונה או רחוב",
    HEB_ROOMMATES_RANGE: "טווח שותפים"
};

const advancedSearchHebrew = {
    HEB_COLLAPSE: "צמצם",
    HEB_ADVANCED_SEARCH: "חיפוש מתקדם",
    HEB_RESET: "אתחל",
    HEB_FILTER: "סנן",
}



export { errHebrew, filterHebrew, advancedSearchHebrew, formHebrew, typeStepHebrew, addPicsStepHebrew, listingDetailsStepHebrew, addListingHebrew, addressStepHebrew, propertyDetailsStepHebrew }