export const url = 'http://localhost:8000'

// POST
export async function createComment(application_id, message, authToken) {
    return fetch(
        `${url}/applications/${application_id}/comments/`,
        {
            method: 'POST',
            body: JSON.stringify({"body": message}),
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        }
        ).then(res => res.json())
}

// GET ALL COMMENTS
export async function getComments(application_id, authToken) {
    return fetch(
        `${url}/applications/${application_id}/comments/`,
        {
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        }
        ).then(res => res.json())
}