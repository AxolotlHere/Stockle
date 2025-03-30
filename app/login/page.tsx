import {BackgroundLines} from "../components/BackgroundLines";

function login(){
    return(
        <>
        <BackgroundLines className="bg-black">
        <div className="flex items-center justify-center h-screen z-10">
            <div className="bg-slate-900 px-8 py-15 text-center rounded-lg z-20 relative bg-opacity-80">
                <div className="text-blue-400 text-left m-2 text-lg">
                    Sign in to Stockle
                </div>
                <button className="bg-gray-500 text-white rounded-lg p-2 m-2 hover:bg-gray-400 active:bg-slate-200 active:text-black">Sign in with Google</button>
                <br/>
                <button className="bg-gray-500 text-white rounded-lg p-2 m-2 hover:bg-gray-400 active:bg-slate-200 active:text-black">Sign in with Apple</button>
                <p className="text-cyan-900 text-center">----- or -----</p>
                <div className="flex grid-cols-2 gap-2 p-2">
                    <div className="w-1/2">
                    <label htmlFor="email" className="text-blue-400">Username or Email:</label>
                    </div>
                    <div className="w-1/2">
                    <input name="email" id="email" type="email" className="rounded-lg bg-gray-400"></input>
                    </div>                    
                </div>
                <div className="flex grid-cols-2 gap-2 p-2">
                    <div className="w-1/2">
                    <label htmlFor="password" className="text-blue-400">Password:</label>
                    </div>
                    <div className="w-1/2">
                    <input name="password" id="password" type="password" className="rounded-lg bg-gray-400"></input>
                    </div>              
                </div>
                    
                <button className="rounded-lg bg-gray-500 text-white p-3 m-4 hover:bg-gray-400 active:bg-slate-200 active:text-black">
                    Sign in
                </button>  
            </div>
        </div>
        </BackgroundLines>
        </>
    )
}

export default login