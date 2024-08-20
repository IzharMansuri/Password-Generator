import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setlength] = useState(8);
  const [charAll, setcharAll] = useState(false);
  const [numAll, setnumAll] = useState(false);
  const [password, setpassword] = useState("");

  const passwordRef=useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAll) str += "123456789";
    if (charAll) str += "!@#$%^&*(){}[]";

    for (let i = 1; i <=length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setpassword(pass);
  }, [length, numAll, charAll, setpassword]);

  const copyPasswordtoClipboard=useCallback(()=>{
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,3);
      window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[numAll,charAll,passwordGenerator,length])

  return (
    <div className="w-full max-w-md bg-gray-700 mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500">
      <h1 className="text-white text-center">Password Generator</h1>
      <div className="flex-shadow rounded-lg overflow-hidden mb-4 flex">
        <input
          type="text"
          className="outline-none w-full py-1 px-3"
          value={password}
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordtoClipboard}
          className="rounded-sm
          bg-blue-700 px-3 text-white"
        >
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={20}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setlength(e.target.value);
            }}
          />
          <label htmlFor="">Length:{length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numAll}
            id="numberinput"
            onChange={() => {
              setnumAll((prev) => !prev);
            }}
          />
          <label htmlFor="numberinput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAll}
            id="numberinput"
            onChange={() => {
              setcharAll((prev) => !prev);
            }}
          />
          <label htmlFor="numberinput">Char</label>
        </div>
      </div>
    </div>
  );
}

export default App;
