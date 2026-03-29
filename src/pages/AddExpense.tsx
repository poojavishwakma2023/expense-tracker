import { useState, useEffect } from "react";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useLocation, useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import '../stylesComponent/AddExpense.css';




function AddExpense() {
  const navigate = useNavigate();
  const location = useLocation();
  const editData: any = location.state;

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string>("");

  const categoryImages: Record<string, string> = {
    Food: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
    Travel: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
    Shopping: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",
    Bills: "https://cdn-icons-png.flaticon.com/512/2920/2920257.png",
    Entertainment: "https://cdn-icons-png.flaticon.com/512/727/727245.png",
    Other: "https://cdn-icons-png.flaticon.com/512/1828/1828919.png"
  };

  const displayImage =
    imagePreview || categoryImages[category] || "https://via.placeholder.com/80";


  useEffect(() => {

    if (editData) {
      setTitle(editData.title || "");
      setAmount(editData.amount?.toString() || "");
      setCategory(editData.category || "");
      setNote(editData.note || "");
      setPlace(editData.place || "");
      setDate(editData.date || "");
      setImage(editData.image || "")
      setImagePreview(editData.image || "")
    }
  }, [editData]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true)
      const imageUrl = await uploadImageToCloudinary(file)
      setImagePreview(imageUrl);
      setImage(imageUrl)
    } catch (error) {
      console.log('Image upload error:', error)
    } finally {

    } setLoading(false)


  };


  const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "expense_Image_upload");
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

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Submitted")
    const expenseData = {
      title,
      amount: Number(amount),
      category,
      note,
      place,
      date,
      image: image || categoryImages[category] || "",
      createdAt: new Date()
    };

    try {
      setLoading(true);
      console.log("try", expenseData)
      if (editData) {
        await updateDoc(doc(db, "expenses", editData.id), expenseData);
        navigate("/dashboard/expenses")
      } else {
        const docRef = await addDoc(collection(db, "expenses"), expenseData);
        console.log("add doc", docRef)
      }
      // toast.success("Expense added successfully");
      // navigate("/dashboard/expenses");

    } catch (error: any) {

      console.log("Error saving expense:", error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="add-expense-container">
      <h2>{editData ? "Update Expense" : "Add Expense"}</h2>

      <div className="image-upload-container">
        <div className="image-preview">
          <img src={displayImage} alt="expense" />
        </div>

        <label className="upload-btn">
          Upload Image
          <input type="file" accept="image/*" onChange={handleImageChange} hidden />
        </label>
      </div>

      <form onSubmit={submitHandler} className="expense-form">

        <CustomInput
          label="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="enter here title"
          required
        />

        <CustomInput
          label="Number"
          type="number"
          name="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="enter Amount"
          required
        />

        <div className="form-group">
          <label>Category</label>
          <div className="select-wrapper">
            {/* need to use droptown for more cutomization ,in option can control only background,color,font-size */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}

            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>


        <CustomInput
          label="Location"
          type="text"
          name="location"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          placeholder="Enter location"
          required
        />



        <CustomInput
          label="Date"
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="enter date"
          required
        />


        <div className="form-group">
          <label>Note</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="enter detail"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading
            ? (editData ? "Updating..." : "Adding...")
            : (editData ? "Update Expense" : "Add Expense")}
        </button>

      </form >

    </div >
  );
}

export default AddExpense;
