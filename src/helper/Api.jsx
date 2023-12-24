import axios from "axios";

const Api =  axios.create({
    baseURL: 'https://api.jikan.moe/v4/',
    // headers: {
    //     application: "application/json"
    // }
})

export default Api;