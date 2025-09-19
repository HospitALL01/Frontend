import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Container,
  Grid,
  Card,
  TextField,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import { Stepper, Step, StepLabel } from "@mui/material";

/** ---------- LocalStorage Helpers ---------- */
const loadFormMap = () => {
  try {
    return JSON.parse(localStorage.getItem("doctorFormByEmail") || "{}");
  } catch {
    return {};
  }
};

const saveFormMap = (obj) =>
  localStorage.setItem("doctorFormByEmail", JSON.stringify(obj));

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

  const [profilePicture, setProfilePicture] = useState(null);
  const [picturePreview, setPicturePreview] = useState("");

  const [step, setStep] = useState(0);
  const [editingMode, setEditingMode] = useState(false);
  const [existingEmail, setExistingEmail] = useState(null);
  const [lockIdentity, setLockIdentity] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const mountedRef = useRef(false);

  /** --------- Mount: Prefill from server + localStorage ---------- */
  useEffect(() => {
    const storedEmail = (
      localStorage.getItem("doctorEmail") || ""
    ).toLowerCase();

    const fetchDoctorProfile = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/doctor-info/${storedEmail}`);
        if (!res.ok) return;

        const json = await res.json();
        const serverData = json.data;

        setFormData({ ...serverData, errorMessage: "" });
        if (serverData.profile_picture_url) {
          setPicturePreview(serverData.profile_picture_url);
        }
        setExistingEmail(storedEmail);
        setLockIdentity(true);
      } catch (error) {
        console.error("Failed to fetch initial doctor profile:", error);
      }
    };

    if (storedEmail) {
      fetchDoctorProfile();
    }

    const storedPhone = localStorage.getItem("doctorPhone") || "";
    const storedName = localStorage.getItem("doctorName") || "";

    const formMap = loadFormMap();
    const savedForm = storedEmail ? formMap[storedEmail] : null;

    if (savedForm) {
      setFormData({ ...savedForm, errorMessage: "" });
      if (savedForm.profile_picture_url) {
        setPicturePreview(savedForm.profile_picture_url);
      }
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

  /** --------- Auto-Save per change ---------- */
  useEffect(() => {
    if (!mountedRef.current) return;
    const emailKey = (formData.email || "").toLowerCase().trim();
    if (!emailKey) return;
    const map = loadFormMap();
    map[emailKey] = {
      ...formData,
      errorMessage: "",
      profile_picture_url: picturePreview,
    };
    saveFormMap(map);
  }, [formData, picturePreview]);

  /** --------- Handlers ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      (name === "doctorName" || name === "email" || name === "phone") &&
      lockIdentity
    ) {
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProfilePicture(file);
      setPicturePreview(URL.createObjectURL(file));
    } else {
      setProfilePicture(null);
    }
  };

  const invalidRequired = () =>
    !formData.doctorName ||
    !formData.specialization ||
    !formData.licenseNumber ||
    !formData.licenseIssueDate ||
    !formData.hospitalName ||
    !formData.yearsOfExperience ||
    !formData.phone ||
    !formData.email;


  const mirrorToDoctorData = (payload) => {
    try {
      localStorage.setItem("doctorData", JSON.stringify(payload));

      const adminCacheKey = "adminDoctorListCache";
      const cacheRaw = localStorage.getItem(adminCacheKey);
      const list = cacheRaw ? JSON.parse(cacheRaw) : [];
      const idx = list.findIndex((d) => (d.email || "").toLowerCase() === (payload.email || "").toLowerCase());
      if (idx >= 0) list[idx] = payload;
      else list.unshift(payload);
      localStorage.setItem(adminCacheKey, JSON.stringify(list));
    } catch {
      // ignore
    }
  };

  /** --------- First-time Submit (CREATE or UPDATE) ---------- */


  const handleSubmit = async () => {
    if (invalidRequired()) {
      setFormData((prev) => ({
        ...prev,
        errorMessage: "All required fields must be filled!",
      }));
      return;
    }

    const submissionData = new FormData();
    for (const key in formData) {
      submissionData.append(key, formData[key]);
    }
    if (profilePicture) {
      submissionData.append("profile_picture", profilePicture);
    }

    try {
      const url = existingEmail
        ? `${API_BASE}/api/doctor-info/${existingEmail}`
        : `${API_BASE}/api/doctor-info`;
      const method = existingEmail ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        // ✅ Add Authorization header for protected routes
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
        body: submissionData,
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok)
        throw new Error(json?.message || "Failed to submit the form");
      const updatedProfile = json.data;
       if (updatedProfile.profile_picture_url) {
         setPicturePreview(updatedProfile.profile_picture_url);
       }

      const createdEmail = (formData.email || "").toLowerCase().trim();
      setExistingEmail(createdEmail);
      setLockIdentity(true);
      setEditingMode(false);
      setFormData((prev) => ({ ...prev, errorMessage: "" }));
      setIsFormSubmitted(true);


      mirrorToDoctorData({
        doctorName: formData.doctorName,
        gender: formData.gender,
        nationality: formData.nationality,
        specialization: formData.specialization,
        licenseNumber: formData.licenseNumber,
        licenseIssueDate: formData.licenseIssueDate,
        hospitalName: formData.hospitalName,
        yearsOfExperience: formData.yearsOfExperience,
        phone: formData.phone,
        email: createdEmail,
        currentPosition: formData.currentPosition,
        previousPositions: formData.previousPositions,
      });

      alert(existingEmail ? "Doctor information updated successfully!" : "Doctor information submitted successfully!");

      alert(
        existingEmail
          ? "Information updated successfully!"
          : "Information submitted successfully!"
      );

    } catch (err) {
      setFormData((prev) => ({
        ...prev,
        errorMessage: err?.message || "An error occurred.",
      }));
    }
  };

  const onUpdateClick = () => {
    if (!editingMode) {
      setEditingMode(true);
      return;
    }
    handleSubmit();
  };

  const nextStep = () => {
    if (step < 2) setStep(step + 1);
  };
  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  /** --------- UI Logic ---------- */
  const hasCreated = !!existingEmail;
  const primaryCtaLabel = hasCreated
    ? editingMode
      ? "Save Update"
      : "Update"
    : step === 2
    ? "Submit"
    : "Next";
  const primaryOnClick = hasCreated
    ? onUpdateClick
    : step === 2
    ? handleSubmit
    : nextStep;

  return (
    <Container className="my-5" maxWidth="md">
      <Typography
        variant="h4"
        component="h2"
        align="center"
        color="primary"
        gutterBottom
      >
        Doctor Registration Form
      </Typography>

      {formData.errorMessage && (
        <Typography color="error" align="center" gutterBottom>
          {formData.errorMessage}
        </Typography>
      )}

      <Card
        className="p-4 shadow-lg"
        sx={{ backgroundColor: "#f7f7f7", borderRadius: "15px" }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
          <Avatar
            src={picturePreview}
            sx={{
              width: 120,
              height: 120,
              mb: 2,
              border: "2px solid #ddd",
              backgroundColor: "#e0e0e0",
            }}
          />
          <Button variant="outlined" component="label">
            Upload Profile Picture
            <input
              type="file"
              hidden
              accept="image/png, image/jpeg, image/gif"
              onChange={handlePictureChange}
            />
          </Button>
        </Box>

        <Stepper activeStep={step} alternativeLabel sx={{ mb: 4 }}>
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
          {step === 0 && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Doctor's Full Name"
                  variant="outlined"
                  fullWidth
                  name="doctorName"
                  value={formData.doctorName}
                  onChange={handleChange}
                  required
                  disabled={lockIdentity}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Gender"
                  variant="outlined"
                  select
                  fullWidth
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  SelectProps={{ native: true }}
                >
                  <option value=""></option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nationality"
                  variant="outlined"
                  fullWidth
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>
          )}

          {step === 1 && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Specialization"
                  variant="outlined"
                  fullWidth
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="License Number"
                  variant="outlined"
                  fullWidth
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="License Issue Date"
                  type="date"
                  variant="outlined"
                  fullWidth
                  name="licenseIssueDate"
                  value={formData.licenseIssueDate}
                  onChange={handleChange}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Hospital Name"
                  variant="outlined"
                  fullWidth
                  name="hospitalName"
                  value={formData.hospitalName}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>
          )}

          {step === 2 && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Years of Experience"
                  variant="outlined"
                  fullWidth
                  type="number"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Current Position"
                  variant="outlined"
                  fullWidth
                  name="currentPosition"
                  value={formData.currentPosition}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Previous Positions (comma separated)"
                  variant="outlined"
                  fullWidth
                  name="previousPositions"
                  value={formData.previousPositions}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  disabled={lockIdentity}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={lockIdentity}
                />
              </Grid>
            </Grid>
          )}

          <Box
            display="flex"
            justifyContent={step > 0 ? "space-between" : "flex-end"}
            mt={4}
          >
            {step > 0 && (
              <Button variant="outlined" onClick={prevStep}>
                Back
              </Button>
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={primaryOnClick}
            >
              {primaryCtaLabel}
            </Button>
          </Box>
        </form>
      </Card>
    </Container>
  );
};

export default DoctorJoinForm;
