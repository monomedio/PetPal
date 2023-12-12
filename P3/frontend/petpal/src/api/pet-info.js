export const url = 'http://localhost:8000'

export async function getPet(id, authToken) {
    return fetch(
        `${url}/pets/${id}/`,
        {
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        }
        ).then(res => res.json())
}

export async function getPetImage(id, authToken) {
    return fetch(
        `${url}/pets/${id}/images/`,
        {
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        }
        ).then(res => res.json())
}
