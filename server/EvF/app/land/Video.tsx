import React, { useRef, useEffect, CSSProperties } from 'react';
import videoFile from '../videos/BackGLand.mp4'; 

interface PlayerFnProps {
    volume: number;
    autoplay: boolean;
    loop: boolean;
    style: CSSProperties;
    width: string;
}

const PlayerFn: React.FC<PlayerFnProps> = (props) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.volume = props.volume / 100; // Set the volume (0.0 to 1.0)
            if (props.autoplay) {
                video.play(); // Start playing the video
            }
        }
    }, [props.autoplay, props.volume]);

    return (
        <video
            ref={videoRef}
            src={videoFile}
            loop={props.loop}
            style={props.style}
            width={props.width}
            className="player"
        />
    );
};

export default PlayerFn;
