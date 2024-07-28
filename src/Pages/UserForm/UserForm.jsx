import React, { useState, useRef } from "react";
import {
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Switch,
  Button,
  Grid,
  Box,
  Input,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import {
  db,
  storage,
  collection,
  addDoc,
  ref,
  uploadBytes,
} from "../../firebase/firebaseConfig";
import InputAdornment from '@mui/material/InputAdornment';
import ErrorIcon from '@mui/icons-material/Error';
import { getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const navigate = useNavigate();
  const [roleEnabled, setRoleEnabled] = useState(false);
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const fileInputRef = useRef(null);

  const handleRoleToggle = (event) => {
    setRoleEnabled(event.target.checked);
    if (!event.target.checked) {
      setRole("");
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.username = username ? "" : "Username is required.";
    tempErrors.email = email ? "" : "Email is required.";
    tempErrors.phoneNumber = phoneNumber ? "" : "Phone number is required.";
    tempErrors.preferredTime = preferredTime
      ? ""
      : "Preferred time is required.";
    tempErrors.image = image ? "" : "Profile picture is required.";

    if (roleEnabled) {
      tempErrors.role = role ? "" : "Role is required when enabled.";
    }

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Show loading indicator
  
    if (validate()) {
      try {
        let imageUrl = "";
        if (image) {
          const imageRef = ref(storage, `images/${image.name}`);
          await uploadBytes(imageRef, image);
          imageUrl = await getDownloadURL(imageRef); // Ensure this is the correct method
        }
  
        // Add data to Firestore
        const data = await addDoc(collection(db, "users"), {
          username,
          email,
          phoneNumber,
          preferredTime,
          role: roleEnabled ? role : null,
          imageUrl,
        });

        setUsername("");
        setEmail("");
        setPhoneNumber("");
        setPreferredTime("");
        setRole("");
        setRoleEnabled(false);
        setImage(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        navigate("/usertable");
      } catch (error) {
        console.error("Error submitting form data: ", error);
        setUsername("");
        setEmail("");
        setPhoneNumber("");
        setPreferredTime("");
        setRole("");
        setRoleEnabled(false);
        setImage(null);
      } finally {
        setUsername("");
        setEmail("");
        setPhoneNumber("");
        setPreferredTime("");
        setRole("");
        setRoleEnabled(false);
        setImage(null);
        setLoading(false);
      }
    } else {
      setUsername("");
      setEmail("");
      setPhoneNumber("");
      setPreferredTime("");
      setRole("");
      setRoleEnabled(false);
      setImage(null);
      setLoading(false);
    }
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 400,
            fontFamily: "Noto Sans, sans-serif",
            fontSize: 23,
            marginBottom: 2,
          }}
        >
          User Form
        </Typography>

        {/* Image Upload */}
        <Typography
          variant="body1"
          sx={{
            marginBottom: 1,
            height: 18,
            width: 523,
            fontWeight: 600,
            fontSize: "12px",
            color: "#666666",
            fontFamily: "Noto Sans, sans-serif",
          }}
        >
          Upload profile picture
        </Typography>
        <Box
          sx={{
            border: "2px dashed #E4E4E4",
            padding: 1,
            width: 159,
            height: 73,
            marginBottom: 2,
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            cursor: "pointer",
            transition: "border-color 0.3s ease",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              borderColor: "#E4E4E4",
              fontFamily: "Noto Sans, sans-serif",
              borderRadius: "3px",
              fontSize: "11px",
              color: "#333333",
              fontWeight: 500,
              backgroundColor: "#E4E4E4",
              "&:hover": {
                borderColor: "#7A5CFA",
                backgroundColor: "#D0D0D0",
              },
            }}
            onClick={handleButtonClick}
          >
            + Browse
          </Button>
          <Input
            type="file"
            accept=".jpeg, .jpg, .png"
            onChange={handleImageChange}
            sx={{ display: "none" }}
            inputRef={fileInputRef}
          />
          {/* Preview Image */}
          {image && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <img
                src={URL.createObjectURL(image)} // Create URL for preview
                alt="Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>
          )}
        </Box>
        {!!errors.image && (
          <FormHelperText error>{errors.image}</FormHelperText>
        )}
        <Typography
          variant="body2"
          sx={{
            marginBottom: 2,
            height: 18,
            width: 523,
            fontWeight: 400,
            fontSize: "12px",
            color: "#666666",
            fontFamily: "Noto Sans, sans-serif",
          }}
        >
          JPG, JPEG or PNG
        </Typography>

        {/* Username and Email Fields */}
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={12} sm={6}>
            <FormControl
              fullWidth
              variant="outlined"
              size="small"
              error={!!errors.username}
            >
              <Typography
                variant="body1"
                sx={{
                  marginBottom: 1,
                  fontWeight: 600,
                  fontSize: "12px",
                  color: "#666666",
                  fontFamily: "Noto Sans, sans-serif",
                }}
              >
                User name
              </Typography>
              <TextField
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  endAdornment: errors.username ? (
                    <InputAdornment position="end">
                      <ErrorIcon sx={{ color: "red" }} />
                    </InputAdornment>
                  ) : null,
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#E4E4E4",
                      borderWidth: "1px",
                      borderRadius: "8px",
                    },
                    "&:hover fieldset": {
                      borderColor: "#7A5CFA",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#7A5CFA",
                    },
                  },
                  "& .MuiInputBase-input": {
                    padding: "16px",
                  },
                }}
              />
              {!!errors.username && (
                <FormHelperText error>{errors.username}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl
              fullWidth
              variant="outlined"
              size="small"
              error={!!errors.email}
            >
              <Typography
                variant="body1"
                sx={{
                  marginBottom: 1,
                  fontWeight: 600,
                  fontSize: "12px",
                  color: "#666666",
                  fontFamily: "Noto Sans, sans-serif",
                }}
              >
                Email
              </Typography>
              <TextField
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  endAdornment: errors.email ? (
                    <InputAdornment position="end">
                      <ErrorIcon sx={{ color: "red" }} />
                    </InputAdornment>
                  ) : null,
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#E4E4E4",
                      borderWidth: "1px",
                      borderRadius: "8px",
                    },
                    "&:hover fieldset": {
                      borderColor: "#7A5CFA",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#7A5CFA",
                    },
                  },
                  "& .MuiInputBase-input": {
                    padding: "16px",
                  },
                }}
              />
              {!!errors.email && (
                <FormHelperText error>{errors.email}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>

        {/* Phone Number and Interview Preferred Time Dropdown */}
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={12} sm={6}>
            <FormControl
              fullWidth
              variant="outlined"
              size="small"
              error={!!errors.phoneNumber}
            >
              <Typography
                variant="body1"
                sx={{
                  marginBottom: 1,
                  fontWeight: 600,
                  fontSize: "12px",
                  color: "#666666",
                  fontFamily: "Noto Sans, sans-serif",
                }}
              >
                Phone Number
              </Typography>
              <TextField
                type="number"
                placeholder="Enter phone number"
                size="small"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                InputProps={{
                  endAdornment: errors.phoneNumber ? (
                    <InputAdornment position="end">
                      <ErrorIcon sx={{ color: "red" }} />
                    </InputAdornment>
                  ) : null,
                }}
                inputProps={{
                  min: 1000000000,
                  max: 9999999999,
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#E4E4E4",
                      borderWidth: "1px",
                      borderRadius: "8px",
                    },
                    "&:hover fieldset": {
                      borderColor: "#7A5CFA",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#7A5CFA",
                    },
                  },
                  "& .MuiInputBase-input": {
                    padding: "16px",
                  },
                }}
              />

              {!!errors.phoneNumber && (
                <FormHelperText error>{errors.phoneNumber}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl
              fullWidth
              variant="outlined"
              size="small"
              error={!!errors.preferredTime}
            >
              <Typography
                variant="body1"
                sx={{
                  marginBottom: 1,
                  fontWeight: 600,
                  fontSize: "12px",
                  color: "#666666",
                  fontFamily: "Noto Sans, sans-serif",
                }}
              >
                Interview Preferred Time
              </Typography>
              <Select
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                InputProps={{
                  endAdornment: errors.preferredTime ? (
                    <InputAdornment position="end">
                      <ErrorIcon sx={{ color: "red" }} />
                    </InputAdornment>
                  ) : null,
                }}
                displayEmpty
                MenuProps={{
                  PaperProps: {
                    style: {
                      borderColor: "#CCCCCC",
                      borderWidth: "1px",
                    },
                  },
                  sx: {
                    "& .MuiMenuItem-root": {
                      width: "100%",
                      height: "56px",
                      padding: "16px",
                      borderBottom: "1px solid #CCCCCC",
                      color: "#666666",
                    },
                    "& .MuiMenuItem-root.Mui-selected": {
                      backgroundColor: "#7A5CFA !important",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#7A5CFA",
                      },
                    },
                  },
                }}
                sx={{
                  width: "100%",
                  height: "56px",
                  padding: "16px",
                  border: "1px solid #E4E4E4",
                  borderRadius: "8px",
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#7A5CFA",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#7A5CFA",
                  },
                  "& .MuiSelect-select": {
                    padding: "16px",
                    fontFamily: "Noto Sans, sans-serif",
                  },
                  "& .MuiSelect-icon": {
                    top: "calc(50% - 12px)",
                  },
                }}
              >
                {["None", "Morning", "Afternoon", "Evening"].map(
                  (time, index) => (
                    <MenuItem key={index} value={time === "None" ? "" : time}>
                      {time}
                    </MenuItem>
                  )
                )}
              </Select>
              {!!errors.preferredTime && (
                <FormHelperText error>{errors.preferredTime}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>

        {/* Role Selection */}
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={12}>
            <FormControl>
              <FormControlLabel
                control={
                  <Switch
                    checked={roleEnabled}
                    onChange={handleRoleToggle}
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#7A5CFA",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: "#7A5CFA",
                        },
                      color: "#666666",
                    }}
                  />
                }
                label="Select Your Role (Optional)"
                componentsProps={{
                  typography: {
                    sx: {
                      fontFamily: "Noto Sans, sans-serif",
                      fontWeight: 400,
                      fontSize: "16px",
                      color: "#666666",
                    },
                  },
                }}
              />
            </FormControl>
          </Grid>
        </Grid>

        {/* Role Options */}
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={12}>
            <FormControl>
              <RadioGroup
                row
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <FormControlLabel
                  value="Student"
                  control={
                    <Radio
                      disabled={!roleEnabled}
                      sx={{
                        "&.Mui-checked": {
                          color: "#7A5CFA",
                        },
                      }}
                    />
                  }
                  label="Student"
                  componentsProps={{
                    typography: {
                      sx: {
                        fontFamily: "Noto Sans, sans-serif",
                        fontWeight: 400,
                        fontSize: "16px",
                        color: "#666666",
                      },
                    },
                  }}
                />
                <FormControlLabel
                  value="Teacher"
                  control={
                    <Radio
                      disabled={!roleEnabled}
                      sx={{
                        "&.Mui-checked": {
                          color: "#7A5CFA",
                        },
                      }}
                    />
                  }
                  label="Teacher"
                  componentsProps={{
                    typography: {
                      sx: {
                        fontFamily: "Noto Sans, sans-serif",
                        fontWeight: 400,
                        fontSize: "16px",
                        color: "#666666",
                      },
                    },
                  }}
                />
                <FormControlLabel
                  value="Other"
                  control={
                    <Radio
                      disabled={!roleEnabled}
                      sx={{
                        "&.Mui-checked": {
                          color: "#7A5CFA",
                        },
                      }}
                    />
                  }
                  label="Other"
                  componentsProps={{
                    typography: {
                      sx: {
                        fontFamily: "Noto Sans, sans-serif",
                        fontWeight: 400,
                        fontSize: "16px",
                        color: "#666666",
                      },
                    },
                  }}
                />
              </RadioGroup>
              {!!errors.role && (
                <FormHelperText error>{errors.role}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>

        {/* Submit Button */}
        <Grid container spacing={2} marginTop={2}>
          <Grid item xs={12} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              disabled={loading}
              sx={{
                backgroundColor: "#7A5CFA",
                "&:hover": {
                  backgroundColor: "#5F3EAB",
                },
                transition: "background-color 0.3s ease",
              }}
              type="submit"
            >
             {loading ? <CircularProgress size={24} /> : "ADD USER"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default UserForm;
