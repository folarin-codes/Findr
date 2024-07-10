import { Link } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

const index = () => {
  return (
    <View>
      <Link href={'/(modals)/login'}>Login</Link>

      <Link href={'/(modals)/booking'}>booking </Link>

      <Link href={'/listing/4567'}>listing </Link>
    </View>
  )
} 

export default index