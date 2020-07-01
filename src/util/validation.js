import config from "../config/index"

export default {

    verifyEmail(email) {
        let emailReg = RegExp(config.emailReg)
        return emailReg.test(email)
    },

    verifyPhone(phone) {
        let phReg = new RegExp(config.phoneReg)
        return phReg.test(phone)
    }

}