import React from 'react';

// TODO - replace with svg icons, as I don't like these
const SocialMediaIcons = () => {
    return (
        <div className="fixed bottom-4 right-4 flex flex-col space-y-4">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl hover:text-red-500">
                <i className="fab fa-youtube"></i>
            </a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl hover:text-blue-500">
                <i className="fab fa-discord"></i>
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl hover:text-blue-400">
                <i className="fab fa-x"></i>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl hover:text-gray-500">
                <i className="fab fa-github"></i>
            </a>
        </div>
    );
}

export default SocialMediaIcons;
