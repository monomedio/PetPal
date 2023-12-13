export const url = 'http://localhost:8000'

export async function getShelter(id, authToken) {
    return fetch(
        `${url}/accounts/shelter/${id}/details/`,
        {
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        }
        ).then(res => res.json())
}

export async function getShelterReviews(id, authToken) {
    return fetch(
        `${url}/shelter/${id}/reviews/`,
        {
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        }
        ).then(res => res.json())
}