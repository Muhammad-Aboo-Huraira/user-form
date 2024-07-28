import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  Typography,
  Paper,
  FormControl,
  Select,
  MenuItem,
  Avatar,
  Box,
  Button,
  TextField,
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [filter, setFilter] = useState("");
  const headers = [
    { id: "index", label: "#" },
    { id: "email", label: "EMAIL" },
    { id: "username", label: "NAME" },
    { id: "phoneNumber", label: "PHONE NUMBER" },
    { id: "preferredTime", label: "INTERVIEW TIMINGS" },
    { id: "role", label: "ROLE" },
    { id: "active", label: "ACTIVE" },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      const userCollection = collection(db, "users");
      const userSnapshot = await getDocs(userCollection);
      const userList = userSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
    };

    fetchUsers();
  }, []);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setEntriesPerPage(parseInt(event.target.value, 10));
  };

  const handleToggleActive = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };

  const totalPages = Math.ceil(users.length / rowsPerPage);

  return (
    <div>
      <Typography
        variant="h5"
        sx={{ marginBottom: 2, fontFamily: "Noto Sans, sans-serif" }}
      >
        User Table
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <Typography
          sx={{ fontFamily: "Noto Sans, sans-serif", marginRight: 1 }}
        >
          Showing
        </Typography>
        <FormControl sx={{ minWidth: 120 }}>
          <Select
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
            displayEmpty
            inputProps={{ 'aria-label': 'Rows per page' }}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
          </Select>
        </FormControl>
        <Typography
          sx={{ fontFamily: "Noto Sans, sans-serif", marginLeft: 1 }}
        >
          entries
        </Typography>
      </Box>
      <TextField
        label="Filter by Username"
        variant="outlined"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        sx={{ marginBottom: 2, fontFamily: "Noto Sans, sans-serif", width: '100%' }}
      />
      <TableContainer
        component={Paper}
        sx={{ fontFamily: "Noto Sans, sans-serif" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell
                  key={header.id}
                  sx={{ fontFamily: "Noto Sans, sans-serif", fontWeight: 500 }}
                >
                  {header.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .filter((user) => 
                user.username.toLowerCase().includes(filter.toLowerCase())
              )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user, index) => (
                <TableRow
                  key={user.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#F7F7F7" : "#FFFFFF",
                    fontFamily: "Noto Sans, sans-serif",
                  }}
                >
                  <TableCell sx={{ fontFamily: "Noto Sans, sans-serif" }}>
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Noto Sans, sans-serif" }}>
                    {user.email}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Noto Sans, sans-serif" }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        src={user.imageUrl || "/default-profile.png"}
                        alt={user.username}
                        sx={{
                          width: 23,
                          height: 23,
                          borderRadius: '50%',
                          marginRight: 2,
                        }}
                      />
                      {user.username}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Noto Sans, sans-serif" }}>
                    {user.phoneNumber}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Noto Sans, sans-serif" }}>
                    {user.preferredTime}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Noto Sans, sans-serif" }}>
                    {user.role == null ? "Null" : user.role}
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={user.active || false}
                      onChange={() => handleToggleActive(user.id)}
                      sx={{
                        "& .MuiSwitch-switchBase": {
                          color: "#7A5CFA",
                          "&.Mui-checked": {
                            color: "#7A5CFA",
                          },
                        },
                        "& .MuiSwitch-track": {
                          backgroundColor: "#E0E0E0",
                        },
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginTop: 2,
        }}
      >
        <Button
          onClick={() => handleChangePage(page - 1)}
          disabled={page === 0}
          sx={{
            width: 43,
            height: 30,
            color: '#798899',
            backgroundColor: '#F7F7F7',
            fontFamily: 'Noto Sans, sans-serif',
            '&:hover': {
              backgroundColor: '#E0E0E0',
            },
          }}
        >
          Previous
        </Button>
        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 1 }}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <Button
              key={index}
              onClick={() => handleChangePage(index)}
              sx={{
                width: 30,
                height: 30,
                color: page === index ? '#FFFFFF' : '#798899',
                backgroundColor: page === index ? '#7A5CFA' : '#F7F7F7',
                fontFamily: 'Noto Sans, sans-serif',
                margin: '0 2px',
                '&:hover': {
                  backgroundColor: page === index ? '#7A5CFA' : '#E0E0E0',
                  color: '#FFFFFF',
                },
              }}
            >
              {index + 1}
            </Button>
          ))}
        </Box>
        <Button
          onClick={() => handleChangePage(page + 1)}
          disabled={page >= totalPages - 1}
          sx={{
            width: 30,
            height: 30,
            color: '#798899',
            backgroundColor: '#F7F7F7',
            fontFamily: 'Noto Sans, sans-serif',
            '&:hover': {
              backgroundColor: '#E0E0E0',
            },
          }}
        >
          Next
        </Button>
      </Box>
    </div>
  );
};

export default UserTable;
