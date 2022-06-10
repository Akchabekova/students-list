import React, {useEffect, useState} from "react";
import './App.css';
import axios from "axios";
import AddUserModal from "./components/AddUserModal";
import 'boxicons';


function App() {
    const [students, setStudents] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [openModal, setOpenModal] = useState(false)
    const [editingUser, setEditingUser] = useState(null)


    const deleteUser = async (id) => {
        await axios.delete(`https://6298e09cf2decf5bb74d8896.mockapi.io/students/${id}`)
        const studentsList = students.filter(item => item.id !== id)
        setStudents(studentsList)
    }

  const handleEdit = (student) => {
        setEditingUser(student)
        setOpenModal(true)
    }
    useEffect(() =>{
        axios('https://6298e48abf77b60258233216.mockapi.io/students')
            .then((res) =>{
                setStudents(res.data)
                setIsLoading(false)
            })
    },[])

    if(isLoading){
        return "Loading ..."
    }
  return (
   <div className="App">
       {
           openModal &&
           <AddUserModal
               setOpenModal = {setOpenModal}
               students={students}
               setStudents={setStudents}
               editingUser={editingUser}
               setEditingUser={setEditingUser()}
           />
       }
       <button onClick={() => setOpenModal(true)}
               className="inline-flex  pr-5 mt-5 rounded-xl border green py-1 px-4 text-primary bg-green-700  text-white my-6">
           Добавить студента
           <box-icon name='user-plus' classname="pl-3"></box-icon>
       </button>

  <table className="table-auto w-full">
  <thead>
  <tr className="bg-blue-500 text-center">
  <th className="w-1/7 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3  lg:px-4 border-l border-transparent">#</th>
  <th className="w-1/7 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3  lg:px-4 border-l border-transparent">ФИО</th>
  <th className="w-1/7 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3  lg:px-4 border-l border-transparent">Группа</th>
  <th className="w-1/7 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3  lg:px-4 border-l border-transparent">Год поступления</th>
  <th className="w-1/7 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3  lg:px-4 border-l border-transparent">Телефон</th>
  <th className="w-1/7 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3  lg:px-4 border-l border-transparent">Почта</th>
  <th className="w-1/7 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3  lg:px-4 border-l border-transparent">Статус</th>
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
