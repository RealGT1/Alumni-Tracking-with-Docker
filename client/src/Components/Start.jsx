import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Login from "./Login";
import EmployeeLogin from "./EmployeeLogin";
useEffect

const Start = () => {
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:3000/verify')
      .then(result => {
        if (result.data.Status) {
          if (result.data.role === "admin") {
            http://localhost:5173/dashboard
            navigate('/dashboard')
          } else {
            navigate('/employee_detail/' + result.data.id)
          }
        }
      }).catch(err => console.log(err))
  }, [])

  return (
    <div>
      <Tabs defaultValue="2" className="w-[1200px]">
        <div className="flex justify-center mt-4 ">
          <TabsList>
            <TabsTrigger value="1">Admin</TabsTrigger>
            <TabsTrigger value="2">Alumni</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="1"><Login /></TabsContent>
        <TabsContent value="2"><EmployeeLogin /></TabsContent>
      </Tabs>
    </div>
  );
};

export default Start;
