 

 import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
 import React from 'react'
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useOAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
 


enum Strategy{
  Google= "oauth_google",
  Apple = "oauth_apple",
  Facebook = " oauth_facebook"

}


 const Page = () => {

  useWarmUpBrowser();

  const router = useRouter(); 

  const {startOAuthFlow:apple_auth} = useOAuth({strategy:'oauth_apple'})
  const {startOAuthFlow:google_auth} = useOAuth({strategy:'oauth_google'})
  const {startOAuthFlow:facebook_auth} = useOAuth({strategy:'oauth_facebook'})

  const onSelectAuth = async (strategy:Strategy)=>{
    const selectedAuth ={
      [Strategy.Google] : google_auth,
      [Strategy.Apple]: apple_auth,
      [Strategy.Facebook]:facebook_auth
    }[strategy];

    try{
      const {createdSessionId, setActive} = await selectedAuth(); 

      if(createdSessionId){
         setActive!({session:createdSessionId })

         console.log(" user was authentiated with session id " , createdSessionId )
         router.back()
      }
    }
    catch(err){
      console.error('There was an error ', err)

    }

  } 
   
   return (
     <View style={styles.container}>
       <TextInput autoCapitalize='none' placeholder='Email' style={[defaultStyles.inputField , {marginBottom:30}]} />

       <TouchableOpacity style={[defaultStyles.btn]}>
        <Text style={[defaultStyles.btnText ]}>Continue</Text>
       </TouchableOpacity>

       < View style={styles.separatorView }>

        <View style={{flex:1 , borderBottomColor:'black', borderBottomWidth:StyleSheet.hairlineWidth}}/>
          <Text style={styles.separator}>or </Text>
        <View style={{flex:1 , borderBottomColor:'black', borderBottomWidth:StyleSheet.hairlineWidth}}/>
       </View>

       <View style={{gap:20}}>

        <TouchableOpacity style={styles.btnOutline}>
          <Ionicons name='call-outline' style={defaultStyles.btnIcon} size={24}/>
          <Text style={styles.btnOutlineText}>Continue with Phone</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline} onPress={()=> onSelectAuth(Strategy.Apple)}>
          <Ionicons name='logo-apple' style={defaultStyles.btnIcon} size={24}/>
          <Text style={styles.btnOutlineText}>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline}  onPress={()=> onSelectAuth(Strategy.Google)}>
          <Ionicons name='logo-google' style={defaultStyles.btnIcon} size={24}/>
          <Text style={styles.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity> 

        <TouchableOpacity style={styles.btnOutline}  onPress={()=> onSelectAuth(Strategy.Facebook )}>
          <Ionicons name='logo-facebook' style={defaultStyles.btnIcon} size={24}/>
          <Text style={styles.btnOutlineText}>Continue with Facebook</Text> 
        </TouchableOpacity>

       </View>
     </View>
   ) 
 } 


 const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
    padding:26
  },
  separatorView:{
     flexDirection:'row',
     gap:10,
     alignItems:'center',
     marginVertical:30
      
  },
  separator:{
    fontFamily:'bold',
    color:Colors.grey

  },
  btnOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'bold',
  },

 })
 
 export default Page 