import { JSX } from 'react'
import styles from './Menu.module.css'
import SignOut from '../signOut/SignOut'

export default function Menu():JSX.Element {



  return (
    <div>
      <h2>Menu</h2>
      <SignOut />
    </div>
  )
}