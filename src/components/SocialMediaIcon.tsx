import Image from 'next/image';

interface SocialMediaIconProps {
    src: string;
    width?: number;
    height?: number;
    alt: string;
    className?: string;
    outerClassName?: string;
    href?: string;
    priority?: boolean;
}

export default function SocialMediaIcon({
                                            src,
                                            width,
                                            height,
                                            alt,
                                            className,
                                            outerClassName,
                                            href,
                                            priority,
                                        }: SocialMediaIconProps) {
    const widthString = width ? `${width}px` : 'auto';
    const heightString = height ? `${height}px` : 'auto';
    outerClassName = outerClassName + ' hover:scale-[117%] hover:rotate-180 transition-transform duration-200 ease-out';

    const imageElement = (
        <Image
            src={src}
            alt={alt}
            width={0}
            height={0}
            style={{ width: widthString, height: heightString }}
            className={className}
            priority={priority}
        />
    );

    if (href) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer">
                <div className={outerClassName}>
                    {imageElement}
                </div>
            </a>
        );
    }

    return imageElement;
}
