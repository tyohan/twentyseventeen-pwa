const config = {
    // If the image gets within 50px in the Y axis, start the download.
    rootMargin: '50px 0px',
    threshold: 0.01
  };
const observer = new IntersectionObserver(onIntersection, config);

function loadImage(el){
    el.className = el.className.replace( /(?:^|\s)lazy-hidden(?!\S)/g , '' );

    if ( null != el.getAttribute('data-lazy-srcset') ) {
        el.setAttribute( 'srcset', el.getAttribute('data-lazy-srcset') );
    }
    if ( null != el.getAttribute('data-lazy-sizes') ) {
        el.setAttribute( 'sizes', el.getAttribute('data-lazy-sizes') );
    }
    el.setAttribute( 'src', el.getAttribute('data-lazy-src') );
}

function onIntersection(entries) {
    // Loop through the entries
    entries.forEach(entry => {
      // Are we in viewport?
      if (entry.intersectionRatio > 0) {
  
        // Stop watching and load the image
        observer.unobserve(entry.target);
        loadImage(entry.target);
      }
    });
  }

function observeImage(){
    const images=document.getElementsByClassName('lazy-hidden');
    if (!('IntersectionObserver' in window)) {
        Array.from(images).forEach(image => loadImages(image));
    } else {
        // It is supported, load the images through observer.
        
        Array.from(images).forEach(image => {
            observer.observe(image);
        });
    }
      
}

window.addEventListener( 'load', observeImage());