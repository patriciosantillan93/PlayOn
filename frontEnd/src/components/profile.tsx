import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Profile.module.css'; // Import the CSS module

function Profile() {
   const [profile, setProfile] = useState({
      username: '',
      email: '',
      dateOfBirth: '',
      phoneNumber: '',
      profilePicture: '',
      profilePicturePreview: '' 
   });
   const [isEditing, setIsEditing] = useState(false);

   useEffect(() => {
      const fetchProfile = async () => {
         try {
            const response = await axios.get('/profile');
            setProfile({
               ...response.data,
               profilePicturePreview: response.data.profilePicture 
            });
         } catch (error) {
            console.error('Error fetching profile data', error);
         }
      };
      fetchProfile();
   }, []);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setProfile({ ...profile, [name]: value });
   };

   const handleFileChange = (e) => {
      const file = e.target.files[0];
      setProfile({ ...profile, profilePicture: file });

      if (file) {
         const reader = new FileReader();
         reader.onloadend = () => {
            setProfile((prevState) => ({
               ...prevState,
               profilePicturePreview: reader.result
            }));
         };
         reader.readAsDataURL(file);
      }
   };

   const handleSubmit = async () => {
      const formData = new FormData();
      formData.append('username', profile.username);
      formData.append('dateOfBirth', profile.dateOfBirth);
      formData.append('phoneNumber', profile.phoneNumber);
      if (profile.profilePicture) {
         formData.append('profilePicture', profile.profilePicture);
      }

      try {
         await axios.put('/profile', formData);
         setIsEditing(false);
      } catch (error) {
         console.error('Error updating profile', error);
      }
   };

   return (
      <div className={styles['profile-card']}>
         <h1>Profile Information</h1>

         <div className={styles['input-group']}>
            <label>Email:</label>
            <p>{profile.email}</p>
         </div>

         <div className={styles['input-group']}>
            <label>Username:</label>
            {isEditing ? (
               <input
                  type="text"
                  name="username"
                  value={profile.username}
                  onChange={handleChange}
                  className="input"
               />
            ) : (
               <p>{profile.username}</p>
            )}
         </div>

         <div className={styles['input-group']}>
            <label>Date of Birth:</label>
            {isEditing ? (
               <input
                  type="date"
                  name="dateOfBirth"
                  value={profile.dateOfBirth}
                  onChange={handleChange}
               />
            ) : (
               <p>{profile.dateOfBirth}</p>
            )}
         </div>

         <div className={styles['input-group']}>
            <label>Phone Number:</label>
            {isEditing ? (
               <input
                  type="tel"
                  name="phoneNumber"
                  value={profile.phoneNumber}
                  onChange={handleChange}
               />
            ) : (
               <p>{profile.phoneNumber}</p>
            )}
         </div>

         <div className={styles['input-group']}>
            <label>Profile Picture:</label>
            {isEditing ? (
               <input
                  type="file"
                  name="profilePicture"
                  onChange={handleFileChange}
               />
            ) : (
               profile.profilePicturePreview && (
                  <img
                     src={profile.profilePicturePreview}
                     alt="Profile"
                     className={styles['profile-image']}
                  />
               )
            )}
         </div>

         <div className={styles['button-group']}>
            <button onClick={() => setIsEditing(!isEditing)}>
               {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
            {isEditing && (
               <button onClick={handleSubmit}>
                  Save Changes
               </button>
            )}
         </div>
      </div>
   );
}

export default Profile;
