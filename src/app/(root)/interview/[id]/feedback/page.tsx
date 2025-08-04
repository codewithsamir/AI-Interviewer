import { getCurrentsUser } from '@/lib/actions/auth.action';
import { getFeebbackByInterviewId, getInterviewByID } from '@/lib/actions/general.action';
import { redirect } from 'next/navigation';
import React from 'react'

const page =async ({params}:RouteParams) => {
  const {id} = await params;
  const user = await getCurrentsUser();

  const interview = await getInterviewByID(id);

  if (!interview) redirect("/")

  const feedback = await getFeebbackByInterviewId({
    interviewId:id,
    userId:user?.id!
  })

  console.log(feedback)
  return (
    <div>page</div>
  )
}

export default page