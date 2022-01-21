import { Post } from "../interfaces/post";

export class PostMapper {
    public mapPost(postFormValue: any, userId:number, postsLength: number): Post {
        return {
            id: postFormValue.postId ? postFormValue.postId : postsLength + 1,
            userId:  userId,
            title: postFormValue.title,
            body: postFormValue.body,
        };
    }
}