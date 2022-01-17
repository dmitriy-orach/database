import { User } from './../interfaces/user';

export class UserMapper {
    public mapUser(userFormValue: any, currentUser: User, usersLength: number): User {
        return {
            id: currentUser ? currentUser.id : usersLength + 1,
            firstName: userFormValue.firstName,
            lastName: userFormValue.lastName,
            username: userFormValue.nickName,
            email: userFormValue.userEmail,
            address: userFormValue.address,
            phone: userFormValue.userPhone,
            website: userFormValue.website,
            company: userFormValue.company
        };
    }
}