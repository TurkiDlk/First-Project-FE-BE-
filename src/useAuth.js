export default function useAuth(){


    const isLoggedIn = !!localStorage.getItem("authToken");

    return isLoggedIn;
}