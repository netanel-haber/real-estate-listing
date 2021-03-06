import refreshJwt from '../utilities/refreshJwt';
import successStatus from '../utilities/successStatus';
import toaster from '../utilities/toaster';
const { HEB_TOAST_ERROR } = {
    HEB_TOAST_ERROR: "חלה שגיאת רשת."
}


function fetchHandler(url, method = "GET", data, signal, refreshToken = true) {
    const token = localStorage.getItem('token');
    (refreshToken && url.includes("listers")) && refreshJwt(token);
    return new Promise((res, rej) => {
        fetch(url, {
            method,
            body: JSON.stringify(data), //vitally important for db filters - props equal to undefined are filtered out
            //automatically by JSON.stringify 
            signal,
            headers: {
                "Accept-Encoding": "*",
                "Content-Type": "application/json; charset=utf-8",
                ...(token && { "Authorization": `Bearer ${token}` })
            }
        })
            .then(result => {
                if (!successStatus(result.status))
                    return rej(result);
                res(result.headers.get("Content-Type")?.includes("json") && result.json())
            })
            .catch(err => {
                (signal?.aborted === false) && toaster(err.status === 500 && HEB_TOAST_ERROR)
                rej(err);
            })
    })
}

export { fetchHandler as default };
