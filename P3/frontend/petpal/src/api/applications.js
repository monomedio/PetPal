export const url = 'http://localhost:8000'

// POST
export async function createApplication(pet_id, authToken) {
    return fetch(
        `${url}/applications/`,
        {
            method: 'POST',
            body: JSON.stringify({"pet_id": pet_id}),
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        }
        ).then(res => res.json())
}

// PATCH
export async function updateApplication(pet_id, status, authToken) {
    return fetch(
        `${url}/applications/${pet_id}/`,
        {
            method: 'PATCH',
            body: JSON.stringify({"status": status}),
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        }
        ).then(res => res.json())
}

// GET SINGLE APPLICATION
export async function getApplication(pet_id, authToken) {
    return fetch(
        `${url}/applications/${pet_id}/`,
        {
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        }
        ).then(res => res.json())
}


// GET ALL APPLICATIONS
// filters must be in format of "?status=pending&ordering=created_at"
export async function getAllApplications(authToken, filters="") {
    return fetch(
        `${url}/applications/${filters}`,
        {
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        }
        ).then(res => res.json())
}

