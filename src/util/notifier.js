module.exports = (data, notifier) => {

    if(data.err) {

        notifier.error(String(data.err.msg))

    } else if(data.msg) {

        notifier.success(data.msg)

    }

}




