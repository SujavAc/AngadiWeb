import React from 'react';
import Transition from '../Transition/Transition';
import useIntersectionObserver from '../../../utils/useIntersectionObserver';

function AnimatedImage({ imageUrl, alt, ...rest }) {
	const ref = React.useRef();
    const ImageRef = React.useRef();
	const [ isVisible, setIsVisible ] = React.useState(false);
	useIntersectionObserver({
		target: ref,
		onIntersect: ([ { isIntersecting } ], observerElement) => {
			if (isIntersecting) {
				setIsVisible(true);
				observerElement.unobserve(ref.current);
			}
		}
	});

	return (
		<div ref={ref} >
			{isVisible && (
				<Transition transitionType="grow" active={true} ref={ImageRef}>
					<img src={imageUrl} alt={alt} {...rest}  width={300} height={400}/>
				</Transition>
			)}
		</div>
	);
}

export default AnimatedImage;
