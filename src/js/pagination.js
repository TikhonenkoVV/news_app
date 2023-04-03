import { refs } from './refs';
let newsPerPage;
import { removeLoader } from './searchForm';

export function createPagination(newsArray, funcForRenderingMarkup) {
    setNumberOfNewsperPage();
    refs.pgWrapper.classList.remove('visually-hidden');
    refs.btnNextPg.classList.remove('visually-hidden');
    refs.btnPrevPg.classList.remove('visually-hidden');
    refs.btnPrevPg.disabled = true;

    const valuePage = {
        curPage: 1,
        numLinksTwoSide: 1,
        totalPages: Math.ceil((newsArray.length + 1) / (newsPerPage + 1)),
    };

    if(valuePage.totalPages <= 1) {
        refs.pgWrapper.classList.add('visually-hidden');
        removeLoader();
        return;
    }

    pagination(valuePage);

    refs.pg.addEventListener('click', e => {
        const ele = e.target;
        if (ele.dataset.page) {
            const pageNumber = parseInt(e.target.dataset.page, 10);

            valuePage.curPage = pageNumber;
            pagination(valuePage);
            handleButtonLeft(valuePage);
            handleButtonRight(valuePage);
        }
    });

    refs.pgContainer.addEventListener('click', e => {
        handleButton(e.target, valuePage);

        if (e.target.nodeName === 'LI' || e.target.nodeName === 'BUTTON') {
            let pageNumber = valuePage.curPage;
            let array = [];
            if (pageNumber === 1) {
                const start = (pageNumber - 1) * newsPerPage;
                const end = start + newsPerPage;
                array = newsArray.slice(start, end);
            } else {
                const start = (pageNumber - 1) * (newsPerPage + 1) - 1;
                const end = start + (newsPerPage + 1);
                array = newsArray.slice(start, end);
            }

            if (pageNumber == 1) {
                refs.gridBox.classList.remove('banner-hidden');
                funcForRenderingMarkup(array, true);
            } else {
                refs.gridBox.classList.add('banner-hidden');
                funcForRenderingMarkup(array, false);
            }
        }
    });
    
    fixScreenHeight();
}

function pagination(valuePage) {
    const { totalPages, curPage, numLinksTwoSide: delta } = valuePage;

    let range;
    if (window.matchMedia('(max-width: 767px)').matches) {
        range = 2; // use for handle visible number of links left side
    } else if (window.matchMedia('(min-width: 768px)').matches) {
        range = delta + 4;
    }

    let render = '';
    let renderTwoSide = '';
    let dot = `<li class="pagination___item pagination___item--dots"><a class="pagination___link">...</a></li>`;
    let countTruncate = 0; // use for ellipsis - truncate left side or right side

    // use for truncate two side
    const numberTruncateLeft = curPage - delta;
    const numberTruncateRight = curPage + delta;

    let active = '';

    if (window.matchMedia('(max-width: 767px)').matches) {
        for (let pos = 1; pos <= totalPages; pos++) {
            active = pos === curPage ? 'active' : '';
            // truncate
            if (totalPages >= 2 * range - 1) {
                if (
                    numberTruncateLeft > 1 &&
                    numberTruncateRight < totalPages
                ) {
                    // truncate 2 side
                    if (pos > numberTruncateLeft && pos < numberTruncateRight) {
                        renderTwoSide += renderPage(pos, active);
                    }
                } else {
                    // truncate left side or right side
                    if (
                        (curPage <= range && pos <= range) ||
                        (curPage > totalPages - range &&
                            pos >= totalPages - range + 1) ||
                        pos === totalPages ||
                        pos === 1
                    ) {
                        render += renderPage(pos, active);
                    } else {
                        countTruncate++;
                        if (countTruncate === 1) render += dot;
                    }
                }
            } else {
                // not truncate
                render += renderPage(pos, active);
            }
        }
    } else if (window.matchMedia('(min-width: 768px)').matches) {
        for (let pos = 1; pos <= totalPages; pos++) {
            active = pos === curPage ? 'active' : '';
            // truncate
            if (totalPages >= 2 * range - 1) {
                if (
                    numberTruncateLeft > 3 &&
                    numberTruncateRight < totalPages - 3 + 1
                ) {
                    // truncate 2 side
                    if (
                        pos >= numberTruncateLeft &&
                        pos <= numberTruncateRight
                    ) {
                        //mobile
                        renderTwoSide += renderPage(pos, active);
                    }
                } else {
                    // truncate left side or right side
                    if (
                        (curPage < range && pos <= range) ||
                        (curPage > totalPages - range &&
                            pos >= totalPages - range + 1) ||
                        pos === totalPages ||
                        pos === 1
                    ) {
                        render += renderPage(pos, active);
                    } else {
                        countTruncate++;
                        if (countTruncate === 1) render += dot;
                    }
                }
            } else {
                // not truncate
                render += renderPage(pos, active);
            }
        }
    }

    if (renderTwoSide) {
        renderTwoSide =
            renderPage(1) + dot + renderTwoSide + dot + renderPage(totalPages);
        refs.pg.innerHTML = renderTwoSide;
    } else {
        refs.pg.innerHTML = render;
    }
}

function handleButtonLeft(valuePage) {
    if (valuePage.curPage === 1) {
        refs.btnPrevPg.disabled = true;
        refs.gridBox.classList.remove('banner-hidden');
    } else {
        refs.btnPrevPg.disabled = false;
        refs.gridBox.classList.add('banner-hidden');
    }
}

function handleButtonRight(valuePage) {
    if (valuePage.curPage === valuePage.totalPages) {
        refs.btnNextPg.disabled = true;
    } else {
        refs.btnNextPg.disabled = false;
    }
    if (valuePage.curPage === 1) {
        refs.gridBox.classList.remove('banner-hidden');
    } else {
        refs.gridBox.classList.add('banner-hidden');
    }
}

function handleButton(element, valuePage) {
    if (element.classList.contains('pagination__prev-page')) {
        valuePage.curPage--;
        handleButtonLeft(valuePage);
        refs.btnNextPg.disabled = false;
    } else if (element.classList.contains('pagination__next-page')) {
        valuePage.curPage++;
        handleButtonRight(valuePage);
        refs.btnPrevPg.disabled = false;
    }
    pagination(valuePage);
}

function renderPage(index, active = '') {
    return ` <li class="pagination___item ${active}" data-page="${index}">
    <a class="pagination___link" href="#">${index}</a>
</li>`;
}

function setNumberOfNewsperPage() {
    if (window.matchMedia('(min-width: 1280px)').matches) {
        newsPerPage = 8;
    } else if (window.matchMedia('(min-width: 768px)').matches) {
        newsPerPage = 7;
    } else {
        newsPerPage = 4;
    }
}

function fixScreenHeight() {
    refs.newsContainer.style.height = '';
    if (window.matchMedia('(min-width: 768px)').matches) {
        const galleryHeight = refs.newsContainer.clientHeight;
        refs.newsContainer.style.height = `${galleryHeight}px`;
    }
}
