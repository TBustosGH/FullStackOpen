//4-3
const dummy = (blogs) => {
    return 1
}
//4-4
const totalLikes = (blogs) => {
    let likes = 0
    blogs.forEach(element => {
        likes += element.likes
    })
    return likes
}

module.exports = {
    dummy,
    totalLikes
}