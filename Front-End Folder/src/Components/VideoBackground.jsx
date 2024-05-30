import React from 'react';
import './VideoBackground.css'; // Import the CSS file for styling

const VideoBackground = ({ children }) => {
    return (
        <div className="video-background-container">
            <video autoPlay loop muted className="video-background">
                <source src="Images/back_video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="video-content">
                {children}
            </div>
        </div>
    );
};

export default VideoBackground;
