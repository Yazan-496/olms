import AuthLayout from "layout/AuthLayout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLayout } from "layout";
import API from "utils/API";

interface UserProfileData {
  name: string;
  father_name: string;
  mother_name: string;
  email: string;
  personal_picture: string;
  national_number: string;
  central_number: string;
  birth_date: string;
}

export const UserProfile: React.FC = () => {
  const { user, notify, translate } = useLayout();
  const [formData, setFormData] = useState<UserProfileData>({
    name: "",
    father_name: "",
    mother_name: "",
    email: "",
    personal_picture: "",
    national_number: "",
    central_number: "",
    birth_date: "",
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loadingFile, setLoadingFile] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const _getProfile = async () => {
    const response = await API.get(
      "/api/users/profile",
      {},
      (data) => data,
      (e) => { },
      {
        Authorization: `Bearer ${user?.access_token}`,
      }
    );
    if (response?.code === 200) {
      setFormData(response?.data);
    } else {
      setLoading(false);
    }
  };
  useEffect(() => {
    _getProfile();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEditing(true);
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setIsEditing(true);
  };

  const handleSave = async () => {
    setLoading(true);
    const response = await API.post(
      "/api/users/update_profile",
      formData,
      (data) => data,
      (e) => {
        setLoading(false);
        setIsEditing(false);
        notify(e);
      },
      {
        Authorization: `Bearer ${user?.access_token}`,
      }
    );
    if (response?.code === 200) {
      notify({ message: "Profile Updated Successfully", type: "success" });
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    _getProfile();
    setIsEditing(false);
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoadingFile(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/upload_file`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data?.data?.file_path) {
        setFormData((prevState) => ({
          ...prevState,
          personal_picture: response.data.data.file_path,
        }));
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoadingFile(false);
    }
  };

  return (
    <div className="h-full w-full dark:bg-slate-800 gap-6 flex flex-col items-center justify-center">
      <div className="bg-white w-full shadow overflow-hidden sm:rounded-lg mt-6">
        {" "}
        <div className="px-4 pt-5 sm:px-6">
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {translate("details_and_info")}
          </p>
        </div>
        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium flex items-center justify-start text-gray-500">
            {translate("profile_pic")}

          </dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <div className="  flex items-center justify-start dark:bg-gray-700 relative overflow-hidden group rounded-xl p-0 transition-all duration-500 transform">
              <div className="relative w-[150px] h-[150px] group/image  flex items-center justify-center">
                {loadingFile ? (
                  <div className="w-36 flex items-center justify-center bg-black/20 border border-black/30 h-36 object-center object-cover rounded-full transition-all duration-500 delay-500 transform">
                    {translate("uploading")}{" "}
                  </div>
                ) : (
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}${formData.personal_picture
                      }`}
                    alt="User"
                    className="w-36 h-36 object-center object-cover rounded-full transition-all duration-500 delay-500 transform"
                  />
                )}
                {/* Container for the edit button */}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
                  <input
                    type="file"
                    onChange={handleUploadImage}
                    className="opacity-0 absolute inset-0"
                  />
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    {translate("edit")}
                  </button>
                </div>
              </div>
              <div className="w-fit hidden transition-all transform duration-500 mt-4">
                <h1 className="text-gray-600 dark:text-gray-200 font-bold">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    disabled={true}
                    className="bg-transparent border-none text-gray-600 dark:text-gray-200 font-bold"
                  />
                </h1>
                <p className="text-gray-400">
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    disabled={true}
                    className="bg-transparent border-none text-gray-400"
                  />
                </p>
              </div>
            </div>
          </dd>
        </div>
        <div className="bg-white w-full shadow overflow-hidden sm:rounded-lg">
          <div className=" border-gray-200">
            <dl>
              {/* Name */}
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2"
                  />
                </dd>
              </div>
              {/* Father Name */}
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  {translate("father_name")}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="father_name"
                    value={formData.father_name}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2"
                  />
                </dd>
              </div>
              {/* Mother Name */}
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  {translate("mother_name")}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="mother_name"
                    value={formData.mother_name}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2"
                  />
                </dd>
              </div>
              {/* Email */}
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2"
                  />
                </dd>
              </div>
              {/* National Number */}
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  {translate("national_number")}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="national_number"
                    value={formData.national_number}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2"
                  />
                </dd>
              </div>
              {/* Central Number */}
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  {translate("central_number")}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="central_number"
                    value={formData.central_number}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2"
                  />
                </dd>
              </div>
              {/* Birth Date */}
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  {translate("birthdate")}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="date"
                    name="birth_date"
                    value={formData.birth_date}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2"
                  />
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="flex justify-end p-4">
          <>
            <button
              disabled={loading || !isEditing}
              onClick={handleSave}
              className="bg-blue-500 disabled:opacity-60 text-white px-4 py-2 rounded mr-2"
            >
              {loading ? translate("wait") : translate("save")}
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              {translate("cancel")}
            </button>
          </>
        </div>
      </div>
    </div>
  );
};

const Profile: React.FC = () => {
  const { translate } = useLayout()
  return (
    <AuthLayout title={translate("profile")}>
      <UserProfile />
    </AuthLayout>
  );
};

export default Profile;
