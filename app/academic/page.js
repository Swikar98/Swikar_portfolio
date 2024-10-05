"use client"
import EducationalTimeline from '@/components/EducationalTimeline';
import {educationalTimelineData} from "@/data/academic/educationalTimelineData"
export default function Academic(){
    return(
       <div> <EducationalTimeline events={educationalTimelineData} /></div>
    )
}