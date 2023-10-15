import { GET } from "..";

export const logIn = (username: string, password: string) => {
  const auth = btoa(encodeURIComponent(username) + ":" + encodeURIComponent(password))
return GET("/auth/user", {headers: {
    Accept: "*/*",
  Authorization: `Basic ${auth}`
}})
}
