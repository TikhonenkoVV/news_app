import {
    fetchPopularArticles,
    fetchSearchArticles,
    fetchCategoryArticles,
} from './fetch';

import { renderGallery } from './main';
import { refs } from './refs';

window.addEventListener('resize', widthChangeCallback);

function setNumberOfNewsPerPage() {
    let newsPerPage = widthChangeCallback();
    return newsPerPage;
};

export function createPagination(newsArray) {
    let newsPerPage = setNumberOfNewsPerPage();

    const valuePage = {
        curPage: 1,
        numLinksTwoSide: 1,
        totalPages: Math.ceil(newsArray.length / newsPerPage),
    };

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
            const start = (pageNumber - 1) * newsPerPage;
            const end = start + newsPerPage;
            const array = newsArray.slice(start, end);

            renderGallery(array);
        }
    });
}

function pagination(valuePage) {
    const { totalPages, curPage, numLinksTwoSide: delta } = valuePage;

    const range = delta + 4; // use for handle visible number of links left side

    let render = '';
    let renderTwoSide = '';
    let dot = `<li class="pagination___item pagination___item--dots"><a class="pagination___link">...</a></li>`;
    let countTruncate = 0; // use for ellipsis - truncate left side or right side

    // use for truncate two side
    const numberTruncateLeft = curPage - delta;
    const numberTruncateRight = curPage + delta;

    let active = '';
    for (let pos = 1; pos <= totalPages; pos++) {
        active = pos === curPage ? 'active' : '';
        // truncate
        if (totalPages >= 2 * range - 1) {
            if (
                numberTruncateLeft > 3 &&
                numberTruncateRight < totalPages - 3 + 1
            ) {
                // truncate 2 side
                if (pos >= numberTruncateLeft && pos <= numberTruncateRight) {
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
    } else {
        refs.btnPrevPg.disabled = false;
    }
}

function handleButtonRight(valuePage) {
    if (valuePage.curPage === valuePage.totalPages) {
        refs.btnNextPg.disabled = true;
    } else {
        refs.btnNextPg.disabled = false;
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

function widthChangeCallback() {
    if (window.innerWidth < 768) {
        newsPerPage = 4;
    } else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
        newsPerPage = 7;
    } else {
        newsPerPage = 8;
    }

    return newsPerPage;
}