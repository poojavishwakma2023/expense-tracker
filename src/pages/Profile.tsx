import { useState, useEffect } from 'react'
import type { CSSProperties } from "react";
import CustomInput from '../components/CustomInput'
import { FaPen, FaUser } from "react-icons/fa";
import { db } from '../../firebase'
import { setDoc, doc, getDoc } from 'firebase/firestore'



type UserProfile = {
  name: string
  email: string
  phone: string
  occupation: string
  monthlyBudget: number
  currency: string
}

function Profile() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    phone: "",
    occupation: "",
    monthlyBudget: 0,
    currency: "INR"
  })

  useEffect(() => {
    fetchProfile()

  }, [])



  const fetchProfile = async () => {
    try {
      const docRef = doc(db, "users", "userProfile")
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setIsEdit(true);
        const data = docSnap.data();

        setProfile({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          occupation: data.occupation || "",
          monthlyBudget: data.monthlyBudget || 0,
          currency: data.currency || "INR"
        });

        setImagePreview(data.imageUrl || "");
      }
    } catch (error) {
      console.log("Error fetching profile", error);

    }

  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfile({
      ...profile,
      [name]: name === "monthlyBudget" ? Number(value) : value
    })

  }

  // upload image on cloudinary 
  const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "profile_Image_upload");
    formData.append("cloud_name", "densyjqtt");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/densyjqtt/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      return data.secure_url;
    } catch (error) {
      console.log("Upload error", error);
      return "";
    }
  };


  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    //validation
    if (
      !profile.name.trim() ||
      !profile.email.trim() ||
      !profile.phone.trim() ||
      !profile.monthlyBudget
    ) {
      alert("Please fill all required fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profile.email)) {
      alert("Invalid email format");
      return;
    }

    if (profile.monthlyBudget <= 0) {
      alert("Budget must be greater than 0");
      return;
    }

    try {
      setLoading(true)
      // Firebase logic...

      let imageUrl = imagePreview;
      if (imageFile) {
        //upload image on cloudinary
        imageUrl = await uploadImageToCloudinary(imageFile);
      }

      const profileData = {
        ...profile,
        imageUrl
      };

      await setDoc(doc(db, "users", "userProfile"), profileData);
      alert(isEdit ? "Profile updated successfully!" : "Profile saved successfully!");
      setProfile({
        name: "",
        email: "",
        phone: "",
        occupation: "",
        monthlyBudget: 0,
        currency: "INR"
      });
      setImageFile(null);
      setImagePreview("");


    } catch (error) {
      console.log("Error saving profile", error);
    }
    finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Only image files allowed");
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        alert("Image size should be less than 2MB");
        return;
      }

      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));//show image without upload 
    }
  };

  return (
    <div className='user-profile-container'>
      <h2>User Profile</h2>
      {/* <div style={styles.card}> */}
      {/* Profile Image */}
      <div style={styles.imageContainer}>
        {/* <img
          src={imagePreview || "https://via.placeholder.com/80"}
          alt="profile"
          style={styles.image}
        /> */}
        <div style={styles.avatarWrapper}>
          {imagePreview ? (
            <img src={imagePreview} alt="profile" style={styles.image} />
          ) : (
            <FaUser size={50} color="#888" />
          )}
        </div>

        <label style={styles.editIcon}>
          <FaPen size={12} />
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
        </label>
      </div>
      <form onSubmit={saveProfile}>
        <div style={styles.heading}>Personal Info</div >
        <CustomInput
          label="Name"
          name="name"
          value={profile.name}
          placeholder="Enter name"
          onChange={handleChange}
          customLabelStyle={styles.lebelStyle}
          required
        />

        <CustomInput
          label="Email"
          type="email"
          name="email"
          placeholder="Email"
          value={profile.email}
          onChange={handleChange}
          customLabelStyle={styles.lebelStyle}
          required
        />
        <CustomInput
          label="Phone Number"
          type="text"
          name="phone"
          placeholder="Phone"
          value={profile.phone}
          onChange={handleChange}
          customLabelStyle={styles.lebelStyle}
          required
        />
        <CustomInput
          label="Occupation"
          type="text"
          name="occupation"
          placeholder="Occupation"
          value={profile.occupation}
          onChange={handleChange}
          customLabelStyle={styles.lebelStyle}
        />
        <div style={styles.heading}>Financial Settings</div>
        <CustomInput
          label="MonthlyBudget"
          type="number"
          name="monthlyBudget"
          placeholder="Monthly Budget"
          value={profile.monthlyBudget}
          onChange={handleChange}
          customLabelStyle={styles.lebelStyle}
          required
        />

        <CustomInput
          label="Currency"
          type="text"
          name="currency"
          placeholder="Currency"
          value={profile.currency}
          onChange={handleChange}
          customLabelStyle={styles.lebelStyle}
          required
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <button type="submit" disabled={loading} style={styles.submitBtn}>
            {loading ? "Saving..." : isEdit ? "Update Profile" : "Save Profile"}
          </button>
        </div>

      </form>
      {/* </div> */}
    </div>
  )
}

export default Profile

const styles: Record<string, CSSProperties> = {
  lebelStyle: {
    marginInlineStart: '5px',

  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
    position: "relative"
  },


  avatarWrapper: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    backgroundColor: "#f0f2f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    border: "2px solid #e0e0e0",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  },

  image: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #e0e0e0",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  },

  editIcon: {
    position: "absolute",
    bottom: "0",
    right: "calc(50% - 45px)", // aligns to edge of circle
    backgroundColor: "#1c3864",
    color: "#fff",
    borderRadius: "50%",
    width: "28px",
    height: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    cursor: "pointer",
    border: "2px solid #fff"
  },
  submitBtn: {
    padding: "12px",
    backgroundColor: "#5c6bc0",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  }
}






