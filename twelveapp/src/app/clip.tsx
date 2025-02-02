import React, { useEffect, useRef } from 'react';

const Clip = () => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (svgRef.current) {
            svgRef.current.setAttribute('style', 'enable-background:new 0 0 192 192');
        }
    }, []);

    return (
        <div className="pointer-events-none flex items-center">
            <svg
                ref={svgRef}
                width="20px"
                height="20px"
                viewBox="0 0 192 192"
                xmlns="http://www.w3.org/2000/svg"
                xmlSpace="preserve"
            >
                <path
                    d="M84 128.6H54.6C36.6 128.6 22 114 22 96c0-9 3.7-17.2 9.6-23.1 5.9-5.9 14.1-9.6 23.1-9.6H84m24 65.3h29.4c9 0 17.2-3.7 23.1-9.6 5.9-5.9 9.6-14.1 9.6-23.1 0-18-14.6-32.6-32.6-32.6H108M67.9 96h56.2"
                    style={{
                        fill: 'none',
                        stroke: '#7e8a9a',
                        strokeWidth: 12,
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        strokeMiterlimit: 10,
                    }}
                />
            </svg>
        </div>
    );
};

export default Clip;
