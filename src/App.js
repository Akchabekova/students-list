import React, {useEffect, useState} from "react";
import './App.css';
import axios from "axios";


function App() {
    const [students, setStudents] = useState([])
    const [isEditing, setIsEditing] = useState(true)
    const [isloader, setIsLoader] = useState(true)
    const [updateUserId, setUpdataUserId] = useState(null)
    const [newStudent, setNewStudent] = useState({
       name: "",
       group: "",
       year: "",
       phone: "",
       email: ""
    })
    const handleChange = (e) => {
        setNewStudent({...newStudent, [e.target.name]: e.target.value})
    }

    const deleteUser = async (id) => {
        await axios.delete(`https://6298e09cf2decf5bb74d8896.mockapi.io/students/${id}`)
        const studentsList = students.filter(item => item.id !== id)
        setStudents(studentsList)
    }
  const handleSubmit = async (e) => {
     e.preventDefault();
     const uploadUser = await axios.post("https://6298e48abf77b60258233216.mockapi.io/students", newStudent)
      setStudents([...students, uploadUser.data])
      setNewStudent({
          name: "",
          group: "",
          year: "",
          email: "",
          phone: ""
      })
  }

  const handleEdit = (student) => {
        setIsEditing (true)
        setUpdataUserId (student.id)
        setNewStudent ({
            name: student.name,
            group: student.group,
            year: student.year,
            phone: student.phone,
            email: student.email
        })
    }

    const updateUser = async (e) =>{
        e.preventDefault()
        const updatedUser = await axios.put(`https://6298e09cf2decf5bb74d8896.mockapi.io/students/${updateUserId}`, newStudent)
        setStudents(students.map(item=> item.id === updatedUser.data.id ? updatedUser.data : item))
        setIsEditing(false)
        setNewStudent({
            name:'',
            group: '',
            year: '',
            phone: '',
            email: '',

        })
    }

    useEffect(() =>{
        axios('https://6298e48abf77b60258233216.mockapi.io/students')
            .then((res) =>{
                setStudents(res.data)
                setIsLoader(false)
            })
    },[])

    if(isloader){
        return "Loading ..."
    }
  return (
   <div className="App">
       <form onSubmit = {isEditing ? updateUser : handleSubmit} >
           <div>
       <div className="bg-white shadow rounded-lg p-6">
           <div className="grid lg:grid-cols-2 gap-6">
               <div
                   className="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
                   <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                       <p>
                           <label htmlFor="name" className="bg-white text-gray-600 px-1">ФИО*</label>
                       </p>
                   </div>
                   <p>
                       <input onChange={handleChange} name="name" autoComplete="false" tabIndex="0" type="text"
                              className="py-1 px-1 text-gray-900 outline-none block h-full w-full"  value={newStudent.name}/>
                   </p>
               </div>
               <div
                   className="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
                   <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                       <p>
                           <label htmlFor="group" className="bg-white text-gray-600 px-1">Группа*</label>
                       </p>
                   </div>
                   <p>
                       <input onChange={handleChange}  name="group" autoComplete="false" tabIndex="0" type="text"
                              className="py-1 px-1 outline-none block h-full w-full"  value = {newStudent.group} />
                   </p>
               </div>
               <div
                   className="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
                   <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                       <p>
                           <label htmlFor="year" className="bg-white text-gray-600 px-1">Год*</label>
                       </p>
                   </div>
                   <p>
                       <input  onChange={handleChange}  name="year" autoComplete="false" tabIndex="0" type="text"
                              className="py-1 px-1 outline-none block h-full w-full" value = {newStudent.year} />
                   </p>
               </div>
               <div
                   className="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
                   <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                       <p>
                           <label htmlFor="phone" className="bg-white text-gray-600 px-1">Телефон*</label>
                       </p>
                   </div>
                   <p>
                       <input  onChange={handleChange} name="phone" autoComplete="false" tabIndex="0" type="text"
                              className="py-1 px-1 outline-none block h-full w-full text-black"  value = {newStudent.phone}  />
                   </p>
               </div>
               <div
                   className="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
                   <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                       <p>
                           <label htmlFor="email" className="bg-white text-gray-600 px-1">Почта*</label>
                       </p>
                   </div>
                   <p>
                       <input  onChange={handleChange}  name="email" autoComplete="false" tabIndex="0" type="text"
                              className="py-1 px-1 outline-none block h-full w-full"  value = {newStudent.email} />
                   </p>
               </div>
           </div>
           <div className="border-t mt-6 pt-3">
               <button
                   className="rounded text-gray-100 px-3 py-1 bg-blue-500 hover:shadow-inner hover:bg-blue-700 transition-all duration-300">
                 {isEditing ? "Update" : "Create"}
               </button>
           </div>
       </div>
           </div>
           </form>


   <table className="table-auto w-full">
  <thead>
  <tr className="bg-blue-500 text-center">
  <th className="w-1/7 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3  lg:px-4 border-l border-transparent">#</th>
  <th className="w-1/7 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3  lg:px-4 border-l border-transparent">ФИО</th>
  <th className="w-1/7 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3  lg:px-4 border-l border-transparent">Группа</th>
  <th className="w-1/7 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3  lg:px-4 border-l border-transparent">Год поступления</th>
  <th className="w-1/7 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3  lg:px-4 border-l border-transparent">Телефон</th>
  <th className="w-1/7 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3  lg:px-4 border-l border-transparent">E-mail</th>
  <th className="w-1/7 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3  lg:px-4 border-l border-transparent">Delete</th>
   </tr>
   </thead>
  <tbody>
  {
      students.map((student) => (
          <tr key={student.id}>
              <td className="text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8] ">{student.id}</td>
              <td className="text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8] ">{student.name}</td>
              <td className="text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8] ">{student.group}</td>
              <td className="text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8] ">{student.year}</td>
              <td className="text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8] ">{student.phone}</td>
              <td className="text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8] ">{student.email}</td>
              <td className="text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8] ">
                  <button
                      onClick={() => handleEdit(student)}
                      className=" border border-yellow-400 py-1 px-4 mr-2 text-primary inline-block rounded ">
                      Edit
                  </button>
                  <button
                      onClick={() => deleteUser(student.id)}
                      className=" border border-red-400 py-1 px-4 text-primary inline-block rounded ">
                      Delete
                  </button>
              </td>
          </tr>
      ))

  }
   </tbody>
   </table>
</div>
  );
}

export default App;
