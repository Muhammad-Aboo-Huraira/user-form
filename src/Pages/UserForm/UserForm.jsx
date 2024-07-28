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
} from "@mui/material";

const UserForm = () => {
  const [roleEnabled, setRoleEnabled] = useState(false);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleRoleToggle = (event) => {
    setRoleEnabled(event.target.checked);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Create a URL for the image file
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger file input click
    }
  };

  return (
    <div>
      <form>
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
            fontSize: '12px',
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
            "&:hover": {
              borderColor: "#7A5CFA",
            },
          }}
          onClick={handleButtonClick}
        >
          <Button
            variant="outlined"
            sx={{
              borderColor: "#E4E4E4",
              fontFamily: "Noto Sans, sans-serif",
              borderRadius: "3px",
              fontSize: '11px',
              color: "#333333",
              fontWeight: 500,
              backgroundColor: "#E4E4E4",
              "&:hover": {
                borderColor: "#7A5CFA",
                backgroundColor: "#D0D0D0", // Slightly darker on hover
              },
            }}
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
                src={image}
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
        <Typography
          variant="body2"
          sx={{
            marginBottom: 2,
            height: 18,
            width: 523,
            fontWeight: 400,
            fontSize: '12px',
            color: "#666666",
            fontFamily: "Noto Sans, sans-serif",
          }}
        >
          JPG, JPEG or PNG
        </Typography>

        {/* Username and Email Fields */}
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={12} sm={6}>
          <Typography
                variant="body1"
                sx={{
                  marginBottom: 1,
                  fontWeight: 600,
                  fontSize: '12px',
                  color: "#666666",
                  fontFamily: "Noto Sans, sans-serif",
                }}
              >
              User name
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter username"
              variant="outlined"
              size="small"
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
          </Grid>
          <Grid item xs={12} sm={6}>
          <Typography
                variant="body1"
                sx={{
                  marginBottom: 1,
                  fontWeight: 600,
                  fontSize: '12px',
                  color: "#666666",
                  fontFamily: "Noto Sans, sans-serif",
                }}
              >
              Email
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter email"
              variant="outlined"
              size="small"
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
          </Grid>
        </Grid>

        {/* Phone Number and Interview Preferred Time Dropdown */}
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={12} sm={6}>
          <Typography
                variant="body1"
                sx={{
                  marginBottom: 1,
                  fontWeight: 600,
                  fontSize: '12px',
                  color: "#666666",
                  fontFamily: "Noto Sans, sans-serif",
                }}
              >
              Phone Number
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter Your Phone Number"
              variant="outlined"
              size="small"
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
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" size="small">
            <Typography
                variant="body1"
                sx={{
                  marginBottom: 1,
                  fontWeight: 600,
                  fontSize: '12px',
                  color: "#666666",
                  fontFamily: "Noto Sans, sans-serif",
                }}
              >
                Interview preferred Time
              </Typography>
              <Select
                defaultValue=""
                displayEmpty
                sx={{
                  "& .MuiSelect-select": {
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
              >
                <MenuItem value="Morning">Morning</MenuItem>
                <MenuItem value="Afternoon">Afternoon</MenuItem>
                <MenuItem value="Evening">Evening</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Role Toggle Button */}
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={12}>
            <FormControl>
              <FormControlLabel
                control={
                  <Switch checked={roleEnabled} onChange={handleRoleToggle} />
                }
                label="Select Your Role"
              />
            </FormControl>
          </Grid>
        </Grid>

        {/* Radio Buttons */}
        {roleEnabled && (
          <Grid container spacing={2} marginBottom={2}>
            <Grid item xs={12}>
              <FormControl>
                <RadioGroup row>
                  <FormControlLabel
                    value="Student"
                    control={<Radio />}
                    label="Student"
                  />
                  <FormControlLabel
                    value="Teacher"
                    control={<Radio />}
                    label="Teacher"
                  />
                  <FormControlLabel
                    value="Other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        )}

        {/* Submit Button */}
        <Grid container spacing={2} marginTop={2}>
          <Grid item xs={12}>
            <Button variant="contained" sx={{ backgroundColor: '#7A5CFA' }} type="submit">
              ADD USER
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default UserForm;
