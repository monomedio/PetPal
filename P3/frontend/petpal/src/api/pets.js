export const url = 'http://localhost:8000'

// GET ALL PETS
// filters must be in format of "?status=available&breed=poodle&shelter=1"
export async function getAllPets(authToken, filters="") {
    return fetch(
        `${url}/pets/${filters}`,
        {
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        }
        ).then(res => res.json())
}

// GET ALL PETS WITH SHELTER FILTERING
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

// GET
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

// PATCH
export async function updatePet(id, data, authToken) {
    return fetch(
        `${url}/pets/${id}/`,
        {
            method: 'PATCH',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        }
        ).then(res => res.json())
}

// PATCH
export async function deletePet(id, authToken) {
    return fetch(
        `${url}/pets/${id}/`,
        {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        }
        ).then(res => res.json())
}

// GET ALL IMAGES
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

// POST IMAGES
export async function addPetImage(id, data, authToken) {
    return fetch(
        `${url}/pets/${id}/images/`,
        {
            method: 'POST',
            body: JSON.stringify({"images": data}),
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        }
        ).then(res => res.json())
}



