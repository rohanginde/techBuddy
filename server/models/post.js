
import mongoose from 'mongoose';

//Creating post schema with respective fields
const postSchema = new mongoose.Schema({

	title:{
   		type:String,
		required:true
	},
	body:{
   		type:String,
		required:true
	},
    username:{
		type:String
	},
	views: {
		type: Number,
		default: 0
	},
	likes:[ String],
	//nested comments field with inner replies array containing specific details of reply
	comments: [
		{
			comment_text:
			{  
				type: String
			},
			username:
			{
				type: String
			},
			timestamp:
			{
				type:Date,
				default:Date.now
			},
			replies:[
			{
				reply_text:
				{  
					type: String
				},
				username:
				{
					type: String
				},
				timestamp:
				{
					type:Date,
					default:Date.now
				}
			}
		]

		}],
	photo:{
   		type:String,
		default: "no photo"
	},
	bookmarks: [{
		type: String
	}],
	tags: [{
		type: String
	}]
	
},{timestamps:true});
const Post = mongoose.model('Post',postSchema);
export default Post;