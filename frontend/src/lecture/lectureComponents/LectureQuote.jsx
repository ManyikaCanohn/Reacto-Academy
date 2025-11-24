import React from 'react'
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'

    const quotes = {
        Sunday: "Rest, recharge, and reflect. The best ideas come in peace.",
        Monday: "Start strong. Today's effort builds tomorrow's success.",
        Tuesday: "Progress is progress, no matter how small.",
        Wednesday: "Halfway there - keeo going, you're doing greet.",
        Thursday: "Focus. The weeked's reward is earned through effort.",
        Friday: "Finish with pride. Your dedication matters.",
        Saturday: "Learn, revise, and enjoy - balance is power."
    };

const LectureQuote = () => {

    const day = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const todayQuote = quotes[day];

    return (
            
        <section className=''>
            <div>
                {/* <FaQuoteLeft /> */}
                <p className='text-muted'> {todayQuote} </p>
                {/* <FaQuoteRight /> */}
            </div>
        </section>
    )
}

export default LectureQuote