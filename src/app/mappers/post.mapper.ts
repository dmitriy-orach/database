import { Post } from "../interfaces/post";

export class PostMapper {
    public mapPost(postFormValue: any, currentPost: Post, userId:number, postsLength: number): Post {
        return {
            id: currentPost ? currentPost.id : postsLength + 1,
            userId: currentPost ? currentPost.userId : userId,
            title: postFormValue.title,
            body: postFormValue.body,
        };
    }
}