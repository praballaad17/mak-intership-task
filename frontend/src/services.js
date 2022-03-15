import axios from 'axios';

const apiEndpoint = 'http://localhost:3003/api';

export const getUser = async () => {
    try {
        const { data } = await axios.get(`${apiEndpoint}/get-users`);
        return data;
    } catch (err) {
        console.log1(err);
    }
}

export const postUser = async (user) => {

    try {
        const { data } = await axios.post(`${apiEndpoint}/add-user`, {
            user: user
        });
        return data;
    } catch (err) {
        console.log1(err);
    }
}

export const deleteUser = async (userId) => {
    try {
        const { data } = await axios.delete(`${apiEndpoint}/delete-user/${userId}`);
        return data;
    } catch (err) {
        console.log(err);
    }
}

export const editUser = async (user, userId) => {

    try {
        const { data } = await axios.post(`${apiEndpoint}/edit-user/${userId}`, {
            user: user
        });
        return data;
    } catch (err) {
        console.log(err);
    }
}