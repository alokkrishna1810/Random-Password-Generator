import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 101);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="w-full max-w-lg mx-auto bg-gray-900 text-white shadow-lg rounded-xl p-6 my-10">
      <h1 className="text-2xl font-bold text-center mb-4">
        Password Generator
      </h1>
      <div className="flex items-center border border-gray-600 rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="w-full px-4 py-2 text-black bg-white outline-none"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />

        <button
          onClick={copyPasswordToClipboard}
          className="bg-blue-600 text-white px-4 py-2 transition hover:bg-blue-700 focus:ring focus:ring-blue-300 cursor-pointer"
        >
          Copy
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <label className="text-sm">Length: {length}</label>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="w-full h-2 bg-gray-700 rounded-lg cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
        </div>
        <div className="flex items-center gap-4">
          <label
            htmlFor="numberInput"
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              className="accent-blue-500"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            Numbers
          </label>
          <label
            className="flex items-center gap-2 cursor-pointer"
            htmlFor="characterInput"
          >
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              className="accent-blue-500"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            Symbols
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
