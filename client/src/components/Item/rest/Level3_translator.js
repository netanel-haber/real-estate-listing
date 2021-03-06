const map = {
    AC: "מיזוג",
    grates: "סורגים",
    elevator: "מעלית",
    handicappedAccesible: "גישה לנכים",
    ITRoom: "חדר תקשורת",
    highCeiling: "תקרה גבוהה",
    loadingRamp: "רמפת העמסה",
    underground: "תת-קרקעי",
    kitchenette: "מטבחון",
    alarm: "אזעקה",
    longTerm: "לטווח ארוך",
    forPartners: "לשותפים",
    petsAllowed: "חיות מחמד",
    keepsKashrut: "שומר כשרות",
    mamad: "ממ\"ד",
    storage: "מחסן",
    furniture: "ריהוט",
    cameras: "מצלמות",
    taxesIncluded: "כולל חשבונות"
}


const translator = ([key, value]) => {
    return {
        picUrl: `/icons/level3/${key}.png`,
        translation: map[key],
        faded: !Boolean(value)
    }
};


export default translator;