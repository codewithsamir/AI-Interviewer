import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React, { Fragment } from 'react'
import { dummyInterviews } from '../../constants'
import InterviewCard from '@/components/InterviewCard'
import { getCurrentsUser, getInterviewByUserId, getLatestInterview } from '@/lib/actions/auth.action'

const page =async () => {

  const user = await getCurrentsUser();
 



  const [userinterviews ,  latestInterviews] = await Promise.all(
    [
      await getInterviewByUserId(user?.id!),
     await getLatestInterview({userId: user?.id!})

    ]
  )
  const haspastinterview = userinterviews?.length > 0;
  const hasupcomminginterviews = latestInterviews?.length>0
 
  return (
    <>
    <section className='card-cta'>
<div className="flex flex-col gap-6 max-w-lg">
  <h2>Get Interview Ready with AI Powered Practive and Feedback</h2>
  <p className='text-lg'>practice on real interview question and get instand feedback </p>
  <Button asChild className='btn-primary max-sm:w-full'>
    <Link href="/interview">Start an Interview</Link>
  </Button>
</div>
<Image src="/robot.png" alt="robo-dud" width={400} height={400} className="max-sm:hidden" />


    </section>

<section className='flex flex-col gap-6 mt-8'>

  <h2>Your Interviews</h2>

  <div className='interviews-section'>
    {/* <p>you haven&apos;t taken any interviews</p> */}

    {
    haspastinterview ? (
      userinterviews?.map((interview)=>(
        <InterviewCard key={interview.id}
      {...interview}

      />
     
    )
  ))
    :
   ( <p>you haven&apos;t taken any interviews yet</p>)
    }
    
     
       
  
     {/* <p>you haven&post;t taken any interviews yet</p> */}
  </div>
</section>

<section className="flex flex-col gap-6 mt-8">
  <h2>Take an Interview</h2>

  <div className="interviews-section">
  {
    hasupcomminginterviews ? (
      latestInterviews?.map((interview)=>(
        <InterviewCard key={interview.id}
      {...interview}

      />
     
    )
  ))
    :
   ( <p>There are no new Interviews available</p>)
    }
    
  </div>
</section>

    </>
  )
}

export default page