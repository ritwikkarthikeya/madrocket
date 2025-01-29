import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import "../styles/students.css"; // Import CSS
const Students = () => {
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    college: "",
    city: "",
    roll: "",
    phone: "",
    parentName: "",
    parentPhone: "",
    dob: "",
  });

  const studentsRef = collection(db, "123");

  const fetchStudents = async () => {
    try {
      const snapshot = await getDocs(studentsRef);
      const fetchedStudents = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setStudents(fetchedStudents);
      localStorage.setItem("students", JSON.stringify(fetchedStudents)); // Save in localStorage
    } catch (error) {
      console.error("Error fetching students: ", error);
    }
  };
  
  const validateForm = () => {
    if (!editMode && students.some((student) => student.roll === form.roll)) {
      alert("Roll number already exists!");
      return false;
    }
    if (form.phone === form.parentPhone) {
      alert("Phone number and parent phone number cannot be the same!");
      return false;
    }
    if (form.phone.length !== 10 || form.parentPhone.length !== 10) {
      alert("Phone numbers must be 10 digits long!");
      return false;
    }
    return true;
  };

  const handleAddOrUpdateStudent = async () => {
    if (!validateForm()) return;

    if (editMode) {
      await updateDoc(doc(db, "123", selectedStudent.id), form);
    } else {
      await addDoc(studentsRef, form);
    }

    fetchStudents();
    setOpen(false);
    setEditMode(false);
    setForm({
      name: "",
      age: "",
      gender: "",
      email: "",
      college: "",
      city: "",
      roll: "",
      phone: "",
      parentName: "",
      parentPhone: "",
      dob: "",
    });
  };

  const handleDelete = async (id) => {
    console.log("Attempting to delete document with ID:", id);  // Log the ID to debug
    try {
      await deleteDoc(doc(db, "123", id));
      fetchStudents();  // Refresh the student list after deletion
    } catch (error) {
      console.error("Error deleting student: ", error.message);
    }
  };
  
  
  
  const handleView = (student) => {
    setSelectedStudent(student);
    setViewOpen(true);
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setForm(student);
    setEditMode(true);
    setOpen(true);
  };

  useEffect(() => {
    const storedStudents = localStorage.getItem("students");
    if (storedStudents) {
      setStudents(JSON.parse(storedStudents));
    } else {
      fetchStudents(); // Fallback to fetch from Firebase
    }
  }, []);
  
  return (

    <Box className="total" >
      <h1 className="title">STUDENT DETAILS</h1>
      <Button onClick={() => setOpen(true)} sx={{ 
  backgroundColor: 'rgb(251, 245, 245)', 
  color: 'black', 
  borderRadius: '10em', 
  fontSize: '17px', 
  fontWeight: '600', 
  padding: '1em 2em', 
  cursor: 'pointer', 
  transition: 'all 0.3s ease-in-out', 
  border: '1px solid black', 
  boxShadow: '0 0 0 0 black',
  '&:hover': {
    transform: 'translateY(-4px) translateX(-2px)',
    boxShadow: '2px 5px 0 0 black',
  },
  '&:active': {
    transform: 'translateY(2px) translateX(1px)',
    boxShadow: '0 0 0 0 black',
  }
}}>
  Add Student
</Button>
      <TableContainer>
        <Table className="table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.age}</TableCell>
                <TableCell>{student.gender}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleView(student)}>
                    <Visibility />
                  </IconButton>
                  <IconButton onClick={() => handleEdit(student)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(student.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          p={3}
          bgcolor="white"
          borderRadius={2}
          width="400px"
          maxHeight="80vh"
          overflow="auto"
          mx="auto"
          mt={5}
        >
          <Typography variant="h6">{editMode ? "Edit Student" : "Add Student"}</Typography>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            label="Age"
            fullWidth
            margin="normal"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
          />
          <TextField
            label="Gender"
            fullWidth
            margin="normal"
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <TextField
            label="College"
            fullWidth
            margin="normal"
            value={form.college}
            onChange={(e) => setForm({ ...form, college: e.target.value })}
          />
          <TextField
            label="City"
            fullWidth
            margin="normal"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
          <TextField
            label="Roll Number"
            fullWidth
            margin="normal"
            value={form.roll}
            onChange={(e) => setForm({ ...form, roll: e.target.value })}
            disabled={editMode}
          />
          <TextField
            label="Phone Number"
            fullWidth
            margin="normal"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <TextField
            label="Parent Name"
            fullWidth
            margin="normal"
            value={form.parentName}
            onChange={(e) => setForm({ ...form, parentName: e.target.value })}
          />
          <TextField
            label="Parent Phone Number"
            fullWidth
            margin="normal"
            value={form.parentPhone}
            onChange={(e) => setForm({ ...form, parentPhone: e.target.value })}
          />
          <TextField
            label="Date of Birth"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={form.dob}
            onChange={(e) => setForm({ ...form, dob: e.target.value })}
          />
          <Button onClick={handleAddOrUpdateStudent} sx={{ mt: 2 }}>
            {editMode ? "Update" : "Submit"}
          </Button> 
        </Box>
      </Modal>
      <Modal open={viewOpen} onClose={() => setViewOpen(false)}>
        <Box
          p={3}
          bgcolor="white"
          borderRadius={2}
          width="400px"
          maxHeight="80vh"
          overflow="auto"
          mx="auto"
          mt={5}
        >
          <Typography variant="h6">Student Details</Typography>
          {selectedStudent && (
            <Box>
              <Typography><strong>Name:</strong> {selectedStudent.name}</Typography>
              <Typography><strong>Age:</strong> {selectedStudent.age}</Typography>
              <Typography><strong>Gender:</strong> {selectedStudent.gender}</Typography>
              <Typography><strong>Email:</strong> {selectedStudent.email}</Typography>
              <Typography><strong>College:</strong> {selectedStudent.college}</Typography>
              <Typography><strong>City:</strong> {selectedStudent.city}</Typography>
              <Typography><strong>Roll Number:</strong> {selectedStudent.roll}</Typography>
              <Typography><strong>Phone Number:</strong> {selectedStudent.phone}</Typography>
              <Typography><strong>Parent Name:</strong> {selectedStudent.parentName}</Typography>
              <Typography><strong>Parent Phone Number:</strong> {selectedStudent.parentPhone}</Typography>
              <Typography><strong>Date of Birth:</strong> {selectedStudent.dob}</Typography>
            </Box>
          )}
          <Button onClick={() => setViewOpen(false)} sx={{ mt: 2 }}>Close</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Students;
