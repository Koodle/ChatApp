
//check if the user is online
export const userStatus = (user) => {
    return user.status === "online" ? "online" : "offline"
}