import { useState,useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");


  // useRef hook
   const passwordRef = useRef(null);


  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) {
      str += "0123456789"
    }
    if(charAllowed) str+= "!@#$%^&*()-_=+[]{}`~"

    for(let i = 1; i<= length; i++){
      let random = Math.floor(Math.random()*str.length+1)

      pass += str.charAt(random);
    }
    setPassword(pass);
  }, [length,numberAllowed,charAllowed,setPassword])
  
  useEffect(()=>{
   passwordGenerator()

  },[length,numberAllowed,charAllowed,passwordGenerator])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
  }, [password])
  return (
    <div className='min-h-screen flex justify-center items-center'>
    <div className='w-full max-w-lg mx-auto text-slate-200 my-6 px-4 py-15 border border-gray-60 rounded-xl p-5 backdrop-blur-3xl bg-white/30' >
      <h1 className='text-center text-4xl mb-14 text-white font-semibold'>Password Generator</h1>
      <div className= 'flex shadow rounded-lg overflow-hidden mb-10'>
        <input type="text" placeholder='Password' readOnly value={password} ref={passwordRef} className='w-full py-3 font-mon1 outline-none text-gray-700 text-lg font-semibold px-3' />
        <button className='outline-none bg-blue-700 px-3 py-1 cursor-pointer text-white font-semibold hover:scale-95' onClick={copyPasswordToClipboard} >copy</button>
      </div>

      <div className='flex text-sm gap-x-6'>
        <div className='flex items-center gap-x-1' >
          <input type="range" min={6} max={32} value={length} className='curson-pointer' onChange={(e) =>setLength(e.target.value)}  />
          <label className='font-medium text-base' > Length: {length}</label>
        </div>
      
        <div className='flex items-center gap-x-1' >
          <input id='numberInput' type="checkbox" defaultChecked={numberAllowed} onChange={() => {
            setNumberAllowed((prev) => !prev)
            }} />
          <label htmlFor= 'numberInput' className='font-medium text-base' > Numbers</label>
        </div>
        <div className='flex items-center gap-x-1' >
          <input id='characterInput' type="checkbox" defaultChecked={charAllowed} onChange={()=> {
            setCharAllowed((prev => !prev))
            }} />
          <label htmlFor='characterInput' className='font-medium text-base' > Characters</label>
        </div>
      </div>

    </div>
    </div>
  )
}

export default App
