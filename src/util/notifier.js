module.exports = (data, notifier) => {

    if(data.err) {

        notifier.error(String(data.err))

    } else if(data.msg) {

        notifier.success(data.msg)

    }

}




