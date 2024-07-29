import React from 'react';
import styles from './Blob.module.css';

interface BlobProps {
    size: number;
    color: string;
    top: string;
    left: string;
    animationDuration: string;
}

const Blob: React.FC<BlobProps> = ({ size, color, top, left, animationDuration }) => {
    return (
        <div
            className={styles.blob}
            style={{
                width: size,
                height: size,
                background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
                top: top,
                left: left,
                animationDuration: animationDuration,
                willChange: 'transform',
            }}
        ></div>
    );
};

export default Blob;
