import React, { useEffect, useState, useContext } from "react";
import { Spin, message, Table, Modal, Form, Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { AuthContext } from "../../../context/AuthContext";
import { collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { firestore } from "../../../config/firebase";

const intialState = {
  name: "",
  hobby: "",
  location: "",
};

const Todos = () => {
  const { user } = useContext(AuthContext);
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessingDelete, setIsProccesingDelete] = useState(false);
  const [currentpage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", location: "", hobby: "" });

  const [messageApi, contextHolder] = message.useMessage();
  const fetchDocuments = async () => {
    try {
      const array = [];
      const querySnapshot = await getDocs(collection(firestore, "todos"));
      querySnapshot.forEach((doc) => {
        array.push({ id: doc.id, ...doc.data() });
      });
      setDocuments(array);
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchDocuments();
  }, []);

  const handledelete = async (todo) => {
    setIsProccesingDelete(true);

    try {
      await deleteDoc(doc(firestore, "todos", todo.id));
      messageApi.success("todo deleted")
      let newDocuments = documents.filter((doc) => {
        return doc.id !== todo.id;
      });
      setDocuments(newDocuments);
    } catch (error) {
      console.log(error);
      messageApi.error("some thing went wrong");
    }
    setIsProccesingDelete(false);
  };
  const openEditModal = (todo) => {
    setEditingTodo(todo);
    setEditForm({ name: todo.name, location: todo.location, hobby: todo.hobby });
    setIsModalOpen(true);
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));

  };

  // Save changes
  const handleSave = async () => {
    try {
      setIsModalOpen(false)
      const todoRef = doc(firestore, "todos", editingTodo.id);
      await updateDoc(todoRef, editForm);

      
      setDocuments((prev) =>
        prev.map((doc) => (doc.id === editingTodo.id ? { ...doc, ...editForm } : doc))
      );

      messageApi.success("Todo updated successfully");
      setEditingTodo(null);
    } catch (error) {
      console.error(error);
      messageApi.error("Failed to update todo");
    
    }
  };

  //antd table
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "name",
      width: 100,
      render: (_, __, index) => (currentpage - 1) * pagesize + index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
      render: (text) => (
        <a className="text-gray-700 hover:text-indigo-600 font-medium">
          {text}
        </a>
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      align: "center",
    },
    {
      title: "Hobby",
      dataIndex: "hobby",
      key: "hobby",
      responsive: ["md", "lg", "xl"],
      width: 300,
    },
    {
      title: "Action",
      key: "action",
      width: 200,
      align: "center",
      render: (_, record) => (
        <div className="flex space-x-3 justify-center md:justify-start">
          <button
            className="px-3 py-1.5 rounded-lg text-gray-800 text-sm font-semibold transition duration-300 ease-out transform 
                     bg-linear-to-br from-gray-100 to-gray-300 shadow-md shadow-gray-400/50 
                     hover:scale-[1.05] hover:shadow-lg hover:from-gray-200 hover:to-gray-400 active:scale-[0.98] focus:ring-2 focus:ring-gray-400"
            type="button"
            onClick={() => { openEditModal(record) }}
          >
            Edit
          </button>

          <button
            className="px-3 py-1.5 rounded-lg text-white text-sm font-semibold transition duration-300 ease-out transform 
                     bg-linear-to-br from-gray-600 to-gray-800 shadow-md shadow-gray-600/50 
                     hover:scale-[1.05] hover:shadow-lg hover:from-gray-700 hover:to-gray-900 active:scale-[0.98] focus:ring-2 focus:ring-gray-700"
            type="button"
            onClick={() => handledelete(record)}
          >
            {!isProcessingDelete ? "Delete" : <Spin />}
          </button>
        </div>
      ),
    },
  ];


  const pagesize = 3;

  return (
    <form>
      <div className="min-h-screen w-full ">
        <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex justify-center items-center font-sans">
          <div className="w-full max-w-4xl bg-white shadow-2xl shadow-gray-400/50 rounded-2xl p-6 md:p-8 ring-1 ring-gray-200/60">
            <header className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800 border-b pb-2">
                My Todos
              </h1>
            </header>
  {contextHolder}
             <div>
              {!isLoading ? (
                <Table
                  columns={columns}
                  rowKey="id"
                  dataSource={documents}
                  className="shadow-xl rounded-lg overflow-hidden"
                  bordered
                  pagination={{
                    pageSize: pagesize,
                    showSizeChanger: false,
                    className: "mt-6 text-right",
                    onChange: (page) => setCurrentPage(page),
                  }}
                />
               
              ) : (
                <div className="flex justify-center items-center w-full h-[300px]">
                  {" "}
                  <Spin
                    indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
                  />
                </div>
              )}

              <Modal
                title="Edit Todo"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null} 
              >
                <Form layout="vertical">
                  <Form.Item label="Name"
                    rules={[{ required: true, message: "Please enter the hobby" }]}>
                    <Input
                      name="name"
                      value={editForm.name}
                      onChange={handleInputChange}
                      placeholder="Enter Name"
                      className="w-full px-4 py-3 text-sm bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-grey-200 focus:border-grey-200 focus:shadow-md transition-all duration-200 hover:shadow-lg"
                    />
                  </Form.Item>

                  <Form.Item label="Location"
                    rules={[{ required: true, message: "Please enter the hobby" }]}>
                    <Input
                      name="location"
                      value={editForm.location}
                      onChange={handleInputChange}
                      placeholder="Enter Location"
                      className="w-full px-4 py-3 text-sm bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-grey-200 focus:border-grey-200 focus:shadow-md transition-all duration-200 hover:shadow-lg"
                    />
                  </Form.Item>

                  <Form.Item label="Hobby"
                    rules={[{ required: true, message: "Please enter the hobby" }]}
                  >
                    <Input
                      name="hobby"
                      value={editForm.hobby}
                      onChange={handleInputChange}
                      placeholder="Enter Hobby"
                      className="w-full px-4 py-3 text-sm bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-grey-200 focus:border-grey-200 focus:shadow-md transition-all duration-200 hover:shadow-lg"
                    />
                  </Form.Item>

                  
                  <div className="flex justify-end space-x-3 mt-4">
                    <button
                      onClick={handleSave}
                      className="px-3 py-1.5 rounded-lg text-white text-sm font-semibold transition duration-300 ease-out transform 
                   bg-linear-to-br from-gray-600 to-gray-800 shadow-md shadow-gray-600/50 
                   hover:scale-[1.05] hover:shadow-lg hover:from-gray-700 hover:to-gray-900 active:scale-[0.98] focus:ring-2 focus:ring-gray-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="px-3 py-1.5 rounded-lg text-gray-800 text-sm font-semibold transition duration-300 ease-out transform 
                   bg-linear-to-br from-gray-100 to-gray-300 shadow-md shadow-gray-400/50 
                   hover:scale-[1.05] hover:shadow-lg hover:from-gray-200 hover:to-gray-400 active:scale-[0.98] focus:ring-2 focus:ring-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              </Modal></div> 
          </div>
        </div>
      </div>
    </form>
  );
};

export default Todos;
