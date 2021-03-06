import "#src#/styles/components/RedirectPrompt.scss";
import { useHistory } from 'react-router-dom';
import React from 'react';
import { useApiCallEffect } from './useApiCallEffect';
import { paths } from '../components/pages/paths';
import { isLoggedIn } from '../fetch/listers';

const { HEB_NO_AUTH, HEB_LOGIN, HEB_SIGNUP, HEB_HOMEPAGE } = {
    HEB_NO_AUTH: "אינך רשאי לגשת לדף זה משום שאינך מחובר לחשבונך האישי.",
    HEB_LOGIN: "התחבר",
    HEB_SIGNUP: "הרשם",
    HEB_HOMEPAGE: "דף הבית",
}

const pathEntries = [[paths.login, HEB_LOGIN], [paths.signup, HEB_SIGNUP], ['/', HEB_HOMEPAGE]]


function useStatefulRedirect() {
    const failedAuth = useApiCallEffect(isLoggedIn, undefined, [])
    return [useRedirect(failedAuth), failedAuth];
}

function useRedirect(failedAuth) {
    const history = useHistory();
    return (
        <div className="RedirectPrompt" style={{ display: failedAuth ? "flex" : "none" }} onClick={() => { history.push('/') }}>
            <div onClick={(e) => { e.stopPropagation() }} className="content-container">
                <div>
                    <div className="title">{HEB_NO_AUTH}</div>
                    <div className="RedirectPrompt__link-group pure-g">
                        {pathEntries.map(([path, text], index) => (
                            <div
                                className="RedirectPrompt__link pure-u-1 pure-u-md-1-3"
                                key={index}
                                onClick={() => { history.push(path) }}>{text}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default useRedirect;
export { useStatefulRedirect }

