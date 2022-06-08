const galleryContEl = document.querySelector('.gallery-container');
const galleryEl = document.querySelector('.gallery');
let zoomedItem = null;
let timer;
let scrollTop = 0;

if(typeof CSS.registerProperty === 'function') {
	CSS.registerProperty({
		name: '--left',
		syntax: '<length>',
		inherits: false,
		initialValue: 0,
	});
	CSS.registerProperty({
		name: '--top',
		syntax: '<length>',
		inherits: false,
		initialValue: 0,
	});
	CSS.registerProperty({
		name: '--zoom',
		syntax: '<number>',
		inherits: false,
		initialValue: 1,
	});
}

galleryEl.addEventListener('click', function(e) {
	const item = e.target.closest('.gallery-item');
	
	if(!item || zoomedItem === item) return;
	
	e.preventDefault();
	e.stopPropagation();

	const picW = item.offsetWidth;
	const picH = item.offsetHeight;
	const picCX = item.offsetLeft + picW / 2;
	const picCY = item.offsetTop + picH / 2;
	let {paddingLeft: itemPaddLeft, paddingRight: itemPaddRight} = getComputedStyle(item);
	itemPaddLeft = parseFloat(itemPaddLeft);
	itemPaddRight = parseFloat(itemPaddRight);
	const zoom = Math.min(
		(window.innerHeight - 30) / picH,
		(window.innerWidth - 30) / picW,
		item.querySelector('img').naturalWidth / item.querySelector('img').offsetWidth,
	);

	if(zoomedItem) {
		galleryEl.style.transitionProperty = '--left, --top, --zoom, transform-origin';
	} else {
		scrollTop = window.scrollY;
		galleryEl.style.top = -scrollTop + 'px';
	}

	galleryEl.style.transformOrigin = `${picCX}px ${picCY}px`;
	galleryEl.style.setProperty('--left', `${galleryEl.offsetWidth / 2 - picCX}px`);
	galleryEl.style.setProperty('--top', `${-item.offsetTop + scrollTop + (window.innerHeight - picH) / 2}px`);
	galleryEl.style.setProperty('--zoom', zoom);
	galleryContEl.classList.add('zoomed-in');
	
	if(zoomedItem) zoomedItem.classList.remove('current');
	item.classList.add('current');
	zoomedItem = item;
	
	clearTimeout(timer);
	galleryContEl.style.overflow = 'hidden';
	galleryContEl.style.height = '100vh';
});

document.body.addEventListener('click', function(e) {
	if(!zoomedItem) return;
	
	e.preventDefault();
	
	galleryContEl.classList.remove('zoomed-in');
	galleryEl.style.transitionProperty = '';
	galleryEl.style.setProperty('--left', '');
	galleryEl.style.setProperty('--top', '');
	galleryEl.style.setProperty('--zoom', '');

	zoomedItem.classList.remove('current');
	zoomedItem = null;

	clearTimeout(timer);
	timer = setTimeout(() => {
		galleryEl.style.top = 0;
		galleryContEl.style.overflow = '';
		galleryContEl.style.height = '';
		window.scrollTo(0, scrollTop);
	}, 800);
});