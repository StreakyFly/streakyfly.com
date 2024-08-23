export default function CallToAction() {
    // TODO: replace this with interesting social media cards
    return (
        <section id="call-to-action" className="relative min-h-screen overflow-clip flex flex-col items-center pb-8 justify-center text-white">
            <h2 style={{ fontSize: 'clamp(2rem, 3vw, 3rem)' }}
                className="text-5xl font-semibold mb-8 md:mb-14">WIP - Contact/Social Media
            </h2>
            <div style={{ fontSize: 'clamp(1.2rem, 1.5vw, 1.5rem)' }}
                 className="max-w-2xl text-justify space-y-6 text-2xl leading-normal font-light px-8 md:px-0">
                <p>
                    Want to work together? Have a project in mind? Or just want to say hi? Feel free to reach out to me on social media.
                </p>
            </div>
        </section>
    );
}
