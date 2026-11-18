import React from 'react'

const Hero = () => {
    return (
        <>
            <section className='hero' id = 'home'>
                <div className="hero-content">
                    <div className="hero-title">
                        <h1 className="hero-title">
                            Data Structures
                            <span className='blue'>Programs</span>
                        </h1>

                        <p className='hero-description'>
                            C and Python Programs & <br /> Practical implementations of Data Structures.
                        </p>

                        <div className="hero-buttons">
                            <a href="#programs" className='btn btn-primary'>
                                <span>&lt;/&gt;</span>
                                Explore Programs
                            </a>
                        </div>
                    </div>
                </div>

                <div className="code-area">
                    <div className="code-card">
                        <div className="code-header">
                            <div className="dots">
                                <span className='dot red'></span>
                                <span className='dot yellow'></span>
                                <span className='dot green'></span>
                            </div>
                            <span className='language'>C</span>
                        </div>

                        <pre>
                            <span className='purple'>#include</span>{' '}
                            <span className='green-text'>&lt;stdio.h&gt;</span>
                            {'\n'}
                            <span className='yellow'>int</span> main() {'{'}
                            {'\n    '}printf(<span className='green-text'>"DS Programs \n"</span>)
                            {'\n    '}<span className='purple'>return 0;</span>
                            {'\n'} {'}'}
                        </pre>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero
