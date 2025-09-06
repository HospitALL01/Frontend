import React, { useState, useEffect, useRef } from "react";
import { Button, Container, Grid, Card, TextField, Typography, Box } from "@mui/material";
import { Stepper, Step, StepLabel } from "@mui/material";

/** ---------- LocalStorage Helpers ---------- */
const loadFormMap = () => {
  try {
    return JSON.parse(localStorage.getItem("doctorFormByEmail") || "{}");
  } catch {
    return {};
  }
};

const saveFormMap = (obj) => localStorage.setItem("doctorFormByEmail", JSON.stringify(obj));

const API_BASE = import.meta?.env?.VITE_API_BASE_URL || "http://127.0.0.1:8000";

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
  const [editingMode, setEditingMode] = useState(false);
  const [existingEmail, setExistingEmail] = useState(null);
  const [lockIdentity, setLockIdentity] = useState(false); // Identity lock state
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Track if the form has been submitted

  const mountedRef = useRef(false);

  /** --------- Mount: Prefill from localStorage (email→form) ---------- */
  useEffect(() => {
    const storedEmail = (localStorage.getItem("doctorEmail") || "").toLowerCase();
    const storedPhone = localStorage.getItem("doctorPhone") || "";
    const storedName = localStorage.getItem("doctorName") || "";

    const formMap = loadFormMap();
    const savedForm = storedEmail ? formMap[storedEmail] : null;

    if (savedForm) {
      setFormData({ ...savedForm, errorMessage: "" });
      setExistingEmail(storedEmail);
      setLockIdentity(true);
    } else {
      if (storedEmail || storedPhone || storedName) {
        setFormData((prev) => ({
          ...prev,
          email: storedEmail || prev.email,
          phone: storedPhone || prev.phone,
          doctorName: storedName || prev.doctorName,
        }));
      }
    }

    mountedRef.current = true;
  }, []);

  /** --------- Auto-Save per change (if email present) ---------- */
  useEffect(() => {
    if (!mountedRef.current) return;
    const emailKey = (formData.email || "").toLowerCase().trim();
    if (!emailKey) return;
    const map = loadFormMap();
    map[emailKey] = { ...formData, errorMessage: "" };
    saveFormMap(map);
  }, [formData]);

  /** --------- Change Handler (identity always locked) ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === "doctorName" || name === "email" || name === "phone") && lockIdentity) {
      return; // Prevent change if identity is locked
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /** --------- Required validation ---------- */
  const invalidRequired = () =>
    !formData.doctorName ||
    !formData.specialization ||
    !formData.licenseNumber ||
    !formData.licenseIssueDate ||
    !formData.hospitalName ||
    !formData.yearsOfExperience ||
    !formData.phone ||
    !formData.email;

  /** --------- First-time Submit (CREATE or UPDATE) ---------- */
  const handleSubmit = async () => {
    if (invalidRequired()) {
      setFormData((prev) => ({ ...prev, errorMessage: "All fields are required!" }));
      return;
    }

    try {
      const url = existingEmail
        ? `${API_BASE}/api/doctor-info/${existingEmail}` // Update existing record by email
        : `${API_BASE}/api/doctor-info`; // Create new record

      const method = existingEmail ? "PUT" : "POST"; // Use PUT if updating, POST if creating

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // Send all form data
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.message || "Failed to submit the form");

      const createdEmail = formData.email.toLowerCase().trim();
      setExistingEmail(createdEmail);
      setLockIdentity(true); // Lock identity after submission
      setEditingMode(false);
      setFormData((prev) => ({ ...prev, errorMessage: "" }));
      setIsFormSubmitted(true); // Mark the form as submitted

      alert("Doctor information submitted successfully!");
    } catch (err) {
      setFormData((prev) => ({ ...prev, errorMessage: err?.message || "There was an error submitting the form." }));
    }
  };

  /** --------- Update flow (identity fields excluded) ---------- */
  const onUpdateClick = () => {
    if (!editingMode) {
      setEditingMode(true); // Enable edit mode
      return;
    }
    handleSubmit(); // Save update when clicked again (handles both POST and PUT)
  };

  /** --------- Stepper navigation ---------- */
  const nextStep = () => {
    if (step < 2) setStep(step + 1);
  };
  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  /** --------- UI ---------- */
  const hasCreated = !!existingEmail; // Check if doctor profile exists by email
  const primaryCtaLabel = hasCreated
    ? isFormSubmitted
      ? "Update" // After submission, show Update button
      : editingMode
      ? "Save Update" // If editing mode, show Save Update button
      : "Update" // If profile exists, show Update button
    : step === 2
    ? "Submit" // On Step 3, show Submit button
    : "Next"; // On Step 1 and Step 2, show Next button

  const primaryOnClick = hasCreated
    ? isFormSubmitted
      ? onUpdateClick // After submission, update on click
      : step === 2
      ? handleSubmit // On final step, submit the form
      : nextStep // On Step 1 and Step 2, go to next step
    : step === 2
    ? handleSubmit // On Step 3, submit the form
    : nextStep; // On Step 1 and Step 2, go to next step

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

        <form onSubmit={(e) => e.preventDefault()}>
          {/* Step 1 */}
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
                disabled={true} // Always disabled
                InputProps={{ readOnly: true }} // Always read-only
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
                    SelectProps={{ native: true }}
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

          {/* Step 2 */}
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
                  InputLabelProps={{ shrink: true }}
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

          {/* Step 3 */}
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

              {/* Phone (identity – always locked after creation) */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Phone Number'
                  variant='outlined'
                  fullWidth
                  name='phone'
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  disabled={true} // Always disabled
                  InputProps={{ readOnly: true }} // Always read-only
                  sx={{ borderRadius: "8px" }}
                />
              </Grid>
              {/* Email (identity – always locked after creation) */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Email Address'
                  variant='outlined'
                  fullWidth
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={true} // Always disabled
                  InputProps={{ readOnly: true }} // Always read-only
                  sx={{ borderRadius: "8px" }}
                />
              </Grid>
            </Grid>
          )}

          {/* Navigation & Primary CTA */}
          <Box display='flex' justifyContent='space-between' mt={2}>
            {step > 0 && (
              <Button variant='outlined' color='primary' onClick={prevStep}>
                Back
              </Button>
            )}

            <Button
              variant='contained'
              color='primary'
              onClick={primaryOnClick}
              sx={{ padding: "8px 16px", borderRadius: "20px" }}>
              {primaryCtaLabel}
            </Button>
          </Box>
        </form>
      </Card>
    </Container>
  );
};

export default DoctorJoinForm;
