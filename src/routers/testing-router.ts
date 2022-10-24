import {Request, Response, Router} from "express";

import {postsRepository} from "../repositories/posts-repository";
import {blogsRepository} from "../repositories/blogs-repository";
import {usersRepository} from "../repositories/users-repository";
import {commentsRepository} from "../repositories/comments-repository";

export const testingRouter = Router({})

testingRouter.delete('/all-data', async (req: Request, res: Response) => {
    try {
        await postsRepository.deleteAllPosts()
        await blogsRepository.deleteAllBlogs()
        await usersRepository.deleteAllUsers()
        await commentsRepository.deleteAllComments()

        return res.sendStatus(204)
    } catch (e) {
        console.log('testingRouter => all-data =>', e)
        return res.sendStatus(503)
    }
})