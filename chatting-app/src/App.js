import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {useAuthState} from "react-firebase-hooks/auth";
import Chatting from './Components/Chatting';
import Signup from './Components/Signup';
import { Box } from '@chakra-ui/react';

const firebaseConfig = {
  apiKey: "AIzaSyDu9vt8G3TVHwkJvfilXa0lyvwst3Da_lI",
    authDomain: "a-chatting-app-b721d.firebaseapp.com",
    projectId: "a-chatting-app-b721d",
    storageBucket: "a-chatting-app-b721d.appspot.com",
    messagingSenderId: "145084853077",
    appId: "1:145084853077:web:693671cbb7de2a63b15ddc",
    measurementId: "G-0S6LDGBZEV"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function App() {
  const [user] = useAuthState(auth);
  document.body.style = 'background: #383838;';
  return (
    <Box className="App">
      <Box>
        
       {user ? <Chatting /> : <Signup />}
      </Box>
     </Box>
  );
}

export default App;
