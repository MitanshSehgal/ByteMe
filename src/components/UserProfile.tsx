import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { Camera, Mail, Lock, Bell, Link, User, Shield } from "lucide-react";
import toast from "react-hot-toast";

interface UserProfileProps {
  user: {
    id: string;
    email: string;
    fullName: string;
    avatar?: string;
    bio?: string;
  };
}

function UserProfile({ user }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    bio: user.bio || "",
    email: user.email,
  });

  const onDrop = (acceptedFiles: File[]) => {
    // Handle avatar upload
    toast.success("Avatar updated successfully");
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    maxSize: 5242880, // 5MB
    multiple: false,
  });

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "connected", label: "Connected Accounts", icon: Link },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* Header/Avatar Section */}
        <div className="relative h-48 bg-gradient-to-r from-primary-500 to-primary-600">
          <div className="absolute -bottom-16 left-8">
            <div className="relative">
              <img
                src={
                  user.avatar ||
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
                }
                alt={user.fullName}
                className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800"
              />
              <button
                {...getRootProps()}
                className="absolute bottom-0 right-0 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <input {...getInputProps()} />
                <Camera className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-20 px-8">
          {/* Tabs */}
          <div className="flex space-x-4 border-b dark:border-gray-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 -mb-px ${
                  activeTab === tab.id
                    ? "border-b-2 border-primary-500 text-primary-500"
                    : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="py-6">
            {activeTab === "personal" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-primary-500 hover:text-primary-600"
                  >
                    {isEditing ? "Save Changes" : "Edit Profile"}
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      disabled={!isEditing}
                      className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Bio
                    </label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) =>
                        setFormData({ ...formData, bio: e.target.value })
                      }
                      disabled={!isEditing}
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "security" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Password</h3>
                  <button
                    onClick={() => toast.error("Feature coming soon")}
                    className="flex items-center space-x-2 text-primary-500 hover:text-primary-600"
                  >
                    <Lock className="w-5 h-5" />
                    <span>Change Password</span>
                  </button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Two-Factor Authentication
                  </h3>
                  <button
                    onClick={() => toast.error("Feature coming soon")}
                    className="flex items-center space-x-2 text-primary-500 hover:text-primary-600"
                  >
                    <Shield className="w-5 h-5" />
                    <span>Enable 2FA</span>
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === "notifications" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Email Notifications</h3>
                  <div className="space-y-2">
                    {[
                      "Course updates",
                      "New messages",
                      "Community activity",
                    ].map((item) => (
                      <label key={item} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="rounded text-primary-500"
                        />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "connected" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Connected Accounts</h3>
                  <div className="space-y-4">
                    {["GitHub", "Google", "LinkedIn"].map((platform) => (
                      <div
                        key={platform}
                        className="flex items-center justify-between p-4 border dark:border-gray-700 rounded-lg"
                      >
                        <span>{platform}</span>
                        <button
                          onClick={() => toast.error("Feature coming soon")}
                          className="text-primary-500 hover:text-primary-600"
                        >
                          Connect
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
