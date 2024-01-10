'use client'
import React from 'react'
import NavBar from '../Components/navbar'


const Create: React.FC = () => {
    return (
        <>
          <NavBar />
          <div className='w-5/6 h-5/6 shadow-sm shadow-slate-300 rounded-xl mx-36 my-36 p-24'>
            <h1 className='my-10 font-bold'>Създай пост</h1>
             <form > {/*onSubmit={handleSubmit}*/}
              <div>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="mt-1 p-2 w-full border-b-2 border-b-green-500 rounded-sm text-sm focus:outline-none"
                //   value={title}
                //   onChange={handleTitleChange}
                  required
                  placeholder='Заглавие'
                />
              </div>
    
              <div className="my-12">
                <input
                  type="text"
                  id="description"
                  name="description"
                  className="mt-1 p-2 w-full border-b-2 border-b-green-500 rounded-sm text-sm focus:outline-none "
                //   value={description}
                //   onChange={handleDescriptionChange}
                  required
                  placeholder='Описание'
                />
              </div>
    
              <div className="my-12">
                {/* Add photo input */}
              </div>
            
            
                    {/* EMO MOLQ DIZAIGN I GO ISTRII KOMENTARA */}

                  <div>

                  <input
                  type="file"
                  id="photo"
                  name="photo"
                  className="mt-1 p-2 w-full text-sm focus:outline-none "
                  />

                  </div>



              <div className="flex items-center justify-between mt-4 mb-3">
                <input 
                  type="submit"
                  value="Създай пост" 
                  className="bg-green-500 text-white font-semibold p-4 rounded-lg cursor-pointer text-bold hover:bg-green-600 text-md"
                />
              </div>
            </form>
           
          </div>
        </>
      );
    
}

export default Create;