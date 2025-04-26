
const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.replace('bearer ', '')
    } else {
        request.token = null
    }
    next()
}

const userExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.user = authorization.replace('bearer ', '')
    } else {
        request.user = null
    }
    next()
}

module.exports = {
    tokenExtractor,
    userExtractor
}