import React, { useState, useEffect } from "react";
import { Button, Container, Grid, Card, TextField, Typography, Box } from "@mui/material";
import { Stepper, Step, StepLabel } from "@mui/material";

const DoctorJoinForm = () => {
  const [formData, setFormData] = useState({
    doctorName: "",
    gender: "",
    nationality: "",
    specialization: "",
    licenseNumber: "",
    licenseIssueDate: "",
    hospitalName: "",
    yearsOfExperience: "",
    phone: "",
    email: "",
    currentPosition: "",
    previousPositions: "",
    errorMessage: "",
  });

  const [step, setStep] = useState(0);

  // useEffect to load doctor's data from localStorage when the component mounts
  useEffect(() => {
    const storedEmail = localStorage.getItem("doctorEmail");
    const storedPhone = localStorage.getItem("doctorPhone");
    const storedName = localStorage.getItem("doctorName");

    if (storedEmail) {
      setFormData((prevData) => ({
        ...prevData,
        email: storedEmail,
        phone: storedPhone,
        doctorName: storedName, // Auto-fill doctor's name
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate if all fields are filled
    if (
      !formData.doctorName ||
      !formData.specialization ||
      !formData.licenseNumber ||
      !formData.licenseIssueDate ||
      !formData.hospitalName ||
      !formData.yearsOfExperience ||
      !formData.phone ||
      !formData.email
    ) {
      setFormData((prevData) => ({
        ...prevData,
        errorMessage: "All fields are required!",
      }));
      return;
    }

    // Store the updated doctor data in localStorage for future access
    localStorage.setItem("doctorEmail", formData.email);
    localStorage.setItem("doctorData", JSON.stringify(formData));

    // Send data to the backend API
    try {
      const response = await fetch("http://localhost:8000/api/doctor-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send form data as JSON
      });

      if (!response.ok) {
        throw new Error("Failed to submit the form");
      }

      const result = await response.json();
      console.log(result.message); // Success message from the backend

      // Optionally, reset the form after successful submission
      setFormData({
        doctorName: "",
        gender: "",
        nationality: "",
        specialization: "",
        licenseNumber: "",
        licenseIssueDate: "",
        hospitalName: "",
        yearsOfExperience: "",
        phone: "",
        email: "",
        currentPosition: "",
        previousPositions: "",
        errorMessage: "",
      });

      // Reset the step to Step 1 after form submission
      setStep(0);

      // Optionally, display a success message
      alert("Doctor information submitted successfully!");
    } catch (error) {
      console.error("Error:", error);
      setFormData((prevData) => ({
        ...prevData,
        errorMessage: "There was an error submitting the form.",
      }));
    }
  };

  const nextStep = () => {
    if (step < 2) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <Container className='my-5' maxWidth='md'>
      <Typography variant='h4' component='h2' align='center' color='primary' gutterBottom>
        Doctor Registration Form
      </Typography>
      {formData.errorMessage && (
        <Box color='red' fontSize='16px' mb={2}>
          {formData.errorMessage}
        </Box>
      )}

      <Card className='p-4 shadow-lg rounded-lg' sx={{ backgroundColor: "#f7f7f7", borderRadius: "10px" }}>
        <Stepper activeStep={step} alternativeLabel>
          <Step>
            <StepLabel>Step 1: Personal Information</StepLabel>
          </Step>
          <Step>
            <StepLabel>Step 2: Professional Information</StepLabel>
          </Step>
          <Step>
            <StepLabel>Step 3: Additional Information</StepLabel>
          </Step>
        </Stepper>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Personal Information */}
          {step === 0 && (
            <Box display='grid' gridTemplateColumns='repeat(1, 1fr)' gap={4}>
              <TextField
                label="Doctor's Full Name"
                variant='outlined'
                fullWidth
                name='doctorName'
                value={formData.doctorName}
                onChange={handleChange}
                required
                sx={{ borderRadius: "8px" }}
              />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label='Gender'
                    variant='outlined'
                    select
                    fullWidth
                    name='gender'
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    SelectProps={{
                      native: true,
                    }}
                    sx={{ borderRadius: "8px" }}>
                    <option value=''></option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                    <option value='other'>Other</option>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label='Nationality'
                    variant='outlined'
                    fullWidth
                    name='nationality'
                    value={formData.nationality}
                    onChange={handleChange}
                    required
                    sx={{ borderRadius: "8px" }}
                  />
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Step 2: Professional Information */}
          {step === 1 && (
            <Grid container spacing={4} mt={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Specialization'
                  variant='outlined'
                  fullWidth
                  name='specialization'
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                  sx={{ borderRadius: "8px" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='License Number'
                  variant='outlined'
                  fullWidth
                  name='licenseNumber'
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  required
                  sx={{ borderRadius: "8px" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='License Issue Date'
                  type='date'
                  variant='outlined'
                  fullWidth
                  name='licenseIssueDate'
                  value={formData.licenseIssueDate}
                  onChange={handleChange}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ borderRadius: "8px" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Hospital Name'
                  variant='outlined'
                  fullWidth
                  name='hospitalName'
                  value={formData.hospitalName}
                  onChange={handleChange}
                  required
                  sx={{ borderRadius: "8px" }}
                />
              </Grid>
            </Grid>
          )}

          {/* Step 3: Additional Information */}
          {step === 2 && (
            <Grid container spacing={4} mt={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Years of Experience'
                  variant='outlined'
                  fullWidth
                  name='yearsOfExperience'
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                  required
                  sx={{ borderRadius: "8px" }}
                />
              </Grid>

              {/* Current Position */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Current Position'
                  variant='outlined'
                  fullWidth
                  name='currentPosition'
                  value={formData.currentPosition}
                  onChange={handleChange}
                  required
                  sx={{ borderRadius: "8px" }}
                />
              </Grid>

              {/* Previous Positions */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Previous Positions'
                  variant='outlined'
                  fullWidth
                  name='previousPositions'
                  value={formData.previousPositions}
                  onChange={handleChange}
                  required
                  sx={{ borderRadius: "8px" }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label='Phone Number'
                  variant='outlined'
                  fullWidth
                  name='phone'
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  sx={{ borderRadius: "8px" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Email Address'
                  variant='outlined'
                  fullWidth
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                  sx={{ borderRadius: "8px" }}
                />
              </Grid>
            </Grid>
          )}

          {/* Navigation Buttons */}
          <Box display='flex' justifyContent='space-between' mt={2}>
            {step > 0 && (
              <Button variant='outlined' color='primary' onClick={prevStep}>
                Back
              </Button>
            )}
            <Button
              type={step === 2 ? "submit" : "button"}
              variant='contained'
              color='primary'
              onClick={step === 2 ? handleSubmit : nextStep}
              sx={{
                padding: "8px 16px",
                borderRadius: "20px",
              }}>
              {step === 2 ? "Submit" : "Continue"}
            </Button>
          </Box>
        </form>
      </Card>
    </Container>
  );
};

export default DoctorJoinForm;
