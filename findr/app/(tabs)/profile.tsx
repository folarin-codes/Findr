import { useAuth } from "@clerk/clerk-expo";
import { SignIn } from "@clerk/clerk-react";
import { Link } from "expo-router";
import { View , Text, Button} from "react-native"

const Profile  = ()=>{

    const {signOut , isSignedIn} = useAuth()
    return(
        <View>
            <Button title="Log out" onPress={()=> signOut() }></Button>
            {!isSignedIn && <Link href="/(modals)/login">
                <Text>Log in</Text>
            </Link> }
        </View>
    )
}

export default Profile ; 