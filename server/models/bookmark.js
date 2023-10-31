import mongoose from "mongoose";
import User from "./user";

const bookmarkSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Post"
    },
    user: [User]
});

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

export default Bookmark;
