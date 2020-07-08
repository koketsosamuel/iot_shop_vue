module.exports = {

    axiosConf: {
        baseURL: "http://127.0.0.1:3000",
        timeout: 10000,
        withCredentials: true
    },

    emailReg: "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
    phoneReg: "(([+27][0-9]{11})|([0][0-9]{9}))"

}