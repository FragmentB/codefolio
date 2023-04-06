import React, { useEffect } from 'react';
import 'styles/global.scss';
import './Portfolio.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumpsterFire, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { useAudio } from 'hooks/AudioContext';

function Porfolio() {

    const {pauseMusic} = useAudio()
    useEffect(()=>{
        pauseMusic()
        
    } ,[])
    const resume = require("assets/JButler.pdf");
    const casino = require("assets/Images/SourcapsIcon.png");
    const mists = require("assets/Images/Miner.png");
    const koda = require("assets/Images/KodaIcon.png")

    return (
        <>        
            <header className="portfolioHeader">
            <div className='headerText'>
            <h1 className='headerTitle'>Jessie Butler - App Portfolio</h1>
            <div className='headerDescription'>
                Hello there. I'm Jessie Butler and welcome to my hopefully mostly up to date developer portfolio. 
                I have been developing software since 2006 with experience across the whole stack from whitboarding a database to production deploys and everything in between.
                Here's my quick info and a sample of some of my favorite portfolio projects. If you're still curious after looking at the samples I'll explain my journy as a coder below.          
            </div>
            <div className='headerLinks'>
                <button className='icon' onClick={() => window.location.href = 'https://www.linkedin.com/in/jessie-butler-2a997aa2/'}>          
                <FontAwesomeIcon className='fa-xl' icon={ faLinkedin } />
                LinkedIn
                </button>

                <button className='icon' onClick={() => window.location.href = 'mailto:butljes2@gmail.com'} >
                <FontAwesomeIcon className='fa-xl' icon={ faEnvelope }/>
                Email Me
                </button>
                        
                <a className='icon' href={resume} download = "JButlerResume.pdf">
                <FontAwesomeIcon className='fa-xl' icon={ faDumpsterFire }/>
                Resume
                </a>
            </div>
            </div>
        </header>
        <div className='projects'>
            <div className='projectDisplay'>
            <h2 className='projectTitle'>
                Casino
            </h2>
            <div className='projectInfo'>
                <div className='projectImage'>
                    <Link to={'/Casino'}>
                        <img className='projectScreenshot' src={casino} alt='Casino' />
                    </Link>
                </div>
                <div className='projectDescription'>
                <div className='projectText'>
                    A bit of a silly project, but one I'm very happy with.
                    It's a functional casino simulator that currently has Blackjack and a dice game called Klondike.
                    Made entirely with React.JS and the React-Router-Dom npm package no other packages really a chance to flex my react muscles.
                    It's been presented here with some of my pets as the dealers but it's very modular and easy to customize.
                    Using local storage to save things like cash and unlock and has been a great way to learn hooks and contexts and how to unit test them.
                    In order to test the rules for Klondike properly the unit tests need to test every combination of two hands of five dice and compare them.
                    It was a fun challenge and I'm going to keep adding new games on as I have time. Click on the icon or <Link to={'/Casino'}>click here</Link> to visit the casino.
                </div>
                </div>
            </div>
            </div>
            <div className='projectDisplay'>
            <h2 className='projectTitle'>
                Pet Gallery
            </h2>
            <div className='projectInfo'>
                <div className='projectImage'>
                    <Link to={'/Gallery'}>
                        <img className='projectScreenshot' alt='Pet Gallery' src={koda} />
                    </Link>
                </div>
                <div className='projectDescription'>
                
                <div className='projectText'>
                    I was playing around with a custom gallery system for another game project I was working on and while most the game got scrapped.
                    I was really happy with this modular and easily extensible gallery system I came up with using nothing but react.
                    So I filled a version with a bunch of the different pets around because they are way cuter than me.
                    Click on the puppy or <Link to={'/Gallery'}>click here</Link> to visit the gallery.
                </div>
                </div>
            </div>
            </div>
            <div className='projectDisplay'>
            <h2 className='projectTitle'>
                Explorers of the Mists
            </h2>
            <div className='projectInfo'>
                <div className='projectImage'>
                <a href='https://fragmentb.github.io/Mists/index.html' target="_blank">
                    <img className='projectScreenshot' alt='Explorers of the Mists' src={mists} />
                </a>
                </div>
                <div className='projectDescription'>
                <div className='projectText'>
                    This is a bit of an old project I did as dabbling my toe into game development using a Javascript game library called Phaser.
                    It's one of my first attempts so the code is a bit of a mess but I like the results so I want to keep it around as a reminder.
                    Procedural level generation, fog of war, enemies that move and are persisant even in maps you aren't in, and a big enemy with persuit logic.
                    It's a good base for a project and something I look back to for inspiration. I have a typscript rewrite in progress that is cleaning up and restructuring the whole codebase.
                    Click on the icon or <a href='https://fragmentb.github.io/Mists/index.html' target="_blank">click here</a> to explore the mists.
                </div>
                </div>
            </div>
            </div>
        </div>
        <footer className='portfolioFooter'>
            <div className='footerTitle'>
            <h2>Further Experience and Philosopy</h2>
            </div>
            <div className='footerRant'>
            <p>Before I go into a more detailed history I want to give a quick shoutout to my wife for all the feedback and advice and photos. Sara you are amazing and I treasure every day with you. And another shoutout to my buddy Puru who drew all the art you see on these pages.</p>
            <p>
            Most reciently I have been working on front end development with React and Angular, but I love api's and back end services too. 
            I've helped design, archicect, build, and document microservices and front ends with lots of experience understanding and modernizng legacy code.
            </p>
            <p>
                One of the coolest I worked on involved reading through code of an old VB 6 program that the company no longer had the login info for nor did they have a database with any relations intact.
                It was a fun process to more or less reverse engineer and document so I could make and recommend improvements. The datbase tables alone took up a full whiteboard with the smallest writing I could manage.
                The documentation I created earned the team funding to work on it even after my time on the project passed.
            </p>
            <p>
                Another fun project I was heavily involved in was rewriting an investment management dashboard. 
                We got to encapsulate and update and expose methods from a legacy system to a new microservice that could be consumed on dektop and by the mobile team.
                That was another project that involved many whiteboard diagrams and during the development of the project I was able to act as team lead helping keep everything organized and deadlines on time. I like planning.
            </p>
            <p>
                Some less fun times were when I was writing custom reports for college campuses. 
                There were a lot of customer calls comparing a paper form to a digital one and someone holding a piece of paper against the screen. 
                But patience and listening are some of my strengths so I was able to politely work to satisfy my clients and it was good practice with css.
            </p>
            <p>
                Another time I had a headache from work was working again on working on updating some client portals this time things weren't as planned out as could have been and the teams involved were isolated and untrusting.
                The archtecture of the project kept shifting while working on it and the teams weren't talking so they were stepping on toes or miscommunicating deadlines. 
                Overall though it's been a good project for me because it is a reminder of what I like about collaboration and planning and how important those can be. You can't spend years planning things but big projects to benefit from the initial investment.
                It was also a good chance for me to practice my communicaiton and descelation skills. I was part of a good team and we managed to get everyone united on things.
            </p>
            <p>
            While I was in college for software development I was also an active tutor for the classes I was taking it was fun to help my fellow students understand the code we were working with and teach them how to get there without giving them the answers.
            To this day I still like to help beggining developers where I can. Most reciently I helped my brother learn Python by learning it with him in his classes.
            </p>
            <p>
            After that I was a manual tester for a company that makes and sells custom cirruculum management software to college campuses.
            I learned a lot as a fresh eyed young lad some of it was tedious mostly it was fun and it helped the foundation of my testing philosophy.
            That was further forged in my years as a software engineer in test.
            </p>
            <p>
            That philosophy is I don't like there to be a division between testing and developing. I want to work on teams where every dev is willing to write tests for their code or their teammates.
            I want to work on teams where QA people aren't seen as an enemy. Where concerns found in testing are taken seriously and not seen as an attack on *my precious* code.
            I want to work on teams where test engineers are encouraged to look at the code being written and be able to work on development stories not just crank out test cases.
            I want to work on teams where testing is considered before and during writing code where we are all a team producing the best quality code and tests we can.
            </p>

            <p>
                If you've made it this far thank you for your time. Hopefully this extended work history and some of my thoughts on things has given a better feeling for who I am. If you're interested in reaching out about a project or job opportunity I look forward to hearing from you.
            </p>
            </div>
            <div className='headerLinks'>
                <button className='icon' onClick={() => window.location.href = 'https://www.linkedin.com/in/jessie-butler-2a997aa2/'}>          
                <FontAwesomeIcon className='fa-xl' icon={ faLinkedin } />
                LinkedIn
                </button>

                <button className='icon' onClick={() => window.location.href = 'mailto:butljes2@gmail.com'} >
                <FontAwesomeIcon className='fa-xl' icon={ faEnvelope }/>
                Email Me
                </button>
                        
                <a className='icon' href={resume} download = "JButlerResume.pdf">
                <FontAwesomeIcon className='fa-xl' icon={ faDumpsterFire }/>
                Resume
                </a>
            </div>
        </footer>
      </>
    )
}

export default Porfolio;