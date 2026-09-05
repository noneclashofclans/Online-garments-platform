import React from 'react';
import Navbar from '../components/Navbar';
import './AboutUs.css';

const AboutUs = () => {
    return (
        <>
            <Navbar />

            <main className="about-page">

                {/* Hero Section */}
                <section className="about-hero">
                    <div className="hero-frame">
                        <p className="hero-kicker">Who we are</p>

                        <h1>
                            Clothing that keeps up
                            <br />
                            with who you're becoming.
                        </h1>

                        <p>
                            We bring together modern fashion, quality clothing,
                            and timeless styles to help you look and feel your best.
                        </p>

                        <div className="hero-swatches" aria-hidden="true">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>

                    <div className="hero-seam" aria-hidden="true"></div>
                </section>


                {/* About Section */}
                <section className="about-content">

                    <div className="about-text">
                        <span className="section-label">
                            About us
                        </span>

                        <h2>
                            Fashion made simple.
                        </h2>

                        <p>
                            We believe fashion should be accessible, comfortable,
                            and expressive. Our collection is carefully selected
                            to bring you stylish clothing for everyday life.
                        </p>

                        <p>
                            From traditional designs to modern outfits, we aim
                            to offer something for everyone while maintaining
                            quality and affordability.
                        </p>
                    </div>


                    <div className="about-highlight">

                        <div className="highlight-box">
                            <span className="index">01</span>
                            <div>
                                <h3>Quality</h3>
                                <p>
                                    Carefully selected products made with quality
                                    and comfort in mind.
                                </p>
                            </div>
                        </div>

                        <div className="highlight-box">
                            <span className="index">02</span>
                            <div>
                                <h3>Style</h3>
                                <p>
                                    Modern and timeless designs for every occasion.
                                </p>
                            </div>
                        </div>

                        <div className="highlight-box">
                            <span className="index">03</span>
                            <div>
                                <h3>Value</h3>
                                <p>
                                    Great fashion at prices that make sense.
                                </p>
                            </div>
                        </div>

                        <div className="highlight-box">
                            <span className="index">04</span>
                            <div>
                                <h3>Customer first</h3>
                                <p>
                                    Your satisfaction is at the heart of everything
                                    we do.
                                </p>
                            </div>
                        </div>

                    </div>

                </section>


                {/* Mission */}
                <section className="mission-section">

                    <span className="section-label">
                        Our mission
                    </span>

                    <blockquote>
                        Making every outfit count.
                    </blockquote>

                    <p className="attribution">
                        Simple, enjoyable, accessible fashion shopping for
                        everyone who wears it.
                    </p>

                </section>


                {/* CTA */}
                <section className="about-cta">

                    <h2>
                        Find your next favourite outfit.
                    </h2>

                    <p>
                        Explore our collection and discover styles made for you.
                    </p>

                    <button>
                        Explore collection
                    </button>

                </section>

            </main>
        </>
    );
};

export default AboutUs;