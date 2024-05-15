"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function UserProfile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profileImage, setProfileImage] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [usernameChanged, setUsernameChanged] = useState(false);
  const [error, setError] = useState("");
  const [newProfileImageUrl, setNewProfileImageUrl] = useState("");
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEditingProfileImage, setIsEditingProfileImage] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("/api/user/details");
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
        const userData = await response.json();
        setUsername(userData.username);
        setEmail(userData.email);
        setProfileImage(
          userData.profile_imageurl || "/images/ProfilePlaceholder.webp"
        );
      } catch (error) {
        console.error(error);
        setError("Failed to fetch user details");
      }
    };

    if (status !== "loading" && !session) {
      router.push("/login");
    } else if (session) {
      fetchUserDetails();
    }
  }, [session, status, router]);

  const handleUsernameChange = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user/updateusername", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newUsername: username }),
      });
      if (response.ok) {
        const data = await response.json();
        setUsername(data.username);
        setUsernameChanged(true);
        setError("");
        setIsEditingUsername(false);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError("Failed to update username");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user/updatepassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });
      if (response.ok) {
        setPasswordChanged(true);
        setCurrentPassword("");
        setNewPassword("");
        setError("");
        setIsEditingPassword(false);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError("Failed to update password");
    }
  };

  const handleProfileImageChange = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user/updateprofileimage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newProfileImageUrl }),
      });
      if (response.ok) {
        const data = await response.json();
        setProfileImage(data.profileImageUrl);
        setNewProfileImageUrl("");
        setError("");
        setIsEditingProfileImage(false);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError("Failed to update profile image");
    }
  };

  const cancelEdit = (field) => {
    switch (field) {
      case "username":
        setIsEditingUsername(false);
        setError("");
        break;
      case "password":
        setIsEditingPassword(false);
        setCurrentPassword("");
        setNewPassword("");
        setError("");
        break;
      case "profileImage":
        setIsEditingProfileImage(false);
        setNewProfileImageUrl("");
        setError("");
        break;
      default:
        break;
    }
  };

  if (!session) {
    return <div>Redirecting to login</div>;
  }

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg border p-6 max-w-md mx-auto">
      <div className="flex flex-col items-center">
        <img
          src={profileImage}
          alt="Profile Picture"
          width={100}
          height={100}
          className="rounded-full mb-4"
        />
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          User Profile
        </h3>

        <div className="w-full mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              value={email}
              disabled
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100"
            />
          </div>
        </div>

        <form onSubmit={handleUsernameChange} className="w-full mb-6">
          <div className="mb-4 flex items-center">
            <label className="block text-sm font-medium text-gray-700 flex-1">
              Username
            </label>
            <button
              type="button"
              onClick={() => setIsEditingUsername(true)}
              className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
            >
              Edit
            </button>
          </div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            disabled={!isEditingUsername}
          />
          {isEditingUsername && (
            <div className="mt-2 flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 flex-1 mr-2"
              >
                Update Username
              </button>
              <button
                type="button"
                onClick={() => cancelEdit("username")}
                className="bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 flex-1 ml-2"
              >
                Cancel
              </button>
            </div>
          )}
        </form>
        {usernameChanged && (
          <p className="text-green-500 mt-4">Username successfully changed.</p>
        )}

        <form onSubmit={handlePasswordChange} className="w-full mb-6">
          <div className="mb-4 flex items-center">
            <label className="block text-sm font-medium text-gray-700 flex-1">
              Password
            </label>
            <button
              type="button"
              onClick={() => setIsEditingPassword(true)}
              className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
            >
              Edit
            </button>
          </div>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            placeholder="Current Password"
            disabled={!isEditingPassword}
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            placeholder="New Password"
            disabled={!isEditingPassword}
          />
          {isEditingPassword && (
            <div className="mt-2 flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 flex-1 mr-2"
              >
                Change Password
              </button>
              <button
                type="button"
                onClick={() => cancelEdit("password")}
                className="bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 flex-1 ml-2"
              >
                Cancel
              </button>
            </div>
          )}
        </form>
        {passwordChanged && (
          <p className="text-green-500 mt-4">Password successfully changed.</p>
        )}

        <form onSubmit={handleProfileImageChange} className="w-full mb-6">
          <div className="mb-4 flex items-center">
            <label className="block text-sm font-medium text-gray-700 flex-1">
              Profile Image URL
            </label>
            <button
              type="button"
              onClick={() => setIsEditingProfileImage(true)}
              className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
            >
              Edit
            </button>
          </div>
          <input
            type="text"
            value={newProfileImageUrl}
            onChange={(e) => setNewProfileImageUrl(e.target.value)}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            disabled={!isEditingProfileImage}
          />
          {isEditingProfileImage && (
            <div className="mt-2 flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 flex-1 mr-2"
              >
                Update Profile Image
              </button>
              <button
                type="button"
                onClick={() => cancelEdit("profileImage")}
                className="bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 flex-1 ml-2"
              >
                Cancel
              </button>
            </div>
          )}
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}
