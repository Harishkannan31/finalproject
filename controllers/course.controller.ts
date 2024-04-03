import { Request,Response,NextFunction, response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary"; 
import { createCourse } from "../services/course.service";
import CourseModel from "../models/course.model";


//upload course
export const uploadCourse= CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const data =req.body;
        const thumbnail=data.thumbnail;
        if(thumbnail){
            const myCloud= await cloudinary.v2.uploader.upload(thumbnail,{
                folder:"courses"
            });
            data.thumbnail={
                public_id:myCloud.public_id,
                url:myCloud.secure_url
            }
        }
        createCourse(data,res,next);
    }catch(error:any){
        return next(new ErrorHandler(error.message,500));
    }
});

//edit course
// export const editCourse= CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
//     try{
//         const data=req.body;
//         const courseId=req.params.id;
//         const course= await CourseModel.findByIdAndUpdate(
//             courseId,
//             {
//                 $set:data,
//             },
//             {new:true}
//         );
//     } catch(error:any){
//         return next(new ErrorHandler(error.message,500));
//     }
// })
export const editCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const courseId = req.params.id;

        // Validate and sanitize data if needed

        // Ensure only allowed fields are included in data
        const allowedFields = ['name', 'description', 'price', 'estimatedPrice', 'tags', 'level', 'demoUrl', 'prerequisites', 'ratings', 'purchased'];
        const newData = Object.keys(data)
            .filter(key => allowedFields.includes(key))
            .reduce((obj:any, key:any) => {
                obj[key] = data[key];
                return obj;
            }, {});

        // Update the course
        const course = await CourseModel.findByIdAndUpdate(courseId, newData, { new: true });
        // console.log(course?.price)
        // Handle case where course is not found
        if (!course) {
            return next(new ErrorHandler('Course not found', 404));
        }

        res.status(200).json({
            success: true,
            data: course
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});

//get course content only for valid user
// export const getCourseByUser = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
//     try{
//         const userCourseList=req.user?.courses;
//         const courseId=req.params.id;

//         const courseExists=userCourseList?.find(
//             (course:any)=>course._id.toString()===courseId
//         );
//         if(!courseExists){
//             return next(
//                 new ErrorHandler("you are not eligible to access this course",404)
//             )
//         }
        
//         const course=CourseModel.findById(courseId);
       
//         res.status(200).json({
//             success:true,
//             course,
//         })
//     }
//     catch(error:any){
//         return next (new ErrorHandler(error.message,500))
        
//     }});
