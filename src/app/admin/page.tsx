'use client';  // TODO: the entire page shouldn't be client-side rendered, only the necessary parts - or should it be?

export default function AdminPanel() {
    return (
        <div>
            <h1>Lovely admin panel</h1>

        {/* a couple rectangles, so I need to scroll down*/}
        <div className="h-96 bg-red-400"></div>
        <div className="h-96 bg-red-500"></div>
        <div className="h-96 bg-red-600"></div>
        </div>
    );
}
