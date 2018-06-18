/** 把登录用户信息保存到SessionStorage
 * id:
 * username:
 * userType:
 */
// const saveLoginUserToSessionStorage = (loginUser) => {
//     sessionStorage.setItem('loginUser.id', loginUser.id)
//     sessionStorage.setItem('loginUser.username', loginUser.username)
//     sessionStorage.setItem('loginUser.userType', loginUser.userType)
// }

/**
 * 从SessionStorage 获取登录用户信息
 */
// const getLoginUserFromSessionStorage = () => {
//     return {
//         id: sessionStorage.getItem('loginUser.id'),
//         username: sessionStorage.getItem('loginUser.username'),
//         userType: sessionStorage.getItem('loginUser.userType')
//     }
// }

/**
 * 把登录用户信息保存到localStorage
 */
const saveLoginUserToLocalStorage = (loginUser) => {
    localStorage.setItem('loginUser.id', loginUser.id)
    localStorage.setItem('loginUser.username', loginUser.username)
    localStorage.setItem('loginUser.userType', loginUser.userType)
}

/**
 * 从localStorage 获取登录用户信息
 */
const getLoginUserFromLocalStorage = () => {
    return {
        id: localStorage.getItem('loginUser.id'),
        username: localStorage.getItem('loginUser.username'),
        userType: localStorage.getItem('loginUser.userType')
    }
}

/**
 * 把登录用户信息保存到 sessionStorage或者localStorage 中
 */
export const saveLoginUserToStorage = (loginUser) => {
    saveLoginUserToLocalStorage(loginUser)
}

/**
 * 从sessionStorage或者localStorage 中 获取登录用户信息
 */
export const getLoginUserFromStorage = () => {
    return getLoginUserFromLocalStorage()
}

export const removeLoginUserFromStorage = () => {
    localStorage.removeItem('loginUser.id')
    localStorage.removeItem('loginUser.username')
    localStorage.removeItem('loginUser.userType')
}
