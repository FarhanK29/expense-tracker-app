

export const useGetUserInfo = () =>{
    const {email, uid} = JSON.parse(localStorage.getItem("user"))
    return {email, uid}
}