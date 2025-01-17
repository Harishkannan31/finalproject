import mongoose,{Document,Model,Schema} from 'mongoose';
interface IComment extends Document{
    user:object,
    question:string;
    questionReplies?:IComment[];
}

interface IReview extends Document{
    user:object;
    rating:number;
    comment:string;
    commentReplies:IComment[];
}

interface ILink extends Document{
    title:string;
    url:string;
}

interface IcourseData extends Document{
    title:string;
    description:string;
    videoUrl:string;
    videoSection:string;
    videoLength:number;
    videoPlayer:string;
    links:ILink[];
    suggestion:string;
    questions:IComment[];
}

interface ICourse extends Document{
    name:string;
    description:string;
    price:number;
    estimatedPrice?:number;
    thumbnail:object;
    tags:string;
    level:string;
    demoUrl:string;
    Capacity:number;
    WishListed:number;
    benefits:{title:string}[];
    prerequisites:{title:string}[];
    reviews:IReview[];
    courseData:IcourseData[];
    ratings?:number;
    purchased?:number;
    Event_Time:string;
    Event_Date:string;
    Event_Location:string;

}

const reviewSchema = new Schema<IReview>({
    user: Object,
    rating:{
        type:Number,
        default: 0,
    },
    comment:String,
});

const linkSchema = new Schema<ILink>({
    title:String,
    url:String,
});

const commentSchema = new Schema<IComment>({
    user:Object,
    question:String,
    questionReplies: [Object],
});

const courseDataSchema = new Schema<IcourseData>({
    videoUrl:String,
    title:String,
    videoSection:String,
    description:String,
    videoLength:Number,
    videoPlayer:String,
    links:[linkSchema],
    suggestion:String,
    questions:[commentSchema],
});

const courseSchema = new Schema<ICourse>({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    // estimatedPrice:{
    //     type:Number,
    // },
    // thumbnail:{
    //     public_id:{
            
    //         type:String,
    //     },
    //     url:{
            
    //         type:String,
    //     },
    // },
    // tags:{
    //     type:String,
    //     required:true,
    // },
    level:{
        type:String,
        required:true
    },
    demoUrl:{
        type:String
        
    },
    Capacity:{
        type:Number
        
    },
    WishListed:{
        type:Number
        
    },
    // benefits:[{type:String}],
    prerequisites:[{type:String}],
    // reviews:[reviewSchema],
    Event_Time:{
        type:String,
        required:true
    },
    Event_Date:{
        type:String,
        required:true
    },
    Event_Location:{
        type:String,
        required:true
    }
},{timestamps:true});

const CourseModel:Model<ICourse>=mongoose.model("Course",courseSchema);
export default CourseModel;