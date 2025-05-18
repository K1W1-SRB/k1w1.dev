import React from 'react'
import { words } from '@/constants'
import Button from '@/components/Button'
import HeroExperience from '@/components/heromodel/HeroExperience'

function Hero() {
  return (
    <section id='hero' className="relative overflow-hidden">
        <div className='hero-layout'>
            <header className='flex flex-col justify-center md:w-full w-screen md:px-20 px-5'>
                <div className='flex flex-col gap-7'>
                <div className='hero-text'>
                    <h1>
                        Creating
                        <span className='slide'>
                            <span className='wrapper'>
                                {words.map((word) => (
                                    <span key={word.text} className='flex items-center md:gap-3 gap-1 pb-2'>
                                        <img src={word.icon} alt={word.text} className='xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white'/>
                                        <span>{word.text}</span>
                                    </span>
                                ))}
                            </span>
                        </span>
                    </h1>
                    <h1>That just work</h1>    
                   
                </div> 
                <p className='text-white md:text-xl relative z-10 pointer-events-none' >Digital craftsmanship for real-world software</p>
               <Button
                text="See My Work"
                className="md:w-80 md:h-16 w-60 h-12"
                id="counter"
                />
                </div>
            </header>

            <figure>
                <div className='hero-3d-layout border-red-200 border-2'>
                    <HeroExperience />
                </div>
            </figure>

        </div>
    </section>
  )
}

export default Hero