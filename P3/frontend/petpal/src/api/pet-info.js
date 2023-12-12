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

export async function getShelterPets(shelterId, authToken) {
    try {
        const response = await fetch(
            `${url}/pets/?shelter=${shelterId}`,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch pets. Status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching pets:', error.message);
        throw error;
    }
}
