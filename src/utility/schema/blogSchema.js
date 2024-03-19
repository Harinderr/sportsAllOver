import mongoose, { model } from "mongoose";

const blogSchema = new mongoose.Schema({
    title : String,
    content : String

},{timestamps:true})

export const Content = mongoose.models.contents || mongoose.model('contents', blogSchema)