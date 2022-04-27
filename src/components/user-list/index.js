import React from "react";
import UserListItem from "./user-list-item";

const UserList = ({users = []}) => {  
    console.log(`users list length = ${users.length}`);
    return (
        <ul className="list-group">
            {
                users.map && users.map(user =>
                    <UserListItem key={user._id}
                                user={user}/>)
            }
        </ul>
    );
}

export default UserList;