import AsyncStorage from "@react-native-async-storage/async-storage"
import {create} from "zustand"
import {createJSONStorage, persist} from "zustand/middleware"


interface UserStore {
    user: AuthenticatedUser | null
    updateUser: (user: AuthenticatedUser | null) => void
}

const useUserStore = create<UserStore>()(
    persist(
        (set, get) => ({
            user: null,
            updateUser: (user) => {
                set({
                    user,
                })
            },
        }),
        {
            name: "todo-application-user-store",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
)

export default useUserStore