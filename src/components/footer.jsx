const Footer = () => {
    return (
        <>
            <footer>

                <div className="footer-logo">

                    <div className="footer-icon">&lt;/&gt;</div>

                    <div>
                        <div className="footer-name">
                            DS Programs
                        </div>

                        <div className="footer-tagline">
                            Better Code&nbsp;&nbsp;•&nbsp;&nbsp; Stronger Concepts
                        </div>
                    </div>

                </div>


                <div className="footer-right">

                    <span>
                        Made with <span className="heart">♥</span> for Learners
                    </span>

                    <a
                        className="back-top"
                        href="#"
                        aria-label="Back to top"
                        onClick={(event) => {
                            event.preventDefault()
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                    >
                        ↑
                    </a>

                </div>

            </footer>
        </>
    )
}

export default Footer
