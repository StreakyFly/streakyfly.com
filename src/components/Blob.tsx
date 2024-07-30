import React from 'react';
import styles from './Blob.module.css';

interface BlobProps {
    size: string;
    color1: string;
    color2: string;
    top: string;
    left: string;
    animationId: string;
    animationDuration: string;
}

const Blob: React.FC<BlobProps> = ({
               size, color1, color2, top, left, animationId, animationDuration
}) => {
    return (
        <div
            className={`absolute rounded-full -z-10 will-change-transform ${getBlobStyle(animationId)}`}
            style={{
                width: size,
                height: size,
                background: `linear-gradient(to right, ${color1} 60%, ${color2})`,
                top: top,
                left: left,
                animationDuration: animationDuration,
            }}
        ></div>
    );
};

export default Blob;

function getBlobStyle(id: string) {
    return styles[`blob${id}`];
}
