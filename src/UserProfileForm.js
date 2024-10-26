// UserProfileForm.jsx
import React, { useState } from 'react';

function UserProfileForm({ saveProfile }) {
    const [profile, setProfile] = useState({
        name: '', income: '', goals: '', riskTolerance: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        saveProfile(profile); // Pass data to a backend or state
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" onChange={handleChange} placeholder="Name" />
            <input name="income" onChange={handleChange} placeholder="Income" />
            <input name="goals" onChange={handleChange} placeholder="Goals" />
            <select name="riskTolerance" onChange={handleChange}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <button type="submit">Save Profile</button>
        </form>
    );
}

export default UserProfileForm;
