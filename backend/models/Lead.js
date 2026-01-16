import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true
    },
    source: {
        type: String,
        enum: ["Website", "Ads", "Referral"],
        default: 'website',
    },
    status: {
        type: String,
        enum: ["New", "Contacted", "Converted"],
        default: 'new'
    },
    stage: {
        type: String,
        enum: ["Lead", "Prospect", "Customer"],
        default: 'lead'
    },
}, {timestamps: true});

const Lead = new mongoose.model("Lead", leadSchema);
export default Lead;