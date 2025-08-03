import { feedbackSchema } from "@/constants";
import { db } from "@/firebase/admin";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";

export async function getInterviewByUserId(userId:string): Promise<Interview[] | null>{
    const interviews = await db.collection('interviews').where('userId','==',userId).orderBy('createdAt','desc').get();

    const interview = interviews.docs.map((doc)=>({
        id:doc.id,
        ...doc.data()   
    })) as Interview[];

    return interview;
}


export async function getLatestInterview(params:GetLatestInterviewsParams): Promise<Interview[] | null>{

    const {userId,limit=10} = params;
    const interviews = await db
    .collection('interviews')
    .orderBy('createdAt','desc')
    .where('finalized','==',true)
    .where('userId', '!=', userId)
    .limit(limit)
    .get()

    const interview = interviews.docs.map((doc)=>({
        id:doc.id,
        ...doc.data()   
    })) as Interview[];

    return interview;
}
export async function getInterviewByID(id:string): Promise<Interview | null>{

  
    const interviews = await db
    .collection('interviews')
    .doc(id)
    .get()

  

    return interviews.data() as Interview | null;
}


export async function createFeedback(params:CreateFeedbackParams){

 const {interviewId, userId,transcript}  =params;

 try {
    const formattedTranscript = transcript.map((sentence: {role:string, content:string})=>(
        `-${sentence.role} : ${sentence.content} \n`
    )).join('');


    const {object:{totalScore,categoryScores,strengths,areasForImprovement,finalAssessment}} = await generateObject({
        model:google('gemini-2.0-flash-001',{
            structuredOutputs:false,
        }),
        schema: feedbackSchema,
        prompt : 'ill give you the transcript and you assess the candidate',
        system:'You are a professional interviewer.'
    });

    const feedback = await db.collection('feedback').add({
        interviewId,
        userId,
        totalScore,
        categoryScores,
        strengths,
        areasForImprovement,
        finalAssessment,
        createAt:new Date().toISOString()
    })

    return {
        success:true,
        feedbackId:feedback.id,
    }
 } catch (error) {
    console.error('error saving feedback', error)
 }
}