(() => {
  const bookTwoPath = '/maybe-love-wasnt-the-problem/';
  const path = window.location.pathname;
  const isBookTwo = path.startsWith(bookTwoPath);
  const transitionKey = 'twu-book-transition-arrival';
  const arrival = sessionStorage.getItem(transitionKey);

  const style = document.createElement('style');
  style.textContent = `
    .twu-flip-overlay{position:fixed;inset:0;z-index:99999;overflow:hidden;pointer-events:none;visibility:hidden;--origin-x:100%;--wash:#062d2c}
    .twu-flip-overlay.is-active{visibility:visible}
    .twu-flip-overlay[data-direction="back"]{--origin-x:0%;--wash:#f6f0e4}
    .twu-flip-wash{position:absolute;inset:0;background:radial-gradient(ellipse at var(--origin-x) 50%,#e8895a 0 8%,color-mix(in srgb,var(--wash) 72%,#d76f50) 28%,var(--wash) 62%,color-mix(in srgb,var(--wash) 82%,#315f9d) 100%);clip-path:circle(0 at var(--origin-x) 50%);filter:url(#twu-paper-edge)}
    .twu-flip-overlay.is-active .twu-flip-wash{animation:twu-wash 1.65s cubic-bezier(.16,.68,.19,1) both}
    .twu-flip-web{position:absolute;inset:-4%;width:108%;height:108%;overflow:visible}
    .twu-flip-web path{fill:none;stroke-linecap:round;stroke-dasharray:2200;stroke-dashoffset:2200;opacity:0;filter:drop-shadow(0 0 6px currentColor)}
    .twu-flip-web .blue-thread{stroke:#4075c5;stroke-width:2.5;color:#4075c5}
    .twu-flip-web .orange-thread{stroke:#f08a5c;stroke-width:2;color:#f08a5c}
    .twu-flip-overlay.is-active .twu-flip-web path{animation:twu-draw-web 1.55s cubic-bezier(.15,.63,.22,1) both}
    .twu-flip-overlay.is-active .twu-flip-web path:nth-child(2){animation-delay:.08s}
    .twu-flip-overlay.is-active .twu-flip-web path:nth-child(3){animation-delay:.14s}
    .twu-flip-overlay.is-active .twu-flip-web path:nth-child(4){animation-delay:.22s}
    .twu-flip-overlay.is-active .twu-flip-web path:nth-child(5){animation-delay:.3s}
    html.twu-flip-arriving body{animation:twu-arrive .72s cubic-bezier(.2,.7,.2,1) both}
    @keyframes twu-wash{0%{clip-path:circle(0 at var(--origin-x) 50%);opacity:.98}64%{clip-path:circle(96vmax at var(--origin-x) 50%);opacity:1}100%{clip-path:circle(132vmax at var(--origin-x) 50%);opacity:0}}
    @keyframes twu-draw-web{0%{stroke-dashoffset:2200;transform:scale(.28);opacity:0}18%{opacity:.9}100%{stroke-dashoffset:0;transform:scale(3.8);opacity:0}}
    @keyframes twu-arrive{from{opacity:.38;filter:blur(2px);transform:scale(1.012)}to{opacity:1;filter:blur(0);transform:scale(1)}}
    @media(prefers-reduced-motion:reduce){.twu-flip-overlay.is-active .twu-flip-wash,.twu-flip-overlay.is-active .twu-flip-web path,html.twu-flip-arriving body{animation-duration:.01ms!important}}
  `;
  document.head.appendChild(style);

  if (arrival) {
    sessionStorage.removeItem(transitionKey);
    document.documentElement.classList.add('twu-flip-arriving');
    window.setTimeout(() => document.documentElement.classList.remove('twu-flip-arriving'), 800);
  }

  const overlay = document.createElement('div');
  overlay.className = 'twu-flip-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML = `
    <svg width="0" height="0" aria-hidden="true"><defs><filter id="twu-paper-edge" x="-12%" y="-12%" width="124%" height="124%"><feTurbulence type="fractalNoise" baseFrequency=".022" numOctaves="2" seed="8" result="grain"/><feDisplacementMap in="SourceGraphic" in2="grain" scale="22" xChannelSelector="R" yChannelSelector="G"/></filter></defs></svg>
    <div class="twu-flip-wash"></div>
    <svg class="twu-flip-web" viewBox="0 0 1000 700" preserveAspectRatio="none">
      <path class="blue-thread" pathLength="2200" d="M500 350 C514 310 554 312 557 350 C562 393 518 417 477 396 C428 371 421 312 468 276 C523 234 602 274 618 337 C636 412 573 480 497 478 C404 476 348 397 370 309 C396 209 507 177 601 218 C713 266 743 382 691 484 C631 603 480 634 362 567 C223 488 196 317 282 186 C376 44 581 42 733 132"/>
      <path class="orange-thread" pathLength="2200" d="M500 350 C528 323 547 326 551 352 C555 381 522 400 491 390 C452 376 441 330 469 298 C507 254 573 262 601 309 C642 379 605 445 548 462 C470 486 391 435 380 359 C365 258 445 193 530 186 C637 177 711 270 714 365 C716 488 625 557 517 568 C376 584 276 495 257 380 C232 225 329 97 469 70 C632 39 787 153 813 307"/>
      <path class="blue-thread" pathLength="2200" d="M500 350 C544 304 601 319 611 367 C622 422 560 460 501 443 C429 423 402 347 440 282 C486 201 593 197 663 250 C747 313 753 429 685 513 C598 621 433 628 312 554 C164 463 143 273 245 133"/>
      <path class="orange-thread" pathLength="2200" d="M500 350 C477 318 492 284 526 280 C567 275 594 318 577 360 C555 415 486 428 434 397 C371 359 369 271 416 215 C482 135 602 139 678 193 C779 265 804 404 742 512"/>
      <path class="blue-thread" pathLength="2200" d="M500 350 C460 386 417 379 400 342 C379 297 418 248 468 249 C525 250 556 308 541 365 C521 443 440 472 368 439 C279 398 250 294 282 204"/>
    </svg>`;
  document.body.appendChild(overlay);

  let busy = false;
  function destinationType(url) {
    const target = new URL(url, window.location.href);
    if (target.origin !== window.location.origin) return null;
    const toTwo = target.pathname.startsWith(bookTwoPath);
    if (!isBookTwo && toTwo) return 'forward';
    if (isBookTwo && (target.pathname === '/' || target.pathname.startsWith('/is-love-too-late-for-a-32/'))) return 'back';
    return null;
  }

  function startTransition(url, direction) {
    if (busy) return;
    busy = true;
    overlay.dataset.direction = direction;
    overlay.classList.remove('is-active');
    void overlay.offsetWidth;
    overlay.classList.add('is-active');
    sessionStorage.setItem(transitionKey, direction);
    window.setTimeout(() => window.location.assign(url), 1120);
  }

  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest && event.target.closest('a[href]');
    if (!link || (link.target && link.target !== '_self')) return;
    const direction = destinationType(link.href);
    if (!direction) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    startTransition(link.href, direction);
  }, true);

  let touchStart = null;
  document.addEventListener('touchstart', event => {
    if (event.touches.length !== 1) return;
    touchStart = {x:event.touches[0].clientX,y:event.touches[0].clientY,target:event.target};
  }, {capture:true,passive:true});
  document.addEventListener('touchend', event => {
    if (!touchStart || !event.changedTouches.length) return;
    const start = touchStart;
    touchStart = null;
    if (start.target.closest && start.target.closest('a,button,input,textarea,select,.character-grid,.cities-panorama,.cast-grid')) return;
    const dx = event.changedTouches[0].clientX - start.x;
    const dy = event.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) < 90 || Math.abs(dx) <= Math.abs(dy) * 1.35) return;
    const shouldNavigate = (!isBookTwo && dx < 0) || (isBookTwo && dx > 0);
    if (!shouldNavigate) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    startTransition(isBookTwo ? '/' : bookTwoPath, isBookTwo ? 'back' : 'forward');
  }, {capture:true});
})();
