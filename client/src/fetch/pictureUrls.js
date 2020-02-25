function getPicUrls(keys) {
    const keyArr = JSON.stringify(keys);
    return fetch('/api/pics/get-pic-urls', {
        body: keyArr,
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST'
    }).then(res => res.json()).catch(ex => { console.log(ex) });
}


export { getPicUrls };