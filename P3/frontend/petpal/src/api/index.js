export const url = 'http://localhost:8000'
export function getPet(id) {
    return fetch(
        `${url}/pets/${id}/`,
        {
            credentials: 'include',
            headers: {
                Cookie: 'sessionid=07drel074o6yi1w5rulv216hivzphn6a'
            }
        }
        ).then(res => res.json())
}
export function getPetImage(id) {
    return fetch(
        `${url}/pets/${id}/images/`,
        {
            credentials: 'include',
            headers: {
                Cookie: 'sessionid=07drel074o6yi1w5rulv216hivzphn6a'
            }
        }
        ).then(res => res.json())
}
export function donatePet(id, data) {
    return fetch(
        `${url}/pets/${id}/donate/`,
        {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                Cookie: 'sessionid=07drel074o6yi1w5rulv216hivzphn6a',
            }
        }
        ).then(res => res.json())
}