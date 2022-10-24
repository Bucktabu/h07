import {BlogType} from "./types/blogs-type";
import {PostType} from "./types/posts-type";
import {UserDBType} from "./types/user-type";
import {CommentType} from "./types/comment-type";

export const giveSkipNumber = (pageNumber: string,
                               pageSize: string) => {

    return (Number(pageNumber) - 1) * Number(pageSize)
}

export const givePagesCount = (totalCount: number, pageSize: string) => {
    return Math.ceil(totalCount / Number(pageSize))
}

export const usersDBtoUserType = (userDB: UserDBType) => {
    return {
        id: userDB.id,
        login: userDB.login,
        email: userDB.email,
        createdAt: userDB.createdAt
    }
}

export const userDBtoUser = (userDB: UserDBType) => {
    return {
        email: userDB.email,
        login: userDB.login,
        userId: userDB.id,
    }
}

export const blogDBtoBlogType = (blogDB: BlogType) => {
    return {
        id: blogDB.id,
        name: blogDB.name,
        youtubeUrl: blogDB.youtubeUrl,
        createdAt: blogDB.createdAt
    }
}

export const postBDtoPostType = (postsBD: PostType) => {
    return {
        id: postsBD.id,
        title: postsBD.title,
        shortDescription: postsBD.shortDescription,
        content: postsBD.content,
        blogId: postsBD.blogId,
        blogName: postsBD.blogName,
        createdAt: postsBD.createdAt
    }
}

export const commentBDtoCommentType = (commentBD: CommentType) => { // непонимаю передаю БД тип, а писать нужно обычный
    return {
        id: commentBD.id,
        content: commentBD.content,
        userId: commentBD.userId,
        userLogin: commentBD.userLogin,
        createdAt: commentBD.createdAt
    }
}

