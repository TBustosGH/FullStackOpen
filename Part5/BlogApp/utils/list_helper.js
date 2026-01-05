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
//4-5
const favouriteBlog = (blogs) => {
    if (!blogs)
        return undefined
    
    let favouriteBlog = blogs[0]

    blogs.forEach(element => {
        if (element.likes > favouriteBlog.likes)
            favouriteBlog = element
    })

    return favouriteBlog
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}